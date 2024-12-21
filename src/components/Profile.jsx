import React, { useState, useEffect } from "react";
import Image from "next/image";
import Str1 from "./SVG/Str1";
import images from "@/Images/index";

const Profile = ({ openProfile, setOpenProfile, currentUser, getShipmentCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchShipmentCount = async () => {
      try {
        if (getShipmentCount && typeof getShipmentCount === "function") {
          const allData = await getShipmentCount(currentUser);  // Pass currentUser if necessary
          setCount(allData);
        } else {
          console.error("getShipmentCount is not a function");
        }
      } catch (error) {
        console.error("Error fetching shipment count:", error);
      }
    };

    fetchShipmentCount();
  }, [getShipmentCount, currentUser]);

  if (!openProfile) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setOpenProfile(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setOpenProfile(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <Image
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={images.avatar}
              alt="Bonnie image"
            />
            <h4 className="text-lg font-medium text-gray-800">Welcome Trader</h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser}</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2"
              >
                Balance: 335 ETH
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2"
              >
                Total shipment: {count}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;