const { ethers } = require("hardhat");

async function main() {
    const factoryAddress = require("../deployedFactory.json").address;

    const Factory = await ethers.getContractFactory("CampaignFactory");
    const factory = await Factory.attach(factoryAddress);

    const title = "Сбор на оборудование";
    const description = "Покупка ноутбуков для учеников в сельской школе";
    const goalEth = "2.5"; // ETH
    const goal = ethers.parseEther(goalEth);

    const now = Math.floor(Date.now() / 1000);
    const start = now - 6000; // старт через 1 минуту
    const end = now + 60 * 60 * 24 * 10; // через 10 дней
    const companyId = 42;

    console.log("🚀 Создаём кампанию:");
    console.log({ title, goal: goal.toString(), start, end, companyId });

    const tx = await factory.createCampaign(
        title,
        description,
        goal,
        start,
        end,
        companyId
    );

    const receipt = await tx.wait();
    const event = receipt.logs.find(log => log.fragment?.name === "CampaignCreated");

    if (event) {
        console.log("✅ Кампания создана по адресу:", event.args.campaign);
    } else {
        console.log("⚠️ Кампания создана, но событие не поймано.");
    }
}

main().catch(console.error);
