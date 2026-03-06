'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

type PaginationProps = {
  totalPages: number;
  onNavigate?: (href: string) => void;
};

export default function Pagination({ totalPages, onNavigate }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
        onNavigate={onNavigate}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
              onNavigate={onNavigate}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        onNavigate={onNavigate}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  onNavigate
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
  onNavigate?: (href: string) => void;
}) {
  const className = clsx('flex h-10 w-10 items-center justify-center text-sm border', {
    'rounded-l-md': position === 'first' || position === 'single',
    'rounded-r-md': position === 'last' || position === 'single',
    'z-10 bg-blue-600 border-blue-600 text-white': isActive,
    'hover:bg-gray-100': !isActive && position !== 'middle',
    'text-gray-300': position === 'middle'
  });

  if (isActive || position === 'middle') {
    return <div className={className}>{page}</div>;
  }

  if (onNavigate) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => onNavigate(href)}
      >
        {page}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  onNavigate
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
  onNavigate?: (href: string) => void;
}) {
  const className = clsx('flex h-10 w-10 items-center justify-center rounded-md border', {
    'pointer-events-none text-gray-300': isDisabled,
    'hover:bg-gray-100': !isDisabled,
    'mr-2 md:mr-4': direction === 'left',
    'ml-2 md:ml-4': direction === 'right'
  });

  const icon =
    direction === 'left' ? <ArrowLeftIcon className="w-4" /> : <ArrowRightIcon className="w-4" />;

  if (isDisabled) {
    return <div className={className}>{icon}</div>;
  }

  if (onNavigate) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => onNavigate(href)}
      >
        {icon}
      </button>
    );
  }

  return (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
