import React from 'react'

interface ProfileCardProps {
  name: string
  description: string
  icon?: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, description, icon = '👤' }) => {
  return (
    <div className="flex justify-center p-8">
      <div className="w-64 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition duration-300 hover:border-purple-300">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-500">
            <span className="text-4xl">{icon}</span>
          </div>
        </div>
        <div className="text-center text-lg font-medium">{name}</div>
        <div className="my-2 flex justify-center">
          <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600">Admin</span>
        </div>
        <p className="mb-4 text-center text-sm text-gray-500">
          {description}{' '}
          <a href="#" className="text-blue-500">
            Read more
          </a>
        </p>
        <div className="mt-4 flex justify-between border-t border-gray-200 pt-2 text-sm text-gray-600">
          <div>Created</div>
          <div>1 brands</div>
        </div>
        <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-sm text-gray-600">
          <div>Contributed</div>
          <div>0 projects</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
