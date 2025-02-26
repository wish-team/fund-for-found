"use client";
import React, { useState } from "react";
import "../globals.css";
import { FaBox, FaWallet, FaPlug, FaCog } from "react-icons/fa";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("blocks");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen bg-gray-50 text-gray-800 font-aileron">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-6">
            <h1 className="text-2xl font-bold font-avant">Dashboard</h1>
          </div>
          <nav>
            <ul className="space-y-2">
              <li
                onClick={() => setActiveSection("blocks")}
                className={`flex items-center px-6 py-3 cursor-pointer transition-colors hover:bg-gray-100 ${
                  activeSection === "blocks" ? "bg-gray-100" : ""
                }`}
              >
                <FaBox size={20} className="mr-3" />
                <span>Blocks</span>
              </li>
              <li
                onClick={() => setActiveSection("wallet")}
                className={`flex items-center px-6 py-3 cursor-pointer transition-colors hover:bg-gray-100 ${
                  activeSection === "wallet" ? "bg-gray-100" : ""
                }`}
              >
                <FaWallet size={20} className="mr-3" />
                <span>Wallet</span>
              </li>
              <li
                onClick={() => setActiveSection("gateways")}
                className={`flex items-center px-6 py-3 cursor-pointer transition-colors hover:bg-gray-100 ${
                  activeSection === "gateways" ? "bg-gray-100" : ""
                }`}
              >
                <FaPlug size={20} className="mr-3" />
                <span>Gateways</span>
              </li>
              <li
                onClick={() => setActiveSection("settings")}
                className={`flex items-center px-6 py-3 cursor-pointer transition-colors hover:bg-gray-100 ${
                  activeSection === "settings" ? "bg-gray-100" : ""
                }`}
              >
                <FaCog size={20} className="mr-3" />
                <span>Settings</span>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8">{children}</main>
      </body>
    </html>
  );
}
