import React, { useState, useEffect } from "react";

import DropDown from "../../components/DropDown";
import Wrapper from "../../routes/Wrapper";
import { ArrowDownIcon } from "../../assets/Icons";
import {
  cont_address,
  cont_abi,
  tokenABI,
  ppkt_address,
  usdt_address
} from "../../config";
import Web3 from "web3";

import { useLocation } from "react-router-dom";

import { CopyIcon, RocketIcon2 } from "../../assets/Icons";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction, usePublicClient } from 'wagmi'
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
const Main = () => {
  const [selectedPay, setSelectedPay] = useState();
  const [selectedReceive, setSelectedReceive] = useState();

  const [send_token_amount, set_send_token_amount] = useState("");
  const [recieve_token_amount, set_recieve_token_amount] = useState("0");

  const [matic_in_dollar, set_matic_in_dollar] = useState("0");
  const [usdt_balance, set_usdt_balance] = useState("0");
  const [ppkt_balance, set_ppkt_balance] = useState("0");
  const [matic_balance, set_matic_balance] = useState("0");


  const { address, isConnecting ,isDisconnected} = useAccount()
  const { chain } = useNetwork()

  const [Expected_return, set_Expected_return] = useState(0);




  const tokensList = [
    { title: "USDT", icon: "./images/USDT.png",address: usdt_address },
    { title: "MATIC", icon: "./images/MATIC.png",address: "" },
    { title: "PPKT", icon: "./images/PPKT.png",address: ppkt_address },
  ];

  const filteredTokensList = tokensList.filter(
    (item) =>
      item.title !== selectedReceive?.title &&       item.title !== selectedPay?.title

  );


  const CHAIN_ID = "80001";
  const CHAIN_ID1 = "0x13881";

  useEffect(() => {
    mount();
  }, []);

  const {
    data: swapResult,
    isLoading: isLoading_swap,
    isSuccess: swapSuccess,
    write: token_to_token,
  } = useContractWrite({
    address: cont_address,
    abi: cont_abi,
    functionName: 'token_to_token',
    args: [selectedPay?(selectedPay.address):(null),selectedPay? (selectedPay.title=="PPKT"?( Convert_To_Wei(send_token_amount?(send_token_amount):("0"))):((Number(send_token_amount?(send_token_amount):("0")))*10**6)):(0)],
    onSuccess(data) {
      mount();
      console.log('Success', data)
    },
  });


  const {
    data: maticToTokenResult,
    isLoading: isLoading_maticToToken,
    isSuccess: maticToTokenSuccess,
    write: maticToToken,
  } = useContractWrite({
    address: cont_address,
    abi: cont_abi,
    functionName: 'matic_to_token',
    args: [selectedReceive?(selectedReceive.title=="USDT"?("2"):("1")):("")],
    value: Convert_To_Wei(send_token_amount?(send_token_amount):("0")),
    onSuccess(data) {
      mount();
      console.log('Success', data)
    },
  });



  const {
    data: TokenToMaticResult,
    isLoading: isLoading_TokenToMatic,
    isSuccess: TokenToMaticSuccess,
    write: TokenToMatic,
  } = useContractWrite({
    address: cont_address,
    abi: cont_abi,
    functionName: 'token_to_matic',
    args: [selectedPay? (selectedPay.title=="PPKT"?(ppkt_address):(usdt_address)):(null),selectedPay? (selectedPay.title=="PPKT"?( Convert_To_Wei(send_token_amount?(send_token_amount):("0"))):(send_token_amount?(send_token_amount*10**6):("0"))):("0")],
    onSuccess(data) {
      mount();
      console.log('Success', data)
    },
  });

  const { config: usdtConfig } = usePrepareContractWrite({
    address: usdt_address,
    abi: tokenABI,
    functionName: "approve",
    args: [cont_address,(Number(send_token_amount))*10**6],
  });
  
  const { config: PPKTConfig } = usePrepareContractWrite({
    address: ppkt_address,
    abi: tokenABI,
    functionName: "approve",
    args: [cont_address,Convert_To_Wei((send_token_amount?(send_token_amount):("0")))],
  });






  const {
    data: data_token,
    isLoading: isLoading_token,
    isSuccess: isSuccess_token,
    write: approval_token,
    } = useContractWrite(PPKTConfig);
    
    const {
      data: data_ttm,
      isLoading: isLoading_ttm,
      isSuccess: isSuccess_ttm,
      write: approval_token_ttm,
      } = useContractWrite(PPKTConfig);

    const {
      data: data_usdt,
      isLoading: isLoading_usdt,
      isSuccess: isSuccess_usdt,
      write: usdt_approval,
    } = useContractWrite(usdtConfig);

    const {
      data: data_usdt_ttm,
      isLoading: isLoading_usdt_ttm,
      isSuccess: isSuccess_usdt_ttm,
      write: usdt_approval_ttm,
    } = useContractWrite(usdtConfig);


    const {switchNetwork:swap_switch_usdt_ttm } =
    useSwitchNetwork({
      chainId: CHAIN_ID1,
      // throwForSwitchChainNotSupported: true,
      onSuccess(){
    
        usdt_approval_ttm?.();
      }
    
      
    
    })
    const {switchNetwork:swap_switch_ppkt_ttm} =
    useSwitchNetwork({
      chainId: CHAIN_ID1,
      // throwForSwitchChainNotSupported: true,
      onSuccess(){
    
        approval_token_ttm?.();
      }
    
      
    
    })


    const {switchNetwork:swap_switch_usdt } =
useSwitchNetwork({
  chainId: CHAIN_ID1,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    usdt_approval?.();
  }

  

})
const {switchNetwork:swap_switch_ppkt } =
useSwitchNetwork({
  chainId: CHAIN_ID1,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    approval_token?.();
  }

  

})

