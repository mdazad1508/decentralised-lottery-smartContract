import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import {developmentChains} from "../hardhat-helper-config"

const deployMocks:DeployFunction = async(hre:HardhatRuntimeEnvironment)=>{

    const {deployments,getNamedAccounts,network} = hre;
    const {deploy,log}  = deployments;
    const {deployer} =await getNamedAccounts();
    const chainId = network.config.chainId;

    const BASE_FEE = "250000000000000000" // 0.25 is this the premium in LINK?
    const GAS_PRICE_LINK = 1e9 // link per gas, is this the gas lane? // 0.000000001 LINK per gas


    if(developmentChains.includes(network.name)){
        //deploy mocks 
        log("--------------DEPLOYING MOCKS-----------------")
        await deploy("VRFCoordinatorV2Mock",{
            from:deployer,
            log:true,
            args:[BASE_FEE,GAS_PRICE_LINK],
            waitConfirmations:1
        })

        log(".......Mocks deployed.......")
        log("You are deploying to a local network, you'll need a local network running to interact");
        log("----------------------------------");
    }

}

export default deployMocks;
deployMocks.tags =["all","mocks"];