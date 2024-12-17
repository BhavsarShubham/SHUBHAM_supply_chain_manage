import { useEffect, useState, useContext } from "react";
import { TrackingContext } from "@/contexts/Tracking";
console.log("TrackingContext hai ye:", TrackingContext);

import Nav1 from "@/components/SVG/Nav1";
import Nav2 from "@/components/SVG/Nav2";
import Nav3 from "@/components/SVG/Nav3";



export function Navbar() {
  const [state, setState] = useState(false);
  const  {currentUser, connectWallet}  = useContext(TrackingContext);
console.log({ currentUser, connectWallet });



  const navigation = [
    { title: "Home", path: "#" },
    { title: "Service", path: "#" },
    { title: "Contact Us", path: "#" },
    { title: "ERC20", path: "#" },
  ];

  useEffect(() => {
    document.onClick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-white pb-5 md:text-sm ${
        state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-2" : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <a href="javascript:void(0)">
          <img
            src="https://t3.ftcdn.net/jpg/02/07/93/42/360_F_207934275_i07fRL6BVE1CJBYUW1TAsP9bn8lSulxT.jpg"
            width={80}
            height={80}
            alt="Float UI logo"
          />
        </a>
        <div className="md:hidden">
          <button
            className="menu-btn text-gray-500 hover:text-gray-800"
            onClick={() => setTimeout(() => setState(!state), 0)}
          >
            <Nav1/>
          </button>
        </div>
      
      <div
        className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
          state ? "block" : "hidden"
        }`}
      >
        <ul className="justify-center space-y-6 md:flex md:space-x-6 md:space-y-0">
          {navigation.map((item, idx) => (
            <li key={idx} className="text-gray-700 hover:text-gray-900">
              <a href={item.path} className="block">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
          {currentUser ? (
            <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
              {currentUser.slice(0, 25)}..
            </p>
          ) : (
            <button
              onClick={connectWallet}
              className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-indigo-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
            >
              
              Connect Wallet<Nav3/>
            </button>
          )}
        </div>
      </div></div>
    </nav>
  );
}