const {switchNetwork:swap_switch_maticToToken } =
useSwitchNetwork({
  chainId: CHAIN_ID1,
  // throwForSwitchChainNotSupported: true,
  onSuccess(){

    maticToToken?.();
  }

  

})


const waitForTransaction_ttm = useWaitForTransaction({
  hash: data_usdt_ttm?.hash,
  onSuccess(data) {
    TokenToMatic?.();
    console.log("Success", data);
  },
});
const waitForTransaction_ppkt_ttm = useWaitForTransaction({
  hash: data_ttm?.hash,
  onSuccess(data) {
    TokenToMatic?.();
    console.log("Success", data);
  },
});




const waitForTransaction_buy = useWaitForTransaction({
  hash: data_usdt?.hash,
  onSuccess(data) {
    token_to_token?.();
    console.log("Success", data);
  },
});
const waitForTransaction_sell = useWaitForTransaction({
  hash: data_token?.hash,
  onSuccess(data) {
    token_to_token?.();
    console.log("Success", data);
  },
});

async function mount() {
  if (isDisconnected) {
    return;
  }
  try {
    console.log("my balanace mount "+address);

    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com"));

    const balance = await web3.eth.getBalance(address);


    const networkId = await web3.eth.net.getId();

    const contract = new web3.eth.Contract(cont_abi, cont_address);
    const contract_ppkt = new web3.eth.Contract(tokenABI, ppkt_address);
    const contract_usdt = new web3.eth.Contract(tokenABI, usdt_address);
    console.log("my balanace mount1 ");

    let ppkt_balance = await contract_ppkt.methods.balanceOf(address).call();
    console.log("my balanace  ppkt"+ ppkt_balance);

    let usdt_balance = await contract_usdt.methods.balanceOf(address).call();
    let matic_in_dollar = await contract.methods.getLatestPrice().call();
    console.log("my balanace  usdt"+ usdt_balance);

    set_matic_in_dollar(matic_in_dollar);
    setSelectedPay(tokensList[0])
    setSelectedReceive(tokensList[2])
    set_usdt_balance(usdt_balance)
    set_ppkt_balance(ppkt_balance)
    set_matic_balance(balance)

  }
  catch(e){

  }
}
function Convert_To_Wei(val) {
  const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com"));

  val = web3.utils.toWei(val.toString(), "ether");
  return val;
}

