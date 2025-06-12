const { ethers } = require("hardhat");

async function main() {
    const Campaign = await ethers.getContractFactory("Campaign");

// ✅ Передаём companyId
    const campaign = await Campaign.deploy(1);
    await campaign.waitForDeployment();

    console.log("✅ Контракт задеплоен по адресу:", campaign.target);


    console.log("✅ Контракт задеплоен по адресу:", campaign.target);
}

main().catch(console.error);
