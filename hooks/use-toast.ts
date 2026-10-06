import { useCallback } from "react"

export type ToastItem = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  [key: string]: unknown
}

export function useToast(): {
  toast: (props: Omit<ToastItem, "id">) => void
  toasts: ToastItem[]
} {
  return {
    toast: useCallback((props: Omit<ToastItem, "id">) => {
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("toast", { detail: props }))
    }, []),
    toasts: [],
  }
}
