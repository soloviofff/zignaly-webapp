import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { Box } from "@material-ui/core";
import { useForm, FormContext } from "react-hook-form";
import { assign, isEmpty, isObject, range, forIn, noop } from "lodash";
import { useDispatch } from "react-redux";
import StrategyPanel from "../StrategyPanel/StrategyPanel";
import TakeProfitPanel from "../TakeProfitPanel/TakeProfitPanel";
import DCAPanel from "../DCAPanel/DCAPanel";
import StopLossPanel from "../StopLossPanel/StopLossPanel";
import TrailingStopPanel from "../TrailingStopPanel/TrailingStopPanel";
import EntryExpirationPanel from "../EntryExpirationPanel/EntryExpirationPanel";
import AutoclosePanel from "../AutoclosePanel/AutoclosePanel";
import IncreaseStrategyPanel from "../IncreaseStrategyPanel/IncreaseStrategyPanel";
import CustomButton from "../../CustomButton/CustomButton";
import { colors } from "../../../services/theme";
import { formatPrice } from "../../../utils/formatters";
import tradeApi from "../../../services/tradeApiClient";
import {
  POSITION_TYPE_ENTRY,
  mapEntryTypeToEnum,
  mapSideToEnum,
} from "../../../services/tradeApiClient.types";
import useStoreSettingsSelector from "../../../hooks/useStoreSettingsSelector";
import useStoreSessionSelector from "../../../hooks/useStoreSessionSelector";
import { showErrorAlert } from "../../../store/actions/ui";
import { FormattedMessage } from "react-intl";
import "./StrategyForm.scss";

/**
 * @typedef {import("../../../services/coinRayDataFeed").MarketSymbol} MarketSymbol
 * @typedef {import("../../../services/coinRayDataFeed").CoinRayCandle} CoinRayCandle
 * @typedef {import("../../../tradingView/charting_library.min").IChartingLibraryWidget} TVWidget
 * @typedef {import("../../../tradingView/charting_library.min").IPositionLineAdapter} TVChartLine
 * @typedef {import("../../../services/tradeApiClient.types").CreatePositionPayload} CreatePositionPayload
 * @typedef {import("../../../services/tradeApiClient.types").UpdatePositionPayload} UpdatePositionPayload
 * @typedef {import("../../../services/tradeApiClient.types").PositionEntity} PositionEntity
 * @typedef {CreatePositionPayload["takeProfitTargets"]} PositionProfitTargets
 * @typedef {CreatePositionPayload["reBuyTargets"]} PositionDCATargets
 */

/**
 * @typedef {Object} StrategyFormProps
 * @property {Object} dataFeed
 * @property {CoinRayCandle} lastPriceCandle
 * @property {TVWidget} tradingViewWidget
 * @property {number} leverage
 * @property {string} selectedSymbol
 * @property {PositionEntity} [positionEntity] Position entity (optional) for position edit trading view.
 * @property {function} [notifyPositionUpdate] Callback to notify position update.
 */

/**
 * Manual trading strategy form component.
 *
 * @param {StrategyFormProps} props Component props.
 * @returns {JSX.Element} Strategy form element.
 */
