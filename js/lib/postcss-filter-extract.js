import postcss from 'postcss';
import filterRuleRecursive from './filter-rule-recursive';

const filterDefinitions = {
  'at-rules': [
    { type: `atrule` },
  ],
  declarations: [
    { type: `decl` },
  ],
  mixins: [
    { type: `atrule`, property: { name: `name`, value: `mixin` } },
    { type: `rule`, property: { name: `selector`, value: /\(.*\)/ } },
  ],
  rules: [
    { type: `rule` },
  ],
  silent: [
    { type: `atrule`, property: { name: `name`, value: `charset` } },
    { type: `atrule`, property: { name: `name`, value: `debug` } },
    { type: `atrule`, property: { name: `name`, value: `document` } },
    { type: `atrule`, property: { name: `name`, value: `error` } },
    { type: `atrule`, property: { name: `name`, value: `font-face` } },
    { type: `atrule`, property: { name: `name`, value: `keyframes` } },
    { type: `atrule`, property: { name: `name`, value: `mixin` } },
    { type: `atrule`, property: { name: `name`, value: `namespace` } },
    { type: `atrule`, property: { name: `name`, value: `warn` } },
    { type: `decl`, property: { name: `prop`, value: /^[$|@]/ } },
    { type: `rule`, property: { name: `selector`, value: /%/ } },
    { type: `rule`, property: { name: `selector`, value: /\(.*\)/ } },
  ],
  variables: [
    { type: `decl`, property: { name: `prop`, value: /^[$|@]/ } },
  ],
};

export default function postcssFilterExtract(filterNames = [], customFilter) {
  const filterNamesArray = Array.isArray(filterNames) ? filterNames : [filterNames];
  filterDefinitions.custom = customFilter;

  return postcss.plugin(`postcss-filter-extract`, () => (nodes) => {
    nodes.walk((rule) => {
      let filterRule = false;
      filterNamesArray.some((filterName) => {
        filterDefinitions[filterName].some((filter) => {
          filterRule = filterRuleRecursive(rule, filter);
          return filterRule;
        });
        return filterRule;
      });
      if (!filterRule) rule.remove();
    });
  });
}
