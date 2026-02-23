import React from 'react';
import { render } from '@testing-library/react';

import TodaysCaseHeader from '../header-section';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/components/custom-components/about-sheet', () => ({
  AboutSheet: () => <div data-testid="about-sheet" />,
}));

jest.mock('@/components/custom-components/author-info-block', () => ({
  __esModule: true,
  default: () => <div data-testid="author-info-block" />,
}));

jest.mock('@/components/custom-components/tech-analysis-header/tech-analysis-header', () => ({
  TechAnalysisHeader: () => <div data-testid="tech-analysis-header" />,
}));

jest.mock('@/utils/create-mark-up', () => ({
  RenderHTML: ({ html }: { html: string }) => <span>{html}</span>,
}));

const mockUseTranslations = jest.requireMock('next-intl').useTranslations as jest.Mock;
const mockUsePlatform = jest.requireMock('@/lib/platform').usePlatform as jest.Mock;

describe('TodaysCaseHeader', () => {
  const mockPublication = {
    published_date: '2024-01-01',
    published_time: '10:00',
    author_initials: 'AB',
    author_name: 'Alice Brown',
    author_email: 'alice@example.com',
    author_title: 'Analyst',
    author_image: {
      type: 'image',
      src: '/author.png',
      width: 80,
      height: 80,
      alt: 'Author',
      title: 'Author',
    },
    author_analyst_id: '1',
  };

  const mockHeader = {
    data: {
      general: {
        date: '2024-01-01',
        name: 'Test Corp',
      },
      static_info: {
        description: '',
      },
      sectors: {
        sector: { name: '' },
        group: { name: '' },
        industry: { name: '' },
      },
    },
    labels_and_texts: {},
  };

  const baseProps = {
    publication: mockPublication,
    todays_case_section_header: mockHeader,
    labels_and_texts: {
      sub_title: 'Today',
      extra_info: '',
      see_more: '',
      see_more_info: '',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  it('renders the desktop title with todays case date', () => {
    mockUsePlatform.mockReturnValue('desktop');

    const { getByText } = render(<TodaysCaseHeader {...baseProps} />);

    expect(getByText('todaysCase 2024-01-01')).toBeTruthy();
  });

  it('renders the mobile title with company name', () => {
    mockUsePlatform.mockReturnValue('mobile');

    const { getByText } = render(<TodaysCaseHeader {...baseProps} />);

    expect(getByText('Test Corp')).toBeTruthy();
    expect(getByText('todaysCase 2024-01-01')).toBeTruthy();
  });
});
