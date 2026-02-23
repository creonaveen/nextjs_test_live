import React from 'react';
import { ResearchPageBlock } from '@/lib/types/research-page';

export type BlockRendererFn = (
  block: ResearchPageBlock,
  index: number,
  platform: string,
  renderBlock: (b: ResearchPageBlock, i: number, p: string) => React.ReactNode | null
) => React.ReactNode | null;
