const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const Factory = await ethers.getContractFactory("CampaignFactory");
    const factory = await Factory.deploy();
    await factory.waitForDeployment();

    console.log("✅ Фабрика задеплоена по адресу:", factory.target);

    fs.writeFileSync("deployedFactory.json", JSON.stringify({
        address: factory.target
    }, null, 2));
}

main().catch(console.error);
