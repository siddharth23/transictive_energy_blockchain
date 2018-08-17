
if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        }

app_abi=[ { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" }, { "name": "_cost", "type": "uint256" } ], "name": "set_bid", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "asks", "outputs": [ { "name": "owner", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "cost", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "consumers", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "producers", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get_role", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "bids", "outputs": [ { "name": "owner", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "cost", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_address", "type": "address" } ], "name": "set_producer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" }, { "name": "_cost", "type": "uint256" } ], "name": "set_ask", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_address", "type": "address" } ], "name": "set_consumer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]
app_contract=web3.eth.contract(app_abi)
app=app_contract.at('0x691b58a335053cd3704e2bf3d82328fab4693ee8');
console.log(app);
account_address="";
web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        account_address=account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
$(document).ready(function() {

$('#consumer_add').click(function(){
var consumer_address=$("#consumer_address").val();
console.log(consumer_address);
app.set_consumer(consumer_address,function(error,response){
if(error){
$('#error').html("Permission error!! You can't add new consumer");
}
$('#error').html("Successfully added Consumer");
});
});

$('#producer_add').click(function(){
var producer_address=$("#producer_address").val();
console.log(producer_address);
app.set_producer(producer_address,function(error,response){
if(error){
console.log(error);
$('#error').html("Permission error!! You can't add new producer");
}
$('#error').html("Successfully added Producer");
});
});

});