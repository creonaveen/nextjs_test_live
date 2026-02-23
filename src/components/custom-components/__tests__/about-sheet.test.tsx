import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { AboutSheet } from '../about-sheet';

jest.mock('@/components/link', () => ({
  Link: ({ href, children, ...props }: { href: string; children?: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockStaticInfo = {
  description: 'Test company description',
  company_url: 'example.com',
  source: 'Test Source',
  description_suggested_clip_length: 50,
};

const mockLabelAndTexts = {
  about_company: 'About Company',
  source: 'Source',
  sector: 'Sector',
};

const mockSectors = {
  sector: { name: 'Technology' },
  group: { name: 'Software' },
  industry: { name: 'SaaS' },
};

describe('AboutSheet', () => {
  it('should render trigger icon', () => {
    const { container } = render(
      <AboutSheet
        static_info={mockStaticInfo}
        labelAndTexts={mockLabelAndTexts}
        sectors={mockSectors}
      />
    );

    const trigger = container.querySelector('svg[data-slot="sheet-trigger"]');
    expect(trigger).toBeInTheDocument();
  });

  it('should open sheet when trigger is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AboutSheet
        static_info={mockStaticInfo}
        labelAndTexts={mockLabelAndTexts}
        sectors={mockSectors}
      />
    );

    const trigger = container.querySelector('svg[data-slot="sheet-trigger"]');
    if (trigger) {
      await user.click(trigger);
      expect(screen.getByText('Test company description')).toBeInTheDocument();
    }
  });

  it('should render company description', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AboutSheet
        static_info={mockStaticInfo}
        labelAndTexts={mockLabelAndTexts}
        sectors={mockSectors}
      />
    );

    const trigger = container.querySelector('svg[data-slot="sheet-trigger"]');
    if (trigger) {
      await user.click(trigger);
      expect(screen.getByText('Test company description')).toBeInTheDocument();
    }
  });

  it('should render company URL as link', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AboutSheet
        static_info={mockStaticInfo}
        labelAndTexts={mockLabelAndTexts}
        sectors={mockSectors}
      />
    );

    const trigger = container.querySelector('svg[data-slot="sheet-trigger"]');
    if (trigger) {
      await user.click(trigger);
      const link = screen.getByText('example.com');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
    }
  });

  it('should render source information', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AboutSheet
        static_info={mockStaticInfo}
        labelAndTexts={mockLabelAndTexts}
        sectors={mockSectors}
      />
    );

    const trigger = container.querySelector('svg[data-slot="sheet-trigger"]');
    if (trigger) {
      await user.click(trigger);
      expect(screen.getByText(/source.*test source/i)).toBeInTheDocument();
    }
  });

  it('should render sector badges', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AboutSheet
        static_info={mockStaticInfo}
        labelAndTexts={mockLabelAndTexts}
        sectors={mockSectors}
      />
    );

    const trigger = container.querySelector('svg[data-slot="sheet-trigger"]');
    if (trigger) {
      await user.click(trigger);
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('Software')).toBeInTheDocument();
      expect(screen.getByText('SaaS')).toBeInTheDocument();
    }
  });

  it('should handle missing description', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AboutSheet
        static_info={{ ...mockStaticInfo, description: '' }}
        labelAndTexts={mockLabelAndTexts}
        sectors={mockSectors}
      />
    );

    const trigger = container.querySelector('svg[data-slot="sheet-trigger"]');
    if (trigger) {
      await user.click(trigger);
      expect(screen.queryByText('Test company description')).not.toBeInTheDocument();
    }
  });

  it('should handle missing sectors', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AboutSheet
        static_info={mockStaticInfo}
        labelAndTexts={mockLabelAndTexts}
        sectors={{ sector: null, group: null, industry: null }}
      />
    );

    const trigger = container.querySelector('svg[data-slot="sheet-trigger"]');
    if (trigger) {
      await user.click(trigger);
      expect(screen.queryByText('Technology')).not.toBeInTheDocument();
    }
  });
});
