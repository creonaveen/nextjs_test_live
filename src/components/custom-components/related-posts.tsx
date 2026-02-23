'use client';

import { Button } from 'investtech/external-components';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { RelatedPost } from '@/lib/types/research-page';
import { getUrlWithParams } from '@/utils/navigation-utils';

/**
 * Props for RelatedPosts component
 */
interface RelatedPostsProps {
  /** Optional title to display above the related posts list */
  title?: string;
  /** Array of related post items to display */
  relatedPosts: RelatedPost[];
}

/**
 * RelatedPosts - Displays a list of related posts
 *
 * Renders a sticky sidebar navigation component showing related articles or posts.
 * Automatically scrolls to top when navigating between posts.
 * Highlights the currently active post based on URL parameters.
 *
 * Memoized to prevent unnecessary re-renders when parent components update.
 *
 * @example
 * ```tsx
 * <RelatedPosts
 *   title="Related Articles"
 *   relatedPosts={posts}
 * />
 * ```
 */
const RelatedPosts = React.memo(function RelatedPosts({ title, relatedPosts }: RelatedPostsProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [activePost, setActivePost] = useState<string | null>(null);

  const handlePostClick = (postName: string) => {
    // Replace the current slug with the new post_name
    router.push(getUrlWithParams(`/docs/${postName}`, searchParams));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update active post when params change
    const postName = params.post_name as string | undefined;
    if (postName && relatedPosts.length > 0) {
      const activePostItem = relatedPosts.find((post) => post.post_name === postName);
      if (activePostItem) {
        setActivePost(activePostItem.id);
      }
    }
  }, [params, relatedPosts]);

  return (
    <div
      className={`tooltip-content-scrollbar-hide sticky flex-shrink-0 overflow-y-auto md:top-40 md:max-h-[55vh] md:w-56 lg:top-40 lg:max-h-[70vh] lg:w-64`}
    >
      <div className="bg-card rounded-lg border-none shadow-sm md:p-4 lg:p-4">
        <h2 className="text-foreground mb-4 text-lg font-semibold uppercase">{title}</h2>
        <div className="flex flex-col">
          {relatedPosts.map((post, index) => (
            <div key={post.id}>
              <Button
                variant="sectionLink"
                size="section"
                onClick={() => {
                  handlePostClick(post.post_name);
                  setActivePost(post.id);
                }}
                className={`hover:bg-background hover:text-foreground cursor-pointer px-0 py-2 text-sm font-medium break-words ${activePost === post.id ? 'text-primary' : ''}`}
                aria-current={activePost === post.id ? 'page' : undefined}
                aria-label={`Read article: ${post.post_title}`}
              >
                <span className="break-words break-all whitespace-normal">{post.post_title}</span>
              </Button>
              {index < relatedPosts.length - 1 && <div className="bg-divider my-1 h-px" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default RelatedPosts;
