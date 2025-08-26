'use client';

import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';

export function AspectRatioDemo() {
  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">16:9 Ratio (Widescreen)</h4>
        <div className="w-[500px]">
          <AspectRatio ratio={16 / 9}>
            <Image
              src="/docs/photo-1588345921523-c2dcdb7f1dcd.jpeg"
              alt="Photo by Drew Beamer"
              className="rounded-md object-cover"
              fill
              sizes="(max-width: 500px) 100vw, 500px"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">4:3 Ratio (Standard)</h4>
        <div className="h-[400px] w-[500px]">
          <AspectRatio ratio={4 / 3}>
            <Image
              src="/docs/photo-1517841905240-472988babdf9.jpeg"
              alt="Photo by Christina @ wocintechchat.com"
              className="rounded-md object-cover"
              fill
              sizes="(max-width: 500px) 100vw, 500px"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">1:1 Ratio (Square)</h4>
        <div className="h-[400px] w-[300px]">
          <AspectRatio ratio={1}>
            <Image
              src="/docs/photo-1534528741775-53994a69daeb.jpeg"
              alt="Photo by Aiony Haust"
              className="rounded-md object-cover"
              fill
              sizes="(max-width: 300px) 100vw, 300px"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">3:4 Ratio (Portrait)</h4>
        <div className="h-[800px] w-[500px]">
          <AspectRatio ratio={3 / 4}>
            <Image
              src="/docs/photo-1507003211169-0a1dd7228f2d.jpeg"
              alt="Photo by Joseph Gonzalez"
              className="rounded-md object-cover"
              fill
              sizes="(max-width: 500px) 100vw, 500px"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">21:9 Ratio (Ultrawide)</h4>
        <div className="h-[500px] w-[500px]">
          <AspectRatio ratio={21 / 9}>
            <Image
              src="/docs/photo-1506744038136-46273834b3fb.jpeg"
              alt="Photo by Max Rive"
              className="rounded-md object-cover"
              fill
              sizes="(max-width: 500px) 100vw, 500px"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Video Example</h4>
        <div className="h-[300px] w-[500px]">
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            />
          </AspectRatio>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Map Example</h4>
        <div className="h-[300px] w-[500px]">
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
              title="Google Maps"
              allowFullScreen
              loading="lazy"
              className="rounded-md"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}

export const aspectRatioExampleCode = `import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export function AspectRatioDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">16:9 Aspect Ratio</h4>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src="/docs/photo-1588345921523-c2dcdb7f1dcd.jpeg"
            alt="Photo by Drew Beamer"
            className="rounded-md object-cover"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
          />
        </AspectRatio>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">4:3 Aspect Ratio</h4>
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <Image
            src="/docs/photo-1517841905240-472988babdf9.jpeg"
            alt="Photo by Christina @ wocintechchat.com"
            className="rounded-md object-cover"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
          />
        </AspectRatio>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">1:1 Aspect Ratio</h4>
        <AspectRatio ratio={1} className="bg-muted">
          <Image
            src="/docs/photo-1534528741775-53994a69daeb.jpeg"
            alt="Photo by Aiony Haust"
            className="rounded-md object-cover"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
          />
        </AspectRatio>
      </div>
    </div>
  )
}`;
