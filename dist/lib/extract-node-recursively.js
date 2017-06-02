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

module.exports = extractNodeRecursively;
