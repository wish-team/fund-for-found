import React from 'react'

interface SponsorshipCardProps {
  sponsorshipName: string
  amount: number
  description: string
}

const SponsorshipCard: React.FC<SponsorshipCardProps> = ({
  sponsorshipName,
  amount,
  description,
}) => {
  return (
    <div className="flex justify-center p-8">
      <div className="w-64 rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition duration-300 hover:border-purple-300">
        <div className="rounded-t-lg bg-purple-700 py-2 text-center font-semibold text-white">
          {sponsorshipName} Sponsor
        </div>
        <div className="py-4 text-center font-medium">You are on the list</div>
        <div className="mb-4 rounded-lg bg-purple-100 py-8 text-center text-purple-500">
          {sponsorshipName} Sponsor
        </div>
        <div className="mb-4 text-center font-medium text-gray-600">
          Start at <span className="text-purple-600">${amount}</span>
        </div>
        <p className="mb-4 text-center text-sm text-gray-500">{description}</p>
        <button className="w-full rounded-lg bg-purple-600 py-2 text-white">Contribute</button>
      </div>
    </div>
  )
}

export default SponsorshipCard
