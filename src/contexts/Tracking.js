import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";


import tracking from "../../artifacts/contracts/Tracking.sol/Tracking.json"
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi

const fetchContract = (SignerOrProvider) =>
    new ethers.Contract(ContractAddress, ContractABI, SignerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
    const DappName = "Product Tracking App";
    const [currentUser, setCurrentUser] = useState("");

    const createShipment = async (items) => {
        console.log(items);
        const { receiver, pickupTime, distance, price } = items;
    }

    try {
        const web3modal = new Web3Modal();
        const connection =  web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const createItem = contract.createShipment(
            receiver,
            new Date(pickupTime).getTime(),
            distance,
            ethers.utils.parseUnits(price, 18),
            {
                value: ethers.utils.parseUnits(price, 18),
            }
        );
       createItem.wait();
        console.log(createItem);
    }
    catch (error) {
        console.log("Wrong Code For CreateShipment", error);
    }

const getAllshipment = async () => {
    try {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const shipments = await contract.getAllTransactions();
        const allShipments = shipments.map((shipments) => ({
            sender: shipments.sender,
            receiver: shipments.receiver,
            price: ethers.utils.formatether(shipments.price.toString()),
            pickupTime: shipments.pickupTime.toNumber(),
            deliveryTime: shipments.deliveryTime.toNumber(),
            distance: shipments.distance.toNumber(),
            isPaid: shipments.isPaid,
            Status: shipments.Status
        }));
        return allShipments;
    }
    catch (error) {
        console.log("Error want,,getting shipmets ", error);
    }
};

const getShipmentCount = async () => {
    try {
        if (!window.ethereum) return "Install Metamask";

        const accounts = await window.ethereum.request({
            method: 'eth_account',
        });
        const provider = new ethers.providers.JsonRpcProvider(
        );
        const contract = fetchContract(provider);
        const shipmentsCount = await contract.getShipmentCount(index[0]);
        return shipmentsCount.toNumber();
    }
    catch (error) {
        console.log("Error want,,getting shipmets ", error);
    }
};

const completeShipment = async (completeShip) => {

    console.log(completeShip);
    const { receiver, index } = completeShip;
    try {
        if (!window.ethereum) {
            return "Install metamask";
        }
        const web3Modal = await Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const transaction = await contract.completeShipment(
            accounts[0],
            receiver,
            index,
            { gaslimit: 300000 }
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
        if (!window.ethereum) {
            return "Install metamask";
        }
        const accounts = await window.ethereum.request({
            method: "eth_account",

        });
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const shipment = await contract.getShipment(accounts[0], index * 1);

        const SingleShiplent = {
            sender: shipment[0],
            receiver: shipment[1],
            pickupTime: shipment[2].toNumber(),
            deliveryTime: shipment[3].toNumber(),
            distance: shipment[4].toNumber(),
            price: ethers.utils.formatether(shipment[5].toString()),
            isPaid: shipment[6],
            Status: shipment[7],
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
        if (!window.ethereum) {
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
        if (!window.ethereum) {
            return "Install Metamask";
        }
        const account = await window.ethereum.request({
            method: "eth_accounts",
        })
        if (account.length) {
            setCurrentUser(account[0]);
        }
        else {
            return "No Acc"
        }
    }
    catch (error) {
        return "Account Not connected";
    }
};
const connectWallet = async () => {
    try {
        if (!window.ethereum) return "Install MetaMask";

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
    if (typeof window !== "undefined") {
        checkIfWalletConnected();
    }
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