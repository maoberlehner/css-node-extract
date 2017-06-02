'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var postcss = _interopDefault(require('postcss'));

/**
 * Check if a node matches the given filter.
 */
function nodeMatchesFilter(node, filter) {
  if (!node[filter.property]) return false;
  if (node[filter.property] === filter.value) return true;
  if (filter.value instanceof RegExp && filter.value.test(node[filter.property])) return true;
  return false;
}

/**
 * Whiteliste a node if it (or one of the nodes parents) matches the given filter.
 */
function extractNodeRecursively(node, filterGroups) {
  if (node.parent && node.parent.type !== 'root') return extractNodeRecursively(node.parent, filterGroups);

  var extractNode = false;

  filterGroups.some(function (groupOrFilter) {
    var filterGroup = Array.isArray(groupOrFilter) ? groupOrFilter : [groupOrFilter];
    extractNode = filterGroup.filter(function (filter) {
      return !nodeMatchesFilter(node, filter);
    }).length === 0;
    return extractNode;
  });

  return extractNode;
}

/**
 * Filter definitions.
 */
var filterDefinitions = {
  'at-rules': [{ property: 'type', value: 'atrule' }],
  declarations: [{ property: 'type', value: 'decl' }],
  functions: [[{ property: 'type', value: 'atrule' }, { property: 'name', value: 'function' }]],
  mixins: [[{ property: 'type', value: 'atrule' }, { property: 'name', value: 'mixin' }], [{ property: 'type', value: 'rule' }, { property: 'selector', value: /\(.*\)/ }]],
  rules: [{ property: 'type', value: 'rule' }],
  silent: [[{ property: 'type', value: 'atrule' }, { property: 'name', value: 'debug' }], [{ property: 'type', value: 'atrule' }, { property: 'name', value: 'error' }], [{ property: 'type', value: 'atrule' }, { property: 'name', value: 'function' }], [{ property: 'type', value: 'atrule' }, { property: 'name', value: 'mixin' }], [{ property: 'type', value: 'atrule' }, { property: 'name', value: 'warn' }], [{ property: 'type', value: 'decl' }, { property: 'prop', value: /^[$|@]/ }], [{ property: 'type', value: 'rule' }, { property: 'selector', value: /%/ }], [{ property: 'type', value: 'rule' }, { property: 'selector', value: /\(.*\)/ }]],
  variables: [[{ property: 'type', value: 'decl' }, { property: 'prop', value: /^[$|@]/ }]]
};

/**
 * A PostCSS plugin for extracting nodes from CSS code.
 */
function postcssNodeExtract() {
  var filterNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var customFilter = arguments[1];

  var filterNamesArray = Array.isArray(filterNames) ? filterNames : [filterNames];
  filterDefinitions.custom = customFilter;

  return postcss.plugin('postcss-node-extract', function () {
    return function (nodes) {
      nodes.walk(function (rule) {
        var filterRule = false;
        filterNamesArray.some(function (filterName) {
          filterRule = extractNodeRecursively(rule, filterDefinitions[filterName]);
          return filterRule;
        });
        if (!filterRule) rule.remove();
      });
    };
  });
}

/**
 * Synchronously extract nodes from a string.
 */
var processSync = function processSync(_ref) {
  var css = _ref.css,
      filters = _ref.filters,
      customFilter = _ref.customFilter,
      postcssSyntax = _ref.postcssSyntax;
  return postcss(postcssNodeExtract(filters, customFilter)).process(css, { syntax: postcssSyntax }).css;
};

/**
 * Asynchronously extract nodes from a string.
 */
var process = function process(options) {
  return new Promise(function (resolve) {
    var result = processSync(options);
    resolve(result);
  });
};

/**
 * cssNodeExtract
 */
var index = {
  process: process,
  processSync: processSync
};

exports.processSync = processSync;
exports.process = process;
exports['default'] = index;
