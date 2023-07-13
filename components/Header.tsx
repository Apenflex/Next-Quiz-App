'use client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useState } from 'react'

const links = [
    { name: 'Quizes', href: '/quizes' },
    { name: 'Stats', href: '/stats' },
]
type User = {
    name: string | null
}
const Header = (name: User) => {
    const user = name
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="flex fixed w-full h-[65px] bg-black/90 border-b border-white/20 px-4 py-2">
            <div className="flex items-center">
                <Link href="/quizes" className="text-2xl" onClick={() => setMenuOpen(false)}>
                    QUIZ
                </Link>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex h-1/2 justify-end">
                    <h4 className="text-sm">Have a nice game, {user.name}</h4>
                </div>
                <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className={`grid grid-cols-3 justify-end menu ${menuOpen ? 'open' : ''}`}>
                    <div></div>
                    <ul className="flex h-full justify-center menuLinks">
                        {links.map((link) => (
                            <li
                                key={link.name}
                                className="text-lg px-2 hover:text-lime-600 transition-colors"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header
