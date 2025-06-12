// 📦 /api/donate.js
const express = require("express");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const ABI = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../artifacts/contracts/Campaign.sol/Campaign.json"))
).abi;

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// ✅ Маршрут для отправки пожертвования
app.post("/donate", async (req, res) => {
    try {
        const tx = await contract.donate({ value: ethers.parseEther("0.1") });
        await tx.wait();
        res.send("✅ Пожертвование отправлено!");
    } catch (e) {
        console.error(e);
        res.status(500).send("❌ Ошибка транзакции");
    }
});

app.listen(3001, () => {
    console.log("🚀 API запущен на http://localhost:3001");
});
