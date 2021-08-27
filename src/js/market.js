App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        //petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-buy').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {

    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
    // Request account access
        await window.ethereum.enable();
      } catch (error) {
    // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Market.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var MarketArtifact = data;
      App.contracts.Market = TruffleContract(MarketArtifact);
    
      // Set the provider for our contract
      App.contracts.Market.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the bought pets
      return App.markSoledout();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleBuy);
  },

  markSoledout: function(buyers, account) {
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Address: " + account);
        web3.eth.getBalance(account, function(err, balance) {
          if (err === null) {
            $("#accountBalance").html("Balance: " + web3.fromWei(balance, "Ether") + " ETH");
          }
        })
      }
    })

    var buyInstance;

    App.contracts.Market.deployed().then(function(instance) {
      buyInstance = instance;
    
      return buyInstance.getBuyers.call();
    }).then(function(buyers) {
      for (i = 0; i < buyers.length; i++) {
        if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Sold Out').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleBuy: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var buyInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Market.deployed().then(function(instance) {
        buyInstance = instance;
    
        // Execute buy as a transaction by sending account
        return buyInstance.buy(petId, {from: account, value: window.web3.toWei('20', 'ether')});
      }).then(function(result) {
        return App.markSoledout();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
