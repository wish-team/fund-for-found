"use client";
import React, { useState } from "react";
import QRCode from "react-qr-code";

export interface PaymentPageProps {
  block: { paymentAmount: string };
  onBack: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ block, onBack }) => {
  const [network, setNetwork] = useState("TRC-20");
  const qrData = `Pay ${block.paymentAmount} USDT via ${network}`;

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-blue-500 underline">&lt; Back</button>
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Network</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="border rounded w-full px-2 py-1"
        >
          <option value="TRC-20">TRC-20</option>
        </select>
      </div>
      <div className="mb-4 flex justify-center">
        <div className="p-4 bg-white border">
          <QRCode value={qrData} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
