import { useState, useCallback } from 'react'

export interface ToastMessage {
  id: number
  message: string
  type: 'default' | 'reward'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const show = useCallback((message: string, type: ToastMessage['type'] = 'default') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, show, dismiss }
}
