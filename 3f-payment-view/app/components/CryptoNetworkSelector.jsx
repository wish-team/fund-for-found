"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const CryptoNetworkSelector = () => {
  // State declarations
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [availableNetworks, setAvailableNetworks] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [gasFees, setGasFees] = useState({});
  const [isLoadingGasFees, setIsLoadingGasFees] = useState(false);
  const [gasFeeError, setGasFeeError] = useState(null);
  const [derivedAddress, setDerivedAddress] = useState(null);
  const [isGeneratingAddress, setIsGeneratingAddress] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Fetch tokens on mount
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch("http://localhost:3000/token/list");
        const data = await response.json();
        setTokens(data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };
    fetchTokens();
  }, []);

  // Fetch gas fees when networks change
  useEffect(() => {
    const fetchGasFees = async () => {
      if (!selectedToken || availableNetworks.length === 0) return;

      setIsLoadingGasFees(true);
      setGasFeeError(null);

      try {
        const fees = await Promise.all(
          availableNetworks.map(async (network) => {
            try {
              const response = await fetch(
                `http://localhost:3000/token/${selectedToken}/${network}/gas-fee`
              );
              if (!response.ok) return;
              const data = await response.json();
              return { network, fee: data.fee };
            } catch (error) {
              console.error(`Error fetching fee for ${network}:`, error);
              return { network, fee: "N/A" };
            }
          })
        );

        const feeMap = fees.reduce((acc, cur) => {
          acc[cur.network] = cur.fee;
          return acc;
        }, {});

        setGasFees(feeMap);
      } catch (error) {
        setGasFeeError("Failed to load gas fees. Please try again.");
      } finally {
        setIsLoadingGasFees(false);
      }
    };

    fetchGasFees();
  }, [availableNetworks, selectedToken]);

  // Update available networks when token changes
  useEffect(() => {
    if (!selectedToken) {
      setAvailableNetworks([]);
      return;
    }

    const selectedTokenData = tokens.find((t) => t.symbol === selectedToken);
    setAvailableNetworks(selectedTokenData?.supported_networks || []);
    setSelectedNetwork("");
  }, [selectedToken, tokens]);

  // Generate payment address
  const handleGenerateQR = async () => {
    setIsGeneratingAddress(true);
    setPaymentError(null);

    try {
      const selectedTokenObj = tokens.find((t) => t.symbol === selectedToken);

      if (!selectedTokenObj) {
        throw new Error("Invalid token selection");
      }

      const response = await fetch("http://localhost:3000/payment/initiate/2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: selectedTokenObj.name.toLowerCase(),
          network: selectedNetwork.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to generate payment address");
      }

      setDerivedAddress(data.derivedAddress);
      setShowQR(true);
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setIsGeneratingAddress(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setSelectedToken("");
    setSelectedNetwork("");
    setShowQR(false);
    setDerivedAddress(null);
    setGasFees({});
    setPaymentError(null);
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (!derivedAddress) return;
    navigator.clipboard.writeText(derivedAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // QR Code Display
  if (showQR) {
    return (
      <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Payment Address
          </h2>
          {paymentError && <p className="text-red-500 mb-4">{paymentError}</p>}

          {derivedAddress ? (
            <>
              <div className="mb-6">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <QRCodeSVG
                    value={derivedAddress}
                    size={192}
                    level="H"
                    fgColor="#1e40af"
                    bgColor="#ffffff"
                    includeMargin
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  Network:{" "}
                  <span className="font-semibold">{selectedNetwork}</span>
                </p>
                <p className="text-sm text-gray-700 break-all">
                  Wallet Address:{" "}
                  <span
                    className="font-mono text-blue-600 cursor-pointer"
                    onClick={copyToClipboard}
                  >
                    {`${derivedAddress.slice(0, 6)}...${derivedAddress.slice(
                      -4
                    )}`}
                  </span>
                </p>
                {copiedAddress && (
                  <p className="text-sm text-green-600 mt-1">
                    Address copied to clipboard!
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500">
                {isGeneratingAddress
                  ? "Generating address..."
                  : "No address available"}
              </p>
            </div>
          )}

          <div className="mt-4">
            {gasFees[selectedNetwork] && (
              <p className="text-sm text-gray-600 mb-2">
                Estimated Gas Fee: {gasFees[selectedNetwork]}
              </p>
            )}
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Form Display
  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Crypto Payment Selector
      </h2>

      <div className="mb-6">
        <label htmlFor="token" className="block mb-2 text-gray-700 font-medium">
          Select Crypto Token:
        </label>
        <select
          id="token"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
        >
          <option value="" className="text-gray-400">
            Choose a token...
          </option>
          {tokens.map((token) => (
            <option
              key={token.symbol}
              value={token.symbol}
              className="text-gray-800"
            >
              {token.name} ({token.symbol})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <label
          htmlFor="network"
          className="block mb-2 text-gray-700 font-medium"
        >
          Select Network:
        </label>
        <select
          id="network"
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 disabled:opacity-50"
          disabled={!selectedToken || isLoadingGasFees}
        >
          <option value="" className="text-gray-400">
            {isLoadingGasFees ? "Loading networks..." : "Choose a network..."}
          </option>
          {availableNetworks.map((network) => (
            <option key={network} value={network} className="text-gray-800">
              {network}{" "}
              {gasFees[network]
                ? `(Est. Fee: ${gasFees[network]})`
                : "(Loading fee...)"}
            </option>
          ))}
        </select>

        {gasFeeError && (
          <p className="mt-2 text-sm text-red-600">{gasFeeError}</p>
        )}
        {isLoadingGasFees && (
          <p className="mt-2 text-sm text-gray-500">Loading gas fees...</p>
        )}
      </div>

      {selectedToken && selectedNetwork && (
        <div className="text-center">
          <button
            onClick={handleGenerateQR}
            disabled={isGeneratingAddress}
            className={`px-8 py-3 bg-blue-600 text-white rounded-lg transition-colors font-medium ${
              isGeneratingAddress
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700 hover:scale-105"
            }`}
          >
            {isGeneratingAddress ? "Generating..." : "Generate Payment QR Code"}
          </button>
          {paymentError && (
            <p className="text-red-500 mt-2 text-sm">{paymentError}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoNetworkSelector;
