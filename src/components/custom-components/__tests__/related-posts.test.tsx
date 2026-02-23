import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RelatedPosts from '../related-posts';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useParams: jest.fn(() => ({})),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe('RelatedPosts', () => {
  const mockRelatedPosts = [
    {
      id: '1',
      post_name: 'post-1',
      post_title: 'First Related Post',
    },
    {
      id: '2',
      post_name: 'post-2',
      post_title: 'Second Related Post',
    },
    {
      id: '3',
      post_name: 'post-3',
      post_title: 'Third Related Post',
    },
  ];

  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render related posts', () => {
    render(<RelatedPosts relatedPosts={mockRelatedPosts} />);

    expect(screen.getByText('First Related Post')).toBeInTheDocument();
    expect(screen.getByText('Second Related Post')).toBeInTheDocument();
    expect(screen.getByText('Third Related Post')).toBeInTheDocument();
  });

  it('should render with title', () => {
    render(<RelatedPosts title="Related Articles" relatedPosts={mockRelatedPosts} />);

    expect(screen.getByText('Related Articles')).toBeInTheDocument();
  });

  it('should navigate to post when clicked', async () => {
    const user = userEvent.setup();
    render(<RelatedPosts relatedPosts={mockRelatedPosts} />);

    const firstPost = screen.getByText('First Related Post');
    await user.click(firstPost);

    expect(mockPush).toHaveBeenCalledWith('/docs/post-1');
  });

  it('should set active post on click', async () => {
    const user = userEvent.setup();
    render(<RelatedPosts relatedPosts={mockRelatedPosts} />);

    const firstPostText = screen.getByText('First Related Post');
    const firstPostButton = firstPostText.closest('button');

    await user.click(firstPostText);

    // Wait for state update and check that active post has primary text color
    await waitFor(() => {
      expect(firstPostButton).toHaveClass('text-primary');
    });
  });

  it('should render separators between posts', () => {
    const { container } = render(<RelatedPosts relatedPosts={mockRelatedPosts} />);

    const separators = container.querySelectorAll('.bg-divider');
    expect(separators.length).toBe(2); // One less than number of posts
  });

  it('should handle empty related posts array', () => {
    render(<RelatedPosts relatedPosts={[]} />);

    const container = screen.queryByText('First Related Post');
    expect(container).not.toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<RelatedPosts relatedPosts={mockRelatedPosts} />);

    // Check for the card container with bg-card class
    const card = container.querySelector('.bg-card');
    expect(card).toBeInTheDocument();
  });
});
