import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { networkConfig } from "../hardhat-helper-config";
import {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATION,
} from "../hardhat-helper-config";
import { ethers } from "hardhat";
import verify from "../utils/verify";
//const {hre} = require("hardhat")

const deployRaffle: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = Number(network.config.chainId);
  let vrfCoordinatorV2Address, subscriptionId, blockConfirmations;
  const FUND_AMOUNT = "1000000000000000000000";

  if (developmentChains.includes(network.name)) {
    //subscribe and fund my mock vrf coordinator
    const myContract = await deployments.get("VRFCoordinatorV2Mock");
    const vrfCoordinatorV2 = await ethers.getContractAt(
      myContract.abi,
      myContract.address
    );
    vrfCoordinatorV2Address = vrfCoordinatorV2.address;
    const transactionResponse = await vrfCoordinatorV2.createSubscription();
    const transactionReciept = await transactionResponse.wait();
    subscriptionId = await transactionReciept.events[0].args.subId;
    blockConfirmations = 1;

    //fund subscription
    await vrfCoordinatorV2.fundSubscription(subscriptionId, FUND_AMOUNT);
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
    subscriptionId = networkConfig[chainId].subscriptionId;
    blockConfirmations = VERIFICATION_BLOCK_CONFIRMATION;
  }

  const args: any[] = [
    vrfCoordinatorV2Address,
    networkConfig[chainId].subscriptionId,
    networkConfig[chainId].gasLane,
    networkConfig[chainId].interval,
    networkConfig[chainId].raffleEnteranceFee,
    networkConfig[chainId].callBackGasLimit,
  ];

  log("-----------deploying Lottery-----");
 const raffle =  await deploy("Raffle", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: blockConfirmations,
  });

  log("------------Lottery deployed -------------");

  if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
    log("verifying contract")
    await verify(raffle.address,args);
  }
  log("contract verified ....");
  log("--------------------------------------");


};

export default deployRaffle;
deployRaffle.tags = ["all", "raffle"];
