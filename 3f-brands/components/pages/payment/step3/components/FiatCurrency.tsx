'use client'

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input } from '@nextui-org/react'
import { usePaymentStore } from '../store/usePaymentStore'
import { useRouter } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { Copy } from 'lucide-react'

const fiatCurrencies = ['USD - US Dollar', 'EUR - Euro', 'CAD - Canadian Dollar', 'GBP - British Pound']
const cryptoCurrencies = ['Shiba Inu (SHIB)-ERC 20']
const amounts = [
  { key: '10', value: 10 },
  { key: '20', value: 20 },
  { key: '50', value: 50 },
  { key: '100', value: 100 },
]

const WALLET_ADDRESSES = {
  'Shiba Inu (SHIB)-ERC 20': '1fbtbhyjujk8ikdgyhvyjujkgbnjyukuik'
}

export default function PaymentPage() {
  const router = useRouter()
  const {
    currencyType,
    selectedCurrency,
    paymentType,
    amount,
    setCurrencyType,
    setSelectedCurrency,
    setPaymentType,
    setAmount,
  } = usePaymentStore()

  const isFormValid = selectedCurrency && (currencyType === 'crypto' ? amount : (paymentType && amount))

  const handleContinue = () => {
    if (isFormValid) {
      router.push('/success')
    }
  }

  const getWalletAddress = (currency: string) => {
    return WALLET_ADDRESSES[currency] || ''
  }

  const calculateUSDValue = (amount: string): string => {
    return (Number(amount) * 0.0000167).toFixed(2)
  }

  const handleCopyAddress = () => {
    const address = getWalletAddress(selectedCurrency)
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  const renderCryptoContent = () => (
    <>
      <div>
        <h2 className="text-xl mb-4">Choose Your crypto currency</h2>
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="w-full justify-start"
            >
              {selectedCurrency || 'Select cryptocurrency'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Cryptocurrency selection"
            onAction={(key) => setSelectedCurrency(key as string)}
          >
            {cryptoCurrencies.map((currency) => (
              <DropdownItem key={currency}>{currency}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div>
        <h2 className="text-xl mb-4">Payment amount</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            variant="bordered"
          />
          <div className="p-3 rounded-lg border-2 border-purple-200 bg-gray-50">
            {calculateUSDValue(amount || '0')} US dollars
          </div>
        </div>
      </div>

      {selectedCurrency && amount && (
        <div className="p-6 border-2 border-purple-200 rounded-lg space-y-4">
          <p className="text-center text-gray-600">
            Use the address below to donate {amount} {selectedCurrency.split('-')[0]} from your wallet
          </p>
          
          <div className="flex justify-center">
            <QRCodeSVG
              value={getWalletAddress(selectedCurrency)}
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
            {getWalletAddress(selectedCurrency)}
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
    </>
  )

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-purple-600">Payment details</h1>
        <span className="text-gray-500">2024/Sep/24</span>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl mb-4">Select Currency Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrencyType('fiat')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                currencyType === 'fiat'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">$</span>
                <span>Fiat Currencies</span>
              </div>
            </button>
            <button
              onClick={() => setCurrencyType('crypto')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                currencyType === 'crypto'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">₿</span>
                <span>Crypto Currencies</span>
              </div>
            </button>
          </div>
        </div>

        {currencyType === 'fiat' ? (
          <>
            <div>
              <h2 className="text-xl mb-4">Choose Your Currency</h2>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    className="w-full justify-start"
                  >
                    {selectedCurrency || 'Select currency'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Currency selection"
                  onAction={(key) => setSelectedCurrency(key as string)}
                >
                  {fiatCurrencies.map((currency) => (
                    <DropdownItem key={currency}>{currency}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div>
              <h2 className="text-xl mb-4">Choose recurring or one time</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'onetime', label: 'One time' },
                  { id: 'monthly', label: 'Monthly' },
                  { id: 'yearly', label: 'Yearly' }
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentType(id as 'onetime' | 'monthly' | 'yearly')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      paymentType === id
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl mb-4">Payment amount</h2>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    className="w-full justify-start"
                  >
                    {amount ? `${amount} USD` : 'Select amount'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Amount selection"
                  onAction={(key) => setAmount(key as string)}
                >
                  {amounts.map((amt) => (
                    <DropdownItem key={amt.key}>
                      {amt.value} USD
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <p className="text-sm text-gray-500 mt-2">Minimum amount: Every contribution helps</p>
            </div>
          </>
        ) : (
          renderCryptoContent()
        )}

        <Button
          color="secondary"
          className="w-full"
          size="lg"
          isDisabled={!isFormValid}
          onClick={handleContinue}
        >
          {currencyType === 'crypto' ? 'Finish' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}
