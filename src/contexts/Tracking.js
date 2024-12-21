import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import tracking from "../../artifacts/contracts/Tracking.sol/Tracking.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking;

const fetchContract = (signerOrProvider) => {
    if (!ContractAddress || !ContractABI) {
        throw new Error("Missing contract address or ABI");
    }
    return new ethers.Contract(ContractAddress, ContractABI.abi, signerOrProvider);
};



export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
    const DappName = "Product Tracking App";
    const [currentUser, setCurrentUser] = useState("");
    const createShipment = async (items) => {
        console.log(items);
    
        const { receiver, pickupTime, distance, price } = items;
    
        try {
            // Initialize Web3Modal and connect to the wallet
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            console.log("Connected wallet:", connection);
    
            // Setup ethers provider and signer
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
    
            // Fetch contract instance
            const contract = fetchContract(signer);
    
            // Call the createShipment function on the contract
            const createItem = await contract.createShipment(
                receiver,
                Math.floor(new Date(pickupTime).getTime() / 1000), // Convert to UNIX timestamp in seconds
                distance,
                ethers.utils.parseEther(price), // Correct parsing of the price
                {
                    value: ethers.utils.parseEther(price), // Send value with the transaction
                }
            );
    
            // Wait for transaction confirmation
            await createItem.wait();
            console.log("Shipment created successfully:", createItem);
        } catch (error) {
            console.error("Error in createShipment:", error);
        }
    };
    

    const getAllshipment = async () => {
        try {
            // Initialize provider and contract
            const provider = new ethers.providers.JsonRpcProvider(); // Ensure this connects to the correct network
            const contract = fetchContract(provider);
    
            // Call the contract's method
            const shipments = await contract.getAllTransactions();
            console.log("Raw Shipments Data:", shipments); // Log raw data for debugging
    
            // Transform the returned data
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.Status,
            }));
    
            console.log("Formatted Shipments Data:", allShipments);
            return allShipments;
        } catch (error) {
            console.error("Error getting shipments:", error);
        }
    };
    

    const getShipmentCount = async () => {
        try {
            if (typeof window !== "undefined" && !window.ethereum) return "Install Metamask";
    
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
    
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
    
            // Log the account to confirm it's correct
            console.log("Account Address:", accounts[0]);
    
            // Call the function
            const shipmentsCount = await contract.getShipmentCount(accounts[0]);
    
            return shipmentsCount.toNumber();
        } catch (error) {
            console.log("Error getting shipments count:", error);
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
                method: "eth_accounts",
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
                { gasLimit: 300000 }
            );
            transaction.wait();
            console.log(transaction);
        } catch (error) {
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
        } catch (error) {
            console.log("Sorry No Shipment");
        }
    };

    const startShipment = async (getProduct) => {
        const { receiver, index } = getProduct;

        try {
            if (typeof window !== "undefined" && !window.ethereum) {
                return "Install metamask";
            }
            const account = await window.ethereum.request({
                method: "eth_accounts",
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
            shipment.wait();
            console.log(shipment);
        } catch (error) {
            console.log("Sorry NO shipment", error);
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
        } catch (error) {
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
        } catch (error) {
            return "something wrong";
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

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
                // handleNetworkSwitch, // Expose network switch function
            }}
        >
            {children}
        </TrackingContext.Provider>
    );
};
