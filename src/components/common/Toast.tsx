import type { ToastMessage } from '@/hooks/useToast'

interface Props {
  toasts: ToastMessage[]
  onDismiss: (id: number) => void
}

export function ToastContainer({ toasts, onDismiss }: Props) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed top-4 inset-x-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none">
      {toasts.map(t => (
        <button
          key={t.id}
          onClick={() => onDismiss(t.id)}
          className={`
            pointer-events-auto animate-toast-in
            px-4 py-3 rounded-2xl shadow-lg text-sm font-medium text-left max-w-sm w-full
            ${t.type === 'reward'
              ? 'bg-black text-white'
              : 'bg-white border border-black/10 text-black'}
          `}
        >
          {t.message}
        </button>
      ))}
    </div>
  )
}
