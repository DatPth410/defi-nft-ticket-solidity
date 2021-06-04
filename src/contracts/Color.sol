pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Color is ERC721Full{
    using Counters for Counters.Counter;

    string[] public colors;
    mapping(string => bool) _colorExists;
    uint32 private _maxAmount;
    uint256 private _ticketPrice;
    Counters.Counter private _tokenIdTracker;

    constructor(uint256 ticketPrice, uint32 maxAmount) ERC721Full("Color", "COLOR") public{
        require(maxAmount > 0);
        _maxAmount = maxAmount;
        _ticketPrice = ticketPrice;
    }

    function mint(string memory _color, address _buyer) public returns (uint256){
        require(!_colorExists[_color]);
        require(_tokenIdTracker.current() < _maxAmount);
        uint256 tokenId = _tokenIdTracker.current();
        uint _id = colors.push(_color);
        _mint(_buyer, _id);
        _colorExists[_color] = true;
        _tokenIdTracker.increment();
        return tokenId;
    }

    function getTicketPrice() external view returns (uint256) {
        return _ticketPrice;
    }

    function getTicketTotal() external view returns (uint256) {
        return _tokenIdTracker.current();
    }

    function ticketsAvailable() external view returns (bool) {
        return _tokenIdTracker.current() <= _maxAmount;
    }
}