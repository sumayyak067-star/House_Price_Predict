import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return <div className={cn("skeleton", className)} />;
}

export function ChartSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <LoadingSkeleton className="h-5 w-1/3" />
      <LoadingSkeleton className="h-3 w-1/4" />
      <LoadingSkeleton className="h-[240px] w-full" />
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="glass-card p-6 flex justify-between">
      <div className="space-y-2 flex-1">
        <LoadingSkeleton className="h-3 w-20" />
        <LoadingSkeleton className="h-8 w-28" />
      </div>
      <LoadingSkeleton className="h-10 w-10 rounded-xl" />
    </div>
  );
}
