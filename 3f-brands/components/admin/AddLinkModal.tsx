import React, { useState } from "react";

export interface AddLinkModalProps {
  onClose: () => void;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({ onClose }) => {
  const [url, setUrl] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Enter URL or Browse Apps</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL or App"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <button
          onClick={() => {}}
          className="w-full py-2 text-white rounded"
          style={{ backgroundColor: "#1C2024" }}
        >
          Add
        </button>
        <p className="text-sm text-gray-600 mt-4 mb-2">
          Inspired by your interests
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="border rounded px-2 py-1 text-sm">Telegram</button>
          <button className="border rounded px-2 py-1 text-sm">Spotify</button>
          <button className="border rounded px-2 py-1 text-sm">Apple Music</button>
          <button className="border rounded px-2 py-1 text-sm">X</button>
          <button className="border rounded px-2 py-1 text-sm">Twitch</button>
          <button className="border rounded px-2 py-1 text-sm">Soundcloud</button>
        </div>
        <button onClick={onClose} className="mt-4 text-blue-500 underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddLinkModal;
