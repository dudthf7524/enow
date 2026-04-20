import { useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function BottomSheet({ open, onClose, children }: Props) {
  // body 스크롤 잠금
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else       document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
        onClick={onClose}
      />
      <div
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl
                   shadow-[0_-8px_40px_rgba(0,0,0,0.12)] animate-slide-up
                   max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white pt-3 pb-1 px-5">
          <div className="w-9 h-1 bg-black/15 rounded-full mx-auto" />
        </div>
        <div className="px-5 pb-10">{children}</div>
      </div>
    </>
  )
}
