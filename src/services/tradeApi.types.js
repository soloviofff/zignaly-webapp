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
 */
