import { ethers } from "hardhat"

interface Memo {
  from: any
  timestamp: bigint
  name: string
  message: string
}

// Return the Ether balance of a given address
async function getBalance(address: any) {
  const balanceBigInt = await ethers.provider.getBalance(address)
  return ethers.formatEther(balanceBigInt)
}

// Log the Ether balances for a list of addresses
async function printBalances(addresses: any[]) {
  let idx = 0
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address))
    idx ++
  }
}

// Log the memos stored on-chain from purchases
async function printMemos(memos: Memo[]) {
  for (const memo of memos) {
    const timestamp = memo.timestamp
    const tipper = memo.name
    const tipperAddress = memo.from
    const message = memo.message
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`)
  }
}

async function main() {
  // Get example accounts
  const [owner, tipper, tipper2, tipper3] = await ethers.getSigners()

  // Get the contract to deploy
  const BuyMeATea = await ethers.getContractFactory("BuyMeATea")
  const buyMeATea = await BuyMeATea.deploy()

  // Deploy the contract
  await buyMeATea.waitForDeployment()
  const buyMeATeaAddress = await buyMeATea.getAddress()
  console.log("BuyMeATea deployed to:", buyMeATeaAddress)

  // Check balances before the coffee purchase
  const ownerAddress = await owner.getAddress()
  const tipperAddress = await tipper.getAddress()
  const addresses = [ownerAddress, tipperAddress, buyMeATeaAddress]
  console.log("== start ==")
  await printBalances(addresses)

  // Buy the owner a few coffees
  const tip = {value: ethers.parseEther("1")}
  await buyMeATea.connect(tipper).buyTea("Carolina", "You're the best!", tip)
  await buyMeATea.connect(tipper2).buyTea("Vitto", "Nice to meet u!", tip)
  await buyMeATea.connect(tipper3).buyTea("Kay", "I'm rich :)", tip)

  // Check balances after the coffee purchase
  console.log("== bought coffee ==")
  await printBalances(addresses)

  // Withdraw
  await buyMeATea.connect(owner).withdraw()

  // Check balances after withdrawal
  console.log("== withdraw ==")
  await printBalances(addresses)

  // Check out the memos
  console.log("== memos ==")
  const memos = await buyMeATea.getMemos()
  printMemos(memos)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })