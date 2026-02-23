'use client';

import { Button } from 'investtech/external-components';
import { useToast } from 'investtech/external-components';

function DefaultToast() {
  const { toast } = useToast();

  return (
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
  );
}

function ToastWithAction() {
  const { toast } = useToast();

  return (
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
  );
}

function ToastWithDescription() {
  const { toast } = useToast();

  return (
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
  );
}

function ErrorToast() {
  const { toast } = useToast();

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">With Error</h4>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Error!',
            description: 'Something went wrong. Please try again.',
          });
        }}
      >
        Show Error Toast
      </Button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <div className="space-y-4">
      <DefaultToast />
      <ToastWithAction />
      <ToastWithDescription />
      <ErrorToast />
    </div>
  );
}

export const toastExampleCode = `import { useToast } from "@/components/external-components/use-toast"
import { Button } from "@/components/external-components/button"

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
