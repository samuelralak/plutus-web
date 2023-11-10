import {classNames} from "@/utils";
import {FingerPrintIcon, GlobeAltIcon, UserCircleIcon} from "@heroicons/react/24/outline";

const secondaryNavigation = [
    {name: 'Identity', href: '#', icon: UserCircleIcon, current: true},
    {name: 'Security', href: '#', icon: FingerPrintIcon, current: false},
    {name: 'Network', href: '#', icon: GlobeAltIcon, current: false},

]

const SettingsNav = () => {
    return <div className={'mx-auto w-full'}>
        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 no-scrollbar">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
                <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap">
                    {secondaryNavigation.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? 'bg-gray-50 text-indigo-600'
                                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                        'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    </div>
}

export default SettingsNav