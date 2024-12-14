const hre = require("hardhat");

async function main() {
    await hre.run('compile');
    const Tracking = await hre.ethers.getContractFactory("Tracking");
    const tracking = await Tracking.deploy();
    await tracking.waitForDeployment();
    console.log("Tracking contract deployed to:", tracking.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
    // Tracking contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3