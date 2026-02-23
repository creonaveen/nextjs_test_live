import type { BlockRendererFn } from './block-types';
import { TEXT_BLOCKS } from './blocks/text-blocks';
import { MEDIA_BLOCKS } from './blocks/media-blocks';
import { TABLE_BLOCKS } from './blocks/table-blocks';
import { RESEARCH_BOX_BLOCKS } from './blocks/research-box-block';
import { MISC_BLOCKS } from './blocks/misc-blocks';

export const BLOCK_RENDERERS: Record<string, BlockRendererFn> = {
  ...TEXT_BLOCKS,
  ...MEDIA_BLOCKS,
  ...TABLE_BLOCKS,
  ...RESEARCH_BOX_BLOCKS,
  ...MISC_BLOCKS,
};
