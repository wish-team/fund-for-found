import type { NavMenuConfig } from "@/types";

export const navMenuConfig: NavMenuConfig = {
  pagesNav: [
    {
      title: "Product",
      items: [
        {
          title: "How it Works",
          href: "/landing",
          description: "A landing page template with differents sections.",
          image: "/images/examples/landing.jpg",
        },
        {
          title: "FAQ",
          href: "/releases",
          description: "A reproduction of Starlog template with Tailwind CSS.",
          image: "/images/examples/changelog.jpg",
        },
        {
          title: "Zero Tax",
          href: "/waitlist",
          description:
            "A waitlist form using Astro DB, React Hook Form & Sonner. Static page.",
          image: "/images/examples/waitlist.jpg",
          forceReload: true,
        },
        {
          title: "Pricing",
          href: "/pricing",
          description: "Pricing cards, FAQs and more content with price.",
          image: "/images/examples/pricing.jpg",
        },
        // {
        //   title: "About",
        //   href: "/about",
        //   description: "A simple page with a masonry gallery and little text.",
        //   image: "/images/examples/about.jpg",
        // },
        // {
        //   title: "Newsletter",
        //   href: "/newsletter",
        //   description:
        //     "A newsletter form using Astro DB & Simple Stack Form. Counter display!",
        //   image: "/images/examples/newsletter.jpg",
        // },
      ],
    },
  ],
  examplesNav: [
    {
      title: "Company",
      items: [
        {
          title: "Blog",
          href: "/blog",
          description: "A Markdown/MDX blog built using Content Collections.",
          image: "/images/examples/static-blog.jpg",
        },
        {
          title: "Docs",
          href: "/docs/getting-started",
          description:
            "A Markdown/MDX docs site built using Content Collections.",
          image: "/images/examples/documentation.jpg",
        },
        {
          title: "Brand or Organization",
          href: "/animes",
          description:
            "Fetch anime content from an graphql endpoint. Tabs component.",
          image: "/images/examples/animes.jpg",
          launched: true,
        },
        {
          title: "Creative Projects",
          href: "/blog-db",
          description:
            "Blog built using Astro DB. With categories, views & likes.",
          // image: "/images/examples/blog-db.jpg",
          disabled: true,
        },
        {
          title: "Fiat Currencies",
          href: "/products",
          disabled: true,
          description: "Ecommerce pages fetching data from an API.",
          // image: "/images/examples/ecommerce.jpg",
        },
        {
          title: "About 3F",
          href: "/auth",
          description: "Implement an authentification using Astro DB & Lucia",
          // image: "/images/examples/auth.jpg",
          disabled: true,
        },
      ],
    },
  ],
  links: [
    {
      title: "Help and Support",
      href: "/example",
      description: "Example description",
      image: "/images/examples/image.jpg",
    },
  ],
};
