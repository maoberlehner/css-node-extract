import postcss from 'postcss';
import postcssNodeExtract from './lib/postcss-node-extract';

/**
 * Default options.
 *
 * @type {Object}
 */
const defaultOptions = {
  css: ``,
  filterNames: [],
  customFilter: undefined,
  postcssSyntax: undefined,
};

/**
 * Synchronously extract nodes from a string.
 *
 * @param {Object} options
 *   Configuration options.
 * @return {String}
 *   Extracted nodes.
 */
export const processSync = (options = {}) => {
  const data = Object.assign({}, defaultOptions, options);
  return postcss(postcssNodeExtract(data.filterNames, data.customFilter))
    .process(data.css, { syntax: data.postcssSyntax }).css;
};

/**
 * Asynchronously extract nodes from a string.
 *
 * @param {Object} options
 *   Configuration options.
 * @return {Promise}
 *   Promise for a string with the extracted nodes.
 */
export const process = (options = {}) => new Promise((resolve) => {
  const result = processSync(options);
  resolve(result);
});

/**
 * cssNodeExtract
 */
export default {
  process,
  processSync,
};
