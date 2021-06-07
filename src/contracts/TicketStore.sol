pragma solidity 0.5.0;

import "./Color.sol";

contract TicketStore {
    Color private _festiTicket;

    constructor(Color festiTicket) public {
        _festiTicket = festiTicket;
    }

    function deposit (uint256 amount) payable external {
        require(msg.value == amount);
    }

    function getBalanceMoney() public view returns(uint) {
        return address(this).balance;
    }

    function receiveEthers() payable public  {
    }

    function buyTicket(string memory color) public returns (uint256) {
        uint256 tokenId = _festiTicket.mint(color, msg.sender);
        return tokenId;
    }
//
//    function() payable external {
//    }

}