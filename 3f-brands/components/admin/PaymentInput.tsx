import React from "react";
import { SiTether } from "react-icons/si";

export interface PaymentInputProps {
  value: string;
  onChange: (val: string) => void;
}

const PaymentInput: React.FC<PaymentInputProps> = ({ value, onChange }) => (
  <div className="relative">
    <SiTether className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-10 border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent"
      placeholder="Amount in USDT"
    />
  </div>
);

export default PaymentInput;
