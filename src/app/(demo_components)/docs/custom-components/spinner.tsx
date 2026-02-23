import { Spinner } from '@/components/custom-components/spinner';

/**
 * Demo component for the Spinner component.
 * Shows a loading spinner animation.
 *
 * @returns A demo of the Spinner component
 */
export default function SpinnerDemo() {
  return <Spinner />;
}

export const spinnerCode = `
import * as React from 'react';

/**
 * Spinner component for displaying loading states.
 * Animated spinning circle with custom styling.
 *
 * @returns A spinner component
 */
export default function SpinnerDemo() {
  return (
    <div className="border-t-primary border-grey-200 h-5 w-5 animate-spin rounded-full border-2"></div>
  );
}
`;
