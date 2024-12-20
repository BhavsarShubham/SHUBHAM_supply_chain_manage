import React, { useState } from "react";
import Str1 from "./SVG/Str1";

export default ({ getModel, setGetModel, getShipment }) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();

  const getShipmentData = async () => {
    try {
      const getData = await getShipment(index);
      setSingleShipmentData(getData);
      console.log(getData);
    } catch (error) {
      console.error("Error fetching shipment data:", error);
    }
  };

  const convertTime = (time) => {
    const newTime = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
  };

  return getModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setGetModel(false)}
      ></div>

      {/* Modal */}
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg p-6">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setGetModel(false)}
            >
              <Str1 />
            </button>
          </div>

          {/* Modal Content */}
          <div className="text-center space-y-3">
            <h4 className="text-lg font-medium text-gray-800">
              Product Tracking Details
            </h4>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="relative">
                <input
                  type="number"
                  placeholder="ID"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setIndex(e.target.value)}
                />
              </div>
              <button
                onClick={getShipmentData}
                className="block w-full py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Get Details
              </button>
            </form>

            {/* Shipment Details */}
            {singleShipmentData ? (
              <div className="text-left mt-4 space-y-2">
                <p>
                  <strong>Sender:</strong>{" "}
                  {singleShipmentData.sender.slice(0, 25)}...
                </p>
                <p>
                  <strong>Receiver:</strong>{" "}
                  {singleShipmentData.receiver.slice(0, 25)}...
                </p>
                <p>
                  <strong>Pickup Time:</strong>{" "}
                  {convertTime(singleShipmentData.pickupTime)}
                </p>
                <p>
                  <strong>Delivery Time:</strong>{" "}
                  {convertTime(singleShipmentData.deliveryTime)}
                </p>
                <p>
                  <strong>Distance:</strong> {singleShipmentData.distance} km
                </p>
                <p>
                  <strong>Price:</strong> ${singleShipmentData.price}
                </p>
                <p>
                  <strong>Status:</strong> {singleShipmentData.status}
                </p>
                <p>
                  <strong>Paid:</strong>{" "}
                  {singleShipmentData.isPaid ? "Complete" : "Not Complete"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No data available. Enter an ID.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
