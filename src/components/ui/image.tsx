'use client';

import NextImage from 'next/image';

import { getImageBasePath } from '@/lib/hooks/useBasePath';
interface EnhancedImageProps extends React.ComponentProps<typeof NextImage> {
  src: string;
  alt: string;
}
export const Image = ({ src, alt, ...props }: EnhancedImageProps) => {
  const processedSrc = getImageBasePath() + src;
  return <NextImage src={processedSrc} alt={alt} {...props} />;
};
Image.displayName = 'Image';
export default Image;
