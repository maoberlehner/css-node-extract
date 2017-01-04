import postcss from 'postcss';
import postcssNodeExtract from './lib/postcss-node-extract';

const defaultOptions = {
  css: ``,
  filterNames: [],
  customFilter: undefined,
  postcssSyntax: undefined,
};

/**
 * CssNodeExtract
 */
export default class CssNodeExtract {
  static process(options = {}) {
    return new Promise((resolve) => {
      const result = CssNodeExtract.processSync(options);
      resolve(result);
    });
  }

  static processSync(options = {}) {
    const data = Object.assign({}, defaultOptions, options);
    return postcss(postcssNodeExtract(data.filterNames, data.customFilter))
      .process(data.css, { syntax: data.postcssSyntax }).css;
  }
}
