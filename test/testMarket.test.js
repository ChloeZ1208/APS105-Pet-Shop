
const Market = artifacts.require("Market"); // importing contract using artifacts.require

contract("Market", (accounts) => {
 let market;
 let expectedBuyer;

 before(async () => {
     market = await Market.deployed();
 });

 describe("buying a pet and retrieving account addresses", async () => {
   before("buy a pet using accounts[0]", async () => {
     await market.buy(3, { from: accounts[0], value: web3.utils.toWei('0.15', 'Ether') });
     expectedBuyer = accounts[0];
   });

   it("can fetch the address of an successful buyer(with correct price) by pet id", async () => {
    const buyer = await market.buyers(3);
    assert.equal(buyer, expectedBuyer, "The owner of the sold pet should be the third account.");
  });
  it("can fetch the collection of all pet owners' addresses", async () => {
    const buyers = await market.getBuyers();
    assert.equal(buyers[3], expectedBuyer, "The owner of the sold pet should be in the collection.");
   })
 });
});
