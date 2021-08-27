pragma solidity ^0.5.0;

contract Adoption {
address[16] public adopters; //Ethereum addresses-an unique type
// Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}
// Retrieving the adopters - update ui(pet adoption statuses)
function getAdopters() public view returns (address[16] memory) {
  return adopters;
}

}