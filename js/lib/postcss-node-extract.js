import postcss from 'postcss';
import extractNodeRecursively from './extract-node-recursively';

/**
 * Filter definitions.
 *
 * @type {Object}
 */
const filterDefinitions = {
  'at-rules': [
    { type: `atrule` },
  ],
  declarations: [
    { type: `decl` },
  ],
  functions: [
    { type: `atrule`, property: { name: `name`, value: `function` } },
  ],
  mixins: [
    { type: `atrule`, property: { name: `name`, value: `mixin` } },
    { type: `rule`, property: { name: `selector`, value: /\(.*\)/ } },
  ],
  rules: [
    { type: `rule` },
  ],
  silent: [
    { type: `atrule`, property: { name: `name`, value: `debug` } },
    { type: `atrule`, property: { name: `name`, value: `error` } },
    { type: `atrule`, property: { name: `name`, value: `function` } },
    { type: `atrule`, property: { name: `name`, value: `mixin` } },
    { type: `atrule`, property: { name: `name`, value: `warn` } },
    { type: `decl`, property: { name: `prop`, value: /^[$|@]/ } },
    { type: `rule`, property: { name: `selector`, value: /%/ } },
    { type: `rule`, property: { name: `selector`, value: /\(.*\)/ } },
  ],
  variables: [
    { type: `decl`, property: { name: `prop`, value: /^[$|@]/ } },
  ],
};

/**
 * A PostCSS plugin for extracting nodes from CSS code.
 *
 * @param {Array|String} filterNames
 *   Multiple filter names as array or a single filter name as string.
 * @param {Object} customFilter
 *   Custom filter object.
 * @return {Function}
 *   PostCSS plugin.
 */
export default function postcssNodeExtract(filterNames = [], customFilter) {
  const filterNamesArray = Array.isArray(filterNames) ? filterNames : [filterNames];
  filterDefinitions.custom = customFilter;

  return postcss.plugin(`postcss-node-extract`, () => (nodes) => {
    nodes.walk((rule) => {
      let filterRule = false;
      filterNamesArray.some((filterName) => {
        filterDefinitions[filterName].some((filter) => {
          filterRule = extractNodeRecursively(rule, filter);
          return filterRule;
        });
        return filterRule;
      });
      if (!filterRule) rule.remove();
    });
  });
}
