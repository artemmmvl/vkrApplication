const fs = require("fs");

// Путь до JSON-файла Hardhat
const inputPath = "artifacts/contracts/Campaign.sol/Campaign.json";
const artifact = JSON.parse(fs.readFileSync(inputPath, "utf8"));

// ABI
if (artifact.abi) {
    fs.writeFileSync("Campaign.abi", JSON.stringify(artifact.abi, null, 2));
    console.log("✅ ABI сохранён → Campaign.abi");
} else {
    console.error("❌ ABI не найден");
}

// Bytecode
const bytecode = artifact.deployedBytecode || artifact.bytecode;
if (bytecode) {
    fs.writeFileSync("Campaign.bin", bytecode);
    console.log("✅ BIN сохранён → Campaign.bin");
} else {
    console.error("❌ Bytecode не найден");
}
