'use strict';

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

module.exports = extractNodeRecursively;
