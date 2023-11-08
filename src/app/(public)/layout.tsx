const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full flex-1 flex-col px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full h-full sm:max-w-sm">
                {children}
            </div>
        </div>
    )
}

export default Layout