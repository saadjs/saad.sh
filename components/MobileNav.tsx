'use client'

import { useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const previousBodyOverflow = useRef<string>('')

  const onToggleNav = () => {
    setNavShow((status) => !status)
  }

  useEffect(() => {
    const body = document.body

    if (navShow) {
      previousBodyOverflow.current = body.style.overflow
      body.style.overflow = 'hidden'
    } else {
      if (previousBodyOverflow.current) {
        body.style.overflow = previousBodyOverflow.current
      } else {
        body.style.removeProperty('overflow')
      }
    }

    return () => {
      if (previousBodyOverflow.current) {
        body.style.overflow = previousBodyOverflow.current
      } else {
        body.style.removeProperty('overflow')
      }
    }
  }, [navShow])

  useEffect(() => {
    if (!navShow) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNavShow(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [navShow])

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="xl:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Close navigation menu"
        className={`fixed inset-0 z-60 bg-black/25 transition-opacity duration-200 ease-out focus:outline-none ${navShow ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} border-0 p-0`}
        onClick={onToggleNav}
      />

      <div
        aria-modal="true"
        role="dialog"
        className={`fixed left-0 top-0 z-70 h-full w-full bg-white transition-transform duration-300 ease-in-out ${navShow ? 'translate-x-0 opacity-95' : 'pointer-events-none translate-x-full opacity-0'} dark:bg-gray-950 dark:opacity-[0.98]`}
      >
        <nav
          ref={navRef}
          className="mt-8 flex h-full basis-0 flex-col items-start overflow-y-auto pl-12 pt-2 text-left"
        >
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="mb-4 py-2 pr-4 text-2xl font-bold tracking-widest text-gray-900 outline outline-0 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <button
          className="fixed right-4 top-7 z-80 h-16 w-16 p-4 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
          aria-label="Toggle Menu"
          onClick={onToggleNav}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  )
}

export default MobileNav
