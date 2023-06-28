import { UserButton } from "@clerk/nextjs"
import Link from 'next/link'

const links = [
    { name: 'Quizes', href: '/quizes' },
    { name: 'Stats', href: '/stats' },
]

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-screen h-screen relative text-white">
            <aside className="absolute left-0 top-0 h-full w-[100px] border-r border-white/20 lg:w-[200px]">
                <div className="px-4 my-4">
                    <span className="text-3xl">QUIZ</span>
                </div>
                <div>
                    <ul className="px-4">
                        {links.map((link) => (
                            <li key={link.name} className="text-xl my-4">
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <div className="ml-[100px] h-full w-[calc(100vw-100px)] lg:ml-[200px] lg:w-[calc(100vw-200px)]">
                <header className="h-[60px] border-b border-white/20">
                    <nav className="px-4 h-full">
                        <div className="flex items-center justify-end h-full">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </nav>
                </header>
                <div className="h-[calc(100vh-60px)]">{children}</div>
            </div>
        </div>
    )
}
export default DashboardLayout
