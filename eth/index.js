const express = require("express");
const { ethers } = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const campaignAbi = require("./artifacts/contracts/Campaign.sol/Campaign.json").abi;
const campaignBin = require("./artifacts/contracts/Campaign.sol/Campaign.json").bytecode;

// 🚀 Деплой смарт-контракта
app.post("/deploy", async (req, res) => {
    try {
        const { companyId } = req.body;
        const factory = new ethers.ContractFactory(campaignAbi, campaignBin, wallet);
        const contract = await factory.deploy(companyId);
        await contract.waitForDeployment();
        res.send({ address: contract.target });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// 💸 Донат
app.post("/donate", async (req, res) => {
    try {
        const { address, amount } = req.body;
        const contract = new ethers.Contract(address, campaignAbi, wallet);
        const tx = await contract.donate({ value: ethers.parseEther(amount.toString()) });
        await tx.wait();
        res.send({ message: "✅ Донат отправлен", txHash: tx.hash });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// 💰 Баланс
app.get("/balance", async (req, res) => {
    try {
        const { address } = req.query;
        const contract = new ethers.Contract(address, campaignAbi, wallet);
        const balance = await contract.getBalance();
        res.send({ balance: ethers.formatEther(balance) });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// 📜 Получить все донаты
app.get("/donations", async (req, res) => {

    try {

        // console.log(req)
        const { address } = req.query;
        const contract = new ethers.Contract(address, campaignAbi, wallet);
        const donations = await contract.getAllDonations();
        const serializedDonations = donations.map(d => ({
            donor: d.donor,
            amount: d.amount.toString()
        }));
        console.log(serializedDonations)
        res.send({ donations: serializedDonations });
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ error: err.message });
    }
});

// 🏦 Вывод средств
app.post("/withdraw", async (req, res) => {
    try {
        const { address } = req.body;
        const contract = new ethers.Contract(address, campaignAbi, wallet);
        const tx = await contract.withdraw();
        await tx.wait();
        res.send({ message: "✅ Средства выведены", txHash: tx.hash });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(8070, () => {
    console.log("🚀 API запущено на http://localhost:8070");
});
