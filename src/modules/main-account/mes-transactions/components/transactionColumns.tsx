import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/shared/ui/button'
import { More, Eye, Copy } from 'iconsax-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { toast } from 'sonner'
import { TypeBadge } from './TypeBadge'
import { AccountTypeBadge } from './AccountTypeBadge'
import { AmountDisplay } from './AmountDisplay'
import { DateDisplay } from './DateDisplay'

export interface TransactionDisplay {
  id: string
  type: 'CREDIT' | 'DEBIT'
  amount: number
  accountType: 'PRIMARY' | 'SECONDARY'
  createdAt: string
  userId: string
}

export const transactionColumns: ColumnDef<TransactionDisplay>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <TypeBadge type={row.original.type} amount={row.original.amount} />,
  },
  {
    accessorKey: 'amount',
    header: 'Montant',
    cell: ({ row }) => <AmountDisplay amount={row.original.amount} type={row.original.type} />,
  },
  {
    accessorKey: 'accountType',
    header: 'Compte',
    cell: ({ row }) => <AccountTypeBadge accountType={row.original.accountType} />,
  },
  {
    accessorKey: 'userId',
    header: 'ID Utilisateur',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground">
          {row.original.userId.substring(0, 13)}...
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => {
            navigator.clipboard.writeText(row.original.userId)
            toast.success('ID copié dans le presse-papiers')
          }}
        >
          <Copy size={12} />
        </Button>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => <DateDisplay date={row.original.createdAt} />,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <More size={16} variant="Bulk" color="currentColor" className="text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="gap-2">
            <Eye size={16} variant="Bulk" color="currentColor" /> Voir détails
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Copy size={16} variant="Bulk" color="currentColor" /> Copier ID
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
