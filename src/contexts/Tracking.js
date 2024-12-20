import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";


import tracking from "../../artifacts/contracts/Tracking.sol/Tracking.json"

// Network configuration
const networks = {
    localhost: {
      chainName: "localhost",
      nativeCurrency: {
        name: "GO",
        symbol: "GO",
        decimals: 18,
      },
      rpcUrls: ["http://127.0.0.1:8545/"], // Corrected the URL typo
      blockExplorerUrls: ["https://bscscan.com"], // Example for BSC explorer, can be adjusted for localhost if needed
    },
  };
  
  // Function to change network (e.g., switch MetaMask network)
  const changeNetwork = async ({ networkName }) => {
    try {
      const network = networks[networkName];
      
      // Check if the network configuration exists
      if (!network) {
        console.error("Network not found!");
        return;
      }
  
      // For MetaMask, you can use window.ethereum.request to switch networks
      if (window.ethereum) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.utils.hexValue(1337), // Example for localhost network (you should match this with your chain's ID)
              chainName: network.chainName,
              nativeCurrency: network.nativeCurrency,
              rpcUrls: network.rpcUrls,
              blockExplorerUrls: network.blockExplorerUrls,
            },
          ],
        });
        console.log("Network switched to:", networkName);
      } else {
        console.error("Ethereum provider not found!");
      }
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };
  
  // Handle network switch (can be triggered from anywhere in your app)
  export const handleNetworkSwitch = async () => {
    const networkName = "localhost"; // Change to the network name you want to switch to
    await changeNetwork({ networkName });
  };
  











const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const ContractABI = tracking.abi
const ContractABI = tracking

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
    const DappName = "Product Tracking App";
    const [currentUser, setCurrentUser] = useState("");

 const createShipment = async (items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price } = items;
   

    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        console.log("connectin ka nam",connection)
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const createItem = await contract.createShipment(
            receiver,
            new Date(pickupTime).getTime(),
            distance,
            ethers.utils.parseUnits(price, 18),
            {
                value: ethers.utils.parseUnits(price, 18),
            }
        );
        await createItem.wait();
        console.log(createItem);
    }
    catch (error) {
        console.log("Wrong Code For CreateShipment", error);
    }
 };
const getAllshipment = async () => {
    try {
        const provider = new ethers.providers.JsonRpcProvider();
        // await provider.send("eth_requestAccounts", []); // Request accounts
    
        const contract = fetchContract(provider);

        const shipment = await contract.getAllTransactions();
        const allshipments = shipment.map((shipment) => ({
            sender: shipment.sender,
            receiver: shipment.receiver,
            price: ethers.utils.formatEther(shipment.price.toString()),
            pickupTime: shipment.pickupTime.toNumber(),
            deliveryTime: shipment.deliveryTime.toNumber(),
            distance: shipment.distance.toNumber(),
            isPaid: shipment.isPaid,
            status: shipment.Status
        }));
        return allshipments;
    }
    catch (error) {
        console.log("Error want,getting shipmets ", error);
    }
};

const getShipmentCount = async () => {
    try {
        if (typeof window !== "undefined" && !window.ethereum) return "Install Metamask";

        const accounts = await window.ethereum.request({
            method: 'eth_accounts',
        });
        const provider = new ethers.providers.JsonRpcProvider();
        // await provider.send("eth_requestAccounts", []); // Request accounts
    
        const contract = fetchContract(provider);
        const shipmentsCount = await contract.getShipmentCount(index[0]);
        return shipmentsCount.toNumber();
    }
    catch (error) {
        console.log("Error want,getting shipmets ", error);
    }
};

const completeShipment = async (completeShip) => {

    console.log(completeShip);
    const { receiver, index } = completeShip;
    try {
        if (typeof window !== "undefined" && !window.ethereum) {
            return "Install metamask";
        }
        const accounts = await window.ethereum.request({
            method:"eth_accounts",
        });
        const web3modal = Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const transaction = await contract.completeShipment(
            accounts[0],
            receiver,
            index,
            { gasLimit: 300000, }
        );
        transaction.wait();
        console.log(transaction);
    }
    catch (error) {
        console.log("Wrong shipment", error);
    }
};

const getShipment = async (index) => {
    console.log(index * 1);
    try {
        if (typeof window !== "undefined" && !window.ethereum) {
            return "Install metamask";
        }
        const accounts = await window.ethereum.request({
            method: "eth_accounts",

        });
        const provider = new ethers.providers.JsonRpcProvider();
        // await provider.send("eth_requestAccounts", []); // Request accounts
     
        const contract = fetchContract(provider);
        const shipment = await contract.getShipment(accounts[0], index * 1);

        const SingleShiplent = {
            sender: shipment[0],
            receiver: shipment[1],
            pickupTime: shipment[2].toNumber(),
            deliveryTime: shipment[3].toNumber(),
            distance: shipment[4].toNumber(),
            price: ethers.utils.formatEther(shipment[5].toString()),
            Status: shipment[6],
            isPaid: shipment[7],
        };
        return SingleShiplent;
    }
    catch (error) {
        console.log("Sorry No Shipment")

    }
};
const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;

    try {
        if (typeof window !== "undefined" && !window.ethereum) {
            return "Install metamask";
        }
        const account = await window.ethereum.request({
            method: "eth_account",

        });
        const web3Modal = await Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const shipment = await contract.startShipment(
            account[0],
            receiver,
            index * 1
        );
        shipment.wait()
        console.log(shipment)
    }
    catch (error) {
        console.log("Sorry NO shipment", error)
    }
};
const checkIfWalletConnected = async () => {
    try {
      if (typeof window === "undefined") return "Install Metamask";
      const account = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (account.length) {
        setCurrentUser(account[0]);
      } else {
        return "No Account";
      }
    } 
    catch (error) {
      console.log("Account not connected");
    }
  };
  
const connectWallet = async () => {
    try {
        if (typeof window !== "undefined" && !window.ethereum) return "Install MetaMask";

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setCurrentUser(accounts[0]);

    }
    catch (error) {
        return "something wrong"
    }
};

useEffect(() => {
        checkIfWalletConnected();
}, [])


return (
    <TrackingContext.Provider
        value={{
            connectWallet,
            createShipment,
            getAllshipment,
            completeShipment,
            getShipment,
            startShipment,
            getShipmentCount,
            DappName,
            currentUser,
        }}
    >
        {children}
    </TrackingContext.Provider>
);
};