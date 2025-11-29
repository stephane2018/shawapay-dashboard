'use client'

import * as React from 'react'
import { Skeleton } from '@/shared/ui/skeleton'
import { cn } from '@/core/lib/utils'

interface DataTableSkeletonProps {
  columns?: number
  rows?: number
  showFilters?: boolean
  showTabs?: boolean
  showBulkActions?: boolean
  showPagination?: boolean
  className?: string
}

export const DataTableSkeleton: React.FC<DataTableSkeletonProps> = ({
  columns = 8,
  rows = 10,
  showFilters = true,
  showTabs = true,
  showBulkActions = false,
  showPagination = true,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Filters Row Skeleton */}
      {showFilters && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-[140px]" />
            <Skeleton className="h-9 w-[140px]" />
            <Skeleton className="h-9 w-[120px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-[200px]" />
            <Skeleton className="h-9 w-[120px]" />
          </div>
        </div>
      )}

      {/* Status Tabs Skeleton */}
      {showTabs && (
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-12" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      )}

      {/* Bulk Actions Skeleton */}
      {showBulkActions && (
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-28" />
        </div>
      )}

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-lg border bg-card">
        {/* Header */}
        <div className="bg-muted/50 px-4 py-3">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-4" />
            {Array.from({ length: columns - 1 }).map((_, i) => (
              <Skeleton
                key={`header-${i}`}
                className="h-4"
                style={{ width: `${Math.random() * 60 + 60}px` }}
              />
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex items-center gap-4 px-4 py-4">
              <Skeleton className="h-4 w-4" />
              {Array.from({ length: columns - 1 }).map((_, cellIndex) => (
                <Skeleton
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="h-5"
                  style={{ width: `${Math.random() * 80 + 40}px` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      {showPagination && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      )}
    </div>
  )
}
