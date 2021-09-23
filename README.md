# APS1050 Pet Shop Truffle Summary

This box has all you need to get started with our [Pet Shop tutorial](http://truffleframework.com/tutorials/pet-shop).
## Features Description
### Pet’s Market
Pet’s market provides users available pets with name, breed, age and prices tagged, allowing them to choose and buy their favorite pet. Once a pet is bought by a customer, a ‘sold out’ tag will be marked below the pet’s picture.
### Pet’s Election
The election feature allow users vote for their favorite pet. A table of candidates is provided as well as the total vote count. Each user is only allowed to vote once.
### Pet’s Registration
The registration feature is complimentary to the pet’s election feature above, where users can register their candidates to participate in the election. Users are allowed to added candidates multiple times, but the breed of the candidates are limited to the 4 breeds provided. After user register the candidate, the web will redirect to the election page with the newly added candidate.
### Pet’s Donation
I transfer this feature from the SendMeEther learning from Web3Basics. Users can donate any amount Ether they have to the pet shop, their account address and balance will also be shown and rendered on the donation page.
### UI Enhancement
I also add a home page with a navigation bar of the 4 new features. Meanwhile, the account address and real-time balance are also added on each page.

## Dependencies
Node.js v16.0.0,
lite-server ^2.3.0,
Solidity ^0.5.0,
web3 v1.5.2,
Truffle v5.4.7,
Ganache 2.5.4,
Front end framework: JQuery


## Installation

1. Install Dependencies.
    ```javascript
    npm install
    ```

2. Open Ganache.
   Open the Ganache, and click on QUICKSTART to obtain a new workspace!

3. Install MetaMask
   Install MetaMask, import the ganache wallet and setup the network port to 7545

4. Compile and migrate the smart contracts. Truffle Migrate and Deploy
    ```javascript
    truffle compile
    truffle migrate
    ```

5. Run the `liteserver` development server (outside the development console) for front-end hot reloading. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run dev
    ```
 ## Testing
 
Open the root directory and run
```javascript
truffle test
```

