import { UserButton } from "@clerk/nextjs"
import Link from 'next/link'

const links = [
    { name: 'Quizes', href: '/quizes' },
    { name: 'Stats', href: '/stats' },
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen h-screen relative text-white">
            <div className="h-full w-full">
                <header className="fixed w-full h-[60px] bg-black/90 border-b border-white/20">
                    <nav className="px-4 h-full">
                        <div className="flex items-center justify-between h-full">
                            <div className="px-4 my-4">
                                <span className="text-3xl">QUIZ</span>
                            </div>
                            <ul className="px-4 flex">
                                {links.map((link) => (
                                    <li key={link.name} className="text-xl m-4 hover:text-lime-600 transition-colors">
                                        <Link href={link.href}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </nav>
                </header>
                <div className="pt-[80px]">{children}</div>
            </div>
        </div>
    )
}
export default DashboardLayout
