import { useState, useEffect } from "react";
import tradeApi from "../services/tradeApiClient";
import { useDispatch } from "react-redux";
import { showErrorAlert } from "../store/actions/ui";

/**
 * @typedef {import("../services/tradeApiClient.types").HasBeenUsedProviderEntity} HasBeenUsedProviderEntity
 * @typedef {Object} HookData
 * @property {Array<HasBeenUsedProviderEntity>} providers
 * @property {Boolean} providersLoading
 */

/**
 * Provides provider list.
 *
 * @param {string} internalId Internal Id of selected exchange.
 * @param {Array<'copyTrading'|'profitSharing'|'signalProvider'>} type Type of providers to filter.
 * @param {boolean} onlyConnected Flag to indicate whether connected or not
 * @param {boolean} [shouldExecute] Flag to indicate if we should execute the request.
 * @returns {HookData} Provider list.
 */
const useConnectedProvidersList = (internalId, type, onlyConnected, shouldExecute = true) => {
  const [providersLoading, setProvidersLoading] = useState(true);
  const [list, setList] = useState(null);
  const dispatch = useDispatch();

  const loadData = () => {
    if (shouldExecute) {
      setProvidersLoading(true);
      const payload = {
        ...(internalId && { internalExchangeId: internalId }),
      };

      tradeApi
        .providersListGet(payload)
        .then((response) => {
          filterProviders(response);
        })
        .catch((e) => {
          dispatch(showErrorAlert(e));
        })
        .finally(() => {
          setProvidersLoading(false);
        });
    }
  };

  /**
   * Filter providers that have been used for the selected exchange.
   * @param {Array<HasBeenUsedProviderEntity>} response Providers Collection.
   * @returns {Void} None.
   */
  const filterProviders = (response) => {
    let providerAssets = response.filter(
      (item) => (!onlyConnected || item.connected) && type.includes(item.type),
    );
    setList(providerAssets);
  };

  useEffect(loadData, [internalId, shouldExecute]);

  return { providers: list, providersLoading: providersLoading };
};

export default useConnectedProvidersList;
