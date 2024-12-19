import React from 'react';
import Fot1 from './SVG/Fot1';
import Fot2 from './SVG/Fot2';

export const Footer = () => {
  const footersNav = [
    { href: "javascript:void()", name: "Terms" },
    { href: "javascript:void()", name: "License" },
    { href: "javascript:void()", name: "Privacy" },
    { href: "javascript:void()", name: "Name" },
    { href: "javascript:void()", name: "About Us" },
  ];

  return (
    <footer className="pt-100">
      <div className="max-w-screen-xl mx-auto px-6 text-gray-600 md:px-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between">
          {/* Left Section */}
          <div className="space-y-6 sm:w-1/2">
            <img
              src="https://t3.ftcdn.net/jpg/02/07/93/42/360_F_207934275_i07fRL6BVE1CJBYUW1TAsP9bn8lSulxT.jpg"
              alt="Logo"
              // className="w-40"
              width={90}
              height={90}
            />
          
            <p className="max-w-md text-sm">
              Efficient and streamlined supply chain management is essential for businesses to thrive in today’s competitive market. Our innovative solutions are designed to optimize every stage of your supply chain, from procurement and production to distribution and delivery.
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm">
              {footersNav.map((item, idx) => (
                <li key={idx} className="text-gray-800 hover:text-gray-500 duration-150">
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
            </div>

          {/* Right Section */}
          <div className="mt-10 sm:mt-0 sm:w-10/1">
            <p className="text-gray-900 font-semibold text-sm">Get the App</p>
            <div className="flex items-center gap-4 mt-3">
              <a href="javascript:void()" className="w-8 h-8">
                <Fot1/>
                <Fot2/>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 py-6 border-t text-center">
          <p className="text-sm text-gray-500">© 2024 Schain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
