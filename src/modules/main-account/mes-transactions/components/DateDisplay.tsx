interface DateDisplayProps {
  date: string
}

export const DateDisplay = ({ date }: DateDisplayProps) => {
  const [datePart, timePart] = date.split(' à ')

  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium">{datePart}</span>
      {timePart && <span className="text-xs text-muted-foreground">{timePart}</span>}
    </div>
  )
}
