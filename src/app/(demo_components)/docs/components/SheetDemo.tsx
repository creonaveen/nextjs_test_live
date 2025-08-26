'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';

export function SheetDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Small Sheet</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Quick Settings</SheetTitle>
              <SheetDescription>Adjust your preferences.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notifications</Label>
                  <Switch id="notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button size="sm">Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Large Sheet</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[600px]">
            <SheetHeader>
              <SheetTitle>Detailed Settings</SheetTitle>
              <SheetDescription>Configure all your application settings.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" type="tel" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input id="address" className="col-span-3" />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Left Side Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Left Sheet</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Browse through different sections.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Help
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Bottom Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Bottom Sheet</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[400px]">
            <SheetHeader>
              <SheetTitle>Quick Actions</SheetTitle>
              <SheetDescription>Perform quick actions from here.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📝</span>
                    <span>New Note</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📷</span>
                    <span>Take Photo</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <span>Share Location</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📊</span>
                    <span>View Stats</span>
                  </div>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export const sheetExampleCode = `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SheetDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Small Sheet</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Quick Settings</SheetTitle>
              <SheetDescription>Adjust your preferences.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notifications</Label>
                  <Switch id="notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" />
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button size="sm">Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Left Side Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Left Sheet</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Browse through different sections.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Help
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Bottom Sheet</h4>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Bottom Sheet</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[400px]">
            <SheetHeader>
              <SheetTitle>Quick Actions</SheetTitle>
              <SheetDescription>Perform quick actions from here.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📝</span>
                    <span>New Note</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📷</span>
                    <span>Take Photo</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <span>Share Location</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-24">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📊</span>
                    <span>View Stats</span>
                  </div>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}`;
