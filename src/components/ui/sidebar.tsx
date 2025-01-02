/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import useClickAway from '@/hooks/useClickAway'
import useWindowSize from '@/hooks/useWindowSize'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Divider } from './divider'
import { Text } from './text'
import { usePathname } from 'next/navigation'
import { IconPicker } from './icon-picker'
import { IconNames } from './icon-picker/icon-names'
import { isTrainer } from '@/utils/checkPermission'
import { useUser } from '@/context/user'

interface NavLinkProps {
  children: React.ReactNode
  href: string
  active?: boolean
  className?: string
}

interface Datatype {
  title: string
  href: string
  icon: IconNames
  roles?: string[]
}

const NavLink = ({ children, href, active, className }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center text-grey-600 py-3 px-4 gap-2 rounded-lg hover:opacity-80',
        {
          'bg-primary text-white border border-lust-200': active,
          'opacity-95': !active,
        },
        className
      )}
    >
      {children}
    </Link>
  )
}

const DotIcon = ({ className = '' }) => (
  <div className={cn('h-2 w-2 rounded-full bg-grey-300', className)} />
)

const generalData = [
  {
    title: 'Dashboard',
    icon: 'grid7',
    href: '',
    roles: [
      'school',
      'instructor',
      'play4health_admin',
      'super_admin',
      'jica_researchers',
    ],
  },
  {
    title: 'Interviews',
    icon: 'outlineDocumentText',
    href: 'interviews',
    roles: [
      'school',
      'instructor',
      'play4health_admin',
      'super_admin',
      'jica_enumerators',
      'jica_researchers',
    ],
  },
  {
    title: 'NCD Risk Assessment',
    icon: 'assessment',
    href: 'risk-assessment',
    roles: [
      'school',
      'instructor',
      'play4health_admin',
      'super_admin',
      'jica_enumerators',
      'jica_researchers',
    ],
  },
  // {
  //   title: 'Health Data',
  //   icon: 'health',
  //   href: 'health-data',
  //   roles: ['school', 'instructor', 'play4health_admin', 'super_admin'],
  // },
  {
    title: 'Schedule',
    icon: 'calendar',
    href: 'screening',
    roles: [
      'school',
      'instructor',
      'play4health_admin',
      'super_admin',
      'jica_enumerators',
      'jica_researchers',
    ],
  },
  {
    title: 'Surveillance',
    icon: 'survey',
    href: 'surveillance',
    roles: [
      'school',
      'instructor',
      'play4health_admin',
      'super_admin',
      'jica_enumerators',
      'jica_researchers',
    ],
  },
  // {
  //   title: 'Training Module',
  //   icon: 'book',
  //   href: 'training-module',
  //   roles: [
  //     'school',
  //     'instructor',
  //     'play4health_admin',
  //     'trainer',
  //     'super_admin',
  //   ],
  // },
  {
    title: 'Trainers Data',
    icon: 'book',
    href: 'training-module/admin',
    roles: ['play4health_admin', 'admin', 'super_admin'],
  },
] as Datatype[]

const othersData = [
  {
    title: 'App Settings',
    icon: 'setting2',
    href: 'settings',
  },
  // {
  //   title: 'Support',
  //   icon: 'messageQuestion',
  //   href: 'support',
  // },
] as Datatype[]

