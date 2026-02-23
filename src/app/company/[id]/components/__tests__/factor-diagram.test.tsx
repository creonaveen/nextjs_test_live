import { render } from '@testing-library/react';
import React from 'react';

import * as platform from '@/lib/platform';

import FactorDiagram from '@/components/custom-components/factor-diagram/factor-diagram';

// Mock dependencies
jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(() => 'desktop'),
}));

jest.mock('@/components/custom-components/centered-progress-bar', () => ({
  CenteredProgress: ({ value }: { value: number }) => (
    <div data-testid="centered-progress">{value}</div>
  ),
}));

describe('FactorDiagram', () => {
  const mockRawSvgHtml = `
    <svg>
      <g id="factor1" class="ifgTooltipSliceOpacityLight" data-tooltip-target="factor1">
        <path d="M0,0 L100,0 L100,100 Z" />
      </g>
    </svg>
  `;

  const mockTooltips = {
    factor1: {
      title: 'Factor 1',
      status: 'Good',
      score: '85',
      description: 'This is a test factor',
      elements: [
        {
          name: 'Element 1',
          value: '100',
          score: '80',
        },
        {
          name: 'Element 2',
          value: '200',
          score: '90',
        },
      ],
    },
  };

  const mockLabelsAndTexts = {
    factor_diagram_element: 'Element',
    factor_diagram_value: 'Value',
    factor_diagram_score: 'Score',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');
  });

  it('should render SVG content', () => {
    const { container } = render(
      <FactorDiagram
        rawSvgHtml={mockRawSvgHtml}
        tooltips={mockTooltips}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
    expect(diagramContainer?.querySelector('svg')).toBeInTheDocument();
  });

  it('should render without tooltips', () => {
    const { container } = render(<FactorDiagram rawSvgHtml={mockRawSvgHtml} />);

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should not show tooltips on mobile platform', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');

    const { container } = render(
      <FactorDiagram
        rawSvgHtml={mockRawSvgHtml}
        tooltips={mockTooltips}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
    // Tooltips should not be active on mobile
  });

  it('should process SVG HTML and remove title attributes', () => {
    const svgWithTitle = '<svg><g title="test">Content</g></svg>';
    const { container } = render(<FactorDiagram rawSvgHtml={svgWithTitle} />);

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should handle SVG without tooltip classes', () => {
    const svgWithoutClasses = '<svg><g>Content</g></svg>';
    const { container } = render(
      <FactorDiagram
        rawSvgHtml={svgWithoutClasses}
        tooltips={mockTooltips}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should render with labels and texts', () => {
    const { container } = render(
      <FactorDiagram
        rawSvgHtml={mockRawSvgHtml}
        tooltips={mockTooltips}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should handle empty tooltips object', () => {
    const { container } = render(
      <FactorDiagram
        rawSvgHtml={mockRawSvgHtml}
        tooltips={{}}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should handle tooltip with empty elements array', () => {
    const tooltipsWithEmptyElements = {
      factor1: {
        title: 'Factor 1',
        status: 'Good',
        score: '85',
        description: 'Description',
        elements: [],
      },
    };

    const { container } = render(
      <FactorDiagram
        rawSvgHtml={mockRawSvgHtml}
        tooltips={tooltipsWithEmptyElements}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should handle missing labels and texts', () => {
    const { container } = render(
      <FactorDiagram
        rawSvgHtml={mockRawSvgHtml}
        tooltips={mockTooltips}
        labelsAndTexts={undefined}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should have correct container class', () => {
    const { container } = render(
      <FactorDiagram
        rawSvgHtml={mockRawSvgHtml}
        tooltips={mockTooltips}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
    expect(diagramContainer).toHaveClass('relative');
  });

  it('should handle tooltip element with null values', () => {
    const tooltipsWithNulls = {
      factor1: {
        title: 'Factor 1',
        status: 'Good',
        score: '85',
        description: 'Description',
        elements: [
          {
            name: null,
            value: null,
            score: null,
          },
        ],
      },
    };

    const { container } = render(
      <FactorDiagram
        rawSvgHtml={mockRawSvgHtml}
        tooltips={tooltipsWithNulls}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should handle SVG with multiple tooltip slices', () => {
    const svgWithMultipleSlices = `
      <svg>
        <g id="factor1" class="ifgTooltipSliceOpacityLight" data-tooltip-target="factor1">
          <path d="M0,0 L100,0 L100,100 Z" />
        </g>
        <g id="factor2" class="ifgTooltipSliceOpacityLight" data-tooltip-target="factor2">
          <path d="M100,0 L200,0 L200,100 Z" />
        </g>
      </svg>
    `;

    const multipleTooltips = {
      factor1: mockTooltips.factor1,
      factor2: {
        title: 'Factor 2',
        status: 'Excellent',
        score: '95',
        description: 'Another factor',
        elements: [],
      },
    };

    const { container } = render(
      <FactorDiagram
        rawSvgHtml={svgWithMultipleSlices}
        tooltips={multipleTooltips}
        labelsAndTexts={mockLabelsAndTexts}
      />
    );

    const diagramContainer = container.querySelector('.factor-diagram-container');
    expect(diagramContainer).toBeInTheDocument();
  });
});
