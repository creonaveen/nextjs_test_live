'use client';

import { Card, CardContent } from 'investtech/external-components';
import Image from 'next/image';
import React from 'react';

import { SeeMoreButton, STYLE_CLASSES } from './home-card-primitives';
import { RenderHTML } from '@/utils/create-mark-up';
import { News } from '@/lib/types/home';

interface NewsCardProps {
  data: News;
  onNavigate: (url: string) => void;
}

function NewsCardImage({ url, alt }: { url: string; alt: string }) {
  return (
    <div className="relative h-[250px] w-full flex-shrink-0" id="news-card-image">
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

function NewsCardBody({ data }: { data: News }) {
  const desc = data.description;
  return (
    <div className="flex flex-1 flex-col space-y-4 px-5 py-5">
      <div className="space-y-1">
        {desc?.caption_title && (
          <h3 className={STYLE_CLASSES.heading} id="news-card-heading">
            <RenderHTML html={desc.caption_title} />
          </h3>
        )}
        {desc?.caption_description && (
          <p className={STYLE_CLASSES.caption} id="news-card-text">
            <RenderHTML html={desc.caption_description} />
          </p>
        )}
      </div>
      <div className="flex-1" />
      {data.see_more?.text && (
        <SeeMoreButton text={data.see_more.text} testId="news-card-read-more" />
      )}
    </div>
  );
}

export const NewsCard = React.memo(function NewsCard({ data, onNavigate }: NewsCardProps) {
  const url = data.see_more?.url ?? '';
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') onNavigate(url);
  };

  return (
    <Card
      className={`${STYLE_CLASSES.cardClickable} overflow-hidden p-0`}
      onClick={() => onNavigate(url)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="News section - click to see more"
      id="news-card"
    >
      <CardContent className="flex h-full flex-col p-0">
        {data.data?.image_param?.url && (
          <NewsCardImage
            url={data.data.image_param.url}
            alt={data.data.image_param.alt ?? 'News image'}
          />
        )}
        <NewsCardBody data={data} />
      </CardContent>
    </Card>
  );
});
