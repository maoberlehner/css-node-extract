import filterDefinitions = require('../../src/lib/filter-definitions');

describe(`filterDefinitions()`, () => {
  test(`It should be an object.`, () => expect(typeof filterDefinitions).toBe(`object`));
});
