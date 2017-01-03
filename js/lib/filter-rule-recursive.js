export default function filterRuleRecursive(rule, filter) {
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
