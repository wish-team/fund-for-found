import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Fund For Found</span>,
  project: {
    link: 'https://github.com/wish-team/3F/',
  },
  editLink: {
    text: 'Edit on Github'
  },
  chat: {
    link: 'https://discord.com/FundForFound',
  },
  docsRepositoryBase: 'https://github.com/wish-team/3F/tree/main/NEXTRA_DOC',
  footer: {
    text: 'Helpful Links',
  },
  feedback: {
    content: 'Feedback about the content'
  },
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'fa', text: 'فارسی', direction: 'rtl' },
    { locale: 'de-DE', text: 'Deutsch' },
  ]
}

export default config
