const hre = require("hardhat");

async function main() {
    const NFTMarketPlace = await hre.ethers.getContractFactory("NftMarketPlace");
    const nftMarketPlace = await NFTMarketPlace.deploy();

    await nftMarketPlace.deployed();

    console.log("Greeter deployed to:", nftMarketPlace.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });