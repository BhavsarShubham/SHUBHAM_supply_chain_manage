import React, { useState, useEffect, useContext } from "react";

import { Form } from "../components/Form";
import { GetShipment } from "../components/GetShipment";
import { Profile } from "../components/Profile";
import { Service } from "../components/Service";
import { StartShipment } from "../components/StartShipment";
import { Table } from "../components/Table";

import { CompleteShipment } from "../components/CompleteShipment";
import { TrackingContext } from "../contexts/Tracking"



const index = () => {
  const {
    currentUser,
    createShipment,
    getAllshipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentCount,
  } = useContext(TrackingContext);

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModel, setStartModel] = useState(false);
  const [completeModel, setCompleteModel] = useState(false);
  const [getModel, setGetModel] = useState(false);
  const [allShipmentsData, setAllShipmentsData] = useState([]);

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const allData = await getAllshipment();
        setAllShipmentsData(allData);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
      }
    };

    fetchShipmentData();
  }, [getAllshipment]);

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
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setCreateShipmentModel={setCreateShipmentModel}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <Profile
      openProfile={openProfile}
      setOpenProfile={setOpenProfile}
      currentUser={currentUser}
      getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeModel={completeModel}
        setCompleteModel={setCompleteModel}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModel={startModel}
        setStartModel={setStartModel}
        startShipment={startShipment}
      />
    </>
  );
};

export default index;
