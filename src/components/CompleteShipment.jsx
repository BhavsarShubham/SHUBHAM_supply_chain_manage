import { useState } from "react";
import Str1 from "./SVG/Str1";
export default ({completeModel, setCompleteModel, completeShipment}) =>{
  const [completeShip,setCompleteShip]=useState({
    recevier :"",
    index:"",
  });
  const changeStatus = async()=> {
    completeShipment(completeShip);
  };
  return completeModel?(
    <div className="fixed inset-0 z-10 overflow-auto">
      <div
      className="fixed inset-0 w-full h-full bg-black opacity-40"
      onClick={()=>setCompleteModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"> 
          <div className="flex justify-end">
            <button
            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
            onClick={()=>setCompleteModel(false)}>

              <Str1/>
            </button>
          </div>
          <div
          className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
             Complete Shipping
            </h4>
            <form onSubmit={(e)=>e.preventDefault()}>
              <div className="relative mt-3">
                <input type="text"
                placeholder="receiver" 
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg"
                onChange={(e)=>
                  setCompleteShip({...completeShip,recevire:e.target.value,})
                }
                />
              </div>
              <div className="relative mt-3">
              <input type="number"
                placeholder="Id" 
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg"
                onChange={(e)=>
                  setCompleteShip({...completeShip, index:e.target.value,})
                }
                />
              </div>
              <button
                onClick={()=>changeStatus()}
                className="block w-full py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Get Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ):("")
}; 