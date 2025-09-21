import { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField'

type Props = {
  value: string
  onChange: (v: string) => void
}

// CKEditor 5 Classic via CDN with graceful fallback.
// This avoids incompatible peer issues with React 19.
export function WysiwygEditor({ value, onChange }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<any>(null)
  const [ready, setReady] = useState(false)

  // Initialize CKEditor 5 from CDN
  useEffect(() => {
    let mounted = true
    const ensureScript = () =>
      new Promise<void>((resolve, reject) => {
        if ((window as any).ClassicEditor) return resolve()
        const id = 'ckeditor5-classic-cdn'
        if (document.getElementById(id)) {
          // Wait for it to finish loading
          const check = () => ((window as any).ClassicEditor ? resolve() : setTimeout(check, 50))
          check()
          return
        }
        const script = document.createElement('script')
        script.id = id
        script.src = 'https://cdn.ckeditor.com/ckeditor5/43.1.0/classic/ckeditor.js'
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load CKEditor'))
        document.body.appendChild(script)
      })

    ensureScript()
      .then(async () => {
        if (!mounted || !hostRef.current) return
        const ClassicEditor = (window as any).ClassicEditor
        try {
          const instance = await ClassicEditor.create(hostRef.current, {
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              'link',
              '|',
              'bulletedList',
              'numberedList',
              '|',
              'blockQuote',
              'codeBlock',
              '|',
              'undo',
              'redo',
            ],
          })
          editorRef.current = instance
          instance.setData(value || '')
          instance.model.document.on('change:data', () => {
            const data = instance.getData()
            onChange(data)
          })
          if (mounted) setReady(true)
        } catch (e) {
          // Could not initialize; fallback will display
          if (mounted) setReady(false)
        }
      })
      .catch(() => {
        if (mounted) setReady(false)
      })

    return () => {
      mounted = false
      if (editorRef.current) {
        try {
          editorRef.current.destroy()
        } catch {}
        editorRef.current = null
      }
    }
  }, [])

  // Keep external value in sync if it changes independently
  useEffect(() => {
    const editor = editorRef.current
    if (ready && editor) {
      const current = editor.getData()
      if (value !== current) editor.setData(value || '')
    }
  }, [value, ready])

  return (
    <>
      {/* CKEditor host element (always present) */}
      <div ref={hostRef} style={ready ? undefined : { display: 'none' }} />
      {/* Fallback editor while CKEditor is not ready */}
      {!ready && (
        <TextField
          label="Body"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          minRows={6}
          multiline
          fullWidth
        />
      )}
    </>
  )
}
