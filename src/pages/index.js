import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from "../contexts/Tracking";
import Form from "../components/Form";
import GetShipment from "../components/GetShipment";
import Profile from "../components/Profile";
import Service from "../components/Service";
import StartShipment from "../components/StartShipment";
import Table from "../components/Table";
import CompleteShipment from "../components/CompleteShipment";

const Index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    connectWallet,
    getShipmentCount, // Make sure this is part of the context
  } = useContext(TrackingContext);

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModel, setStartModel] = useState(false);
  const [completeModel, setCompleteModel] = useState(false);
  const [getModel, setGetModel] = useState(false);
  const [allShipmentsData, setAllShipmentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shipments = await getAllShipment();
        setAllShipmentsData(shipments || []);
      } catch (error) {
        console.error("Error loading shipments:", error.message);
      }
    };
    fetchData();
  }, [getAllShipment]);

  return (
    <>
      <Service
        setOpenProfile={setOpenProfile}
        setCompleteModel={setCompleteModel}
        setGetModel={setGetModel}
        setStartModel={setStartModel}
      />
      <Table
        setCreateShipmentModel={setCreateShipmentModel}
        allShipmentsData={allShipmentsData}
      />
      <Form
        createShipment={createShipment}
        currentUser={currentUser}
        setCreateShipmentModel={setCreateShipmentModel}
        createShipmentModel={createShipmentModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeShipment={completeShipment}
        completeModel={completeModel}
        setCompleteModel={setCompleteModel}
      />
      <GetShipment getModel={getModel} setGetModel={setGetModel} />
      <StartShipment startModel={startModel} setStartModel={setStartModel} />
    </>
  );
};

export default Index;
