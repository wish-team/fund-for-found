import CryptoNetworkSelector from "./components/CryptoNetworkSelector";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Crypto Network Selector
      </h1>
      <CryptoNetworkSelector />
    </main>
  );
}
