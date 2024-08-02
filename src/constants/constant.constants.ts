import { tuple } from "src/utils/custom.utils";
import { PROFILE_TYPES } from "./auth.constants";

export const DEFAULT_PAGE_LENGTH = 50;
export const DEFAULT_ORDER_BY = {
  createdat: "desc"
}
export const DEFAULT_PAGE = 1;

export const GLOBAL_FILTER_KEYS = ["id", "deleted", "createdat", "updatedat", "deletedat"];

export const TWILIO_VERIFY_CHANNELS = tuple("sms", "call", "email", "whatsapp");

export const EMAIL_NOTIFICATION_TYPES = tuple("sign-up", "reset-password");

export const NOREPLY_EMAIL = "no-reply@projectone.com"

export const NOTIFICATION_STATUS_TYPES = tuple("read", "pending", "deleted")

export const NOTIFICATION_TYPES = tuple("settings", "booking", "system", "payment", "invoice", "loyalty")

export const NOTIFICATION_SOURCE_TYPES = tuple("system", "business", "sysadmin", "businessowner", "specialist", "client")

export const SYSADMIN = "sysadmin";

export const ALL_ROLES = tuple("sysadmin", ...PROFILE_TYPES)


 /**
 * Sets moment date displays
 * @options full, regular, dateonly, timeonly, timeonlynosecond, timeonly24h, timeonly24hnosecond, daymonthonly, yyyymmdd, monthyear
 */
export const momentFormats = { 
  /**
   * @param full Full date type with time .
   * @returns MMMM Do YYYY
   * @sample  // September 3rd 2023, 4:44:50 pm
   */
  full: "MMMM Do YYYY, h:mm:ss a", 
  /**
   * @param fullwithweekdaynotime Full date type without time .
   * @returns MMMM Do YYYY
   * @sample  // Sun, September 3rd 2023
   */
  fullwithweekdaynotime: "ddd, MMM Do YYYY", 
  /**
   * @param regular date type with time .
   * @returns MMM Do YYYY h:mm:ss a
   * @sample  // Sept 3rd 2023, 4:44:50 pm
   */
  regular: "MMM Do YYYY, h:mm:ss a", 
  /**
   * @param regularshort date type with time .
   * @returns DD MMM YYYY, h:mma
   * @sample  // DD Sept 2023, 4:44pm
   */
  regularshort: "DD MMM YYYY, h:mma", 
  /**
   * @param dateonly Full date type.
   * @returns MMMM Do YYYY
   * @sample  // September 3rd 2023
   */
  dateonly: "MMMM Do YYYY",
  /**
   * @param monthyear Month and Year only.
   * @returns MMMM YYYY
   * @sample  // September 2023
   */
  monthyear: "MMMM YYYY",
  /**
   * @param daymonthonly Full Day and Month
   * @returns dddd, MMMM DD
   * @sample  // Tuesday, April 13
   */
  daymonthonly: "dddd, MMMM DD",
  /**
   * @param yyyymmdd code date.
   * @returns yyyy-mm-dd - 12 hour clock
   * @sample  // 2024-01-01
   */
  yyyymmdd: "YYYY-MM-DD",
  /**
   * @param timeonly Full time type.
   * @returns h:mm:ss a - 12 hour clock
   * @sample  // 4:44:50 pm
   */
  timeonly: "hh:mm:ss a",
  /**
   * @param timeonlynosecond Full time type without seconds.
   * @returns h:mm a - 12 hour clock
   * @sample  // 4:44 pm
   */
  timeonlynosecond: "hh:mm a", 
  /**
   * @param timeonly24h Full time type.
   * @returns HH:mm:ss - 24 hour clock
   * @sample  // 16:44:50
   */
  timeonly24h: "HH:mm:ss",
  /**
   * @param timeonly24hnosecond Full time type without seconds.
   * @returns HH:mm - 24 hour clock
   * @sample  // 16:44
   */
  timeonly24hnosecond: "HH:mm"
}