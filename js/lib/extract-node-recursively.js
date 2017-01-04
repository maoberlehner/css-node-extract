export default function extractNodeRecursively(node, filter) {
  if (node.parent && node.parent.type !== `root`) return extractNodeRecursively(node.parent, filter);

  if (filter.type && filter.type !== node.type) return false;
  if (filter.property && !node[filter.property.name]) return false;

  if (filter.property) {
    const ruleHasProperty = node[filter.property.name] === filter.property.value ||
      node[filter.property.name].match(filter.property.value);
    if (ruleHasProperty) {
      return true;
    }
  } else if (filter.type && filter.type === node.type) {
    return true;
  }

  return false;
}
