import postcss from 'postcss';
import postcssNodeExtract from './lib/postcss-node-extract';

/**
 * Synchronously extract nodes from a string.
 */
export const processSync = ({
  css,
  filters,
  customFilter,
  postcssSyntax,
}) => postcss(postcssNodeExtract(filters, customFilter))
  .process(css, { syntax: postcssSyntax }).css;

/**
 * Asynchronously extract nodes from a string.
 */
export const process = options => new Promise((resolve) => {
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
