"use client";
import React, { useState } from "react";
import { FaYoutube, FaDiscord } from "react-icons/fa";
import PaymentPage from "./PaymentPage";

export type LayoutType = "grid" | "carousel" | "stack";

export interface Block {
  id: string;
  title: string;
  description: string;
  containPayment: boolean;
  paymentAmount: string;
}

export interface Collection {
  id: string;
  name: string;
  layoutType: LayoutType;
  blocks: Block[];
  visible: boolean;
}

export interface User {
  image: string;
  name: string;
  socialLinks: {
    youtube: string;
    discord: string;
  };
}

export interface PhonePreviewProps {
  collections: Collection[];
  user: User;
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ collections, user }) => {
  const [paymentBlock, setPaymentBlock] = useState<Block | null>(null);

  return (
    <div className="border border-gray-300 rounded-xl w-[375px] h-[667px] mx-auto bg-white overflow-auto shadow-lg">
      {/* Phone Header */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-4">
        <img src={user.image} alt="User Profile" className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="font-bold text-lg">{user.name}</h2>
          <div className="flex space-x-2">
            <a href={user.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
              <FaYoutube size={16} className="text-gray-600 hover:text-red-600" />
            </a>
            <a href={user.socialLinks.discord} target="_blank" rel="noopener noreferrer">
              <FaDiscord size={16} className="text-gray-600 hover:text-indigo-600" />
            </a>
          </div>
        </div>
      </div>

      {paymentBlock ? (
        <PaymentPage block={paymentBlock} onBack={() => setPaymentBlock(null)} />
      ) : (
        <div className="p-4 space-y-4">
          {collections.filter((coll) => coll.visible).length === 0 && (
            <p className="text-gray-500">No collections to preview.</p>
          )}
          {collections.filter((coll) => coll.visible).map((collection) => (
            <div key={collection.id} className="mb-4">
              {collection.name && <h3 className="font-bold text-lg mb-2">{collection.name}</h3>}
              {collection.layoutType === "grid" && (
                <div className="grid grid-cols-2 gap-2">
                  {collection.blocks.map((block) => (
                    <div key={block.id} className="border p-2 rounded bg-gray-50">
                      {block.title && <h4 className="font-semibold">{block.title}</h4>}
                      <p className="text-sm">{block.description}</p>
                      {block.containPayment && block.paymentAmount && (
                        <button onClick={() => setPaymentBlock(block)} className="mt-2 text-blue-500 text-xs underline">
                          Buy Now
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {collection.layoutType === "carousel" && (
                <div className="flex space-x-2 overflow-x-auto">
                  {collection.blocks.map((block) => (
                    <div key={block.id} className="min-w-[150px] border p-2 rounded bg-gray-50">
                      {block.title && <h4 className="font-semibold">{block.title}</h4>}
                      <p className="text-sm">{block.description}</p>
                      {block.containPayment && block.paymentAmount && (
                        <button onClick={() => setPaymentBlock(block)} className="mt-2 text-blue-500 text-xs underline">
                          Buy Now
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {collection.layoutType === "stack" && (
                <div className="space-y-2">
                  {collection.blocks.map((block) => (
                    <div key={block.id} className="border p-2 rounded bg-gray-50">
                      {block.title && <h4 className="font-semibold">{block.title}</h4>}
                      <p className="text-sm">{block.description}</p>
                      {block.containPayment && block.paymentAmount && (
                        <button onClick={() => setPaymentBlock(block)} className="mt-2 text-blue-500 text-xs underline">
                          Buy Now
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhonePreview;
