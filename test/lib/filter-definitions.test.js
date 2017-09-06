const expect = require(`chai`).expect;

const filterDefinitions = require(`../../dist/lib/filter-definitions`);

/** @test {filterDefinitions} */
describe(`filterDefinitions`, () => {
  it(`should be an object`, () => expect(filterDefinitions).to.be.an(`Object`));
});
