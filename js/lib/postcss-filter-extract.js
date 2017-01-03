import postcss from 'postcss';

function filterRuleRecursive(rule, filter) {
  if (rule.parent && rule.parent.type !== `root`) return filterRuleRecursive(rule.parent, filter);

  if (filter.type && filter.type !== rule.type) return false;
  if (filter.property && !rule[filter.property.name]) return false;

  if (filter.property) {
    const ruleHasProperty = rule[filter.property.name] === filter.property.value ||
      rule[filter.property.name].match(filter.property.value);
    if (ruleHasProperty) {
      return true;
    }
  } else if (filter.type && filter.type === rule.type) {
    return true;
  }

  return false;
}

export default function postcssFilterExtract(filterNames = [], customFilter) {
  const filterNamesArray = Array.isArray(filterNames) ? filterNames : [filterNames];
  const filterDefinitions = {
    'at-rules': [
      { type: `atrule` },
    ],
    declarations: [
      { type: `decl` },
    ],
    mixins: [
      { type: `atrule`, property: { name: `name`, value: `mixin` } },
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
    ],
    variables: [
      { type: `decl`, property: { name: `prop`, value: /^[$|@]/ } },
    ],
    custom: customFilter,
  };

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