function onSend_expected_reciving(value) 
{
  if((selectedReceive.title == "USDT" && selectedPay.title =="PPKT") || (selectedReceive.title == "PPKT" && selectedPay.title =="USDT") )
  {
    set_recieve_token_amount(value)
  }
  else   if(((selectedReceive.title == "USDT" ||selectedReceive.title == "PPKT") && selectedPay.title =="MATIC")){
    set_recieve_token_amount((((Number(matic_in_dollar))/10**18)*value))
  }
  else if((selectedReceive.title == "MATIC" && (selectedPay.title =="USDT" || selectedPay.title =="PPKT")) )
  {
    // alert(matic_in_dollar*value)
    set_recieve_token_amount((Number(value)/((Number(matic_in_dollar))/10**18)))

    // set_recieve_token_amount((matic_in_dollar*value)/10**18)
  }
}


function onRecieve_expected_reciving(value) 
{
  if((selectedReceive.title == "USDT" && selectedPay.title =="PPKT") || (selectedReceive.title == "PPKT" && selectedPay.title =="USDT") )
  {
    set_send_token_amount(value)
  }
  else if(((selectedReceive.title == "USDT" ||selectedReceive.title == "PPKT") && selectedPay.title =="MATIC")){
    set_send_token_amount((Number(value)/((Number(matic_in_dollar))/10**18)))

  }
  else if((selectedReceive.title == "MATIC" && (selectedPay.title =="USDT" || selectedPay.title =="PPKT")) )
  {
    // alert(matic_in_dollar*value)
    set_send_token_amount((((Number(matic_in_dollar))/10**18)*value))

    // set_recieve_token_amount((matic_in_dollar*value)/10**18)
  }
}


