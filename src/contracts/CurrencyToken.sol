pragma solidity 0.5.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CurrencyToken is ERC20 {
    string public name = "DatCoin";
    string public symbol = "DCO";
    uint8 public decimals = 0;
    uint public INITIAL_SUPPLY = 1000000;

    constructor() public {
        _mint(msg.sender, 1000000);
    }
}
