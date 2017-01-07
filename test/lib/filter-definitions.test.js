/* eslint-env node, mocha */
import { expect } from 'chai';

import filterDefinitions from '../../js/lib/filter-definitions';

/** @test {filterDefinitions} */
describe(`filterDefinitions`, () => {
  it(`should be an object`, () => expect(filterDefinitions).to.be.an(`Object`));
});
