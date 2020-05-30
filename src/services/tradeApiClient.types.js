import moment from "moment";
import { assign, isArray, isObject } from "lodash";
import defaultProviderLogo from "../images/defaultProviderLogo.png";

/**
 * @typedef {Object} UserCreatePayload
 * @property {string} firstName User first name.
 * @property {string} email User email address.
 * @property {string} password User password.
 * @property {string} gRecaptchaResponse Google captcha response.
 */

/**
 * @typedef {Object} UserCreateResponse
 * @property {string} token User access token.
 */

/**
 * @typedef {Object} UserLoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} UserLoginResponse
 * @property {string} token User access token.
 * @property {string} firstName User first name.
 * @property {string} email User email.
 * @property {boolean} ask2FA Indicates if 2FA should be asked.
 * @property {string} userId User ID.
 * @property {string} createdAt Creation timestamp: e.g. (2020-05-14T14:34:48).
 * @property {boolean} providerEnable Indicates if user is subscribed to signal providers.
 * @property {boolean} twoFAEnable Indicate if 2FA is enabled.
 * @property {boolean} ref
 * @property {boolean} subscribe
 * @property {boolean} isAdmin Indicate if user is administrator.
 * @property {boolean} binanceConnected Indicates if user has Binance exchange connected.
 * @property {number} buysCount Counts the number of buys positions.
 * @property {number} sellsCount Counts the number of sell positions.
 * @property {number} planId Reference of the Zignaly subscription plan.
 * @property {string} planName Name of the Zignaly plan that user is subscribed to.
 * @property {string} planType
 * @property {string} projectId
 * @property {boolean} minimumProviderSettings
 * @property {number} status Indicate if user is active or not.
 * @property {Onboarding} onboarding Indicate user onboarding stage.
 * @property {string} refCode
 */

/**
 * @typedef {Object} Onboarding
 * @property {boolean} finished
 * @property {boolean} paused
 * @property {number} step
 */

/**
 * @typedef {Object} AuthorizationPayload
 * @property {string} token
 */

/**
 * @typedef {Object} PositionEntity
 * @property {Array<ReBuyTarget>} reBuyTargets
 * @property {RealInvestment} realInvestment
 * @property {boolean} accounting
 * @property {boolean} checkStop
 * @property {boolean} closed
 * @property {boolean} copyTraderId
 * @property {boolean} isCopyTrader
 * @property {boolean} isCopyTrading
 * @property {boolean} paperTrading
 * @property {boolean} sellByTTL
 * @property {boolean} signalMetadata
 * @property {boolean} takeProfit
 * @property {boolean} trailingStopPrice
 * @property {boolean} trailingStopTriggered
 * @property {boolean} updating
 * @property {number} buyTTL
 * @property {number} closeDate
 * @property {number} fees
 * @property {number} leverage
 * @property {number} netProfit
 * @property {number} netProfitPercentage
 * @property {number} openDate
 * @property {number} positionSizeQuote
 * @property {number} profit
 * @property {number} reBuyTargetsCountFail
 * @property {number} reBuyTargetsCountPending
 * @property {number} reBuyTargetsCountSuccess
 * @property {number} risk
 * @property {number} status
 * @property {number} stopLossPercentage
 * @property {number} stopLossPrice
 * @property {number} takeProfitTargetsCountFail
 * @property {number} takeProfitTargetsCountPending
 * @property {number} takeProfitTargetsCountSuccess
 * @property {number} trailingStopPercentage
 * @property {number} trailingStopTriggerPercentage
 * @property {string} age
 * @property {string} amount
 * @property {string} base
 * @property {string} buyPrice
 * @property {string} closeDateReadable
 * @property {string} closeTrigger
 * @property {string} exchange
 * @property {string} exchangeInternalName
 * @property {string} internalExchangeId
 * @property {string} invested
 * @property {string} investedQuote
 * @property {string} logoUrl
 * @property {string} openDateReadable
 * @property {string} openTrigger
 * @property {string} pair
 * @property {string} positionId
 * @property {string} positionSize
 * @property {string} profitPercentage
 * @property {string} profitStyle
 * @property {string} provider
 * @property {string} providerId
 * @property {string} providerLink
 * @property {string} providerLogo
 * @property {string} providerName
 * @property {string} quote
 * @property {string} quoteAsset
 * @property {string} remainAmount
 * @property {string} riskStyle
 * @property {string} sellPlaceOrderAt
 * @property {string} sellPrice
 * @property {string} side
 * @property {string} signalId
 * @property {string} signalTerm
 * @property {string} statusDesc
 * @property {string} stopLossStyle
 * @property {string} symbol
 * @property {string} type
 * @property {string} userId
 */