const StrategyForm = (props) => {
  const {
    dataFeed,
    lastPriceCandle,
    leverage,
    notifyPositionUpdate = noop,
    selectedSymbol,
    tradingViewWidget,
    positionEntity = null,
  } = props;

  const isPositionView = isObject(positionEntity);
  const isClosed = positionEntity ? positionEntity.closed : false;
  const currentPrice = parseFloat(lastPriceCandle[1]).toFixed(8);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      entryType: "LONG",
      positionSize: "",
      price: currentPrice,
      realInvestment: "",
      stopLossPrice: "",
      trailingStopPrice: "",
      units: "",
      dcaTargetPricePercentage1: "",
    },
  });

  const { errors, handleSubmit, setValue, reset, triggerValidation, watch } = methods;
  const storeSettings = useStoreSettingsSelector();
  const storeSession = useStoreSessionSelector();
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);

  /**
   * @type {Object<String, TVChartLine|null>}
   */
  const defaultLinesTracking = {
    price: null,
    stopLossPrice: null,
    trailingStopPrice: null,
    dcaTargetPrice1: null,
    profitTargetPrice1: null,
  };
  const [linesTracking, setLinesTracking] = useState(defaultLinesTracking);

  /**
   * @typedef {Object} ChartLineParams
   * @property {string} id Line ID for tracking purposes for remove / redraw.
   * @property {number} price Line price.
   * @property {string} label Line label.
   * @property {string} color Line color.
   */

  /**
   * Draw price line at Trading View Chart.
   *
   * @param {ChartLineParams} chartLineParams Chart line parameters object.
   * @returns {TVChartLine|null} TV chart line object.
   */
  function drawLine(chartLineParams) {
    const { id, price, label, color } = chartLineParams;
    const existingChartLine = linesTracking[id] || null;

    // Skip draw when price is empty.
    if (price === 0) {
      return null;
    }

    // When line already exists, remove prior to draw to prevent duplication.
    if (existingChartLine) {
      const currentLinePrice = existingChartLine.getPrice();
      // Update existing line only if price changed.
      if (price !== currentLinePrice) {
        existingChartLine.setPrice(price);
        existingChartLine.setQuantity(price);
      }

      return existingChartLine;
    }

    const chart = tradingViewWidget.chart();
    const chartLine = chart
      .createPositionLine({})
      .setPrice(price)
      .setQuantity(`${price}`)
      .setText(label)
      // horizontal line
      .setLineColor(color)
      // content text
      .setBodyTextColor(color)
      // content text border
      .setBodyBorderColor(color)
      // accompanying number
      .setQuantityBackgroundColor(color)
      // accompanying number border
      .setQuantityBorderColor(color);

    // Track the chart line object.
    setLinesTracking({
      ...linesTracking,
      [id]: chartLine,
    });

    return chartLine;
  }

  /**
   * Compose position profit targets.
   *
   * @param {Object<string, any>} draftPosition React hook form submission values.
   * @returns {PositionProfitTargets|boolean} Create position payload.
   */
  const composePositionTakeProfitTargets = (draftPosition) => {
    const targetRange = range(1, 10, 1);
    /**
     * @type {PositionProfitTargets} takeProfitTargets
     */
    const takeProfitTargets = [];

    targetRange.forEach((targetId) => {
      const targetPricePercentage = draftPosition[`takeProfitTargetPricePercentage${targetId}`];
      const targetPrice = draftPosition[`takeProfitTargetPrice${targetId}`];
      const targetExitUnitsPercetage = draftPosition[`takeProfitExitUnitsPercentage${targetId}`];
      const targetExitUnits = draftPosition[`takeProfitExitUnits${targetId}`];

      if (targetPricePercentage) {
        takeProfitTargets.push({
          targetId,
          priceTargetPercentage: parseFloat(targetPricePercentage),
          quoteTarget: parseFloat(targetPrice),
          amountPercentage: parseFloat(targetExitUnitsPercetage),
          value: parseFloat(targetExitUnits),
        });
      }
    });

    return takeProfitTargets;
  };

  /**
   * Compose position DCA targets payload chunk.
   *
   * @param {Object<string, any>} draftPosition React hook form submission values.
   * @returns {PositionDCATargets|boolean} Create position payload.
   */
  const composePositionDcaTargets = (draftPosition) => {
    const targetRange = range(1, 10, 1);
    /**
     * @type {PositionDCATargets}
     */
    const dcaTargets = [];

    targetRange.forEach((targetId) => {
      const targetPricePercentage = draftPosition[`dcaTargetPricePercentage${targetId}`];
      const targetRebuyPercentage = draftPosition[`dcaRebuyPercentage${targetId}`];

      if (targetPricePercentage) {
        dcaTargets.push({
          targetId,
          priceTargetPercentage: parseFloat(targetPricePercentage),
          amountPercentage: parseFloat(targetRebuyPercentage),
        });
      }
    });

    return isEmpty(dcaTargets) ? false : dcaTargets;
  };

  /**
   * @typedef {Object} PositionStrategyParams
   * @property {CreatePositionPayload['buyType']} buyType
   * @property {CreatePositionPayload['positionSize']} positionSize
   * @property {CreatePositionPayload['realInvestment']} realInvestment
   * @property {CreatePositionPayload['limitPrice']} limitPrice
   */

  /**
   * Compose position strategy payload chunk.
   *
   * @param {Object<string, any>} draftPosition React hook form submission values.
   * @returns {PositionStrategyParams} Create position payload.
   */
  const composePositionStrategy = (draftPosition) => {
    const positionSize = parseFloat(draftPosition.positionSize) || 0;

    return {
      buyType: mapEntryTypeToEnum(draftPosition.entryStrategy),
      positionSize,
      realInvestment: parseFloat(draftPosition.realInvestment) || positionSize,
      limitPrice: draftPosition.price || currentPrice,
    };
  };

  /**
   * Compose create position payload.
   *
   * @param {Object<string, any>} draftPosition React hook form submission values.
   * @returns {any} Create position payload.
   */
  const composePositionPayload = (draftPosition) => {
    const { quote, base } = currentSymbolData;
    const { selectedExchange } = storeSettings;
    const exchangeName = selectedExchange.exchangeName || selectedExchange.name || "";

    return {
      token: storeSession.tradeApi.accessToken,
      pair: `${base}  ${quote}`,
      positionSizeQuote: quote,
      side: mapSideToEnum(draftPosition.entryType),
      type: POSITION_TYPE_ENTRY,
      stopLossPercentage: parseFloat(draftPosition.stopLossPercentage) || false,
      buyTTL: parseFloat(draftPosition.entryExpiration) || false,
      buyStopPrice: parseFloat(draftPosition.stopPrice) || 0,
      sellByTTL: parseFloat(draftPosition.autoclose) || 0,
      takeProfitTargets: composePositionTakeProfitTargets(draftPosition),
      reBuyTargets: composePositionDcaTargets(draftPosition),
      trailingStopTriggerPercentage: parseFloat(draftPosition.trailingStopPercentage) || false,
      trailingStopPercentage: parseFloat(draftPosition.trailingStopDistance) || false,
      providerId: 1,
      providerName: "Manual Trading",
      exchangeName: exchangeName,
      exchangeInternalId: selectedExchange.internalId,
    };
  };

  /**
   * Compose create position payload.
   *
   * @param {Object<string, any>} draftPosition React hook form submission values.
   * @returns {CreatePositionPayload} Create position payload.
   */
  const composeCreatePositionPayload = (draftPosition) => {
    return assign(composePositionPayload(draftPosition), composePositionStrategy(draftPosition));
  };

  /**
   * Compose update position payload.
   *
   * @param {Object<string, any>} draftPosition React hook form submission values.
   * @returns {UpdatePositionPayload} Update position payload.
   */
  const composeUpdatePositionPayload = (draftPosition) => {
    const positionStrategy = draftPosition.positionSize
      ? composePositionStrategy(draftPosition)
      : {};

    return assign(composePositionPayload(draftPosition), positionStrategy, {
      positionId: positionEntity.positionId,
    });
  };

  /**
   * Submit manual position create request to Trade API.
   *
   * @param {CreatePositionPayload} payload Create position payload.
   * @return {Void} None.
   */
  const createPosition = (payload) => {
    setProcessing(true);
    tradeApi
      .manualPositionCreate(payload)
      .then((positionId) => {
        setProcessing(false);
        reset();
        alert(`Position was created succesfully with ID ${positionId}`);
        navigate(`/position/${positionId}`);
      })
      .catch((e) => {
        setProcessing(false);
        dispatch(showErrorAlert(e));
      });
  };

  /**
   * Submit manual position update request to Trade API.
   *
   * @param {UpdatePositionPayload} payload Update position payload.
   * @return {Void} None.
   */
  const updatePosition = (payload) => {
    setProcessing(true);
    tradeApi
      .manualPositionUpdate(payload)
      .then(() => {
        setProcessing(false);
        alert(`Position ${positionEntity.positionId} was updated succesfully.`);
        notifyPositionUpdate();
      })
      .catch((e) => {
        setProcessing(false);
        dispatch(showErrorAlert(e));
      });
  };

  /**
   * Handle create position form submission.
   *
   * @param {Object<string, any>} draftPosition React hook form submission values.
   * @returns {Void} None.
   */
  const onSubmit = (draftPosition) => {
    if (positionEntity) {
      const payload = composeUpdatePositionPayload(draftPosition);
      updatePosition(payload);
    } else {
      const payload = composeCreatePositionPayload(draftPosition);
      createPosition(payload);
    }
  };

  // @ts-ignore
  const symbolsData = dataFeed.getSymbolsData();
  const updatePriceField = () => {
    setValue("price", currentPrice);
  };
  useEffect(updatePriceField, [currentPrice]);

  // Use position buyPrice for edit or strategy price for create position.
  const strategyPrice = watch("price");
  const entryPrice = positionEntity ? positionEntity.buyPrice : parseFloat(strategyPrice);
  const drawEntryPriceLine = () => {
    drawLine({
      id: "price",
      price: entryPrice || 0,
      label: "Price",
      color: colors.purple,
    });
  };
  useEffect(drawEntryPriceLine, [strategyPrice]);

  const stopLossPrice = watch("stopLossPrice");
  const drawStopLossPriceLine = () => {
    drawLine({
      id: "stopLossPrice",
      price: parseFloat(stopLossPrice) || 0,
      label: "Stop loss",
      color: colors.yellow,
    });
  };
  useEffect(drawStopLossPriceLine, [stopLossPrice]);

  const trailingStopPrice = watch("trailingStopPrice");
  const drawTrailingStopPriceLine = () => {
    drawLine({
      id: "trailingStopPrice",
      price: parseFloat(trailingStopPrice) || 0,
      label: "Trailing stop price",
      color: colors.blue,
    });
  };
  useEffect(drawTrailingStopPriceLine, [trailingStopPrice]);

  const targetGroupIndexes = range(1, 10, 1);
  const takeProfitFields = targetGroupIndexes.map((id) => `takeProfitTargetPrice${id}`);
  const takeProfitTargetPrices = watch(takeProfitFields);
  const drawTakeProfitTargetPriceLines = () => {
    forIn(takeProfitTargetPrices, (targetPrice, targetFieldName) => {
      if (targetPrice) {
        const index = targetFieldName.substr(targetFieldName.length - 1);
        drawLine({
          id: targetFieldName,
          price: parseFloat(targetPrice) || 0,
          label: `Take profit target ${index}`,
          color: colors.green,
        });
      }
    });
  };
  useEffect(drawTakeProfitTargetPriceLines, [takeProfitTargetPrices]);

  const dcaTargetPercentage1 = watch("dcaTargetPricePercentage1");
  const drawDCATargetPriceLines = () => {
    if (dcaTargetPercentage1) {
      const price = entryPrice;
      const dcaTargetPrice1 = price - (price * parseFloat(dcaTargetPercentage1)) / 100;
      drawLine({
        id: "dcaTargetPricePercentage1",
        price: Number(formatPrice(dcaTargetPrice1)) || 0,
        label: "DCA target 1",
        color: colors.black,
      });
    }
  };
  useEffect(drawDCATargetPriceLines, [entryPrice, dcaTargetPercentage1]);

  /**
   * Match current symbol against market symbols collection item.
   *
   * @param {MarketSymbol} item Market symbol item.
   * @returns {boolean} TRUE when ID matches, FALSE otherwise.
   */
  const matchCurrentSymbol = (item) => item.id === selectedSymbol;
  const currentSymbolData = symbolsData.find(matchCurrentSymbol);

  return (
    <FormContext {...methods}>
      <Box className="strategyForm" textAlign="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isPositionView && <StrategyPanel leverage={leverage} symbolData={currentSymbolData} />}
          <TakeProfitPanel positionEntity={positionEntity} symbolData={currentSymbolData} />
          <DCAPanel positionEntity={positionEntity} symbolData={currentSymbolData} />
          <StopLossPanel positionEntity={positionEntity} symbolData={currentSymbolData} />
          <TrailingStopPanel positionEntity={positionEntity} symbolData={currentSymbolData} />
          {isPositionView && !isClosed && (
            <IncreaseStrategyPanel positionEntity={positionEntity} symbolData={currentSymbolData} />
          )}
          {!isPositionView && <EntryExpirationPanel />}
          {!isPositionView && <AutoclosePanel />}
          {!isClosed && (
            <CustomButton
              className={"full submitButton"}
              disabled={!isEmpty(errors)}
              loading={processing}
              onClick={() => {
                triggerValidation();
              }}
              type="submit"
            >
              {isPositionView ? (
                <FormattedMessage id="terminal.update" />
              ) : (
                <FormattedMessage id="terminal.open" />
              )}
            </CustomButton>
          )}
        </form>
      </Box>
    </FormContext>
  );
};

export default React.memo(StrategyForm);
