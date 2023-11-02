import { run } from "hardhat";

const verify = async(contractAdress:string,args:any[])=>{
    console.log("verifying deployed contract ...");
    try{
        await run("verify:verify",{
             address:contractAdress,
             constructorArguments: args,
        })
    }catch(e:any){
        if(e.message.includes("already verified")){
            console.log("contract already verified")
        }else{
            console.log(e);
        }

    }
}

export default verify;