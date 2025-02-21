import "whatwg-fetch";
import cache from "memory-cache";
import { createHash } from "crypto";
import { navigateLogin } from "./navigation";
import {
  userEntityResponseTransform,
  positionsResponseTransform,
  positionsShortResponseTransform,
  providersResponseTransform,
  userBalanceResponseTransform,
  positionItemTransform,
  userEquityResponseTransform,
  quotesResponseTransform,
  basesResponseTransform,
  connectedProviderUserInfoResponseTransform,
  providerGetResponseTransform,
  serverTimeResponseTransform,
  coinRayTokenResponseTransform,
  exchangeMarketDataResponseTransform,
  exchangeListResponseTransform,
  providerCopiersResponseTransform,
  ownedCopyTraderProvidersOptionsResponseTransform,
  providerFollowersListResponseTransform,
  exchangeAssetsResponseTransform,
  exchangeDepositAddressResponseTransform,
  providerPerformanceResponseTransform,
  exchangeDepositsResponseTransform,
  withdrawResponseTransform,
  exchangeWithdrawsResponseTransform,
  providerExchangeSettingsResponseTransform,
  providerDataPointsResponseTransform,
  convertAssetResponseTransform,
  managementPositionsResponseTransform,
  profileNotificationsResponseTransform,
  providerCreateResponseTransform,
  sessionDataResponseTransform,
  exchangeOpenOrdersResponseTransform,
  exchangeContractsResponseTransform,
  userAvailableBalanceResponseTransform,
  cloneProviderResponseTransform,
  profitStatsResponseTransform,
  profileProviderStatsResponseTransform,
  hasBeenUsedProvidersResponseTransform,
  profitSharingBalanceHistoryResponseTransform,
  providerBalanceResponseTransform,
  providerFollowersCountResponseTransform,
  managementBalanceAndPositionsResponseTransform,
  assetsAndBalanceResponseTransform,
} from "./tradeApiClient.types";

/**
 * @typedef {import('./tradeApiClient.types').AuthorizationPayload} AuthorizationPayload
 * @typedef {import('./tradeApiClient.types').UserBalancePayload} UserBalancePayload
 * @typedef {import('./tradeApiClient.types').ProviderContractsPayload} ProviderContractsPayload
 * @typedef {import('./tradeApiClient.types').PositionActionPayload} PositionActionPayload
 * @typedef {import('./tradeApiClient.types').PositionGetPayload} PositionGetPayload
 * @typedef {import('./tradeApiClient.types').PositionEntity} PositionEntity
 * @typedef {import('./tradeApiClient.types').PositionsListPayload} PositionsListPayload
 * @typedef {import('./tradeApiClient.types').ProvidersCollection} ProvidersCollection
 * @typedef {import('./tradeApiClient.types').HasBeenUsedProviderEntity} HasBeenUsedProviderEntity
 * @typedef {import('./tradeApiClient.types').ProvidersPayload} ProvidersPayload
 * @typedef {import('./tradeApiClient.types').NewAPIProvidersPayload} NewAPIProvidersPayload
 * @typedef {import('./tradeApiClient.types').ProvidersOwnedPayload} ProvidersOwnedPayload
 * @typedef {import('./tradeApiClient.types').ProvidersListPayload} ProvidersListPayload
 * @typedef {import('./tradeApiClient.types').ProvidersStatsCollection} ProvidersStatsCollection
 * @typedef {import('./tradeApiClient.types').ProvidersStatsPayload} ProvidersStatsPayload
 * @typedef {import('./tradeApiClient.types').UserLoginPayload} UserLoginPayload
 * @typedef {import('./tradeApiClient.types').UserRegisterPayload} UserRegisterPayload
 * @typedef {import('./tradeApiClient.types').UserEntity} UserEntity
 * @typedef {import('./tradeApiClient.types').UserPositionsCollection} UserPositionsCollection
 * @typedef {import('./tradeApiClient.types').GetProviderPayload} GetProviderPayload
 * @typedef {import('./tradeApiClient.types').GetProviderFollowersPayload} GetProviderFollowersPayload
 * @typedef {import('./tradeApiClient.types').ConnectTraderPayload} ConnectTraderPayload
 * @typedef {import('./tradeApiClient.types').ConnectProviderPayload} ConnectProviderPayload
 * @typedef {import('./tradeApiClient.types').DisableProviderPayload} DisableProviderPayload
 * @typedef {import('./tradeApiClient.types').DisconnectProviderPayload} DisconnectProviderPayload
 * @typedef {import('./tradeApiClient.types').CancelDisconnectProviderPayload} CancelDisconnectProviderPayload
 * @typedef {import('./tradeApiClient.types').DeleteProviderPayload} DeleteProviderPayload
 * @typedef {import('./tradeApiClient.types').EditProvderPayload} EditProvderPayload
 * @typedef {import('./tradeApiClient.types').BaseAssetsPayload} BaseAssetsPayload
 * @typedef {import('./tradeApiClient.types').ExchangeAssetsPayload} ExchangeAssetsPayload
 * @typedef {import('./tradeApiClient.types').ProviderAssetsPayload} ProviderAssetsPayload
 * @typedef {import('./tradeApiClient.types').ConnectedProviderUserInfoPayload} ConnectedProviderUserInfoPayload
 * @typedef {import('./tradeApiClient.types').ConnectedProviderUserInfo} ConnectedProviderUserInfo
 * @typedef {import('./tradeApiClient.types').CoinRayToken} CoinRayToken
 * @typedef {import('./tradeApiClient.types').MarketSymbolsCollection} MarketSymbolsCollection
 * @typedef {import('./tradeApiClient.types').CopyTradersProvidersOptionsPayload} CopyTradersProvidersOptionsPayload
 * @typedef {import('./tradeApiClient.types').CopyTradersProvidersOptionsCollection} CopyTradersProvidersOptionsCollection
 * @typedef {import('./tradeApiClient.types').ExchangeAddPayload} ExchangeAddPayload
 * @typedef {import('./tradeApiClient.types').ExchangeDeletePayload} ExchangeDeletePayload
 * @typedef {import('./tradeApiClient.types').ExchangeUpdatePayload} ExchangeUpdatePayload
 * @typedef {import('./tradeApiClient.types').ProviderExchangeSettingsPayload} ProviderExchangeSettingsPayload
 * @typedef {import('./tradeApiClient.types').ProviderExchangeSettingsUpdatePayload} ProviderExchangeSettingsUpdatePayload
 * @typedef {import('./tradeApiClient.types').DepositAddressGetPayload} DepositAddressGetPayload
 * @typedef {import('./tradeApiClient.types').ExchangeAssetsDict} ExchangeAssetsDict
 * @typedef {import('./tradeApiClient.types').CreatePositionPayload} CreatePositionPayload
 * @typedef {import('./tradeApiClient.types').UpdatePositionPayload} UpdatePositionPayload
 * @typedef {import('./tradeApiClient.types').TransactionEntity} TransactionEntity
 * @typedef {import('./tradeApiClient.types').GetTransactionsPayload} GetTransactionsPayload
 * @typedef {import('./tradeApiClient.types').WithdrawPayload} WithdrawPayload
 * @typedef {import('./tradeApiClient.types').ConvertPayload} ConvertPayload
 * @typedef {import('./tradeApiClient.types').WithdrawReply} WithdrawReply
 * @typedef {import('./tradeApiClient.types').ModifySubscriptionPayload} ModifySubscriptionPayload
 * @typedef {import('./tradeApiClient.types').CancelSubscriptionPayload} CancelSubscriptionPayload
 * @typedef {import('./tradeApiClient.types').UpdatePasswordPayload} UpdatePasswordPayload
 * @typedef {import('./tradeApiClient.types').TwoFAPayload} TwoFAPayload
 * @typedef {import('./tradeApiClient.types').ConvertReply} ConvertReply
 * @typedef {import('./tradeApiClient.types').ProfileNotifications} ProfileNotifications
 * @typedef {import('./tradeApiClient.types').ProfileNotificationsPayload} ProfileNotificationsPayload
 * @typedef {import('./tradeApiClient.types').ChangeEmailRequestPayload} ChangeEmailRequestPayload
 * @typedef {import('./tradeApiClient.types').ChangeEmailVisitPayload} ChangeEmailVisitPayload
 * @typedef {import('./tradeApiClient.types').ChangeEmailConfirmPayload} ChangeEmailConfirmPayload
 * @typedef {import('./tradeApiClient.types').ForgotPasswordStep1Payload} ForgotPasswordStep1Payload
 * @typedef {import('./tradeApiClient.types').ForgotPasswordStep3Payload} ForgotPasswordStep3Payload
 * @typedef {import('./tradeApiClient.types').ProviderCreatePayload} ProviderCreatePayload
 * @typedef {import('./tradeApiClient.types').CopyTraderCreatePayload} CopyTraderCreatePayload
 * @typedef {import('./tradeApiClient.types').EditClonedProvderPayload} EditClonedProvderPayload
 * @typedef {import('./tradeApiClient.types').UserExchangeAssetsPayload} UserExchangeAssetsPayload
 * @typedef {import('./tradeApiClient.types').NewProviderEntity} NewProviderEntity
 * @typedef {import('./tradeApiClient.types').CloneActionResponseObject} CloneActionResponseObject
 * @typedef {import('./tradeApiClient.types').SessionResponseObject} SessionResponseObject
 * @typedef {import('./tradeApiClient.types').ExchangeOpenOrdersObject} ExchangeOpenOrdersObject
 * @typedef {import('./tradeApiClient.types').ProviderDataPointsEntity} ProviderDataPointsEntity
 * @typedef {import('./tradeApiClient.types').ProviderBalanceEntity} ProviderBalanceEntity
 * @typedef {import('./tradeApiClient.types').ProviderFollowersCountEntity} ProviderFollowersCountEntity
 * @typedef {import('./tradeApiClient.types').ProviderExchangeSettingsObject} ProviderExchangeSettingsObject
 * @typedef {import('./tradeApiClient.types').CancelOrderPayload} CancelOrderPayload
 * @typedef {import('./tradeApiClient.types').CancelContractPayload} CancelContractPayload
 * @typedef {import('./tradeApiClient.types').ProviderPerformanceEntity} ProviderPerformanceEntity
 * @typedef {import('./tradeApiClient.types').ProviderFollowersEntity} ProviderFollowersEntity
 * @typedef {import('./tradeApiClient.types').ProviderCopiersEntity} ProviderCopiersEntity
 * @typedef {import('./tradeApiClient.types').ExchangeListEntity} ExchangeListEntity
 * @typedef {import('./tradeApiClient.types').DefaultProviderGetObject} DefaultProviderGetObject
 * @typedef {import('./tradeApiClient.types').DefaultDailyBalanceEntity} DefaultDailyBalanceEntity
 * @typedef {import('./tradeApiClient.types').UserBalanceEntity} UserBalanceEntity
 * @typedef {import('./tradeApiClient.types').ExchangeConnectionEntity} ExchangeConnectionEntity
 * @typedef {import('./tradeApiClient.types').ManagementPositionsEntity} ManagementPositionsEntity
 * @typedef {import('./tradeApiClient.types').ManagementBalanceAndPositionsEntity} ManagementBalanceAndPositionsEntity
 * @typedef {import('./tradeApiClient.types').UserAvailableBalanceObject} UserAvailableBalanceObject
 * @typedef {import('./tradeApiClient.types').ExchangeContractsObject} ExchangeContractsObject
 * @typedef {import('./tradeApiClient.types').ExchangeDepositAddress} ExchangeDepositAddress
 * @typedef {import('./tradeApiClient.types').ProfitStatsPayload} ProfitStatsPayload
 * @typedef {import('./tradeApiClient.types').ProfileProviderStatsPayload} ProfileProviderStatsPayload
 * @typedef {import('./tradeApiClient.types').ProfitStatsObject} ProfitStatsObject
 * @typedef {import('./tradeApiClient.types').ProfileProviderStatsObject} ProfileProviderStatsObject
 * @typedef {import('./tradeApiClient.types').UserPayload} UserPayload
 * @typedef {import('./tradeApiClient.types').GetPostsPayload} GetPostsPayload
 * @typedef {import('./tradeApiClient.types').Post} Post
 * @typedef {import('./tradeApiClient.types').CreatePostPayload} CreatePostPayload
 * @typedef {import('./tradeApiClient.types').AddReplyPayload} AddReplyPayload
 * @typedef {import('./tradeApiClient.types').GetProfitSharingBalanceHistoryPayload} GetProfitSharingBalanceHistoryPayload
 * @typedef {import('./tradeApiClient.types').ProfitSharingBalanceHistory} ProfitSharingBalanceHistory
 * @typedef {import('./tradeApiClient.types').AdjustMarginPayload} AdjustMarginPayload
 * @typedef {import('./tradeApiClient.types').Disable2FAConfirmPayload} Disable2FAConfirmPayload
 * @typedef {import('./tradeApiClient.types').InternalTransferPayload} InternalTransferPayload
 * @typedef {import('./tradeApiClient.types').AssetsAndBalanceObject} AssetsAndBalanceObject
 *
 */

