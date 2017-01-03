import postcss from 'postcss';
import postcssFilterExtract from './lib/postcss-filter-extract';

const defaultOptions = {
  css: ``,
  filterNames: [],
  customFilter: undefined,
  postcssSyntax: undefined,
};

/**
 * CssFilterExtract
 */
export default class CssFilterExtract {
  static process(options = {}) {
    return new Promise((resolve) => {
      const result = CssFilterExtract.processSync(options);
      resolve(result);
    });
  }

  static processSync(options = {}) {
    const data = Object.assign({}, defaultOptions, options);
    return postcss(postcssFilterExtract(data.filterNames, data.customFilter))
      .process(data.css, { syntax: data.postcssSyntax }).css;
  }
}
