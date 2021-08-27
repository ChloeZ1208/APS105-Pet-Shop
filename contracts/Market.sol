pragma solidity ^0.5.0;

contract Market {
address[16] public buyers; //Ethereum addresses-an unique type
// Buying a pet
function buy(uint petId) external payable returns (uint) {
  require(petId >= 0 && petId <= 15);

  buyers[petId] = msg.sender;

  return petId;
}
// Retrieving the buyers - update ui(pet sell statuses)
function getBuyers() public view returns (address[16] memory) {
  return buyers;
}

}