interface ISideBar {
  sideOpen: boolean
  sideToggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({ sideOpen, sideToggleOpen }: ISideBar) => {
  const pathname = usePathname()
  const user = useUser((state) => state.user)

  const [isHealthDataOpen, setHealthDataOpen] = useState(false)
  const [isUserProfileOpen, setUserProfileOpen] = useState(false)

  const sidebarRef = useRef(null)
  const windowSize = useWindowSize()
  const isLargeScreen = windowSize.width >= 768
  useEffect(() => {
    if (isLargeScreen) {
      sideToggleOpen(false)
    }
  }, [isLargeScreen, sideToggleOpen])

  useClickAway(sidebarRef, () => sideToggleOpen(true))

  useEffect(() => {
    const isRoute = new RegExp(/^\/patients|^\/staff/)
    if (isRoute.test(pathname)) setUserProfileOpen(true)
    if (!isLargeScreen) {
      sideToggleOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const generalSidebarMenu = useMemo(() => {
    return generalData.filter((item) => {
      if (item.roles) {
        return item.roles.some((role) => user?.roles?.includes(role))
      }
      return true
    })
  }, [user?.roles])

  const showUserProfileTab = !isTrainer(user?.roles)

  return (
    <AnimatePresence initial={false}>
      {!sideOpen && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            `flex flex-col w-52 md:w-20.8 lg:w-64  p-4 rounded-lg sidebar-shadow bg-white h-full overflow-y-auto`,
            sideOpen && 'hidden'
          )}
        >
          <div ref={isLargeScreen ? null : sidebarRef}>
            <div className="py-3">
              <Text variant="display/xs" weight="bold">
                <span className="block md:hidden lg:block">
                  <Image
                    src={'/logo_large.png'}
                    alt="logo"
                    height={24}
                    width={140}
                    // className="w-[123.16px] h-6"
                  />
                </span>
                <span className="hidden md:block lg:hidden">
                  <Image
                    src={'/logo.png'}
                    alt="logo"
                    height={56}
                    width={56}
                    // className="w-[123.16px] h-6"
                  />
                </span>
              </Text>
            </div>
            <Divider className="my-4" />
            <div>
              <div className="mb-4">
                <Text
                  variant="text/sm"
                  as="p"
                  className="text-grey-400 uppercase pl-4 py-[11px] mb-2"
                >
                  <span className="block md:hidden lg:block">GENERAL</span>
                  <span className="hidden md:block lg:hidden">...</span>
                </Text>

                {generalSidebarMenu.map((item, __) => (
                  <div key={__} className="mb-2">
                    <NavLink
                      href={`/dashboard/${item?.href}`}
                      active={
                        item.href
                          ? pathname === '/dashboard/' + item.href
                          : pathname === '/dashboard'
                      }
                    >
                      <IconPicker icon={item.icon} size="1.5rem" />
                      <Text
                        className="block md:hidden lg:block whitespace-nowrap"
                        variant="text/md"
                      >
                        {item.title}
                      </Text>
                    </NavLink>
                  </div>
                ))}
                <motion.div
                  key="family-health-data"
                  // animate={{ height: open ? 'auto' : '40px' }}
                  layout
                  transition={{ layout: { duration: 0.5, type: 'spring' } }}
                >
                  <motion.button
                    className={cn(
                      'flex items-center justify-between text-grey-600 py-3 px-4 rounded-lg hover:opacity-80 w-full',
                      pathname.includes('health-data') &&
                        'bg-primary text-white'
                    )}
                    onClick={() => setHealthDataOpen(!isHealthDataOpen)}
                    layout="position"
                  >
                    <div className="flex gap-2">
                      <IconPicker icon="healthdata" size="1.5rem" />
                      <Text
                        className="block md:hidden lg:block"
                        variant="text/md"
                      >
                        Health Data
                      </Text>
                    </div>
                    <motion.div
                      key="arrow"
                      animate={{ rotate: isHealthDataOpen ? 0 : -90 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 50,
                      }}
                    >
                      <IconPicker icon="arrowDown" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isHealthDataOpen && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        className="mt-2"
                        variants={{
                          open: {
                            opacity: 1,
                            height: 'auto',
                          },
                          collapsed: {
                            opacity: 0,
                            height: 0,
                          },
                        }}
                      >
                        <NavLink
                          href="/dashboard/family-health-data/all"
                          className={cn(
                            'pl-11',
                            pathname.includes('/family-health-data/all') &&
                              'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              All
                            </span>
                            <span className="hidden md:block lg:hidden">H</span>
                          </Text>
                        </NavLink>
                        <NavLink
                          href="/dashboard/family-health-data/household"
                          className={cn(
                            'pl-11',
                            pathname.includes(
                              '/family-health-data/household'
                            ) && 'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              Households
                            </span>
                            <span className="hidden md:block lg:hidden">H</span>
                          </Text>
                        </NavLink>

                        <NavLink
                          href="/dashboard/family-health-data/students"
                          className={cn(
                            'pl-11',
                            pathname.includes('/family-health-data/students') &&
                              'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              Children
                            </span>
                            <span className="hidden md:block lg:hidden">C</span>
                          </Text>
                        </NavLink>

                        <NavLink
                          href="/dashboard/family-health-data/fathers"
                          className={cn(
                            'pl-11',
                            pathname.includes('/family-health-data/fathers') &&
                              'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              Fathers
                            </span>
                            <span className="hidden md:block lg:hidden">F</span>
                          </Text>
                        </NavLink>
                        <NavLink
                          href="/dashboard/family-health-data/mothers"
                          className={cn(
                            'pl-11',
                            pathname.includes('/family-health-data/mothers') &&
                              'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              Mothers
                            </span>
                            <span className="hidden md:block lg:hidden">M</span>
                          </Text>
                        </NavLink>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  key="user"
                  // animate={{ height: open ? 'auto' : '40px' }}
                  layout
                  transition={{ layout: { duration: 0.5, type: 'spring' } }}
                >
                  {showUserProfileTab && (
                    <motion.button
                      className={cn(
                        'flex items-center justify-between text-grey-600 py-3 px-4 rounded-lg hover:opacity-80 w-full',
                        {
                          'bg-primary text-white':
                            pathname.includes('/user-profile'),
                          'opacity-95': !pathname.includes('/user-profile'),
                        }
                      )}
                      onClick={() => setUserProfileOpen(!isUserProfileOpen)}
                      layout="position"
                    >
                      <div className="flex gap-2">
                        <IconPicker icon="profile2User" size="1.5rem" />
                        <Text
                          className="block md:hidden lg:block"
                          variant="text/md"
                        >
                          User Profile
                        </Text>
                      </div>
                      <motion.div
                        key="arrow"
                        animate={{ rotate: isUserProfileOpen ? 0 : -90 }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 50,
                        }}
                      >
                        <IconPicker icon="arrowDown" />
                      </motion.div>
                    </motion.button>
                  )}
                  <AnimatePresence initial={false}>
                    {isUserProfileOpen && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        className="mt-2"
                        variants={{
                          open: {
                            opacity: 1,
                            height: 'auto',
                          },
                          collapsed: {
                            opacity: 0,
                            height: 0,
                          },
                        }}
                      >
                        {/* {!isMasterInstructor(user?.roles) && (
                          <NavLink
                            href={'/dashboard/user-profile/instructors'}
                            className={cn(
                              'pl-11',
                              pathname.includes('/user-profile/instructors') &&
                                'bg-grey-100'
                            )}
                          >
                            <DotIcon />
                            <Text variant="text/md">
                              <span className="block md:hidden lg:block">
                                Instructors
                              </span>
                              <span className="hidden md:block lg:hidden">
                                I
                              </span>
                            </Text>
                          </NavLink>
                        )} */}

                        <NavLink
                          href="/dashboard/user-profile/students"
                          className={cn(
                            'pl-11',
                            pathname.includes('/user-profile/students') &&
                              'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              Children
                            </span>
                            <span className="hidden md:block lg:hidden">C</span>
                          </Text>
                        </NavLink>

                        <NavLink
                          href="/dashboard/user-profile/parents"
                          className={cn(
                            'pl-11',
                            pathname.includes('/user-profile/parents') &&
                              'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              Parents
                            </span>
                            <span className="hidden md:block lg:hidden">P</span>
                          </Text>
                        </NavLink>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div>
                <Text
                  variant="text/sm"
                  as="p"
                  className="text-grey-400 uppercase pl-4 py-[11px] mb-2"
                >
                  <span className="block md:hidden lg:block">OTHERS</span>
                  <span className="hidden md:block lg:hidden">...</span>
                </Text>

                {othersData.map((item2, __) => (
                  <div key={__} className="mb-2">
                    <NavLink
                      href={`/dashboard/${item2?.href}`}
                      active={pathname.includes(item2.href)}
                    >
                      <IconPicker icon={item2.icon} size="1.5rem" />
                      <Text
                        className="block md:hidden lg:block"
                        variant="text/md"
                      >
                        {item2.title}
                      </Text>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { SideBar }
