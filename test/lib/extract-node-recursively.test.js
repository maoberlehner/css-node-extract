const expect = require(`chai`).expect;

const extractNodeRecursively = require(`../../dist/lib/extract-node-recursively`);

/** @test {extractNodeRecursively} */
describe(`extractNodeRecursively`, () => {
  it(`should be a function`, () => {
    expect(typeof extractNodeRecursively).to.equal(`function`);
  });

  it(`should return false if the node does not match a filter`, () => {
    const node = {};
    const filterGroup = [{ property: `type`, value: `atrule` }];
    expect(extractNodeRecursively(node, filterGroup)).to.equal(false);
  });

  it(`should return true if the node does match a filter`, () => {
    const node = { type: `atrule` };
    const filterGroup = [{ property: `type`, value: `atrule` }];
    expect(extractNodeRecursively(node, filterGroup)).to.equal(true);
  });

  it(`should return true if the nodes parent does match a filter`, () => {
    const node = { parent: { type: `atrule` } };
    const filterGroup = [{ property: `type`, value: `atrule` }];
    expect(extractNodeRecursively(node, filterGroup)).to.equal(true);
  });
});
