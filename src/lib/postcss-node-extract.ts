import { camelCase } from 'change-case';
import * as postcss from 'postcss';

import extractNodeRecursively = require('./extract-node-recursively');
import filterDefinitions = require('./filter-definitions');

import { IFilter } from '../interfaces/IFilter';
import { IFilterGroup } from '../interfaces/IFilterGroup';

/**
 * A PostCSS plugin for extracting nodes from CSS code.
 */
export = function postcssNodeExtract(filterNames: string|string[], customFilter: IFilterGroup) {
  const filterNamesArray = Array.isArray(filterNames) ? filterNames : [filterNames];
  filterDefinitions.custom = customFilter;

  return postcss.plugin(`postcss-node-extract`, () => (nodes) => {
    nodes.walk((rule) => {
      let filterRule = false;
      filterNamesArray.some((filterName) => {
        const filterNameCamelCase = camelCase(filterName);
        filterRule = extractNodeRecursively(rule, filterDefinitions[filterNameCamelCase]);
        return filterRule;
      });
      if (!filterRule) {
        rule.remove();
      }
    });
  });
};