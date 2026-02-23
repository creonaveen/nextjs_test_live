/* ------------------------------- Constants ------------------------------- */

export const socialIcons: Record<string, string> = {
  YouTube: 'youtube.svg',
  Twitter: 'twitter.svg',
  LinkedIn: 'linkedin.svg',
  Facebook: 'facebook.svg',
};

export const Pages = [
  {
    title: 'myPages',
    items: [
      { title: 'watchlist', href: '/watchlist' },
      { title: 'myNotes', href: 'mynotes' },
    ],
  },
  {
    title: 'market',
    items: [
      { title: 'stocks', href: 'stocks' },
      { title: 'indices', href: 'indices' },
      { title: 'marketCommentary', href: 'marketcommentary' },
    ],
  },
  { title: 'actionPicking', items: [{ title: 'top50', href: 'top50' }] },
  {
    title: 'recommendations',
    items: [
      { title: 'todaysCase', href: 'todayscase' },
      { title: 'modelPortfolio', href: 'modelportfolio' },
    ],
  },
  {
    title: 'analyzeAndLearn',
    items: [
      { title: 'stockSchool', href: '/docs/stockSchool' },
      { title: 'theMostCommonMistakesInvestorsMake', href: '/docs/h2_commonMistakes' },
      { title: 'advantagesYouHaveAsASmallSaver', href: '/docs/userTipsSmallInvestor' },
      { title: 'userTipsFromInvesttechAnalysts', href: '/docs/h2_analystsTips' },
      { title: 'investtechResearch', href: '/docs/h2_ResearchMain' },
      { title: 'trends', href: '/docs/helpResearchTrend' },
      { title: 'supportAndResistance', href: '/docs/helpResearchSupportAndResistance' },
      { title: 'pricePatterns', href: '/docs/helpResearchFormations' },
      { title: 'volume', href: '/docs/helpResearchVolume' },
      { title: 'momentumAndRSI', href: '/docs/helpResearchMomentumAndRsi' },
      { title: 'insiderTrades', href: '/docs/helpResearchInsider' },
      { title: 'others', href: '/docs/helpResearchMore' },
      { title: 'aboutTheAnalyses', href: '/docs/h2_aboutAnalyses' },
      { title: 'aboutInvesttech', href: '/docs/h2partner_aboutUs' },
    ],
  },
  { title: 'headOffice', items: [{ title: 'headOffice.address' }] },
  { title: 'analysisDepartment', items: [{ title: 'analysisDepartment.address' }] },
  {
    title: 'contactUs',
    items: [
      { title: 'contactUs.phone' },
      { title: 'contactUs.email', href: 'mailto:info@investtech.com' },
    ],
  },
  {
    title: 'followUs',
    items: [
      { title: 'YouTube', href: 'https://www.youtube.com/channel/UCy0RvVfAnDvBd-5vaU9s46A' },
      { title: 'Twitter', href: 'https://twitter.com/Investtech_No ' },
      { title: 'LinkedIn', href: 'https://www.linkedin.com/company/investtech-com-as' },
      { title: 'Facebook' },
    ],
  },
];

export const groupedPages = [
  ['myPages', 'market'],
  ['actionPicking', 'recommendations'],
  ['analyzeAndLearn'],
  ['headOffice', 'analysisDepartment', 'contactUs', 'followUs'],
];

export const paragraphTextClass =
  'text-sm whitespace-pre-line w-fit hover:underline hover:text-footer-text hover:cursor-pointer';
export const dividerClass = 'bg-grey-750 relative h-px w-full self-stretch';
export const descriptionClass = 'w-full text-sm font-normal';
export const disclaimerLinkClass = 'text-footer-text underline hover:text-footer-text';
export const LinkClass = 'text-grey-300 text-sm hover:text-[#ADB3FF] hover:underline';

export const isExternalHref = (href: string): boolean =>
  href.startsWith('http') || href.startsWith('https') || href.startsWith('mailto:');