/**
 * Trade API client service, provides integration to API endpoints.
 *
 * @constructor
 * @public
 * @class TradeApiClient
 */
class TradeApiClient {
  /**
   * Creates an instance of TradeApiClient.
   * @memberof TradeApiClient
   */
  constructor() {
    this.baseUrlv1 = process.env.GATSBY_TRADEAPI_URL;
    this.baseUrlv2 = process.env.GATSBY_TRADEAPI_URL_NEW;

    /**
     * @type {Object<string, number>} Tracks request average latency.
     */
    this.requestAverageLatency = {};

    /**
     * @type {Object<string, boolean>} Tracks request lock.
     */
    this.requestLock = {};
  }

  /**
   * Set authentication token
   * @param {string} [token] Token
   * @returns {void}
   */
  setToken(token) {
    this.token = token;
  }

  /**
   * Generate a request unique cache ID.
   *
   * The ID will be unique for the requested endpoint with same payload
   * parameters so endpoints like getClosedPositions which resolve close/log
   * with different average latency could be differentiated.
   *
   * @param {string} endpointPath Endpoint path of the request.
   * @param {string} payload Request payload JSON stringified or empty string.
   * @returns {string} Request cache ID.
   *
   * @memberof TradeApiClient
   */
  generateRequestCacheId(endpointPath, payload) {
    const payloadHash = createHash("md5").update(payload).digest("hex");
    const cacheId = `${endpointPath}-${payloadHash}`;

    return cacheId;
  }

  /**
   * Get a request lock.
   *
   * When lock is active will prevent that the same (endpoint and payload)
   * request is performed concurrently so when latency is higuer than interval
   * we prevent that piled up request process concurrently.
   *
   * @param {string} cacheId Request cache ID (endpoint-payload md5 hash) to get lock for.
   * @returns {boolean} True when lock was acquired, false when existing lock is in place.
   *
   * @memberof TradeApiClient
   */
  getRequestLock(cacheId) {
    if (this.requestLock[cacheId]) {
      return false;
    }

    this.requestLock[cacheId] = true;

    // Timeout to automatically release the lock.
    // setTimeout(() => {
    //   this.releaseRequestLock(cacheId);
    // }, timeout);

    return true;
  }

  /**
   * Release request lock.
   *
   * @param {string} cacheId Request cache ID (endpoint-payload md5 hash) to get lock for.
   * @returns {Void} None.
   *
   * @memberof TradeApiClient
   */
  releaseRequestLock(cacheId) {
    if (this.requestLock[cacheId]) {
      delete this.requestLock[cacheId];
    }
  }

  /**
   * Store endpoint average latency.
   *
   * @param {string} cacheId Request cache ID (endpoint-payload md5 hash) to store latency for.
   * @param {number} latencyMillisec Latest request latency expressed in milliseconds.
   * @returns {void} None.
   *
   * @memberof TradeApiClient
   */
  setRequestAverageLatency(cacheId, latencyMillisec) {
    // Calculate average when there are previous observations.
    if (this.requestAverageLatency[cacheId]) {
      // Tolerance to account for other delays like response decode / error handling.
      const tolerance = 500;
      const currentAverage = this.requestAverageLatency[cacheId];
      const newAverage = (currentAverage + latencyMillisec) / 2;
      this.requestAverageLatency[cacheId] = newAverage + tolerance;

      return;
    }

    // Is the first observation.
    this.requestAverageLatency[cacheId] = latencyMillisec;
  }

