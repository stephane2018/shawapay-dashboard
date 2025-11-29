'use client'

import * as React from 'react'
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Checkbox } from '@/shared/ui/checkbox'
import { Skeleton } from '@/shared/ui/skeleton'
import { cn } from '@/core/lib/utils'
import {
  Calendar,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Calendar as CalendarComponent } from '@/shared/ui/calendar'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { DateRange } from 'react-day-picker'

// Status tabs configuration
export interface StatusTab {
  value: string
  label: string
  count?: number
  icon?: React.ReactNode
}

// Filter configuration
export interface FilterConfig {
  dateFilter?: boolean
  periodFilter?: boolean
  otherFilters?: boolean
  searchPlaceholder?: string
}

// Other filters options
export interface OtherFilterOption {
  id: string
  label: string
  options: { value: string; label: string }[]
}

// Date filter state
export interface DateFilterState {
  date?: Date
  range?: DateRange
  otherFilters?: Record<string, string>
}

// Bulk action configuration
export interface BulkAction {
  label: string
  icon?: React.ReactNode
  onClick: (selectedRows: unknown[]) => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
}

interface TransactionDataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  emptyMessage?: string

  // Status tabs
  statusTabs?: StatusTab[]
  activeStatus?: string
  onStatusChange?: (status: string) => void

  // Filters
  filterConfig?: FilterConfig
  onSearch?: (query: string) => void
  onDateFilterChange?: (date: Date | undefined) => void
  onPeriodFilterChange?: (range: DateRange | undefined) => void
  onOtherFiltersChange?: (filters: Record<string, string>) => void
  otherFilterOptions?: OtherFilterOption[]
  onDownload?: () => void

  // Bulk actions
  bulkActions?: BulkAction[]

  // Pagination
  pageSize?: number
  totalCount?: number
  currentPage?: number
  onPageChange?: (page: number) => void

  // Row selection
  enableRowSelection?: boolean
  onRowSelectionChange?: (rows: T[]) => void
}

