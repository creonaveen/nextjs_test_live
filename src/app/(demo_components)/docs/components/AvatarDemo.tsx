import { Avatar, AvatarFallback, AvatarImage } from 'investtech/external-components';

function SizesSection() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Sizes</h4>
      <div className="flex items-center gap-4">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="h-14 w-14">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function FallbackSection() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">With Fallback</h4>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="broken-image.jpg" alt="@user" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="broken-image.jpg" alt="@user" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="broken-image.jpg" alt="@user" />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function ImageSection() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">With Image</h4>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
          <AvatarFallback>NX</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function StatusSection() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">With Status</h4>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="ring-background absolute right-0 bottom-0 h-3 w-3 rounded-full bg-green-500 ring-2" />
        </div>
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <span className="ring-background absolute right-0 bottom-0 h-3 w-3 rounded-full bg-yellow-500 ring-2" />
        </div>
        <div className="relative">
          <Avatar>
            <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
            <AvatarFallback>NX</AvatarFallback>
          </Avatar>
          <span className="ring-background absolute right-0 bottom-0 h-3 w-3 rounded-full bg-red-500 ring-2" />
        </div>
      </div>
    </div>
  );
}

export function AvatarDemo() {
  return (
    <div className="space-y-8">
      <SizesSection />
      <FallbackSection />
      <ImageSection />
      <StatusSection />
    </div>
  );
}

export const avatarExampleCode = `import { Avatar, AvatarFallback, AvatarImage } from "@/components/external-components/avatar"

export function AvatarDemo() {
  return (
    <div className="space-y-8">
      {/* Basic Avatars */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Basic Avatars</h4>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>NX</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* With Image */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Image</h4>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
            <AvatarFallback>NX</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* With Status */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Status</h4>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 bottom-0 w-3 h-3 bg-yellow-500 rounded-full ring-2 ring-background" />
          </div>
          <div className="relative">
            <Avatar>
              <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
              <AvatarFallback>NX</AvatarFallback>
            </Avatar>
            <span className="absolute right-0 bottom-0 w-3 h-3 bg-red-500 rounded-full ring-2 ring-background" />
          </div>
        </div>
      </div>
    </div>
  )
}`;