/**
 * @typedef {Object} RealInvestment
 * @property {string} $numberDecimal
 */

/**
 * @typedef {Object} ReBuyTarget
 * @property {number} targetId
 * @property {number} triggerPercentage
 * @property {number} quantity
 * @property {boolean} buying
 * @property {boolean} done
 * @property {string} orderId
 * @property {boolean} cancel
 * @property {boolean} skipped
 * @property {string} buyType
 */

/**
 * @typedef {Array<PositionEntity>} UserPositionsCollection
 */

/**
 * @typedef {Array<UserLoginResponse>} UsersCollection
 */

/**
 * @typedef {Object} ProvidersPayload
 * @property {string} token
 * @property {string} type
 * @property {number} timeFrame
 * @property {boolean} copyTradersOnly
 */

/**
 * @typedef {Object} DailyReturn
 * @property {string} name
 * @property {number} [positions]
 * @property {string|number} returns
 * @property {string} [totalInvested]
 * @property {string} [totalProfit]
 */

/**
 * @typedef {Object} ProviderEntity
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} shortDesc
 * @property {string} longDesc
 * @property {string|boolean} fee
 * @property {boolean} website
 * @property {Array<string>} exchanges
 * @property {boolean} key
 * @property {boolean} disable
 * @property {boolean} customerKey
 * @property {boolean} public
 * @property {boolean} hasRecommendedSettings
 * @property {string} logoUrl
 * @property {string} coin
 * @property {boolean} hasBeenUsed
 * @property {boolean} isClone
 * @property {boolean} isCopyTrading
 * @property {boolean} clonedFrom
 * @property {number} createdAt
 * @property {boolean} isFromUser
 * @property {boolean} quote
 * @property {Array<DailyReturn>} dailyReturns
 * @property {number} [risk]
 * @property {number} followers
 * @property {number} returns
 */

/**
 * @typedef {Array<ProviderEntity>} ProvidersCollection
 */

/**
 * Transform user create response to typed object.
 *
 * @export
 * @param {*} response Trade API user object.
 * @returns {UserCreateResponse} User entity.
 */
export function userCreateResponseTransform(response) {
  const transformResponse = {};
  transformResponse.token = response;

  return transformResponse;
}

/**
 * Transform user entity response to typed object.
 *
 * @export
 * @param {*} response Trade API user object.
 * @returns {UserLoginResponse} User entity.
 */
export function userEntityResponseTransform(response) {
  return {
    firstName: response.firstName,
    email: response.email,
    token: response.token,
    ask2FA: response.ask2FA,
    userId: response.userId,
    createdAt: response.createdAt,
    providerEnable: response.providerEnable,
    twoFAEnable: response.twoFAEnable,
    ref: response.ref,
    subscribe: response.subscribe,
    isAdmin: response.isAdmin,
    binanceConnected: response.binanceConnected,
    buysCount: response.buysCount,
    sellsCount: response.sellsCount,
    planId: response.planId,
    planName: response.planName,
    planType: response.planType,
    projectId: response.projectId,
    minimumProviderSettings: response.minimumProviderSettings,
    status: response.status,
    onboarding: response.onboarding,
    refCode: response.refCode,
  };
}

/**
 * Transform providers response to typed object.
 *
 * @export
 * @param {*} response Trade API signal providers list response.
 * @returns {ProvidersCollection} Signal providers entities collection.
 */
export function providersResponseTransform(response) {
  if (!isArray(response)) {
    throw new Error("Response must be an array of providers.");
  }

  return response.map((providerItem) => {
    return providerItemTransform(providerItem);
  });
}

/**
 * Transform API provider item to typed object.
 *
 * @param {Object} providerItem Trade API provider item.
 * @returns {ProviderEntity} Provider entity.
 */
function providerItemTransform(providerItem) {
  const emptyProviderEntity = createEmptyProviderEntity();
  // Override the empty entity with the values that came in from API.
  const transformedResponse = assign(emptyProviderEntity, providerItem);
  transformedResponse.returns = transformedResponse.dailyReturns.reduce((acc, item) => {
    // if (isCopyTrading) {
    const returns = typeof item.returns === "number" ? item.returns : parseFloat(item.returns);
    acc += returns;
    // } else {
    //   //   cumulativeTotalProfits += parseFloat(item.totalProfit);
    //   //   cumulativeTotalInvested += parseFloat(item.totalInvested);
    //   //   if (cumulativeTotalInvested) {
    //   //     acc = (cumulativeTotalProfits / cumulativeTotalInvested) * 100;
    //   //   }
    // }
    // chartData.push({
    //   day: item.name,
    //   returns: acc.toFixed(2),
    // });
    return acc;
  }, 0);

  return transformedResponse;
}

