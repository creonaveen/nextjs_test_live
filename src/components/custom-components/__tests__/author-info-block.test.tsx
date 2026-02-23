import React from 'react';
import { render, screen } from '@testing-library/react';

import AuthorInfoBlock from '../author-info-block';

jest.mock('@/components/link', () => ({
  Link: ({ href, children, ...props }: { href: string; children?: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

interface Translations {
  loading: string;
  writtenBy: string;
  published: string;
  contact: string;
}

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Translations = {
      loading: 'Loading',
      writtenBy: 'Written by',
      published: 'Published',
      contact: 'Contact',
    };
    return translations[key as keyof Translations] || key;
  },
}));

describe('AuthorInfoBlock', () => {
  const mockAuthorImage = {
    src: '/author.jpg',
    alt: 'Author image',
    width: 100,
    height: 100,
  };

  const defaultProps = {
    isLoading: false,
    authorImage: mockAuthorImage,
    authorName: 'John Doe',
    authorTitle: 'Senior Analyst',
    publishedDate: '2024-01-15',
    authorEmail: 'john.doe@example.com',
  };

  it('should render author information when not loading', () => {
    render(<AuthorInfoBlock {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Analyst')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    render(<AuthorInfoBlock {...defaultProps} isLoading={true} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render author image', () => {
    render(<AuthorInfoBlock {...defaultProps} />);

    const image = screen.getByAltText('Author image');
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src to use optimization API
    // Check that the src contains the original path
    const src = image.getAttribute('src');
    expect(src).toContain('author.jpg');
  });

  it('should render email as link', () => {
    render(<AuthorInfoBlock {...defaultProps} />);

    const emailLink = screen.getByText('john.doe@example.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
  });

  it('should render translation labels', () => {
    render(<AuthorInfoBlock {...defaultProps} />);

    expect(screen.getByText('Written by')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should render with empty strings', () => {
    const { container } = render(
      <AuthorInfoBlock
        isLoading={false}
        authorImage={mockAuthorImage}
        authorName=""
        authorTitle=""
        publishedDate=""
        authorEmail=""
      />
    );

    // Component should render without errors even with empty strings
    // Check that the card is rendered
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();

    // Check that translation labels are still present
    expect(screen.getByText('Written by')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
