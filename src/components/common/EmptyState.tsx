interface Props {
  icon?: string
  title: string
  description?: string
}

export function EmptyState({ icon = '☕', title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <span className="text-4xl mb-4">{icon}</span>
      <p className="text-base font-semibold text-black/60">{title}</p>
      {description && (
        <p className="text-sm text-black/35 mt-1">{description}</p>
      )}
    </div>
  )
}
