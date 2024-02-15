import { ethers } from "hardhat"

async function main() {
  const BuyMeATea = await ethers.getContractFactory("BuyMeATea")
  const buyMeATea = await BuyMeATea.deploy()

  await buyMeATea.waitForDeployment()
  const buyMeATeaAddress = await buyMeATea.getAddress()
  console.log("BuyMeATea deployed to:", buyMeATeaAddress)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
