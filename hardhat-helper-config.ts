import {ethers} from "hardhat";

export type NetworkConfig = {
    [key:number]:{
        name?:string,
        subscriptionId?:string,
        gasLane?:string,
        interval?:string,
        keepersUpdateInterval?:string,
        raffleEnteranceFee?:string,
        callBackGasLimit?:string,
        vrfCoordinatorV2?:string
    }
}

export const networkConfig:NetworkConfig = {
    11155111:{
        name:"sepolia",
        subscriptionId:"6124",
        gasLane:"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        interval:"30",
        keepersUpdateInterval:"30",
        raffleEnteranceFee:`${ethers.utils.parseEther("0.01")}`,
        callBackGasLimit:"500000",
        vrfCoordinatorV2:"0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625"
    },
    31337:{
        name:"localhost",
        subscriptionId:"6124",
        gasLane:"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        interval:"30",
        keepersUpdateInterval:"30",
        raffleEnteranceFee:`${ethers.utils.parseEther("0.01")}`,
        callBackGasLimit:"500000",

    }
}

export const developmentChains = ["localhost", "hardhat"];
export const VERIFICATION_BLOCK_CONFIRMATION = 6;



