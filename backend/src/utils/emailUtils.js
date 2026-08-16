/**
 * Conservatively normalize an email address before querying or saving.
 * Trims leading/trailing whitespace and converts to lowercase.
 * Does NOT alter plus-addressing or provider-specific aliases.
 *
 * @param {string} email
 * @returns {string} Normalized email
 */
export const normalizeEmail = (email) => {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
};
