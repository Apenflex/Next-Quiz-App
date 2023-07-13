import Header from '@/components/Header'
import { getUserByClerId } from '@/utils/auth'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUserByClerId()

    return (
        <div className="w-screen h-screen relative text-white">
            <div className="h-full w-full">
                <Header name={user.name} />
                <div className="h-screen">{children}</div>
            </div>
        </div>
    )
}
export default DashboardLayout
