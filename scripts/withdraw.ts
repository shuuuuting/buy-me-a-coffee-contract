import { ethers } from "hardhat"
import abi from "../artifacts/contracts/BuyMeATea.sol/BuyMeATea.json"

const { SEPOLIA_URL, ACCOUNT_KEY } = process.env

async function getBalance(provider: any, address: any) {
  const balanceBigInt = await provider.getBalance(address)
  return ethers.utils.formatEther(balanceBigInt)
}

async function main() {
  // Get the contract that has been deployed to Sepolia
  const contractAddress="0xe331Dd38436Ad4876cA4A79FcfB969b77015d94D"
  const contractABI = abi.abi

  // Get the node connection and wallet connection
  const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_URL)

  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error
  const signer = new ethers.Wallet(`${ACCOUNT_KEY}`, provider)

  // Instantiate connected contract
  const buyMeATea = new ethers.Contract(contractAddress, contractABI, signer)

  // Check starting balances
  console.log("Current balance of owner: ", await getBalance(provider, signer.address), "ETH")
  const contractBalance = await getBalance(provider, buyMeATea.address)
  console.log("Current balance of contract: ", await getBalance(provider, buyMeATea.address), "ETH")

  // Withdraw funds if there are funds to withdraw
  if (contractBalance !== "0.0") {
    console.log("Withdrawing funds..")
    const withdraw = await buyMeATea.withdraw()
    await withdraw.wait()
  } else {
    console.log("No funds to withdraw!")
  }

  // Check ending balance
  console.log("Current balance of owner: ", await getBalance(provider, signer.address), "ETH")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })