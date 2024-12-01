import React from 'react'

interface ProjectCardProps {
  backgroundImage: string
  logo: string
  description: string
  type: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ backgroundImage, logo, description, type }) => {
  return (
    <div className="flex justify-center p-8">
      <div className="w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition duration-300 hover:bg-gray-100 hover:shadow-xl">
        <div className="relative">
          <img src={backgroundImage} alt="Banner Image" className="h-44 w-full object-cover" />
          <div className="absolute left-2 top-2 rounded-md bg-black px-2 py-1 text-xs text-white">
            <img src={logo} alt="Logo" className="mr-1 inline h-6 w-6" />
            <span>Being Podcast</span>
          </div>
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">Being Podcast</h2>
          <p className="mb-4 text-sm text-gray-500">{description}</p>
          <div className="mb-4 flex items-center text-sm">
            <span className="mr-2 rounded-full bg-blue-100 p-1 text-blue-500">📷</span>
            <span className="text-gray-700">{type}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <span className="font-semibold">117</span> Financial Contributors
            </div>
            <div className="text-lg font-semibold">$11,990</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
