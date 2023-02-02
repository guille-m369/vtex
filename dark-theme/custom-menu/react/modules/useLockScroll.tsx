import { useRef, useState, useEffect } from 'react'

const useLockScroll = () => {
  const [locked, setLocked] = useState(false)
  const prevScroll = useRef('')

  useEffect(() => {
    if (locked) {
      prevScroll.current = document.body.style.overflow
    }
    document.body.style.overflow = locked ? 'hidden' : prevScroll.current

    return () => {
      if (locked) {
        document.body.style.overflow = prevScroll.current
      }
    }
  }, [locked])

  return setLocked
}

export default useLockScroll
