// app/profile/[username]/page.tsx
import Image from 'next/image'
import { FC } from 'react'

/* ------------------ Types ------------------ */
interface SocialLink {
  platform: string
  url: string
}

interface LinkItem {
  title: string
  url: string
}

interface Service {
  id: string
  title: string
  description: string
  price: number
  currency: string
  buttonText?: string
  image?: string
}

type LayoutType = 'carousel' | 'grid' | 'stack'

interface ServiceSectionData {
  title: string
  layout: LayoutType
  services: Service[]
}

interface ProfileData {
  username: string
  profileImage: string
  description: string
  socialLinks: SocialLink[]
  links: LinkItem[]
  serviceSections: ServiceSectionData[]
}

/* ------------------ Components ------------------ */

// ProfileHeader displays the profile image, username, and description.
interface ProfileHeaderProps {
  username: string
  profileImage: string
  description: string
}
const ProfileHeader: FC<ProfileHeaderProps> = ({
  username,
  profileImage,
  description,
}) => (
  <div className="flex flex-col items-center">
    <Image
      src={profileImage}
      alt={`${username}'s profile picture`}
      width={150}
      height={150}
      className="rounded-full border-4 border-blue-500"
    />
    <h1 className="mt-4 text-2xl font-bold">@{username}</h1>
    <p className="mt-2 text-center text-gray-600">{description}</p>
  </div>
)

// SocialLinks displays a row of social media links.
interface SocialLinksProps {
  links: SocialLink[]
}
const SocialLinks: FC<SocialLinksProps> = ({ links }) => (
  <div className="flex justify-center space-x-4 mt-4">
    {links.map((link) => (
      <a
        key={link.platform}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-700"
      >
        {link.platform}
      </a>
    ))}
  </div>
)

// LinkSection displays additional call-to-action links.
interface LinkSectionProps {
  links: LinkItem[]
}
const LinkSection: FC<LinkSectionProps> = ({ links }) => (
  <div className="mt-6 space-y-4">
    {links.map((link, idx) => (
      <a
        key={idx}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-lg border border-gray-300 p-4 text-center hover:bg-gray-100"
      >
        {link.title}
      </a>
    ))}
  </div>
)

// ServiceCard renders a single service (digital product) with its image, description, and buy button.
interface ServiceCardProps {
  service: Service
}
const ServiceCard: FC<ServiceCardProps> = ({ service }) => (
  <div className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
    {service.image && (
      <Image
        src={service.image}
        alt={service.title}
        width={300}
        height={200}
        className="w-full h-auto object-cover rounded-md"
      />
    )}
    <h3 className="mt-2 text-lg font-semibold">{service.title}</h3>
    <p className="mt-1 text-sm text-gray-600">{service.description}</p>
    <div className="mt-2 text-md font-bold">
      {service.price} {service.currency}
    </div>
    <button className="mt-3 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
      {service.buttonText || 'Buy Now'}
    </button>
  </div>
)

// ServicesSection renders a section of services using the admin-defined layout.
interface ServicesSectionProps {
  section: ServiceSectionData
}
const ServicesSection: FC<ServicesSectionProps> = ({ section }) => {
  const { title, layout, services } = section

  let content
  if (layout === 'carousel') {
    content = (
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {services.map((service) => (
          <div key={service.id} className="min-w-[250px]">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    )
  } else if (layout === 'grid') {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    )
  } else if (layout === 'stack') {
    content = (
      <div className="flex flex-col space-y-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    )
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-bold text-center">{title}</h2>
      {content}
    </section>
  )
}

/* ------------------ Main Profile Page Component ------------------ */
const ProfilePage: FC<{ params: { username: string } }> = ({ params }) => {
  // Sample hardcoded profile data. In a real app, you might fetch this.
  const profile: ProfileData = {
    username: params.username,
    profileImage: '/images/default-profile.jpg', // update with your image path
    description: `Welcome to ${params.username}'s personal hub! Discover my projects, blog, and digital services.`,
    socialLinks: [
      { platform: 'YouTube', url: 'https://youtube.com/example' },
      { platform: 'Discord', url: 'https://discord.gg/example' },
      { platform: 'Website', url: 'https://example.com' },
    ],
    links: [
      { title: 'My Portfolio', url: 'https://portfolio.example.com' },
      { title: 'Blog', url: 'https://blog.example.com' },
      { title: 'Projects', url: 'https://projects.example.com' },
    ],
    // Service sections with different layouts defined by the admin.
    serviceSections: [
      {
        title: 'Featured Digital Products',
        layout: 'grid', // try changing to 'carousel' or 'stack'
        services: [
          {
            id: '1',
            title: 'VPN Subscription',
            description: 'Secure and private internet access with our VPN service.',
            price: 20,
            currency: 'USDT',
            buttonText: 'Subscribe Now',
            image: '/images/vpn.jpg',
          },
          {
            id: '2',
            title: 'Digital Ebook',
            description: 'Master Web3 development with this comprehensive ebook.',
            price: 15,
            currency: 'USDT',
            buttonText: 'Download Now',
            image: '/images/ebook.jpg',
          },
        ],
      },
      {
        title: 'More Services',
        layout: 'carousel', // a horizontal scroll layout example
        services: [
          {
            id: '3',
            title: 'Online Course',
            description: 'Learn advanced programming in our online course.',
            price: 30,
            currency: 'USDT',
            buttonText: 'Enroll Now',
            image: '/images/course.jpg',
          },
          {
            id: '4',
            title: 'Premium Webinar',
            description: 'Join our exclusive webinar for industry insights.',
            price: 25,
            currency: 'USDT',
            buttonText: 'Join Webinar',
            image: '/images/webinar.jpg',
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg">
        <ProfileHeader
          username={profile.username}
          profileImage={profile.profileImage}
          description={profile.description}
        />
        <SocialLinks links={profile.socialLinks} />
        <LinkSection links={profile.links} />
        {profile.serviceSections.map((section, idx) => (
          <ServicesSection key={idx} section={section} />
        ))}
      </div>
    </div>
  )
}

export default ProfilePage
