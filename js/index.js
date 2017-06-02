import postcss from 'postcss';
import postcssNodeExtract from './lib/postcss-node-extract';

/**
 * Default options.
 */
const defaultOptions = {
  css: ``,
  filterNames: [],
  customFilter: undefined,
  postcssSyntax: undefined,
};

/**
 * Synchronously extract nodes from a string.
 */
export const processSync = (options = {}) => {
  const data = Object.assign({}, defaultOptions, options);
  return postcss(postcssNodeExtract(data.filterNames, data.customFilter))
    .process(data.css, { syntax: data.postcssSyntax }).css;
};

/**
 * Asynchronously extract nodes from a string.
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
