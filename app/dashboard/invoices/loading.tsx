import type { ReactElement } from 'react';
import { InvoicesTableSkeleton, SearchSkeleton } from '@/app/ui/skeletons';

export default function Loading(): ReactElement {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="h-8 w-36 rounded-md bg-gray-100" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchSkeleton />
        <div className="h-10 w-32 rounded-md bg-gray-100" />
      </div>
      <InvoicesTableSkeleton />
    </div>
  );
}

