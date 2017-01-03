'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var postcss = _interopDefault(require('postcss'));

function filterRuleRecursive(rule, filter) {
  if (rule.parent && rule.parent.type !== "root") { return filterRuleRecursive(rule.parent, filter); }

  if (filter.type && filter.type !== rule.type) { return false; }
  if (filter.property && !rule[filter.property.name]) { return false; }

  if (filter.property) {
    var ruleHasProperty = rule[filter.property.name] === filter.property.value ||
      rule[filter.property.name].match(filter.property.value);
    if (ruleHasProperty) {
      return true;
    }
  } else if (filter.type && filter.type === rule.type) {
    return true;
  }

  return false;
}

function postcssFilterExtract(filterNames, customFilter) {
  if ( filterNames === void 0 ) filterNames = [];

  var filterNamesArray = Array.isArray(filterNames) ? filterNames : [filterNames];
  var filterDefinitions = {
    'at-rules': [
      { type: "atrule" } ],
    declarations: [
      { type: "decl" } ],
    mixins: [
      { type: "atrule", property: { name: "name", value: "mixin" } } ],
    rules: [
      { type: "rule" } ],
    silent: [
      { type: "atrule", property: { name: "name", value: "charset" } },
      { type: "atrule", property: { name: "name", value: "debug" } },
      { type: "atrule", property: { name: "name", value: "document" } },
      { type: "atrule", property: { name: "name", value: "error" } },
      { type: "atrule", property: { name: "name", value: "font-face" } },
      { type: "atrule", property: { name: "name", value: "keyframes" } },
      { type: "atrule", property: { name: "name", value: "mixin" } },
      { type: "atrule", property: { name: "name", value: "namespace" } },
      { type: "atrule", property: { name: "name", value: "warn" } },
      { type: "decl", property: { name: "prop", value: /^[$|@]/ } },
      { type: "rule", property: { name: "selector", value: /%/ } } ],
    variables: [
      { type: "decl", property: { name: "prop", value: /^[$|@]/ } } ],
    custom: customFilter,
  };

  return postcss.plugin("postcss-filter-extract", function () { return function (nodes) {
    nodes.walk(function (rule) {
      var filterRule = false;
      filterNamesArray.some(function (filterName) {
        filterDefinitions[filterName].some(function (filter) {
          filterRule = filterRuleRecursive(rule, filter);
          return filterRule;
        });
        return filterRule;
      });
      if (!filterRule) { rule.remove(); }
    });
  }; });
}

module.exports = postcssFilterExtract;
