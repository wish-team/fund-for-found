# Fund For Found Special Project

<p align="center">
  <img src="3F.svg" alt="3F logo" width="200"/>
</p>

## Motivation

In many countries suffering from international sanctions, or having trouble access to payment gateways, funding creative and innovative projects is exceedingly challenging. This is a widely acknowledged issue, yet it often goes unaddressed and action is seldom taken to rectify it. As a result, an alarming number of these projects - more than a million each year - fail to take off and are prematurely terminated. These projects are frequently victims of political strife and the crippling effects of sanctions.

While many stand by, watching this tragedy unfold and pointing fingers at the system, we will not stand idly by. We are the change-makers, the difference-makers, the tech savages, the hackers and painters, the ones who dare to rewrite the narrative. Our mission is not merely a statement; it's a commitment to shatter these obstacles and champion these promising projects. We are here to help them rise, realize their full potential, prevent preposterous failures, and make a lasting impact on their communities. So, as we stand on the precipice of change, we ask: **_Are you ready to help in this journey?_**

## Features

- **Crypto Payment System**: Enables secure and fast transactions directly on the blockchain.
- **Simplified Fundraising**: User-friendly interface tailored to make crypto-based crowdfunding accessible to all.
- **No Third-Party Dependency**: Avoids traditional payment gateways to enhance privacy and decentralization.
- **Built for Scalability**: Developed using modern frameworks to ensure high performance and reliability.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Nest.js](https://nestjs.com/)
- **Database**: [Supabase](https://supabase.com/)

---

## Repository Structure

This mono-repo is organized as follows:

```
fund-for-found/
├── 3f-back/        # General APIs built with Nest.js
├── 3f-auth/        # Authentication service built with Supabase and Next.js
├── 3f-brands/      # Main frontend application built with Next.js
├── 3f-blockchain/  # Crypto payment system built with Nest.js
└── .github/        # GitHub workflows and configurations
```

---

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for database management)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wish-team/fund-for-found.git
   cd fund-for-found
   ```

2. Install dependencies for all workspaces:
   ```bash
   npm install
   ```

3. Set up the environment variables for each app:
   - Navigate to `3f-back/`, `3f-auth/`, `3f-brands/`, and `3f-blockchain/`, and create `.env` files. See `.env.example` in each folder for guidance.

4. Start the development servers:
   ```bash
   # Start 3f-back (general APIs)
   npm run dev --workspace=3f-back

   # Start 3f-auth (authentication service)
   npm run dev --workspace=3f-auth

   # Start 3f-brands (frontend app)
   npm run dev --workspace=3f-brands

   # Start 3f-blockchain (crypto payment system)
   npm run dev --workspace=3f-blockchain
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

---

## Deployment

The platform can be deployed using [Netlify](https://www.netlify.com/) (frontend) and [AWS Lambda](https://aws.amazon.com/lambda/) or other serverless solutions (backend). Ensure your environment variables are correctly configured for each app before deployment.

---

## Contribution Guidelines

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## Checklist for Completion

- Clone the project on another system and verify it runs correctly.
- Ensure all unused libraries are removed.
- Provide clear documentation for the project structure in Git.
- Ensure variables and functions are named descriptively and clearly.

---

## License

This project is licensed under the [MIT License](LICENSE).

---
