// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NftMarketPlace is ERC721URIStorage {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.025 ether;

    address payable owner;

    mapping(uint => MarketItem) private idToMarketItem;

    struct MarketItem{
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() ERC721("Metaverse Tokens", "METT") {
       owner = payable(msg.sender);
    }

    function updateListingPrice(uint _price) public {
        listingPrice = _price;
    }
    function getListingPrice() public view returns(uint){
        return listingPrice;
    }

    function createToken(string memory tokenURI , uint price) public payable returns(uint){
        _tokenId.increment();
        
        uint newTokenId = _tokenId.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId , tokenURI);

        createMarketItem(newTokenId , price);

        return newTokenId;
    }

    function createMarketItem(uint tokenId , uint price) private {
        require(price > 0 , "price should be atlease 1");
        require(msg.value == listingPrice , "Price should be equal to listing price");

        idToMarketItem[tokenId] = MarketItem(
            tokenId ,
            payable(msg.sender),
            payable(address(this)),
            price ,
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    function reSellToken(uint tokenId , uint price) public payable{
        require(idToMarketItem[tokenId].owner == msg.sender , "You are not the owner for the item");
        require(msg.value == listingPrice , "Price should be equal to listing price");

        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    } 

    function createMarketSale(uint tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;
        require(msg.value == price , "please submit the asking price");
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        idToMarketItem[tokenId].price = price;
        _itemsSold.increment();
        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint itemCount = _tokenId.current();
        uint unsoldItems = itemCount - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItems);

        for (uint256 i = 0; i < itemCount; i++) {
            if(idToMarketItem[i+1].owner == address(this) ){
                uint currentId = i+ 1;

                MarketItem storage currentitem = idToMarketItem[currentId];
                items[currentIndex] = currentitem;
                currentIndex++;
            }
        }

        return items;
    }

    function fetchMyNfts() public view returns(MarketItem[] memory){
        uint totalitemCount = _tokenId.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint256 i = 0; i < totalitemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender){
                itemCount++;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalitemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender){
                uint currentId = i+ 1;

                MarketItem storage currentitem = idToMarketItem[currentId];
                items[currentIndex] = currentitem;
                currentIndex++;
            }
        }
        return items;
    }

    function fetchItemsListed() public view returns(MarketItem[] memory){
        uint totalitemCount = _tokenId.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint256 i = 0; i < totalitemCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender){
                itemCount++;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalitemCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender){
                uint currentId = i+ 1;

                MarketItem storage currentitem = idToMarketItem[currentId];
                items[currentIndex] = currentitem;
                currentIndex++;
            }
        }
        return items;
    }
}