'use client';

import { Progress } from 'investtech/external-components';

export function ProgressBarDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>33%</span>
        </div>
        <Progress value={33} indicatorClassName="bg-green-700" className="bg-green-700/20" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>66%</span>
        </div>
        <Progress value={66} indicatorClassName="bg-yellow-400" className="bg-yellow-400/20" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>100%</span>
        </div>
        <Progress value={100} indicatorClassName="bg-red-700" className="bg-red-700/20" />
      </div>
    </div>
  );
}

export const progressBarExampleCode = `import { Progress } from "@/components/external-components/progress"

export function ProgressBarDemo() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>33%</span>
        </div>
        <Progress value={33} indicatorClassName="bg-green-700" className="bg-green-700/20"/>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>66%</span>
        </div>
        <Progress value={66} indicatorClassName="bg-yellow-400" className="bg-yellow-400/20" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>100%</span>
        </div>
        <Progress value={100} indicatorClassName="bg-red-700" className="bg-red-700/20" />
      </div>
    </div>
  )
}`;
