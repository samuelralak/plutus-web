import SettingsNav from "@/components/settings/SettingsNav";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <SettingsNav />
            {children}
        </>
    )
}

export default Layout