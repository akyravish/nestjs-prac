'use client';

import type { ReactElement, ReactNode } from 'react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from '@/app/ui/invoices/pagination';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

type InvoicesTableSectionProps = {
  children: ReactNode;
  totalPages: number;
};

export default function InvoicesTableSection({
  children,
  totalPages
}: InvoicesTableSectionProps): ReactElement {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigate = (href: string): void => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      {isPending ? <InvoicesTableSkeleton /> : children}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} onNavigate={handleNavigate} />
      </div>
    </>
  );
}
