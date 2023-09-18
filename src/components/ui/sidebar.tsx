/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import useClickAway from '@/hooks/useClickAway'
import useWindowSize from '@/hooks/useWindowSize'
import Link from 'next/link'
import { cn } from '@/lib/utils'
// import Image from 'next/image'
import { Divider } from './divider'
import { Text } from './text'
import { usePathname } from 'next/navigation'
import { IconPicker } from './icon-picker'
import { IconNames } from './icon-picker/icon-names'

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
  },
  {
    title: 'Health Data',
    icon: 'health',
    href: 'health-data',
  },
  {
    title: 'Screening',
    icon: 'calendar',
    href: 'screening',
  },
  {
    title: 'Training Module',
    icon: 'book',
    href: 'training-module',
  },
] as Datatype[]

const othersData = [
  {
    title: 'App Settings',
    icon: 'setting2',
    href: 'settings',
  },
  {
    title: 'Support',
    icon: 'messageQuestion',
    href: 'support',
  },
] as Datatype[]

interface ISideBar {
  sideOpen: boolean
  sideToggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({ sideOpen, sideToggleOpen }: ISideBar) => {
  const pathname = usePathname()
  const [open, toggleOpen] = useState(false)
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
    if (isRoute.test(pathname)) toggleOpen(true)
    if (!isLargeScreen) {
      sideToggleOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <AnimatePresence initial={false}>
      {!sideOpen && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            `flex flex-col  w-52 md:w-20.8 lg:w-60  p-4 rounded-lg sidebar-shadow bg-white h-full overflow-y-auto`,
            sideOpen && 'hidden'
          )}
        >
          <div ref={isLargeScreen ? null : sidebarRef}>
            <div className="py-3">
              {/* <Image
                src={'https://medtech.africa/logo2.png'}
                alt="logo"
                height={24}
                width={123}
                // className="w-[123.16px] h-6"
              /> */}
              <Text variant="display/xs" weight="bold">
                <span className="block md:hidden lg:block">Project Logo</span>
                <span className="hidden md:block lg:hidden">PL</span>
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

                {generalData.map((item, __) => (
                  <div key={__} className="mb-2">
                    <NavLink
                      href={`/dashboard/${item?.href}`}
                      active={
                        item.href
                          ? pathname.includes(item.href)
                          : pathname === '/dashboard'
                      }
                    >
                      <IconPicker icon={item.icon} size="1.5rem" />
                      <Text
                        className="block md:hidden lg:block"
                        variant="text/md"
                      >
                        {item.title}
                      </Text>
                    </NavLink>
                  </div>
                ))}

                <motion.div
                  key="user"
                  // animate={{ height: open ? 'auto' : '40px' }}
                  layout
                  transition={{ layout: { duration: 0.5, type: 'spring' } }}
                >
                  <motion.button
                    className={cn(
                      'flex items-center justify-between text-grey-600 py-3 px-4 rounded-lg hover:opacity-80 w-full',
                      {
                        'bg-primary text-white':
                          pathname.includes('/user-profile'),
                        'opacity-95': !pathname.includes('/user-profile'),
                      }
                    )}
                    onClick={() => toggleOpen(!open)}
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
                      animate={{ rotate: open ? 0 : -90 }}
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
                    {open && (
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
                          href={'/dashboard/user-profile/instructors'}
                          className={cn(
                            'pl-11',
                            pathname.includes('/instructors') && 'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              Instructors
                            </span>
                            <span className="hidden md:block lg:hidden">-</span>
                          </Text>
                        </NavLink>

                        <NavLink
                          href="/dashboard/user-profile/students"
                          className={cn(
                            'pl-11',
                            pathname.includes('/students') && 'bg-grey-100'
                          )}
                        >
                          <DotIcon />
                          <Text variant="text/md">
                            <span className="block md:hidden lg:block">
                              Students
                            </span>
                            <span className="hidden md:block lg:hidden">-</span>
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
                      href={`dashboard/${item2?.href}`}
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
