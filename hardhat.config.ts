import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import dotenv from "dotenv"
import { HardhatUserConfig } from "hardhat/config"
dotenv.config()

const { SEPOLIA_URL, ACCOUNT_KEY } = process.env

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_URL,
      accounts: [`${ACCOUNT_KEY}`]
    }
  }
}

export default config
