import tradeApi from "../../services/tradeApiClient";

export const GET_USER_EXCHNAGES = "ADD_USER_EXCHNAGES_ACTION";
export const REMOVE_USER_EXCHNAGES = "REMOVE_USER_EXCHNAGES_ACTION";
export const GET_USER_BALANCE = "GET_USER_BALANCE_ACTION";
export const REMOVE_USER_BALANCE = "REMOVE_USER_BALANCE_ACTION";

/**
 * @typedef {import('../../services/tradeApiClient.types').ExchangeConnectionEntity} ExchangeConnectionEntity
 * @typedef {import('../../services/tradeApiClient.types').UserLoginResponse} UserLoginResponse
 * @typedef {import('../../store/store').AppThunk} AppThunk
 */

/**
 * Set user exchanges.
 *
 * @param {UserLoginResponse} data
 * @param {Function} hideLoading
 * @returns {AppThunk}
 */

export const setUserExchanges = (data, hideLoading) => {
  return async (dispatch) => {
    try {
      const sessionPayload = {
        token: data.token,
      };
      const responseData = await tradeApi.userExchangesGet(sessionPayload);
      hideLoading();
      dispatch({
        type: GET_USER_EXCHNAGES,
        payload: responseData,
      });
    } catch (e) {
      // TODO: Display error in alert.
      hideLoading();
    }
  };
};

export const unsetUserExchanges = () => {
  return {
    type: REMOVE_USER_EXCHNAGES,
  };
};

/**
 * Set user balance.
 *
 * @param {UserLoginResponse} data User login payload.
 * @returns {AppThunk} Thunk action function.
 */
export const setUserBalance = (data) => {
  return async (dispatch) => {
    try {
      const sessionPayload = {
        token: data.token,
      };
      const responseData = await tradeApi.userBalanceGet(sessionPayload);
      dispatch({
        type: GET_USER_BALANCE,
        payload: responseData,
      });
    } catch (e) {
      // TODO: Display error in alert.
    }
  };
};

export const unsetUserBalance = () => {
  return {
    type: REMOVE_USER_BALANCE,
  };
};
