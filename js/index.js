import postcss from 'postcss';

import postcssFilterExtract from './lib/postcss-filter-extract';

/**
 * CssFilterExtract
 */
export default class CssFilterExtract {
  static process(css, filterNames, customFilter) {
    return new Promise((resolve) => {
      const result = CssFilterExtract.processSync(
        css,
        filterNames,
        customFilter
      );
      resolve(result);
    });
  }

  static processSync(css, filterNames, customFilter) {
    return postcss(postcssFilterExtract(filterNames, customFilter))
      .process(css).css;
  }
}
