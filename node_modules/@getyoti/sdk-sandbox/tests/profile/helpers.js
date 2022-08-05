
/**
 * @param {Buffer} content
 * @param {string} contentType
 *
 * @returns {string}
 */
function dataUrl(content, contentType) {
  return `data:${contentType};base64,${content.toString('base64')}`;
}

module.exports = {
  dataUrl,
};