export function TransactionDataTable<T>({
  data,
  columns: initialColumns,
  isLoading = false,
  emptyMessage = 'Aucun résultat.',

  statusTabs,
  activeStatus = 'all',
  onStatusChange,

  filterConfig = {
    dateFilter: true,
    periodFilter: true,
    otherFilters: true,
    searchPlaceholder: 'Rechercher',
  },
  onSearch,
  onDateFilterChange,
  onPeriodFilterChange,
  onOtherFiltersChange,
  otherFilterOptions = [],
  onDownload,

  bulkActions,

  pageSize = 10,
  totalCount = 0,
  currentPage = 1,
  onPageChange,

  enableRowSelection = true,
  onRowSelectionChange,
}: TransactionDataTableProps<T>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: currentPage - 1,
    pageSize,
  })

  // Filter states
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [otherFiltersState, setOtherFiltersState] = React.useState<Record<string, string>>({})
  const [datePopoverOpen, setDatePopoverOpen] = React.useState(false)
  const [periodPopoverOpen, setPeriodPopoverOpen] = React.useState(false)
  const [otherFiltersPopoverOpen, setOtherFiltersPopoverOpen] = React.useState(false)

  // Add selection column if enabled
  const columns: ColumnDef<T>[] = React.useMemo(() => {
    if (!enableRowSelection) return initialColumns

    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Sélectionner tout"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Sélectionner la ligne"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        meta: { className: 'w-10' },
      },
      ...initialColumns,
    ]
  }, [initialColumns, enableRowSelection])

  const table = useReactTable({
    data,
    columns,
    rowCount: totalCount,
    manualPagination: true,
    enableRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater
      setRowSelection(newSelection)
      if (onRowSelectionChange) {
        const selectedRows = Object.keys(newSelection)
          .filter((key) => newSelection[key])
          .map((key) => data[parseInt(key)])
        onRowSelectionChange(selectedRows)
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const selectedCount = Object.keys(rowSelection).filter((k) => rowSelection[k]).length
  const totalPages = Math.ceil(totalCount / pageSize) || 1
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalCount)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  // Handle date filter
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    onDateFilterChange?.(date)
    if (date) setDatePopoverOpen(false)
  }

  // Handle period filter
  const handlePeriodSelect = (range: DateRange | undefined) => {
    setDateRange(range)
    onPeriodFilterChange?.(range)
  }

  // Handle other filters
  const handleOtherFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...otherFiltersState, [filterId]: value }
    setOtherFiltersState(newFilters)
    onOtherFiltersChange?.(newFilters)
  }

  // Clear date filter
  const clearDateFilter = () => {
    setSelectedDate(undefined)
    onDateFilterChange?.(undefined)
  }

  // Clear period filter
  const clearPeriodFilter = () => {
    setDateRange(undefined)
    onPeriodFilterChange?.(undefined)
  }

  // Clear other filters
  const clearOtherFilters = () => {
    setOtherFiltersState({})
    onOtherFiltersChange?.({})
  }

  // Check if any filter is active
  const hasActiveFilters = selectedDate || dateRange?.from || Object.keys(otherFiltersState).some(k => otherFiltersState[k])

  return (
    <div className="space-y-4">
      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Date Filter */}
          {filterConfig.dateFilter && (
            <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'gap-2',
                    selectedDate && 'border-red-500 bg-red-50 text-red-600 dark:bg-red-950/30'
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  {selectedDate ? format(selectedDate, 'dd MMM yyyy', { locale: fr }) : 'Filtrer par date'}
                  {selectedDate && (
                    <X
                      className="h-3 w-3 ml-1 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearDateFilter()
                      }}
                    />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={fr}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}

          {/* Period Filter */}
          {filterConfig.periodFilter && (
            <Popover open={periodPopoverOpen} onOpenChange={setPeriodPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'gap-2',
                    dateRange?.from && 'border-red-500 bg-red-50 text-red-600 dark:bg-red-950/30'
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'dd MMM', { locale: fr })} - {format(dateRange.to, 'dd MMM yyyy', { locale: fr })}
                      </>
                    ) : (
                      format(dateRange.from, 'dd MMM yyyy', { locale: fr })
                    )
                  ) : (
                    'Filtrer par période'
                  )}
                  {dateRange?.from && (
                    <X
                      className="h-3 w-3 ml-1 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearPeriodFilter()
                      }}
                    />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={handlePeriodSelect}
                  locale={fr}
                  numberOfMonths={2}
                  initialFocus
                />
                <div className="flex items-center justify-end gap-2 border-t p-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clearPeriodFilter()
                      setPeriodPopoverOpen(false)
                    }}
                  >
                    Effacer
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setPeriodPopoverOpen(false)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Appliquer
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Other Filters */}
          {filterConfig.otherFilters && otherFilterOptions.length > 0 && (
            <Popover open={otherFiltersPopoverOpen} onOpenChange={setOtherFiltersPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'gap-2',
                    Object.keys(otherFiltersState).some(k => otherFiltersState[k]) &&
                      'border-red-500 bg-red-50 text-red-600 dark:bg-red-950/30'
                  )}
                >
                  <Filter className="h-4 w-4" />
                  Autres filtres
                  {Object.keys(otherFiltersState).filter(k => otherFiltersState[k]).length > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                      {Object.keys(otherFiltersState).filter(k => otherFiltersState[k]).length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filtres</h4>
                    {Object.keys(otherFiltersState).some(k => otherFiltersState[k]) && (
                      <Button variant="ghost" size="sm" onClick={clearOtherFilters} className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                        Réinitialiser
                      </Button>
                    )}
                  </div>
                  {otherFilterOptions.map((filter) => (
                    <div key={filter.id} className="space-y-2">
                      <Label className="text-sm">{filter.label}</Label>
                      <Select
                        value={otherFiltersState[filter.id] || ''}
                        onValueChange={(value) => handleOtherFilterChange(filter.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={`Sélectionner ${filter.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                  <div className="flex justify-end pt-2">
                    <Button
                      size="sm"
                      onClick={() => setOtherFiltersPopoverOpen(false)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Appliquer
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Simple Other Filters button when no options provided */}
          {filterConfig.otherFilters && otherFilterOptions.length === 0 && (
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Autres filtres
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder={filterConfig.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-[200px] pl-8"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {onDownload && (
            <Button variant="outline" size="sm" className="gap-2" onClick={onDownload}>
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          )}
        </div>
      </div>

      {/* Status Tabs */}
      {statusTabs && statusTabs.length > 0 && (
        <div className="flex items-center justify-between border-b">
          <Tabs value={activeStatus} onValueChange={onStatusChange}>
            <TabsList className="h-auto bg-transparent p-0">
              {statusTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="gap-2 rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-600 data-[state=active]:shadow-none"
                >
                  {tab.icon}
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="ml-1 text-xs text-muted-foreground">({tab.count})</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Par</span>
            <select
              className="rounded border bg-background px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => {
                const newSize = parseInt(e.target.value)
                setPagination((prev) => ({ ...prev, pageSize: newSize }))
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>
              {startItem}-{endItem} sur {totalCount}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedCount > 0 && bulkActions && bulkActions.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
          <span className="text-sm text-muted-foreground">
            {selectedCount} élément(s) sélectionné(s)
          </span>
          {bulkActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              size="sm"
              className="gap-2"
              onClick={() => {
                const selectedRows = Object.keys(rowSelection)
                  .filter((k) => rowSelection[k])
                  .map((k) => data[parseInt(k)])
                action.onClick(selectedRows)
              }}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const className = header.column.columnDef.meta?.className as string | undefined
                  return (
                    <TableHead key={header.id} className={cn('text-xs font-semibold uppercase text-muted-foreground', className)}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((_, cellIndex) => (
                    <TableCell key={`skeleton-cell-${index}-${cellIndex}`}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => {
                    const className = cell.column.columnDef.meta?.className as string | undefined
                    return (
                      <TableCell key={cell.id} className={cn('py-3', className)}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
