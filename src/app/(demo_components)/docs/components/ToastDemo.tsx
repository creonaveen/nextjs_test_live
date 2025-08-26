'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Toast</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up',
              description: 'Friday, February 10, 2023 at 5:57 PM',
            });
          }}
        >
          Show Toast
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Action</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your request.',
              action: <Button variant="outline">Try again</Button>,
            });
          }}
        >
          Show Toast with Action
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Description</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Success!',
              description: 'Your changes have been saved.',
            });
          }}
        >
          Show Success Toast
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Error</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Error!',
              description: 'Something went wrong. Please try again.',
            });
          }}
        >
          Show Error Toast
        </Button>
      </div>
    </div>
  );
}

export const toastExampleCode = `import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Toast</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            })
          }}
        >
          Show Toast
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Action</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <Button variant="outline">Try again</Button>,
            })
          }}
        >
          Show Toast with Action
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Description</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Success!",
              description: "Your changes have been saved.",
            })
          }}
        >
          Show Success Toast
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">With Error</h4>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Error!",
              description: "Something went wrong. Please try again.",
            })
          }}
        >
          Show Error Toast
        </Button>
      </div>
    </div>
  )
}`;