  /**
   * Get similar request historical average latency.
   *
   * @param {string} cacheId Request cache ID (endpoint-payload md5 hash) to store latency for.
   * @returns {number} Average latency time in milliseconds.
   *
   * @memberof TradeApiClient
   */
  getRequestAverageLatency(cacheId) {
    // Default to 5 seconds when no previous average exists so when initial
    // request don't respond, and we don't have average time, we ensure to have
    // a minimum limit to avoid stampede requests.
    return this.requestAverageLatency[cacheId] || 5000;
  }

  /**
   * Throw too many requests exception.
   *
   * This error throws when duplicated requests to same endpoint and parameters
   * are accumulated due to increased latency of backend.
   *
   * @returns {any} Error object.
   *
   * @memberof TradeApiClient
   */
  tooManyRequestsError() {
    return {
      error: "Too many requests.",
      code: "apilatency",
    };
  }

  /**
   * Resolve response from cache and fail when data not found within timeout.
   *
   * @param {string} cacheId Request cache ID (endpoint-payload md5 hash) to store latency for.
   *
   * @returns {Promise<any>} Request cached response.
   */
  async resolveFromCache(cacheId) {
    // const timeout = 10000;
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const responseData = cache.get(cacheId);
        if (responseData) {
          // console.log(`Request ${cacheId} resolved from cache:`, responseData);
          resolve(responseData);
          clearInterval(checkInterval);
        }
      }, 100);

      // Timeout exceeded, this means higher than expected latency in backend.
      //   setTimeout(() => {
      //     clearInterval(checkInterval);
      //     reject(this.tooManyRequestsError());
      //   }, timeout);
    });
  }

  /**
   * Process API HTTP request.
   *
   * @param {string} endpointPath API endpoint path and action.
   * @param {*} [payload] Request payload parameters object.
   * @param {string} [method] Request HTTP method, currently used only for cache purposes.
   * @param {number} [apiVersion] API to call (0=CF, 1=old, 2=new)
   * @param {string} [token] Optional authentication token.
   * @returns {Promise<*>} Promise that resolves Trade API request response.
   *
   * @memberof TradeApiClient
   */
  async doRequest(endpointPath, payload, method = "POST", apiVersion = 1, token) {
    let baseUrl = this.baseUrlv2;
    if (apiVersion === 1) {
      // Old api
      baseUrl = this.baseUrlv1;
    } else if (apiVersion === 0) {
      // Cloudflare url
      baseUrl = baseUrl.split("/new_api")[0];
    }

    let requestUrl = baseUrl + endpointPath;
    let responseData = {};

    const authToken = this.token || token;

    /**
     * @type {*}
     */
    let options = {
      method: method,
      body: null,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.GATSBY_API_KEY || "",
        ...(authToken && { Authorization: "Bearer " + authToken }),
      },
    };

    if (method === "GET") {
      if (payload) {
        requestUrl += `?${new URLSearchParams(payload)}`;
      }
    } else {
      options.body = JSON.stringify(payload);
    }

    const cacheId = this.generateRequestCacheId(requestUrl, options.body || "");
    if (method === "GET") {
      let cacheResponseData = cache.get(cacheId);
      if (cacheResponseData) {
        return cacheResponseData;
      }

      // When duplicated request is running try during interval to resolve the
      // response from the other process cache.
      if (!this.getRequestLock(cacheId)) {
        cacheResponseData = await this.resolveFromCache(cacheId);
        if (cacheResponseData) {
          return cacheResponseData;
        }
      }
    }

    try {
      const startTime = Date.now();
      const response = await fetch(requestUrl, options);
      const elapsedTime = Date.now() - startTime;
      this.setRequestAverageLatency(cacheId, elapsedTime);

      const parsedJson = await response.json();
      if (response.status === 200 || response.status === 201) {
        responseData = parsedJson;
      } else {
        responseData.error = parsedJson;
      }

      // Currently method is not taking the real effect on the HTTP method we
      // use, and it's unique effect for now is to control when a endpoint
      // request should be cached or not. We need to do some refactorings in the
      // backend to properly manage the method usage.
      if (method === "GET") {
        const cacheTTL = this.getRequestAverageLatency(cacheId);
        cache.put(cacheId, responseData, cacheTTL);
        this.releaseRequestLock(cacheId);
        // console.log(`Request ${cacheId} performed - TTL ${cacheTTL}:`, responseData);
      }
    } catch (e) {
      responseData.error = e.message;
    }

    if (responseData.error) {
      const customError = responseData.error.error || responseData.error;
      if (customError.code === 13) {
        // Session expired
        navigateLogin();
      }

      throw customError;
    }

    return responseData;
  }

  /**
   * Login a user in Trade API.
   *
   * @param {UserLoginPayload} payload User login payload
   *
   * @returns {Promise<UserEntity>} Promise that resolves user entity.
   *
   * @memberof TradeApiClient
   */
  async userLogin(payload) {
    const responseData = await this.doRequest("/login", payload, "POST", 2);
    return userEntityResponseTransform(responseData);
  }

  /**
   * Register a user in Trade API.
   *
   * @param {UserRegisterPayload} payload User register payload.
   *
   * @returns {Promise<UserEntity>} Promise that resolves user entity.
   *
   * @memberof TradeApiClient
   */
  async userRegister(payload) {
    const responseData = await this.doRequest("/signup", payload, "POST", 2);

    return userEntityResponseTransform(responseData);
  }

  /**
   * Get user open trading positions.
   *
   * @param {PositionsListPayload} payload User authorization payload.
   * @returns {Promise<UserPositionsCollection>} Promise that resolve user positions collection.
   *
   * @memberof TradeApiClient
   */
  async openPositionsGet(payload) {
    const endpointPath = "/fe/api.php?action=getOpenPositions";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });

    return positionsResponseTransform(responseData);
  }

  /**
   * Get user closed trading positions.
   *
   * @param {PositionsListPayload} payload User authorization payload.
   * @returns {Promise<UserPositionsCollection>} Promise that resolve user positions collection.
   *
   * @memberof TradeApiClient
   */
  async closedPositionsGet(payload) {
    const responseData = await this.doRequest(
      "/get-sold-positions/",
      {
        type: "sold",
        ...payload,
      },
      "POST",
      0,
    );

    return positionsShortResponseTransform(responseData);
  }

  /**
   * Get user unsold / unopened trading positions.
   *
   * @param {PositionsListPayload} payload User authorization payload.
   * @returns {Promise<UserPositionsCollection>} Promise that resolve user positions collection.
   *
   * @memberof TradeApiClient
   */
  async logPositionsGet(payload) {
    const endpointPath = "/fe/api.php?action=getClosedPositions";
    const responseData = await this.doRequest(endpointPath, {
      type: "log",
      ...payload,
    });

    return positionsResponseTransform(responseData);
  }

  /**
   * Get providers list.
   *
   * @param {ProvidersPayload} payload Get providers payload.
   * @returns {Promise<ProvidersCollection>} Promise that resolves providers collection.
   *
   * @memberof TradeApiClient
   */
  async providersGet(payload) {
    const responseData = await this.doRequest(
      "/user/providers",
      {
        ...payload,
        version:
          payload.provType.includes("copytraders") || payload.provType.includes("profitsharing")
            ? 3
            : 2,
      },
      "GET",
      2,
    );

    return providersResponseTransform(responseData);
  }

  /**
   * Get providers list.
   *
   * @param {NewAPIProvidersPayload} payload Get providers payload.
   * @returns {Promise<ProvidersCollection>} Promise that resolves providers collection.
   *
   * @memberof TradeApiClient
   */
  async providersGetNew(payload) {
    const endpointPath = `/providers/${payload.type}/${payload.timeFrame}`;
    const type = payload.type;
    delete payload.type;
    delete payload.timeFrame;
    const responseData = await this.doRequest(endpointPath, payload, "GET", 2);

    return providersResponseTransform(responseData, type);
  }

  /**
   * Get providers services owned by user.
   *
   * @param {ProvidersOwnedPayload} payload Get providers list payload.
   * @returns {Promise<ProvidersCollection>} Promise that resolves providers collection.
   *
   * @memberof TradeApiClient
   */
  async providersOwnedGet(payload) {
    const type = payload.type;
    const endpointPath = "/providers/user_services/" + payload.timeFrame;
    const responseData = await this.doRequest(endpointPath, payload, "GET", 2);
    return providersResponseTransform(responseData, type);
  }

  /**
   * Get providers list.
   *
   * @param {ProvidersListPayload} payload Get providers list payload.
   * @returns {Promise<Array<HasBeenUsedProviderEntity>>} Promise that resolves providers collection.
   *
   * @memberof TradeApiClient
   */
  async providersListGet(payload) {
    const endpointPath = "/user/providers";
    const responseData = await this.doRequest(endpointPath, payload, "GET", 2);

    return hasBeenUsedProvidersResponseTransform(responseData);
  }

  /**
   * Get user's quick balance summary.
   *
   * @param {UserBalancePayload} payload Get user balance summary payload.
   * @returns {Promise<UserBalanceEntity>} Promise that resolves user balance entity.
   * @memberof TradeApiClient
   */

  async userBalanceGet(payload) {
    const { exchangeInternalId, ...data } = payload;

    const responseData = await this.doRequest(
      `/user/exchanges/${exchangeInternalId}/balance`,
      data,
      "GET",
      2,
    );

    return userBalanceResponseTransform(responseData);
  }

  /**
   * Get user's daily balance for an exchange.
   *
   * @param {string} exchangeInternalId exchangeInternalId
   * @returns {Promise<DefaultDailyBalanceEntity>} Promise that resolves user's daily balance list.
   * @memberof TradeApiClient
   */

  async userEquityGet(exchangeInternalId) {
    const responseData = await this.doRequest(
      `/user/exchanges/${exchangeInternalId}/historical_balance`,
      null,
      "GET",
      2,
    );

    return userEquityResponseTransform(responseData);
  }

  /**
   * Close a position.
   *
   * This action will detach the position monitoring from Zignaly but will continue open in the exchange.
   *
   * @param {PositionActionPayload} payload Position action payload.
   * @returns {Promise<PositionEntity>} Promise that resolve user affected position entity.
   *
   * @memberof TradeApiClient
   */
  async positionClose(payload) {
    const endpointPath = "/fe/api.php?action=closePosition";
    const responseData = await this.doRequest(endpointPath, payload);

    return positionItemTransform(responseData);
  }

  /**
   * Exit a position.
   *
   * Performs an exit order of current position in the exchange.
   *
   * @param {PositionActionPayload} payload Position action payload.
   *
   * @returns {Promise<PositionEntity>} Promise that resolve the affected position entity.
   *
   * @memberof TradeApiClient
   */
  async positionExit(payload) {
    const endpointPath = "/fe/api.php?action=sellPosition";
    const responseData = await this.doRequest(endpointPath, payload);

    return positionItemTransform(responseData);
  }

  /**
   * Cancel position entry.
   *
   * Performs a cancellation of position entry if order has not been executed yet in the exchange.
   *
   * @param {PositionActionPayload} payload Position action payload.
   *
   * @returns {Promise<PositionEntity>} Promise that resolve the affected position entity.
   *
   * @memberof TradeApiClient
   */
  async positionCancel(payload) {
    const endpointPath = "/fe/api.php?action=cancelBuy";
    const responseData = await this.doRequest(endpointPath, payload);

    return positionItemTransform(responseData);
  }

  /**
   * Get a position.
   *
   * @param {PositionGetPayload} payload Position action payload.
   *
   * @returns {Promise<PositionEntity>} Promise that resolve user affected position entity.
   *
   * @memberof TradeApiClient
   */
  async positionGet(payload) {
    const endpointPath = "/fe/api.php?action=getPosition";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });

    return positionItemTransform(responseData);
  }

  /**
   * Get a raw position (for debug).
   *
   * @param {PositionActionPayload} payload Position action payload.
   * @returns {Promise<*>} Promise that resolve raw position entity.
   *
   * @memberof TradeApiClient
   */
  async positionRawGet(payload) {
    const endpointPath = "/fe/api.php?action=getRawPosition";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });
    return responseData;
  }

  /**
   * @typedef {import('./tradeApiClient.types').QuotesAssetsGetPayload} QuotesAssetsGetPayload
   * @typedef {import('./tradeApiClient.types').QuoteAssetsDict} QuoteAssetsDict
   * @typedef {import('./tradeApiClient.types').BaseAssetsDict} BaseAssetsDict
   */

  /**
   *
   * Get quote assets.
   *
   * @param {QuotesAssetsGetPayload} payload Payload.
   * @returns {Promise<QuoteAssetsDict>} Promise that resolves quote assets.
   * @memberof TradeApiClient
   */
  async quotesAssetsGet(payload) {
    const endpointPath = "/fe/api.php?action=getQuoteAssets";
    const responseData = await this.doRequest(endpointPath, payload);

    return quotesResponseTransform(responseData);
  }

  /**
   * Get provider's data.
   *
   * @param {GetProviderPayload} payload Get provider's data payload.

   * @returns {Promise<DefaultProviderGetObject>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerGet(payload) {
    const endpointPath = "/fe/api.php?action=getProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerGetResponseTransform(responseData);
  }

  /**
   * @typedef {import('./tradeApiClient.types').ServerTime} ServerTime
   */

  /**
   * Get Trade API server time.
   *
   * This endpoint is useful when client local time needs to be compared with
   * Trade API server time. Note that server time uses UTC.
   *
   * @param {AuthorizationPayload} payload User authorization.
   * @returns {Promise<ServerTime>} Promise that resolves server time value object.
   *
   * @memberof TradeApiClient
   */
  async serverTimeGet(payload) {
    const endpointPath = "/fe/ohlc.php?action=fetchTime";
    const responseData = await this.doRequest(endpointPath, payload);

    return serverTimeResponseTransform(responseData);
  }

  /**
   * Get a coinray access token for the authenticated user.
   *
   * @param {AuthorizationPayload} payload User Trade API authorization.
   * @returns {Promise<CoinRayToken>} Promise that resolves CoinRay token object.
   *
   * @memberof TradeApiClient
   */
  async coinRayTokenGet(payload) {
    const endpointPath = "/fe/api.php?action=getCoinRayToken";
    const responseData = await this.doRequest(endpointPath, payload);

    return coinRayTokenResponseTransform(responseData);
  }

  /**
   * Get user exchange connection market data coins pairs (symbols).
   *
   * @param {{exchangeInternalId: string}} payload Payload.
   * @returns {Promise<MarketSymbolsCollection>} Promise that resolves exchange market symbols data collection.
   *
   * @memberof TradeApiClient
   */
  async exchangeConnectionMarketDataGet(payload) {
    const responseData = await this.doRequest("/symbols", payload, "GET", 2);

    return exchangeMarketDataResponseTransform(responseData);
  }

  /**
   * Get base assets.
   *
   * @param {BaseAssetsPayload} payload Get Base Assets Payload.
   * @returns {Promise<BaseAssetsDict>} Promise that resolves base assets.
   * @memberof TradeApiClient
   */
  async baseAssetsGet(payload) {
    const responseData = await this.doRequest("/base_assets", payload, "GET", 2);
    return basesResponseTransform(responseData);
  }

  /**
   * Get exchange assets.
   *
   * @param {ExchangeAssetsPayload} payload Get Exchange Assets Payload.
   * @returns {Promise<ExchangeAssetsDict>} Promise that resolves exchange assets.
   * @memberof TradeApiClient
   */
  async exchangeAssetsGet(payload) {
    const { internalId } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${internalId}/assets`,
      null,
      "GET",
      2,
    );

    return exchangeAssetsResponseTransform(responseData);
  }

  /**
   * Get provider exchange assets.
   *
   * @param {ProviderAssetsPayload} payload Get Provider Exchange Assets Payload.
   * @returns {Promise<ExchangeAssetsDict>} Promise that resolves exchange assets.
   * @memberof TradeApiClient
   */
  async providerAssetsGet(payload) {
    const { exchangeInternalId, providerId } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${exchangeInternalId}/providers/${providerId}/assets`,
      null,
      "GET",
      2,
    );

    return exchangeAssetsResponseTransform(responseData);
  }

  /**
   *
   * Get connected provider user info.
   *
   * @param {ConnectedProviderUserInfoPayload} payload Provider User Info Payload.
   * @returns {Promise<ConnectedProviderUserInfo>} Promise that resolves connected trader user info.
   * @memberof TradeApiClient
   */
  async connectedProviderUserInfoGet(payload) {
    const endpointPath = "/fe/api.php?action=getCurrentAllocatedAndProfitSinceFollowing";
    const responseData = await this.doRequest(endpointPath, payload);

    return connectedProviderUserInfoResponseTransform(responseData);
  }

  /**
   * Connect to a copy trader service.
   *
   * @param {ConnectTraderPayload} payload Connect trader payload.

   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async traderConnect(payload) {
    const endpointPath = "/fe/api.php?action=connectService";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Connect to a signal provider service.
   *
   * @param {ConnectProviderPayload} payload Connect provider payload.

   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerConnect(payload) {
    const endpointPath = "/fe/api.php?action=connectService";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Stop following a provider or copytrader.
   *
   * @param {DisableProviderPayload} payload Stop following provider payload.

   * @returns {Promise<boolean>} Promise that resolves into success status.
   *
   * @memberof TradeApiClient
   */
  async providerDisable(payload) {
    const endpointPath = "/fe/api.php?action=toggleProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Stop following a provider or copytrader.
   *
   * @param {DisconnectProviderPayload} payload Stop following provider payload.

   * @returns {Promise<boolean>} Promise that resolves into success status.
   *
   * @memberof TradeApiClient
   */

  async providerDisconnect(payload) {
    const endpointPath = "/fe/api.php?action=disconnectProfitSharingService";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Cancel disconnection for a profit sharing service.
   *
   * @param {CancelDisconnectProviderPayload} payload Cancel disconnect provider payload.

   * @returns {Promise<boolean>} Promise that resolves into success status.
   *
   * @memberof TradeApiClient
   */

  async providerCancelDisconnect(payload) {
    const endpointPath = "/fe/api.php?action=cancelDisconnecting";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Delete a cloned provider or copy trader.
   *
   * @param {DeleteProviderPayload} payload Delete provider payload.

   * @returns {Promise<Array<*>>} Promise that resolves into array of provider entities.
   *
   * @memberof TradeApiClient
   */
  async providerDelete(payload) {
    const endpointPath = "/fe/api.php?action=deleteProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Get exchanges supported by zignaly.
   *
   * @returns {Promise<Array<ExchangeListEntity>>} Promise that resolved into array of exchange list entity.
   *
   * @memberof TradeApiClient
   */
  async exchangeListGet() {
    const responseData = await this.doRequest("/exchanges", null, "GET", 2);

    return exchangeListResponseTransform(responseData);
  }

  /**
   * Get copy trader providers options owned by the authenticated user.
   *
   * @param {CopyTradersProvidersOptionsPayload} payload Get own copy trader providers options payload.
   * @returns {Promise<CopyTradersProvidersOptionsCollection>} Promise that resolves own copy trader providers options.
   * @memberof TradeApiClient
   */
  async ownedCopyTradersProvidersOptions(payload) {
    const { internalExchangeId } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${internalExchangeId}/providers_options`,
      null,
      "GET",
      2,
    );

    return ownedCopyTraderProvidersOptionsResponseTransform(responseData);
  }

  /**
   * Connect to a new exchange.
   *
   * @param {ExchangeAddPayload} payload Payload
   * @returns {Promise<boolean>} Result
   * @memberof TradeApiClient
   */
  async exchangeAdd(payload) {
    const responseData = await this.doRequest("/user/exchanges", payload, "POST", 2);
    return responseData;
  }

  /**
   * Delete an exchange.
   *
   * @param {string} exchangeInternalId exchangeInternalId
   * @returns {Promise<boolean>} Result
   * @memberof TradeApiClient
   */
  async exchangeDelete(exchangeInternalId) {
    const responseData = await this.doRequest(
      `/user/exchanges/${exchangeInternalId}`,
      null,
      "DELETE",
      2,
    );
    return responseData;
  }

  /**
   * Update exchange account settings.
   *
   * @param {ExchangeUpdatePayload} payload Payload
   * @returns {Promise<boolean>} Result
   * @memberof TradeApiClient
   */
  async exchangeUpdate(payload) {
    const endpointPath = "/fe/api.php?action=updateNewExchange";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Edit Provider method.
   *
   * @param {EditProvderPayload} payload Edit provider payload.
   *
   * @returns {Promise<DefaultProviderGetObject>} Returns promise that resolved into default provider get object.
   *
   * @memberof TradeApiClient
   */
  async providerEdit(payload) {
    const endpointPath = "/fe/api.php?action=editProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerGetResponseTransform(responseData);
  }

  /**
   * Edti cloned provider.
   *
   * @param {EditClonedProvderPayload} payload Edit cloned provider payload.
   *
   * @returns {Promise<DefaultProviderGetObject>} Returns promise that resolves default provider get object..
   *
   * @memberof TradeApiClient
   */
  async clonedProviderEdit(payload) {
    const endpointPath = "/fe/api.php?action=editProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerGetResponseTransform(responseData);
  }

  /**
   * Get providers copiers data.
   *
   * @param {GetProviderFollowersPayload} payload Get providers copiers payload.
   *
   * @returns {Promise<Array<ProviderCopiersEntity>>} Returns promise that resolves provider copiers entity.
   *
   * @memberof TradeApiClient
   */
  async providerCopiersGet(payload) {
    const { providerId } = payload;
    const responseData = await this.doRequest(
      `/providers/${providerId}/followers_chart`,
      null,
      "GET",
      2,
    );

    return providerCopiersResponseTransform(responseData);
  }

  /**
   * Get providers followers data.
   *
   * @param {GetProviderFollowersPayload} payload Get providers followers payload.
   *
   * @returns {Promise<Array<ProviderFollowersEntity>>} Returns promise that resolves provider followers entity.
   *
   * @memberof TradeApiClient
   */
  async providerFollowersListGet(payload) {
    const { providerId } = payload;
    const responseData = await this.doRequest(`/providers/${providerId}/followers`, null, "GET", 2);

    return providerFollowersListResponseTransform(responseData);
  }

  /**
   * Get deposit address for coin.
   *
   * @param {DepositAddressGetPayload} payload Get deposit address payload

   * @returns {Promise<ExchangeDepositAddress>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async exchangeDepositAddressGet(payload) {
    const { internalId, asset, ...data } = payload;

    const responseData = await this.doRequest(
      `/user/exchanges/${internalId}/deposit_address/${asset}`,
      data,
      "GET",
      2,
    );

    return exchangeDepositAddressResponseTransform(responseData);
  }

  /**
   * Create manual position order.
   *
   * This supports market order, limit, stop-limit order and import order from exchange.
   *
   * @param {CreatePositionPayload} payload Create manual position payload.

   * @returns {Promise<string>} Promise that resolve Zignaly position ID.
   *
   * @memberof TradeApiClient
   */
  async manualPositionCreate(payload) {
    const endpointPath = "/fe/api.php?action=createManualPosition";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });

    return responseData;
  }

  /**
   * Update manual position.
   *
   * @param {UpdatePositionPayload} payload Update manual position payload.

   * @returns {Promise<string>} Promise that resolve updated position ID.
   *
   * @memberof TradeApiClient
   */
  async manualPositionUpdate(payload) {
    const endpointPath = "/fe/api.php?action=updatePosition";
    const responseData = await this.doRequest(endpointPath, { ...payload, version: 2 });

    return responseData;
  }

  /**
   * Get providers yearly performance stats.
   *
   * @param {GetProviderFollowersPayload} payload Get providers stats payload.
   * @returns {Promise<ProviderPerformanceEntity>} Returns promise that resolves provider performance entity.
   *
   * @memberof TradeApiClient
   */
  async providerPerformanceGet(payload) {
    const endpointPath = "/fe/api.php?action=getProviderPerformance";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerPerformanceResponseTransform(responseData);
  }

  /**
   * Get user profile data.
   *

   * @returns {Promise<UserEntity>} Returns promise that resolves user entity.
   *
   * @memberof TradeApiClient
   */
  async userDataGet() {
    const responseData = await this.doRequest("/user", null, "GET", 2);

    return userEntityResponseTransform(responseData);
  }

  /**
   * Get provider exchange settings.
   *
   * @param {ProviderExchangeSettingsPayload} payload Get providers exchange settings payload.

   * @returns {Promise<ProviderExchangeSettingsObject>} Returns promise that resolves provider settings object.
   *
   * @memberof TradeApiClient
   */
  async providerExchangeSettingsGet(payload) {
    const { internalExchangeId, providerId } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${internalExchangeId}/providers/${providerId}`,
      null,
      "GET",
      2,
    );

    return providerExchangeSettingsResponseTransform(responseData);
  }

  /**
   * Update provider settings.
   *
   * @param {ProviderExchangeSettingsUpdatePayload} payload Provider settings update payload.

   * @returns {Promise<ProviderExchangeSettingsObject>} Returns promise that resolved provider exchange settings object.
   *
   * @memberof TradeApiClient
   */
  async providerExchangeSettingsUpdate(payload) {
    const { internalExchangeId, providerId, ...data } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${internalExchangeId}/providers/${providerId}`,
      data,
      "POST",
      2,
    );

    return providerExchangeSettingsResponseTransform(responseData);
  }

  /**
   * Get provider's profit/management stats.
   *
   * @param {GetProviderFollowersPayload} payload Provider's stats payload.

   * @returns {Promise<ProviderDataPointsEntity>} Returns promise that resolves provider data points entry.
   *
   * @memberof TradeApiClient
   */
  async providerCopyTradingDataPointsGet(payload) {
    const endpointPath = "/fe/api.php?action=getCopyTradingDataPoints";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerDataPointsResponseTransform(responseData);
  }

  /**
   * Get provider's profit/management stats.
   *
   * @param {GetProviderFollowersPayload} payload Provider's stats payload.

   * @returns {Promise<ProviderBalanceEntity>} Returns promise that resolves provider data points entry.
   *
   * @memberof TradeApiClient
   */
  async providerBalanceGet(payload) {
    const { providerId, ...data } = payload;
    const responseData = await this.doRequest(
      `/user/providers/${providerId}/balance`,
      data,
      "GET",
      2,
    );

    return providerBalanceResponseTransform(responseData);
  }

  /**
   * Get provider's profit/management stats.
   *
   * @param {GetProviderFollowersPayload} payload Provider's stats payload.

   * @returns {Promise<ProviderFollowersCountEntity>} Returns promise that resolves provider data points entry.
   *
   * @memberof TradeApiClient
   */
  async providerFollowersCountGet(payload) {
    const endpointPath = "/fe/api.php?action=getFollowersForProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerFollowersCountResponseTransform(responseData);
  }

  /**
   * @param {GetTransactionsPayload} payload Get exchange last deposits payload.
   * @returns {Promise<Array<TransactionEntity>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async exchangeLastDepositsGet(payload) {
    const { internalId } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${internalId}/deposits`,
      null,
      "GET",
      2,
    );

    return exchangeDepositsResponseTransform(responseData);
  }

  /**
   * Get withdrawals history.
   *
   * @param {GetTransactionsPayload} payload Get exchange last withdrawals payload.
   * @returns {Promise<Array<TransactionEntity>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async exchangeLastWithdrawalsGet(payload) {
    const { internalId } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${internalId}/withdrawals`,
      null,
      "GET",
      2,
    );

    return exchangeWithdrawsResponseTransform(responseData);
  }

  /**
   * Withdraw currency to a different address.
   *
   * @param {WithdrawPayload} payload Withdraw payload.
   * @returns {Promise<WithdrawReply>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async withdraw(payload) {
    const { internalId, ...data } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${internalId}/withdraw`,
      data,
      "POST",
      2,
    );

    return withdrawResponseTransform(responseData);
  }

  /**
   * Modify user's subscription.
   *
   * @param {ModifySubscriptionPayload} payload payload.
   *
   * @returns {Promise<Boolean>} Returns promise that resolved a boolean true.
   *
   * @memberof TradeApiClient
   */
  async modifySubscription(payload) {
    const endpointPath = "/fe/api.php?action=modifyFollowerSubscriptionDuration";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Cancel user's subscription.
   *
   * @param {CancelSubscriptionPayload} payload Cancel subscription payload.
   *
   * @returns {Promise<Boolean>} Returns promise that resolved a boolean true.
   *
   * @memberof TradeApiClient
   */
  async cancelSubscription(payload) {
    const endpointPath = "/fe/api.php?action=cancelFollowerSubscription";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Convert small balances to BNB
   *
   * @param {ConvertPayload} payload Convert payload.
   * @returns {Promise<ConvertReply>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async convert(payload) {
    const { internalId, ...data } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${internalId}/dust_transfer`,
      data,
      "POST",
      2,
    );

    return convertAssetResponseTransform(responseData);
  }

  /**
   * Function to get Management positions.
   *
   * @param {GetProviderFollowersPayload} payload Management poistions payload.
   *
   * @returns {Promise<Array<ManagementPositionsEntity>>} Returns promise that resolved management positions entity.
   *
   * @memberof TradeApiClient
   */
  async providerManagementPositions(payload) {
    const endpointPath = "/fe/api.php?action=getCopyTradingPositions";
    const responseData = await this.doRequest(endpointPath, payload);

    return managementPositionsResponseTransform(responseData);
  }

  /**
   * Function to get Management positions and Balance of provider.
   *
   * @param {GetProviderFollowersPayload} payload Management poistions payload.
   *
   * @returns {Promise<ManagementBalanceAndPositionsEntity>} Returns promise that resolved management positions entity.
   *
   * @memberof TradeApiClient
   */
  async providerManagementBalanceAndPositions(payload) {
    const endpointPath = "/fe/api.php?action=getBalanceAndPositionsForService";
    const responseData = await this.doRequest(endpointPath, payload);

    return managementBalanceAndPositionsResponseTransform(responseData);
  }

  /**
   * Change password.
   *
   * @param {UpdatePasswordPayload} payload Change password payload.
   * @returns {Promise<*>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async updatePassword(payload) {
    return this.doRequest("/change_password", payload, "POST", 2);
  }

  /**
   * Get code and QR code to enable 2FA.
   *
   * @returns {Promise<Array<string>>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async enable2FA1Step() {
    return this.doRequest("/user/enable_2fa/step1", null, "POST", 2);
  }

  /**
   * Enable 2FA.
   *
   * @param {TwoFAPayload} payload Payload
   * @returns {Promise<Boolean>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async enable2FA2Step(payload) {
    const endpointPath = "/fe/api.php?action=enable2FA2Step";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Disable 2FA.
   *
   * @param {TwoFAPayload} payload Payload
   * @returns {Promise<Boolean>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async disable2FA(payload) {
    const endpointPath = "/fe/api.php?action=disable2FA";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Verify if 2FA code is valid.
   *
   * @param {TwoFAPayload} payload Payload
   * @returns {Promise<Boolean>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async verify2FA(payload) {
    return this.doRequest("/user/verify_2fa", payload, "POST", 2, payload.token);
  }

  /**
   * Get user notifications settings.
   *
   * @returns {Promise<ProfileNotifications>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async getProfileNotifications() {
    const responseData = await this.doRequest("/user/notifications", null, "GET", 2);

    return profileNotificationsResponseTransform(responseData);
  }

  /**
   * Update user notifications settings.
   *
   * @param {ProfileNotificationsPayload} payload Payload
   * @returns {Promise<ProfileNotifications>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async updateProfileNotifications(payload) {
    const responseData = await this.doRequest("/user/notifications", payload, "POST", 2);

    return profileNotificationsResponseTransform(responseData);
  }

  /**
   * Function to get provider's open positions.
   *
   * @param {string} providerId providerId
   *
   * @returns {Promise<UserPositionsCollection>} Returns promise that resolved user position collection.
   *
   * @memberof TradeApiClient
   */
  async providerOpenPositions(providerId) {
    const responseData = await this.doRequest(
      `/providers/${providerId}/positions`,
      {
        type: "open",
      },
      "GET",
      2,
    );

    return positionsResponseTransform(responseData);
  }

  /**
   * Function to get provider's closed positions.
   *
   * @param {string} providerId providerId
   *
   * @returns {Promise<UserPositionsCollection>} Returns promise that resolved user positions collection.
   *
   * @memberof TradeApiClient
   */
  async providerSoldPositions(providerId) {
    const responseData = await this.doRequest(
      `/providers/${providerId}/positions`,
      {
        type: "closed",
      },
      "GET",
      2,
    );

    return positionsResponseTransform(responseData);
  }

  /**
   * Function to request password change through email.
   *
   * @param {ForgotPasswordStep1Payload} payload Request Password change step 1 payload.
   *
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async forgotPasswordStep1(payload) {
    return this.doRequest("/user/request_action/forgotten_password", payload, "POST", 2);
  }

  /**
   * Create a new copy trader.
   *
   * @param {CopyTraderCreatePayload} payload Provider Create payload.
   * @returns {Promise<NewProviderEntity>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async copyTraderCreate(payload) {
    const endpointPath = "/fe/api.php?action=createCopyTrader";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerCreateResponseTransform(responseData);
  }

  /**
   * Function to verify token received by completing step 1 of password change.
   *
   * @param {AuthorizationPayload} payload Password change token verification payload.
   *
   * @return {Promise<"OK">} Promise that resolve boolean result.
   * */
  async forgotPasswordStep2(payload) {
    return this.doRequest("/visit/recovery_password", payload, "GET", 2);
  }

  /**
   * Function to change password after completing step 2 of password change.
   *
   * @param {ForgotPasswordStep3Payload} payload Request Password change payload.
   *
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async forgotPasswordStep3(payload) {
    return this.doRequest("/user/confirm_action/forgotten_password", payload, "POST", 2);
  }

  /**
   * Function to request email change through email.
   *
   * @param {ChangeEmailRequestPayload} payload Request Email change request payload.
   *
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async changeEmailRequest(payload) {
    return this.doRequest("/user/request_action/reset_email", payload, "POST", 2);
  }

  /**
   * Function to verify token received by completing request of email change.
   *
   * @param {ChangeEmailVisitPayload} payload Request Email change visit payload.
   *
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async changeEmailVisit(payload) {
    return this.doRequest("/visit/reset_email", payload, "GET", 2);
  }

  /**
   * Function to change email after verifying the token of email change.
   *
   * @param {ChangeEmailConfirmPayload} payload Request Email change confirm payload.
   *
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async changeEmailConfirm(payload) {
    return this.doRequest("/user/confirm_action/reset_email", payload, "POST", 2);
  }

  /**
   * Request 2FA Disable
   *
   * @param {AuthorizationPayload} payload Request Payload
   *
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async disable2FARequest(payload) {
    return this.doRequest("/user/request_action/disable_2fa", null, "POST", 2, payload.token);
  }

  /**
   * Visit 2FA reset link.
   *
   * @param {AuthorizationPayload} payload Request Payload
   *
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async disable2FAVisit(payload) {
    return this.doRequest("/visit/disable_2fa", payload, "GET", 2);
  }

  /**
   * Disable 2FA
   *
   * @param {Disable2FAConfirmPayload} payload Request Payload
   *
   * @returns {Promise<"OK">} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async disable2FAConfirm(payload) {
    return this.doRequest("/user/confirm_action/disable_2fa", payload, "POST", 2);
  }

  /**
   * Create a new signal provider.
   *
   * @param {ProviderCreatePayload} payload Provider Create payload.
   * @returns {Promise<NewProviderEntity>} Returns promise.
   *
   * @memberof TradeApiClient
   */
  async providerCreate(payload) {
    const endpointPath = "/fe/api.php?action=createProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return providerCreateResponseTransform(responseData);
  }

  /**
   * Function to clone a provider.
   *
   * @param {GetProviderFollowersPayload} payload Clone provider payload.
   *
   * @returns {Promise<CloneActionResponseObject>} Returns promise that resolved cloned provider ID.
   *
   * @memberof TradeApiClient
   */
  async cloneProvider(payload) {
    const endpointPath = "/fe/api.php?action=cloneProvider";
    const responseData = await this.doRequest(endpointPath, payload);

    return cloneProviderResponseTransform(responseData);
  }

  /**
   * Get user exchange available balance.
   *
   * @param {string} exchangeInternalId exchangeInternalId
   *
   * @returns {Promise<UserAvailableBalanceObject>} Returns promise that resolved user available balance object.
   *
   * @memberof TradeApiClient
   */
  async userAvailableBalanceGet(exchangeInternalId) {
    const responseData = await this.doRequest(
      `/user/exchange/${exchangeInternalId}/available_balance`,
      null,
      "GET",
      2,
    );

    return userAvailableBalanceResponseTransform(responseData);
  }

  /**
   * Get sesstion state.
   *
   * @param {AuthorizationPayload} payload Clone provider payload.
   *
   * @returns {Promise<SessionResponseObject>} Returns promise that resolved session response object.
   *
   * @memberof TradeApiClient
   */
  async sessionDataGet(payload) {
    const endpointPath = "/fe/api.php?action=getSessionData";
    const responseData = await this.doRequest(endpointPath, payload);

    return sessionDataResponseTransform(responseData);
  }

  /**
   * Function to get exchange open orders.
   *
   * @param {string} exchangeInternalId exchangeInternalId
   *
   * @returns {Promise<Array<ExchangeOpenOrdersObject>>} Returns promise that resolved exchange order object.
   *
   * @memberof TradeApiClient
   */
  async openOrdersGet(exchangeInternalId) {
    const responseData = await this.doRequest(
      `/user/exchanges/${exchangeInternalId}/orders/open`,
      null,
      "GET",
      2,
    );

    return exchangeOpenOrdersResponseTransform(responseData);
  }

  /**
   * Function to get exchange open orders.
   *
   * @param {ProviderContractsPayload} payload exchange orders payload.
   *
   * @returns {Promise<Array<ExchangeOpenOrdersObject>>} Returns promise that resolved exchange order object.
   *
   * @memberof TradeApiClient
   */
  async providerOrdersGet(payload) {
    const { exchangeInternalId, providerId } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/${exchangeInternalId}/providers/${providerId}/orders/open`,
      payload,
    );

    return exchangeOpenOrdersResponseTransform(responseData);
  }

  /**
   * Function to get exchange contracts.
   *
   * @param {string} exchangeInternalId exchangeInternalId
   *
   * @returns {Promise<Array<ExchangeContractsObject>>} Returns promise that.
   *
   * @memberof TradeApiClient
   */
  async exchangeContractsGet(exchangeInternalId) {
    const responseData = await this.doRequest(
      `/user/exchanges/${exchangeInternalId}/contracts`,
      null,
      "GET",
      2,
    );

    return exchangeContractsResponseTransform(responseData);
  }

  /**
   * Function to get exchange contracts.
   *
   * @param {ProviderContractsPayload} payload exchange contracts payload.
   *
   * @returns {Promise<Array<ExchangeContractsObject>>} Returns promise that.
   *
   * @memberof TradeApiClient
   */
  async providerContractsGet(payload) {
    const { providerId, ...data } = payload;
    const responseData = await this.doRequest(
      `/user/exchanges/{exchangeInternalId}/providers/${providerId}/contracts`,
      data,
      "GET",
      2,
    );

    return exchangeContractsResponseTransform(responseData);
  }

  /**
   * Canel exchange order.
   *
   * @param {CancelOrderPayload} payload Cancel exchange order payload.
   *
   * @returns {Promise<Boolean>} Returns promise that resolves a boolean true.
   *
   * @memberof TradeApiClient
   */
  async cancelExchangeOrder(payload) {
    const endpointPath = "/fe/api.php?action=cancelOrder";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Canel exchange contract.
   *
   * @param {CancelContractPayload} payload Cancel exchange contract payload.
   *
   * @returns {Promise<Boolean>} Returns promise that resolves a boolean true.
   *
   * @memberof TradeApiClient
   */
  async cancelExchangeContract(payload) {
    const endpointPath = "/fe/api.php?action=reduceContract";
    const responseData = await this.doRequest(endpointPath, payload);

    return responseData;
  }

  /**
   * Cancel exchange order.
   *
   * @param {ProfitStatsPayload} payload Cancel exchange order payload.
   *
   * @returns {Promise<Array<ProfitStatsObject>>} Returns promise that resolves a boolean true.
   *
   * @memberof TradeApiClient
   */
  async profitStatsGet(payload) {
    const endpointPath = "/fe/api.php?action=getProfitStatsNew";
    const responseData = await this.doRequest(endpointPath, payload);

    return profitStatsResponseTransform(responseData);
  }

  /**
   * Cancel exchange order.
   *
   * @param {ProfileProviderStatsPayload} payload Cancel exchange order payload.
   *
   * @returns {Promise<ProfileProviderStatsObject>} Returns promise that resolves a boolean true.
   *
   * @memberof TradeApiClient
   */
  async profileProviderStatsGet(payload) {
    const endpointPath = "/fe/api.php?action=getProviderStats2";
    const responseData = await this.doRequest(endpointPath, payload);

    return profileProviderStatsResponseTransform(responseData);
  }

  /**
   * Update user.
   *
   * @param {UserPayload} payload User update payload.
   *
   * @returns {Promise<boolean>} Returns promise that resolves a boolean true.
   *
   * @memberof TradeApiClient
   */
  async updateUser(payload) {
    const endpointPath = "/fe/api.php?action=updateUser";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Create post.
   *
   * @param {CreatePostPayload} payload Create Post payload.
   *
   * @returns {Promise<Post>} Returns promise that resolves created post.
   *
   * @memberof TradeApiClient
   */
  async createPost(payload) {
    const endpointPath = "/fe/api.php?action=createPost";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Edit post.
   *
   * @param {{postId: string, content: string}} payload Edit Post payload.
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async editPost(payload) {
    const endpointPath = "/fe/api.php?action=editPost";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Get post.
   *
   * @param {{postId: string}} payload Edit Post payload.
   *
   * @returns {Promise<Post>} Result
   *
   * @memberof TradeApiClient
   */
  async getPost(payload) {
    const endpointPath = "/fe/api.php?action=getPost";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Get posts.
   *
   * @param {GetPostsPayload} payload Get Posts payload.
   *
   * @returns {Promise<Array<Post>>} Returns promise that resolves posts list.
   *
   * @memberof TradeApiClient
   */
  async getPosts(payload) {
    const endpointPath = "/fe/api.php?action=getPosts";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Approve post.
   *
   * @param {{postId: string}} payload Approve post payload
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async approvePost(payload) {
    const endpointPath = "/fe/api.php?action=approvePost";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Unapprove post.
   *
   * @param {{postId: string}} payload Unapprove post payload
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async unapprovePost(payload) {
    const endpointPath = "/fe/api.php?action=unapprovePost";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Add post/comment reply
   *
   * @param {AddReplyPayload} payload Payload
   *
   * @returns {Promise<Post>} Result
   *
   * @memberof TradeApiClient
   */
  async addReply(payload) {
    const endpointPath = "/fe/api.php?action=addReply";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Delete Post.
   *
   * @param {{postId: string}} payload Payload
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async deletePost(payload) {
    const endpointPath = "/fe/api.php?action=deletePost";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Delete Reply.
   *
   * @param {{postId: string, replyId: string, nested: boolean}} payload Payload
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async deleteReply(payload) {
    const endpointPath = "/fe/api.php?action=deleteReply";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Subscribe to provider's posts notifications.
   *
   * @param {{providerId: string, subscribed: boolean}} payload Payload
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async updatePostsNotifications(payload) {
    const endpointPath = "/fe/api.php?action=updatePostsNotifications";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Get Profit Sharing balance history for a connected provider
   *
   * @param {GetProfitSharingBalanceHistoryPayload} payload Payload
   *
   * @returns {Promise<ProfitSharingBalanceHistory>} Result
   *
   * @memberof TradeApiClient
   */
  async getProfitSharingBalanceHistory(payload) {
    const endpointPath = "/fe/api.php?action=getProfitSharingBalanceHistory";
    const responseData = await this.doRequest(endpointPath, payload);
    return profitSharingBalanceHistoryResponseTransform(responseData);
  }

  /**
   * Adjust position margin
   *
   * @param {AdjustMarginPayload} payload Payload
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async transferMargin(payload) {
    const endpointPath = "/fe/api.php?action=transferMargin";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Request delete account
   *
   * @param {{code: string?}} payload Payload with optional 2FA code
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async deleteAccountRequest(payload) {
    return this.doRequest("/user/request_action/delete_account", payload, "POST", 2);
  }

  /**
   * Visit delete account link
   *
   * @param {{token: string}} payload Payload with email code
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async deleteAccountVisit(payload) {
    return this.doRequest("/visit/delete_account", payload, "GET", 2);
  }

  /**
   * Confirm delete account
   *
   * @param {{token: string, reason: string}} payload Payload with email code
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async deleteAccountConfirm(payload) {
    return this.doRequest("/user/confirm_action/delete_account", payload, "POST", 2);
  }

  /**
   * Recover position
   *
   * @param {{token: string, internalExchangeId: string, positionId: string}} payload Payload to recover position
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async recoverPosition(payload) {
    const endpointPath = "/fe/api.php?action=recoverPosition";
    const responseData = await this.doRequest(endpointPath, payload);
    return responseData;
  }

  /**
   * Generate user exchange positions report
   *
   * @param {{internalExchangeId: string}} payload Payload to generate position report
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async generateExchangePositionsReport(payload) {
    const endpointPath = `/user/exchanges/${payload.internalExchangeId}/report/positions`;
    const responseData = await this.doRequest(endpointPath, {}, "POST", 2);
    return responseData;
  }

  /**
   * Activate subaccount
   *
   * @param {{internalExchangeId: string}} payload Payload
   *
   * @returns {Promise<void>} Result
   *
   * @memberof TradeApiClient
   */
  async activateSubaccount(payload) {
    const endpointPath = `/user/exchanges/${payload.internalExchangeId}/activate`;
    const responseData = await this.doRequest(endpointPath, {}, "POST", 2);
    return responseData;
  }

  /**
   * Perform internal transfer for user
   *
   * @param {InternalTransferPayload} payload Payload to perform internal transfer
   *
   * @returns {Promise<boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async performInternalTransfer(payload) {
    const endpointPath = `/user/exchanges/${payload.internalIdSrc}/internal_transfer`;
    const responseData = await this.doRequest(endpointPath, payload, "POST", 2);
    return responseData;
  }

  /**
   * Perform internal transfer for user
   *
   * @param {{exchangeInternalId: String}} payload Payload to perform internal transfer
   *
   * @returns {Promise<AssetsAndBalanceObject>} Result
   *
   * @memberof TradeApiClient
   */
  async getAssetsAndBalance(payload) {
    const endpointPath = `/user/exchanges/${payload.exchangeInternalId}/assets_and_balance`;
    const responseData = await this.doRequest(endpointPath, {}, "GET", 2);
    return assetsAndBalanceResponseTransform(responseData);
  }

  /**
   * Save user's selected lang in backend
   *
   * @param {{locale: String}} payload Payload to save locale
   *
   * @returns {Promise<Boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async saveLocale(payload) {
    const endpointPath = "/user/save_locale";
    const responseData = await this.doRequest(endpointPath, payload, "POST", 2);
    return responseData;
  }

  /**
   * Ban user from posting in Wall
   *
   * @param {string} userId userId
   *
   * @returns {Promise<Boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async wallBanUser(userId) {
    return this.doRequest(`/wall/users/${userId}/ban`, null, "POST", 2);
  }

  /**
   * Unban user from posting in Wall
   *
   * @param {string} userId userId
   *
   * @returns {Promise<Boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async wallUnbanUser(userId) {
    return this.doRequest(`/wall/users/${userId}/unban`, null, "POST", 2);
  }

  /**
   * Unban user from posting in Wall
   *
   * @param {{userId: String, postId: String}} payload Payload
   *
   * @returns {Promise<Boolean>} Result
   *
   * @memberof TradeApiClient
   */
  async wallReportUser(payload) {
    const { userId, ...data } = payload;
    return this.doRequest(`/wall/users/${userId}/report_spam`, data, "POST", 2);
  }
}

// JS export by default guarantee a singleton instance if we export the class
// instance, see:
// https://medium.com/@lazlojuly/are-node-js-modules-singletons-764ae97519af
const client = new TradeApiClient();
// Object.freeze(client);

export default client;
