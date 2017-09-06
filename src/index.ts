import * as postcss from 'postcss';

import postcssNodeExtract = require('./lib/postcss-node-extract');

import { IProcessOptions } from './interfaces/IProcessOptions';

/**
 * Synchronously extract nodes from a string.
 */
export const processSync = ({
  css,
  filters,
  customFilter,
  postcssSyntax,
}: IProcessOptions) => postcss(postcssNodeExtract(filters, customFilter))
  .process(css, { syntax: postcssSyntax }).css;

/**
 * Asynchronously extract nodes from a string.
 */
export const process = (options: IProcessOptions) => new Promise((resolve) => {
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
