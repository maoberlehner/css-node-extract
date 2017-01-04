'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var postcss = _interopDefault(require('postcss'));

/**
 * Whiteliste a node if it (or one of the nodes parents) matches the given filter.
 *
 * @param {Object} node
 *   A postcss node object.
 * @param {Object} filter
 *   Filter object.
 * @return {Boolean}
 *   Returns true if the node (or one of its parents) matches the filter and false if not.
 */
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

/**
 * Filter definitions.
 *
 * @type {Object}
 */
var filterDefinitions = {
  'at-rules': [
    { type: "atrule" } ],
  declarations: [
    { type: "decl" } ],
  functions: [
    { type: "atrule", property: { name: "name", value: "function" } } ],
  mixins: [
    { type: "atrule", property: { name: "name", value: "mixin" } },
    { type: "rule", property: { name: "selector", value: /\(.*\)/ } } ],
  rules: [
    { type: "rule" } ],
  silent: [
    { type: "atrule", property: { name: "name", value: "debug" } },
    { type: "atrule", property: { name: "name", value: "error" } },
    { type: "atrule", property: { name: "name", value: "function" } },
    { type: "atrule", property: { name: "name", value: "mixin" } },
    { type: "atrule", property: { name: "name", value: "warn" } },
    { type: "decl", property: { name: "prop", value: /^[$|@]/ } },
    { type: "rule", property: { name: "selector", value: /%/ } },
    { type: "rule", property: { name: "selector", value: /\(.*\)/ } } ],
  variables: [
    { type: "decl", property: { name: "prop", value: /^[$|@]/ } } ],
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

module.exports = postcssNodeExtract;
