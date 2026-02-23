'use client';
import React from 'react';
import { Button } from 'investtech/external-components';
import { RenderHTML } from '@/utils/create-mark-up';
import { Action, ResearchPageBlock } from '@/lib/types/research-page';
import { renderTooltipContent } from './render-component-parts/shared-tooltip';
import { BLOCK_RENDERERS } from './render-component-parts/block-registry';

export { renderTooltipContent };

export const renderBlock = (
  block: ResearchPageBlock,
  index: number,
  platform: string
): React.ReactNode | null => {
  const fn = BLOCK_RENDERERS[block.type];
  return fn ? fn(block, index, platform, renderBlock) : null;
};

export const renderActions = (actions: Action[] | undefined) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      {actions.map((action, index) => {
        if (action.type === 'button') {
          return (
            <Button
              key={index}
              variant="outline"
              className="w-full sm:w-auto"
              id={`research-page-action-button-${index + 1}`}
            >
              <RenderHTML html={action.label} />
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
};
