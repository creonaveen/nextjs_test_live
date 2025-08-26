'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CardDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Small Card</h4>
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle>Small Card</CardTitle>
            <CardDescription>A compact card example.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is a small card with minimal content.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Card</h4>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>Standard card with more content.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is a default sized card with more detailed content and a form.</p>
            <form className="mt-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Large Card</h4>
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Large Card</CardTitle>
            <CardDescription>A spacious card with rich content.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                This is a large card that can accommodate more complex content and multiple
                sections.
              </p>
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Section 1</h4>
                <p className="text-muted-foreground text-sm">Additional information goes here.</p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Section 2</h4>
                <p className="text-muted-foreground text-sm">More content can be added here.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="lg">
              Cancel
            </Button>
            <Button size="lg">Submit</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Interactive Card</h4>
        <Card className="w-[350px] transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
            <CardDescription>Hover over this card to see the effect.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card has hover effects and interactive elements.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost">Learn More</Button>
            <Button>Get Started</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Split Header Card</h4>
        <Card className="w-[400px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Monthly performance metrics</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button size="sm">Refresh</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-xs text-green-500">+12% from last month</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Revenue</p>
                  <p className="text-2xl font-bold">$12,345</p>
                  <p className="text-xs text-green-500">+8% from last month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Detailed Info Card</h4>
        <Card className="w-[450px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Complete project information</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Edit
              </Button>
              <Button variant="ghost" size="sm">
                Share
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-green-500">In Progress</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm">Dec 31, 2024</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Priority</p>
                  <p className="text-sm text-orange-500">High</p>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-medium">Description</h4>
                <p className="text-muted-foreground text-sm">
                  This project involves developing a new feature set for the platform, including
                  user authentication, data visualization, and real-time updates.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-medium">Team Members</h4>
                <div className="flex space-x-2">
                  <div className="bg-primary/10 rounded-full px-3 py-1 text-xs">John Doe</div>
                  <div className="bg-primary/10 rounded-full px-3 py-1 text-xs">Jane Smith</div>
                  <div className="bg-primary/10 rounded-full px-3 py-1 text-xs">+3 more</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View Timeline</Button>
            <Button>Update Progress</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Notification Card</h4>
        <Card className="w-[400px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>Recent updates and alerts</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Mark all read
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">System Update Available</p>
                  <p className="text-muted-foreground text-sm">A new version is ready to install</p>
                  <p className="text-muted-foreground text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 rounded-lg border p-3">
                <div className="rounded-full bg-green-100 p-2">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Backup Completed</p>
                  <p className="text-muted-foreground text-sm">System backup was successful</p>
                  <p className="text-muted-foreground text-xs">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export const cardExampleCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function CardDemo() {
  return (
    <div className="space-y-4">
      {/* Small Card */}
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>A compact card example.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">This is a small card with minimal content.</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>

      {/* Default Card */}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card with more content.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a default sized card with more detailed content and a form.</p>
          <form className="mt-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>

      {/* Large Card */}
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>A spacious card with rich content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>This is a large card that can accommodate more complex content and multiple sections.</p>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Section 1</h4>
              <p className="text-sm text-muted-foreground">Additional information goes here.</p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium">Section 2</h4>
              <p className="text-sm text-muted-foreground">More content can be added here.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="lg">Cancel</Button>
          <Button size="lg">Submit</Button>
        </CardFooter>
      </Card>

      {/* Interactive Card */}
      <Card className="w-[350px] transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover over this card to see the effect.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has hover effects and interactive elements.</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Learn More</Button>
          <Button>Get Started</Button>
        </CardFooter>
      </Card>

      {/* Split Header Card */}
      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Monthly performance metrics</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">Export</Button>
            <Button size="sm">Refresh</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-green-500">+12% from last month</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm font-medium">Revenue</p>
                <p className="text-2xl font-bold">$12,345</p>
                <p className="text-xs text-green-500">+8% from last month</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Info Card */}
      <Card className="w-[450px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Complete project information</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">Share</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm text-green-500">In Progress</p>
              </div>
              <div>
                <p className="text-sm font-medium">Due Date</p>
                <p className="text-sm">Dec 31, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium">Priority</p>
                <p className="text-sm text-orange-500">High</p>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                This project involves developing a new feature set for the platform, including
                user authentication, data visualization, and real-time updates.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Team Members</h4>
              <div className="flex space-x-2">
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs">John Doe</div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs">Jane Smith</div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs">+3 more</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Timeline</Button>
          <Button>Update Progress</Button>
        </CardFooter>
      </Card>

      {/* Notification Card */}
      <Card className="w-[400px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Recent updates and alerts</CardDescription>
          </div>
          <Button variant="ghost" size="sm">Mark all read</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 rounded-lg border p-3">
              <div className="rounded-full bg-blue-100 p-2">
                <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">System Update Available</p>
                <p className="text-sm text-muted-foreground">A new version is ready to install</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 rounded-lg border p-3">
              <div className="rounded-full bg-green-100 p-2">
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Backup Completed</p>
                <p className="text-sm text-muted-foreground">System backup was successful</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Notifications</Button>
        </CardFooter>
      </Card>
    </div>
  )
}`;
