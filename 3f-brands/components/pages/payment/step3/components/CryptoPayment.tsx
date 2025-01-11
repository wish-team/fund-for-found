import { QRCodeSVG } from 'qrcode.react'
import { Button, Input } from '@nextui-org/react'
import { Copy } from 'lucide-react'

const cryptoCurrencies = [
  {
    name: 'Shiba Inu (SHIB)-ERC 20',
    symbol: 'SHIB',
    walletAddress: '1fbtbhyjujk8ikdgyhvyjujkgbnjyukuik'
  },
  
  {
    name: 'Bitcoin (BTC)',
    symbol: 'BTC',
    walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    logoUrl: '/api/placeholder/50/50?text=BTC'
  },
  {
    name: 'Ethereum (ETH)',
    symbol: 'ETH',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    logoUrl: '/api/placeholder/50/50?text=ETH'
  },
  {
    name: 'Binance Coin (BNB)-BEP20',
    symbol: 'BNB',
    walletAddress: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
    logoUrl: '/api/placeholder/50/50?text=BNB'
  },
  // Add more cryptocurrencies as needed
]

interface CryptoPaymentProps {
  selectedCurrency: string
  amount: string
  onCurrencyChange: (currency: string) => void
  onAmountChange: (amount: string) => void
}

export const CryptoPayment = ({
  selectedCurrency,
  amount,
  onCurrencyChange,
  onAmountChange
}: CryptoPaymentProps) => {
  const selectedCrypto = cryptoCurrencies.find(c => c.name === selectedCurrency)
  
  const handleCopyAddress = () => {
    if (selectedCrypto) {
      navigator.clipboard.writeText(selectedCrypto.walletAddress)
    }
  }

  const calculateUSDValue = (amount: string): string => {
    // This is a mock conversion - in a real app, you'd use an API
    return (Number(amount) * 0.0000167).toFixed(2) // Mock SHIB to USD conversion
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-gray3 mb-4">Choose Your crypto currency</h2>
        <select
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="w-full p-3 rounded-lg border  border-purple-200 focus:border-purple-500 outline-none"
        >
          <option className='border text-gray2' value="">Select cryptocurrency</option>
          {cryptoCurrencies.map((crypto) => (
            <option className='text-gray1' key={crypto.symbol} value={crypto.name}>
              {crypto.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-xl mb-4">Payment amount</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="Enter amount"
            variant="bordered"
          />
          <div className="p-3 rounded-lg border-2 border-purple-200 bg-gray-50">
            {calculateUSDValue(amount)} US dollars
          </div>
        </div>
      </div>

      {selectedCrypto && amount && (
        <div className="p-6 border-2 border-purple-200 rounded-lg space-y-4">
          <p className="text-center text-gray-600">
            Use the address below to donate {amount} {selectedCrypto.symbol} from your wallet
          </p>
          
          <div className="flex justify-center">
            <QRCodeSVG
              value={selectedCrypto.walletAddress}
              size={200}
              level="L"
              imageSettings={{
                src: "/api/placeholder/50/50",
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>

          <p className="text-center text-sm font-mono break-all">
            {selectedCrypto.walletAddress}
          </p>

          <Button
            className="w-full"
            variant="bordered"
            onClick={handleCopyAddress}
            startContent={<Copy size={16} />}
          >
            Click to copy wallet address
          </Button>
        </div>
      )}

      <p className="text-gray-600">
        Complete your contribution by transferring your specified currency to the wallet address shown.
      </p>
    </div>
  )
}