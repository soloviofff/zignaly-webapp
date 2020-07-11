export const SHOW_LOADER = "SHOW_LOADER_ACTION";
export const SHOW_ERROR_ALERT = "SHOW_ERROR_ALERT";
export const HIDE_ERROR_ALERT = "HIDE_ERROR_ALERT";
export const SHOW_SUCCESS_ALERT = "SHOW_SUCCESS_ALERT";
export const HIDE_SUCCESS_ALERT = "HIDE_SUCCESS_ALERT";
export const ASK_2FA = "ASK_2FA";
export const CONNECTED_COPYT_TIMEFRAME = "CONNECTED_COPYT_TIMEFRAME_ACTION";
export const CONNECTED_SIGNALP_TIMEFRAME = "CONNECTED_SIGNALP_TIMEFRAME_ACTION";
export const COPYT_TIMEFRAME = "COPYT_TIMEFRAME_ACTION";
export const SIGNALP_TIMEFRAME = "SIGNALP_TIMEFRAME_ACTION";
export const SHOW_BALANCE_LOADER = "SHOW_BALANCE_LOADER_ACTION";

/**
 * @typedef {import('../../store/store').AppThunk} AppThunk
 * @typedef {import('redux').AnyAction} AnyAction
 */

/**
 * Flag to open user settings view.
 *
 * @param {Boolean} flag
 */

export const showLoader = (flag) => {
  return {
    type: SHOW_LOADER,
    payload: flag,
  };
};

/**
 * Action to show error alert.
 *
 * @param {*} error Error object from the backend
 * @returns {AnyAction} Action object.
 */
export const showErrorAlert = (error) => {
  return {
    type: SHOW_ERROR_ALERT,
    payload: {
      title: "error.occured",
      body: error && error.code ? `error.${error.code}` : "error.noidea",
    },
  };
};

/**
 * Action to hide error alert.
 *
 * @returns {AnyAction} Action object.
 */
export const hideErrorAlert = () => {
  return {
    type: HIDE_ERROR_ALERT,
  };
};

/**
 * Action to show success alert.
 *
 * @param {string} title Alert title.
 * @param {string} body Alert body.
 * @returns {AnyAction} Action object.
 */
export const showSuccessAlert = (title, body) => {
  return {
    type: SHOW_SUCCESS_ALERT,
    payload: {
      title,
      body,
    },
  };
};

/**
 * Action to hide success alert.
 *
 * @returns {AnyAction} Action object.
 */
export const hideSuccessAlert = () => {
  return {
    type: HIDE_SUCCESS_ALERT,
  };
};

/**
 * @param {boolean} payload Flag to indicate if we should ask for 2FA code.
 * @returns {AnyAction} return action object.
 */
export const ask2FA = (payload) => {
  return {
    type: ASK_2FA,
    payload,
  };
};

/**
 * @param {number} payload Timeframe for the connected ct page.
 * @returns {AnyAction} return action object.
 */
export const setConnectedCopytTimeframe = (payload) => {
  return {
    type: CONNECTED_COPYT_TIMEFRAME,
    payload,
  };
};

/**
 * @param {number} payload Timeframe for the connected sp page.
 * @returns {AnyAction} return action object.
 */
export const setConnectedSignalTimeframe = (payload) => {
  return {
    type: CONNECTED_SIGNALP_TIMEFRAME,
    payload,
  };
};

/**
 * @param {number} payload Timeframe for the ct page.
 * @returns {AnyAction} return action object.
 */
export const setCopytTimeframe = (payload) => {
  return {
    type: COPYT_TIMEFRAME,
    payload,
  };
};

/**
 * @param {number} payload Timeframe for the sp page.
 * @returns {AnyAction} return action object.
 */
export const setSignalpTimeframe = (payload) => {
  return {
    type: SIGNALP_TIMEFRAME,
    payload,
  };
};

/**
 * @param {boolean} payload Flag to indicate if topbar balance is being loaded.
 * @returns {AnyAction} return action object.
 */
export const showBalanceLoader = (payload) => {
  return {
    type: SHOW_BALANCE_LOADER,
    payload,
  };
};