/**
 * Create empty provider entity skeletion.
 *
 * @returns {ProviderEntity} Enpty provider entity.
 */
function createEmptyProviderEntity() {
  return {
    id: "",
    name: "",
    description: "",
    shortDesc: "",
    longDesc: "",
    fee: false,
    website: false,
    exchanges: [],
    key: false,
    disable: true,
    customerKey: false,
    public: true,
    logoUrl: "",
    hasRecommendedSettings: false,
    hasBeenUsed: false,
    isClone: false,
    isCopyTrading: false,
    clonedFrom: false,
    createdAt: 0,
    isFromUser: false,
    quote: false,
    dailyReturns: [],
    returns: 0,
    risk: 0,
    coin: "BTC",
    followers: 0,
  };
}

/**
 * Transform user positions response to typed object collection.
 *
 * @param {*} response Trade API positions list response.
 * @returns {UserPositionsCollection} Positions entities collection.
 */
export function userPositionsResponseTransform(response) {
  if (!isArray(response)) {
    throw new Error("Response must be an array of positions.");
  }

  return response.map((positionItem) => {
    return userPositionItemTransform(positionItem);
  });
}

/**
 * Transform API position item to typed object.
 *
 * @param {Object.<string, any>} positionItem Trade API position item.
 * @returns {PositionEntity} Position entity.
 */
function userPositionItemTransform(positionItem) {
  const emptyPositionEntity = createEmptyPositionEntity();
  const openDateMoment = moment(Number(positionItem.openDate));
  const closeDateMoment = moment(Number(positionItem.closeDate));
  const composeProviderLink = () => {
    // Manual positions don't use a signal provider.
    if (positionItem.providerId === "1") {
      return "";
    }

    if (positionItem.isCopyTrading) {
      return `/copytraders/${positionItem.providerId}`;
    }

    return `/signalsproviders/${positionItem.providerId}`;
  };

  const calculateRisk = () => {
    const buyPrice = parseFloat(positionItem.buyPrice);
    let risk = ((positionItem.stopLossPrice - buyPrice) / buyPrice) * 100;

    if (isNaN(risk)) {
      return 0.0;
    }

    if (positionItem.type === "SHORT") {
      risk *= -1;
    }

    return risk;
  };

  const risk = calculateRisk();
  // Override the empty entity with the values that came in from API and augment
  // with pre-calculated fields.
  const transformedResponse = assign(emptyPositionEntity, positionItem, {
    age: openDateMoment.toNow(true),
    closeDate: Number(positionItem.closeDate),
    closeDateReadable: positionItem.closeDate ? closeDateMoment.format("hh.mm DD.MM.YY.") : "-",
    fees: parseFloat(positionItem.fees),
    netProfit: parseFloat(positionItem.netProfit),
    netProfitPercentage: parseFloat(positionItem.netProfitPercentage),
    openDate: Number(positionItem.openDate),
    openDateMoment: openDateMoment,
    openDateReadable: positionItem.openDate ? openDateMoment.format("hh.mm DD.MM.YY.") : "-",
    profitStyle: positionItem.profit >= 0 ? "gain" : "loss",
    providerLink: composeProviderLink(),
    providerLogo: positionItem.logoUrl || defaultProviderLogo,
    risk: risk,
    riskStyle: risk >= 0 ? "gain" : "loss",
    stopLossStyle: positionItem.stopLossPrice >= positionItem.buyPrice ? "gain" : "loss",
  });

  return transformedResponse;
}

/**
 * Create empty position entity skeleton.
 *
 * @returns {PositionEntity} Empty position entity.
 */
function createEmptyPositionEntity() {
  return {
    accounting: false,
    age: "",
    amount: "",
    base: "",
    buyPrice: "",
    buyTTL: 0,
    checkStop: false,
    closeDate: 0,
    closeDateReadable: "",
    closeTrigger: "",
    closed: false,
    copyTraderId: false,
    exchange: "",
    exchangeInternalName: "",
    fees: 0,
    internalExchangeId: "",
    invested: "",
    investedQuote: "",
    isCopyTrader: false,
    isCopyTrading: false,
    leverage: 0,
    logoUrl: "",
    netProfit: 0,
    netProfitPercentage: 0,
    openDate: 0,
    openDateReadable: "",
    openTrigger: "",
    pair: "",
    paperTrading: false,
    positionId: "",
    positionSize: "",
    positionSizeQuote: 0,
    profit: 0,
    profitPercentage: "",
    profitStyle: "",
    provider: "",
    providerId: "",
    providerLink: "",
    providerLogo: "",
    providerName: "",
    quote: "",
    quoteAsset: "",
    reBuyTargets: [],
    reBuyTargetsCountFail: 0,
    reBuyTargetsCountPending: 0,
    reBuyTargetsCountSuccess: 0,
    realInvestment: { $numberDecimal: "" },
    remainAmount: "",
    risk: 0,
    riskStyle: "",
    sellByTTL: false,
    sellPlaceOrderAt: "",
    sellPrice: "",
    side: "",
    signalId: "",
    signalMetadata: false,
    signalTerm: "",
    status: 0,
    statusDesc: "",
    stopLossPercentage: 0,
    stopLossPrice: 0,
    stopLossStyle: "",
    symbol: "",
    takeProfit: false,
    takeProfitTargetsCountFail: 0,
    takeProfitTargetsCountPending: 0,
    takeProfitTargetsCountSuccess: 0,
    trailingStopPercentage: 0,
    trailingStopPrice: false,
    trailingStopTriggerPercentage: 0,
    trailingStopTriggered: false,
    type: "",
    updating: false,
    userId: "",
  };
}

