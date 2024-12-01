'use client'
import { Header, GoogleSignIn, Partition, EmailSignIn } from '@/components/pages/login'
import Select from "@/components/common/Select"
const Page = () => {
  return (
    <div>
      <Header />
      <GoogleSignIn />
      <Partition />
      <EmailSignIn searchParams={{ message: '' }} />
      <div className="flex flex-col justify-center p-8">
        <div className="w-72 rounded-lg border border-gray-300 bg-white shadow-lg transition duration-300 hover:border-purple-300">
          <div className="rounded-t-lg bg-purple-700 py-2 text-center font-semibold text-white">
            Bronze Sponsor
          </div>
          <div className="px-6 pb-5">
            <div className="py-4 text-center font-medium">You are on the list</div>
            <div className="mb-4 rounded-lg bg-purple-100 py-10 text-center text-purple-500">
              Bronze Sponsor
            </div>
            <div className="mb-4 font-medium text-gray-600">
              Start at <span className="text-left text-purple-600">$20</span>
            </div>
            <p className="mb-4 text-center text-sm text-gray-500">
              Join the guest list and be the first to know major updates about our project events.
              Plus, enjoy some digital gift card to be invited to the events.
            </p>
            <button className="w-full rounded-lg bg-purple-600 py-2 text-white">Contribute</button>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 p-4">
        <div className="w-64 rounded-lg border border-gray-200 bg-white shadow-lg transition duration-300 hover:border-purple-300">
          <div className="my-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-500">
              <span className="text-4xl">👤</span>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center text-lg font-medium">Amirhossein Shirani</div>
            <div className="my-2 flex justify-center">
              <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600">
                Admin
              </span>
            </div>
            <p className="mt-5 text-sm text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s.{' '}
              <a href="#" className="text-blue-500">
                Read more
              </a>
            </p>
          </div>
          <div className="bg-gray-200 px-6 pb-2">
            <div className="mt-4 flex justify-between border-t border-gray-200 pt-2 text-sm text-gray-600">
              <div>Created</div>
              <div>1 brands</div>
            </div>
            <div className="flex w-full items-center justify-center gap-x-3 text-base text-gray-2">
              <div className="h-px flex-grow bg-gray-1"></div>
            </div>
            <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-sm text-gray-600">
              <div>Contributed</div>
              <div>0 projects</div>
            </div>
          </div>
        </div>
      </div>

            <Select />
      <div className="flex justify-center p-8">
        <div className="w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition duration-300 hover:bg-gray-100 hover:shadow-xl">
          <div className="relative">
            <img
              src="https://via.placeholder.com/320x180"
              alt="Banner Image"
              className="h-44 w-full object-cover"
            />
            <div className="absolute left-2 top-2 rounded-md bg-black px-2 py-1 text-xs text-white">
              Being Podcast
            </div>
          </div>
          <div className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Being Podcast</h2>
            <p className="mb-4 text-sm text-gray-500">
              A Foundation for Easy to Develop & Deploy Web Apps. A Foundation for Easy to Develop &
              Deploy Web Apps.
            </p>
            <div className="mb-4 flex items-center text-sm">
              <span className="mr-2 rounded-full bg-blue-100 p-1 text-blue-500">📷</span>
              <span className="text-gray-700">Creative art & media</span>
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

      <div className="group relative w-full max-w-xs">
        <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 transition-all hover:border-gray-400 hover:bg-gray-100 focus:border-purple-500 focus:bg-purple-100 active:border-purple-600 active:bg-purple-200">
          <span className="text-lg font-medium text-gray-800">Fiat Currencies</span>
          <span className="text-purple-500">
            <div className="flex space-x-1">
              <span>€</span>
              <span>$</span>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Page