function swap()
{
  if(isDisconnected)
  {
    alert("Kindly connect your wallet");
    return;
  }
  if((selectedReceive.title == "USDT" && selectedPay.title =="PPKT") || (selectedReceive.title == "PPKT" && selectedPay.title =="USDT") )
  {
    if(selectedPay.title =="PPKT")
    {
      if(Number(ppkt_balance)< Number(Convert_To_Wei(send_token_amount)))
      {
        alert("You don't have enough PPKT");
        return;
      }

      if(CHAIN_ID!=chain.id)
      {
        swap_switch_ppkt?.();
      }
      else{
        approval_token?.()
      }

    }
    else if(selectedPay.title =="USDT")
    {
      console.log("object usdt");
      if(Number(usdt_balance)< Number(send_token_amount)*10**6)
      {
        alert("You don't have enough USDT");
        return;
      }

      if(CHAIN_ID!=chain.id)
      {
        console.log("object swit");

        swap_switch_usdt?.();
      }
      else{
        usdt_approval?.();
      }
    } 


    // token to token
  }
  else if(((selectedReceive.title == "USDT" ||selectedReceive.title == "PPKT") && selectedPay.title =="MATIC")){
     // matic to token
     if((matic_balance)< Number(send_token_amount)*10**18)
     {
       alert("You don't have enough Matic");
       return;
     }
     
     if(CHAIN_ID!=chain.id)
     {
       swap_switch_maticToToken?.();
     }
     else{
      alert("ymatic "+( recieve_token_amount)*10**6);

      maticToToken?.();
     }

  }
  else if((selectedReceive.title == "MATIC" && (selectedPay.title =="USDT" || selectedPay.title =="PPKT")) )
  {
    //token to matic

    if(selectedPay.title =="PPKT")
    {
      if(Number(ppkt_balance)< Number(Convert_To_Wei(send_token_amount)))
      {
        alert("You don't have enough PPKT");
        return;
      }

      if(CHAIN_ID!=chain.id)
      {
        swap_switch_ppkt_ttm?.();
      }
      else{
        approval_token_ttm?.()
      }

    }
    else if(selectedPay.title =="USDT")
    {
      console.log("object usdt");
      if(Number(usdt_balance)< Number(send_token_amount)*10**6)
      {
        alert("You don't have enough USDT");
        return;
      }

      if(CHAIN_ID!=chain.id)
      {
        swap_switch_usdt_ttm?.();
      }
      else{
        usdt_approval_ttm?.();
      }
    } 

  }

}





  return (
    <Wrapper>
      <div className="lading-page bg-themeColor2 h-screen flex">
        <div className="wrap wrapWidth flex items-center justify-center">
          <div className="page-block flex flex-col">
            <div className="page-hdr flex items-center justify-center flex-col">
              <h1 className="title">PPK Swapping</h1>
              <p className="page-desc">
                Earn PPK tokens by Swaping PPK tokens and multiply your holdings
              </p>
            </div>
            <div className="swap-box flex flex-col">
              <label className="box-lbl mb-2">Swap</label>
              <div className="pay-block flex flex-col items-center justify-center relative">
                <div className="pay-section flex items-center">
                  <div className="left flex flex-col">
                    <div className="input-field flex flex-col">
                      <label className="field-lbl">You pay</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="txt cleanbtn w-1/2 my-2"
                        value={send_token_amount}
                        onChange={(e)=>{
                           set_send_token_amount(e.target.value);
                           onSend_expected_reciving(e.target.value)
                        }}  
                        
                      />
                      {/* <h1 className="val">{}</h1> */}
                    </div>
                  </div>
                  <div className="right flex items-center">
                    <DropDown
                      selected={selectedPay}
                      setSelected={setSelectedPay}
                      filteredTokensList={filteredTokensList}
                      onSend_expected_reciving={onSend_expected_reciving}
                      onRecieve_expected_reciving={onRecieve_expected_reciving}
                      send_token_amount={send_token_amount}
                    />
                  </div>
                </div>
                <div className="arrow-down-icon absolute  flex items-center justify-center">
                  <ArrowDownIcon />
                </div>
                <div className="pay-section flex items-center">
                  <div className="left flex flex-col">
                    <div className="input-field flex flex-col">
                      <label className="field-lbl">You Receive</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="txt cleanbtn w-1/2 my-2"
                        value={recieve_token_amount}
                        onChange={(e)=>{
                           set_recieve_token_amount(e.target.value);
                           onRecieve_expected_reciving(e.target.value)
                           
                           
                        }}  
                      />
                    </div>
                  </div>
                  <div className="right flex items-center">
                    <DropDown
                      selected={selectedReceive}
                      setSelected={setSelectedReceive}
                      filteredTokensList={filteredTokensList}
                      onSend_expected_reciving={onSend_expected_reciving}
                      onRecieve_expected_reciving={onRecieve_expected_reciving}
                      send_token_amount={send_token_amount}
                      recieve_token_amount={recieve_token_amount}

                    />
                  </div>
                </div>
              </div>
              <div className="info-list flex flex-col w-full">
                <div className="info-item flex items-center justify-between w-full">
                  <h1 className="lbl">Amount Deduction</h1>
                  <h1 className="val">{(recieve_token_amount*1/100)} {selectedReceive?(selectedReceive.title):("")}</h1>
                </div>
                <div className="info-item flex items-center justify-between w-full">
                  <h1 className="lbl">Expected Token</h1>
                  <h1 className="val">{recieve_token_amount-(recieve_token_amount*1/100)} {selectedReceive?(selectedReceive.title):("")}</h1>
                </div>
              </div>
              <button className="btn-connect button" onClick={swap}>Swap</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Main;
