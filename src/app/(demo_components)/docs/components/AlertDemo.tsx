'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function AlertDemo() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  );
}

export const alertExampleCode = `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Basic Alert
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the cli.</AlertDescription>
</Alert>

// Destructive Alert
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
</Alert>

// Success Alert
<Alert className="bg-green-50 text-green-800 border-green-200">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>`;
