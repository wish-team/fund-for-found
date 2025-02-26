"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FiTrash2 } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import EditableText from "../../components/admin/EditableText";
import ToggleSwitch from "../../components/admin/ToggleSwitch";
import PaymentInput from "../../components/admin/PaymentInput";
import PhonePreview, { Collection, Block, User, LayoutType } from "../../components/admin/PhonePreview";
import AddLinkModal from "../../components/admin/AddLinkModal";

export default function AdminPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);

  // Collection-level functions
  const addCollection = () => {
    const newCollection: Collection = {
      id: uuidv4(),
      name: "",
      layoutType: "grid",
      blocks: [],
      visible: true,
    };
    setCollections([...collections, newCollection]);
  };

  const updateCollectionName = (collectionId: string, name: string) => {
    setCollections(
      collections.map((coll) =>
        coll.id === collectionId ? { ...coll, name } : coll
      )
    );
  };

  const updateCollectionLayoutType = (collectionId: string, layoutType: LayoutType) => {
    setCollections(
      collections.map((coll) =>
        coll.id === collectionId ? { ...coll, layoutType } : coll
      )
    );
  };

  const updateCollectionVisibility = (collectionId: string, visible: boolean) => {
    setCollections(
      collections.map((coll) =>
        coll.id === collectionId ? { ...coll, visible } : coll
      )
    );
  };

  const removeCollection = (collectionId: string) => {
    setCollections(collections.filter((coll) => coll.id !== collectionId));
  };

  // Block-level functions
  const addBlock = (collectionId: string) => {
    const newBlock: Block = {
      id: uuidv4(),
      title: "",
      description: "",
      containPayment: false,
      paymentAmount: "",
    };
    setCollections(
      collections.map((coll) =>
        coll.id === collectionId ? { ...coll, blocks: [...coll.blocks, newBlock] } : coll
      )
    );
  };

  const updateBlock = (collectionId: string, blockId: string, updatedBlock: Partial<Block>) => {
    setCollections(
      collections.map((coll) => {
        if (coll.id === collectionId) {
          return {
            ...coll,
            blocks: coll.blocks.map((block) =>
              block.id === blockId ? { ...block, ...updatedBlock } : block
            ),
          };
        }
        return coll;
      })
    );
  };

  const removeBlock = (collectionId: string, blockId: string) => {
    setCollections(
      collections.map((coll) => {
        if (coll.id === collectionId) {
          return { ...coll, blocks: coll.blocks.filter((block) => block.id !== blockId) };
        }
        return coll;
      })
    );
  };

  const user: User = {
    image: "/images/default-user.jpg",
    name: "John Doe",
    socialLinks: {
      youtube: "https://youtube.com/example",
      discord: "https://discord.gg/example",
    },
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white p-4 rounded shadow mb-6">
        <div className="flex items-center space-x-4">
          <img src={user.image} alt="User Profile" className="w-16 h-16 rounded-full" />
          <div className="flex space-x-2">
            <a href={user.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
              <span className="text-gray-600 hover:text-red-600">YT</span>
            </a>
            <a href={user.socialLinks.discord} target="_blank" rel="noopener noreferrer">
              <span className="text-gray-600 hover:text-indigo-600">DS</span>
            </a>
          </div>
        </div>
        <a
          href="/admin/edit"
          className="flex items-center border border-gray-300 text-gray-700 px-4 py-2 rounded hover:border-blue-500 hover:text-blue-500"
        >
          Edit Profile
        </a>
      </div>

      {/* + Add Link Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddLinkModal(true)}
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: "#1C2024" }}
        >
          + add
        </button>
      </div>

      {/* Main admin panel & phone preview container */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Admin Controls */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold font-avant mb-6">Admin Panel</h1>
          <button
            onClick={addCollection}
            className="flex items-center border border-gray-300 text-gray-700 px-4 py-2 rounded mb-6 hover:border-blue-500 hover:text-blue-500"
          >
            <IoIosAddCircleOutline className="mr-2" size={24} />
            Add Collection
          </button>

          {collections.map((collection) => (
            <div key={collection.id} className="bg-white p-6 rounded shadow mb-6">
              <div className="flex items-center justify-between mb-4">
                <EditableText
                  value={collection.name}
                  placeholder="Collection Name"
                  onSave={(val) => updateCollectionName(collection.id, val)}
                />
                <button onClick={() => removeCollection(collection.id)} className="text-gray-500 hover:text-red-500">
                  <FiTrash2 size={20} />
                </button>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium mb-1">Collection Layout</label>
                  <select
                    value={collection.layoutType}
                    onChange={(e) => updateCollectionLayoutType(collection.id, e.target.value as LayoutType)}
                    className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent"
                  >
                    <option value="grid">Grid</option>
                    <option value="carousel">Carousel</option>
                    <option value="stack">Stack</option>
                  </select>
                </div>
                <div className="ml-4 flex flex-col items-center">
                  <span className="text-sm mb-1">Show in Preview?</span>
                  <ToggleSwitch
                    value={collection.visible}
                    onToggle={(newVal) => updateCollectionVisibility(collection.id, newVal)}
                  />
                </div>
              </div>
              {collection.blocks.map((block) => (
                <div key={block.id} className="border p-4 rounded mb-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Block Settings</span>
                    <button onClick={() => removeBlock(collection.id, block.id)} className="text-gray-500 hover:text-red-500">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <EditableText
                      value={block.title}
                      placeholder="Block Title"
                      onSave={(val) => updateBlock(collection.id, block.id, { title: val })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <EditableText
                      value={block.description}
                      placeholder="Block Description"
                      onSave={(val) => updateBlock(collection.id, block.id, { description: val })}
                    />
                  </div>
                  <div className="flex items-center mb-2 space-x-2">
                    <span className="text-sm font-medium">Contain Payment?</span>
                    <ToggleSwitch
                      value={block.containPayment}
                      onToggle={(newVal) => updateBlock(collection.id, block.id, { containPayment: newVal })}
                    />
                  </div>
                  {block.containPayment && (
                    <div className="mb-2">
                      <label className="block text-sm font-medium mb-1">Payment Amount (USDT)</label>
                      <PaymentInput
                        value={block.paymentAmount}
                        onChange={(val) => updateBlock(collection.id, block.id, { paymentAmount: val })}
                      />
                      {block.paymentAmount && (
                        <button
                          onClick={() => {}}
                          className="mt-2 text-blue-500 text-xs underline"
                        >
                          (This button is hidden in admin)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <button onClick={() => addBlock(collection.id)} className="flex items-center border border-gray-300 text-gray-700 px-4 py-2 rounded hover:border-blue-500 hover:text-blue-500">
                <IoIosAddCircleOutline className="mr-2" size={20} />
                Add Block to Collection
              </button>
            </div>
          ))}
        </div>

        {/* Phone Preview (visible only on desktop) */}
        <div className="hidden md:block">
          <PhonePreview collections={collections} user={user} />
        </div>
      </div>

      {/* Add Link Modal */}
      {showAddLinkModal && <AddLinkModal onClose={() => setShowAddLinkModal(false)} />}
    </div>
  );
}
