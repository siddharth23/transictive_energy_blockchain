pragma solidity ^0.4.3;

contract TransictiveEnergy{
struct Bid{
address owner;
uint amount;
uint cost;
}

struct Ask{
address owner;
uint amount;
uint cost;
}
address owner;
        function TransictiveEnergy(){
            owner = msg.sender;
        }
modifier onlyOwner()
    {
        require(
            msg.sender == owner,
            "Sender not authorized."
        );
        // Do not forget the "_;"! It will
        // be replaced by the actual function
        // body when the modifier is used.
        _;
    }

mapping(address=>bool) public consumers;
mapping(address=>bool) public producers;

Bid[] public bids;
Ask[] public asks;
uint total_supply=0;
uint total_demand=0;
function set_consumer(address _address) onlyOwner public returns(bool)
{
consumers[_address]=true;
return true;
}

function set_producer(address _address) onlyOwner public returns(bool)
{
producers[_address]=true;
return true;
}


function get_role() view public returns(string){
if (consumers[msg.sender]){
return "consumer";
}
if (producers[msg.sender]){
return "producer";
}
else {return "none";}
}

modifier isConsumer() {
     require(
            consumers[msg.sender],
            "Sender not authorized."
        );
        // Do not forget the "_;"! It will
        // be replaced by the actual function
        // body when the modifier is used.
        _;
}

modifier isProducer() {
     require(
            producers[msg.sender],
            "Sender not authorized."
        );
        // Do not forget the "_;"! It will
        // be replaced by the actual function
        // body when the modifier is used.
        _;
}

function set_bid(uint _amount,uint _cost) public isConsumer returns(bool){
Bid memory b;
b.owner=msg.sender;
b.amount=_amount;
b.cost=_cost;
total_demand=total_demand+_amount;
for(uint i = 0; i < bids.length; i++) {
            if(bids[i].cost > _cost) {
                Bid[] memory tempBids = new Bid[](bids.length - i);
                for(uint j = i; j < bids.length; j++) {
                    tempBids[j-i] = bids[j];
                }
                bids[i] = b;
                bids.length = bids.length + 1;
                for(uint k = 0; k < tempBids.length; k++) {
                    bids[i+k+1] = tempBids[k];
                }
        
                return true;
            }
        }
        bids.push(b);
        return true;

}

function  set_ask(uint _amount,uint _cost) public isProducer returns(bool){
Ask memory a;
a.owner=msg.sender;
a.amount=_amount;
a.cost=_cost;
total_supply=total_supply+_amount;
 for (uint i = 0; i < asks.length; i ++) {
 if(asks[i].cost < _cost) {
                Ask[] memory tempAsks = new Ask[](asks.length - i);
                for (uint j = i; j < asks.length; j++) {
                    tempAsks[j-i] = asks[j];
                }
                asks[i] = a;
                asks.length = asks.length + 1;
                for (uint k = 0; k < tempAsks.length; k++) {
                    asks[i+k+1] = tempAsks[k];
                }
                return true;
            }
        }
        asks.push(a);
        return true;
}

// function balance_demand_and_supply(){
//     total_supply=0;
//     for (uint i = 0; j < asks.length; j++) {
//                     tempAsks[j-i] = asks[j];
//                 }
    
// }
}
