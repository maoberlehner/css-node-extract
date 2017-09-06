const expect = require(`chai`).expect;

const nodeMatchesFilter = require(`../../dist/lib/node-matches-filter`);

/** @test {nodeMatchesFilter} */
describe(`nodeMatchesFilter`, () => {
  it(`should be a function`, () => {
    expect(typeof nodeMatchesFilter).to.equal(`function`);
  });

  it(`should return false if the node does not match the filter`, () => {
    const node = {};
    const filter = { property: `type`, value: `atrule` };
    expect(nodeMatchesFilter(node, filter)).to.equal(false);
  });

  it(`should return true if the node does match the filter`, () => {
    const node = { type: `atrule` };
    const filter = { property: `type`, value: `atrule` };
    expect(nodeMatchesFilter(node, filter)).to.equal(true);
  });

  it(`should return true if the node does match the regex filter`, () => {
    const node = { type: `atrule` };
    const filter = { property: `type`, value: /rule/ };
    expect(nodeMatchesFilter(node, filter)).to.equal(true);
  });
});