/**
 * Transform user exchange connection to typed ExchangeConnectionEntity.
 *
 * @param {*} response Trade API get exchanges raw response.
 * @returns {Array<ExchangeConnectionEntity>} User exchange connections collection.
 */
export function userExchangeConnectionResponseTransform(response) {
  if (!isArray(response)) {
    throw new Error("Response must be an array of positions.");
  }

  return response.map((exchangeConnectionItem) => {
    return userExchangeConnectionItemTransform(exchangeConnectionItem);
  });
}

/**
 * @typedef {Object} ExchangeConnectionEntity
 * @property {String} id
 * @property {String} Name
 * @property {String} exchangeId
 * @property {String} exchangeName
 * @property {String} internalId
 * @property {String} exchangeInternalName
 * @property {Boolean} key
 * @property {Boolean} secret
 * @property {Boolean} arrayKeysValid
 * @property {Boolean} paperTrading
 * @property {String} exchangeType
 * @property {Boolean} isTestnet
 * @property {Boolean} disable
 * @property {Number} positionSize
 * @property {Boolean} managed
 * @property {Boolean} internal
 * @property {Boolean} isBrokerAccount
 * @property {String} subAccountId
 * @property {String} binanceBrokerId
 * @property {Number} checkAuthCount
 */

/**
 * Transform API exchange connection item to typed object.
 *
 * @param {*} exchangeConnectionItem Trade API exchange connection item.
 * @returns {ExchangeConnectionEntity} Exchange connection entity.
 */
function userExchangeConnectionItemTransform(exchangeConnectionItem) {
  const emptyExchangeConnectionEntity = createExchangeConnectionEmptyEntity();
  const normalizedId = isObject(exchangeConnectionItem._id) ? exchangeConnectionItem._id.$oid : "";
  // Override the empty entity with the values that came in from API.
  const transformedResponse = assign(emptyExchangeConnectionEntity, exchangeConnectionItem, {
    id: normalizedId,
  });

  return transformedResponse;
}

function createExchangeConnectionEmptyEntity() {
  return {
    id: "",
    name: "",
    exchangeId: "",
    exchangeName: "",
    internalId: "",
    internalName: "",
    key: false,
    secret: false,
    areKeysValid: false,
    paperTrading: false,
    exchangeType: "",
    isTestnet: false,
    disable: false,
    positionSize: 0,
    managed: false,
    internal: false,
    isBrokerAccount: true,
    subAccountId: "",
    binanceBrokerId: "",
    checkAuthCount: false,
  };
}

/**
 * @typedef {import('../store/initialState').UserBalanceEntity} UserBalanceEntity
 */

/**
 * Transform API user balance response to typed object.
 *
 * @param {*} response Trade API exchange connection item.
 * @returns {UserBalanceEntity} User Balance entity.
 */

/**
 * Transform user balance response to typed UserBalanceEntity.
 *
 * @param {*} response Trade API get user balance raw response.
 * @returns {UserBalanceEntity} User balance entity.
 */
export function userBalanceResponseTransform(response) {
  if (!isObject(response)) {
    throw new Error("Response must be an object with different propteries.");
  }

  const transformedResponse = createUserBalanceEntity(response);
  return transformedResponse;
}

/**
 * Create user balance entity.
 *
 * @param {*} response Trade API user balance raw raw response.
 * @returns {UserBalanceEntity} User balance entity.
 */
function createUserBalanceEntity(response) {
  return {
    btcusdt: response.btcusdt,
    totalInvested: response.totalInvested,
    totalOpen: response.totalOpen,
    totalProfit: response.totalProfit,
    totalAssets: response.totalAssets,
    profitPercentage: response.profitPercentage,
  };
}
