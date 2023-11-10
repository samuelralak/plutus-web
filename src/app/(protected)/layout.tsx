import Header from "@/components/shared/Header";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full flex-1 flex-col">
            <div className="sm:mx-auto sm:w-full h-full sm:max-w-sm">
                <Header />
                <div className="w-full pt-16 h-full">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Layout