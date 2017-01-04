'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var postcss = _interopDefault(require('postcss'));

function extractNodeRecursively(node, filter) {
  if (node.parent && node.parent.type !== "root") { return extractNodeRecursively(node.parent, filter); }

  if (filter.type && filter.type !== node.type) { return false; }
  if (filter.property && !node[filter.property.name]) { return false; }

  if (filter.property) {
    var ruleHasProperty = node[filter.property.name] === filter.property.value ||
      node[filter.property.name].match(filter.property.value);
    if (ruleHasProperty) {
      return true;
    }
  } else if (filter.type && filter.type === node.type) {
    return true;
  }

  return false;
}

var filterDefinitions = {
  'at-rules': [
    { type: "atrule" } ],
  declarations: [
    { type: "decl" } ],
  mixins: [
    { type: "atrule", property: { name: "name", value: "mixin" } },
    { type: "rule", property: { name: "selector", value: /\(.*\)/ } } ],
  rules: [
    { type: "rule" } ],
  silent: [
    { type: "atrule", property: { name: "name", value: "debug" } },
    { type: "atrule", property: { name: "name", value: "error" } },
    { type: "atrule", property: { name: "name", value: "mixin" } },
    { type: "atrule", property: { name: "name", value: "warn" } },
    { type: "decl", property: { name: "prop", value: /^[$|@]/ } },
    { type: "rule", property: { name: "selector", value: /%/ } },
    { type: "rule", property: { name: "selector", value: /\(.*\)/ } } ],
  variables: [
    { type: "decl", property: { name: "prop", value: /^[$|@]/ } } ],
};

function postcssNodeExtract(filterNames, customFilter) {
  if ( filterNames === void 0 ) filterNames = [];

  var filterNamesArray = Array.isArray(filterNames) ? filterNames : [filterNames];
  filterDefinitions.custom = customFilter;

  return postcss.plugin("postcss-node-extract", function () { return function (nodes) {
    nodes.walk(function (rule) {
      var filterRule = false;
      filterNamesArray.some(function (filterName) {
        filterDefinitions[filterName].some(function (filter) {
          filterRule = extractNodeRecursively(rule, filter);
          return filterRule;
        });
        return filterRule;
      });
      if (!filterRule) { rule.remove(); }
    });
  }; });
}

var defaultOptions = {
  css: "",
  filterNames: [],
  customFilter: undefined,
  postcssSyntax: undefined,
};

/**
 * CssNodeExtract
 */
var CssNodeExtract = function CssNodeExtract () {};

CssNodeExtract.process = function process (options) {
    if ( options === void 0 ) options = {};

  return new Promise(function (resolve) {
    var result = CssNodeExtract.processSync(options);
    resolve(result);
  });
};

CssNodeExtract.processSync = function processSync (options) {
    if ( options === void 0 ) options = {};

  var data = Object.assign({}, defaultOptions, options);
  return postcss(postcssNodeExtract(data.filterNames, data.customFilter))
    .process(data.css, { syntax: data.postcssSyntax }).css;
};

module.exports = CssNodeExtract;
