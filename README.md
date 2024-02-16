# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

#### Try running some of the following tasks:
```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

#### Test in local env:
```shell
yarn hardhat run scripts/verify.ts
yarn hardhat run scripts/deploy.ts
```

#### Test on sepolia testnet:
```shell
yarn hardhat run scripts/deploy.ts --network sepolia
yarn hardhat run scripts/withdraw.js 
(not adding --network sepolia flag cuz network config is hard-coded inside the script)
```
