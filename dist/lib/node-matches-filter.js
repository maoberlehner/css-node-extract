'use strict';

/**
 * Check if a node matches the given filter.
 */
function nodeMatchesFilter(node, filter) {
  if (!node[filter.property]) return false;
  if (node[filter.property] === filter.value) return true;
  if (filter.value instanceof RegExp && filter.value.test(node[filter.property])) return true;
  return false;
}

module.exports = nodeMatchesFilter;
