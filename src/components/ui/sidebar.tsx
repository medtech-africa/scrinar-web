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
import {
  ArrowDown,
  Book,
  Calendar,
  Grid2x2,
  HeartPulse,
  MessageSquare,
  Settings2,
  User2,
} from 'lucide-react'
import { Text } from './text'
import { useRouter } from 'next/router'

interface NavLinkProps {
  children: React.ReactNode
  href: string
  active?: boolean
  className?: string
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
    icon: <Grid2x2 />,
    href: '/',
  },
  {
    title: 'Health Data',
    icon: <HeartPulse />,
    href: '/health',
  },
  {
    title: 'Screening',
    icon: <Calendar />,
    href: '/screening',
  },
  {
    title: 'Training Module',
    icon: <Book />,
    href: '/training',
  },
]

const othersData = [
  {
    title: 'App Settings',
    icon: <Settings2 />,
    href: '/settings',
  },
  {
    title: 'Support',
    icon: <MessageSquare />,
    href: '/support',
  },
]

interface ISideBar {
  sideOpen: boolean
  sideToggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SideBar = ({ sideOpen, sideToggleOpen }: ISideBar) => {
  const location = useRouter()
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
    if (isRoute.test(location.pathname)) toggleOpen(true)
    if (!isLargeScreen) {
      sideToggleOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <AnimatePresence initial={false}>
      {!sideOpen && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-col md:w-60 w-52 p-4 rounded-lg sidebar-shadow ${
            sideOpen && 'hidden'
          }  bg-white h-[100vh] overflow-y-auto`}
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
                Project Logo
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
                  GENERAL
                </Text>

                {generalData.map((item2, __) => (
                  <div key={__} className="mb-2">
                    <NavLink
                      href={item2?.href}
                      active={location.pathname.includes(item2.href)}
                    >
                      {item2.icon}
                      <Text variant="text/md">{item2.title}</Text>
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
                          location.pathname.includes('/user-profile'),
                        'opacity-95':
                          !location.pathname.includes('/user-profile'),
                      }
                    )}
                    onClick={() => toggleOpen(!open)}
                    layout="position"
                  >
                    <div className="flex">
                      <User2 />
                      <Text variant="text/md">User Profile</Text>
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
                      <ArrowDown />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
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
                          href="instructors"
                          active={location.pathname.includes('/instructors')}
                          className="pl-11"
                        >
                          <DotIcon />
                          <Text variant="text/md">Instructors</Text>
                        </NavLink>

                        <NavLink
                          href="students"
                          className="pl-11"
                          active={location.pathname.includes('/students')}
                        >
                          <DotIcon />
                          <Text variant="text/md">Students</Text>
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
                  OTHERS
                </Text>

                {othersData.map((item2, __) => (
                  <div key={__} className="mb-2">
                    <NavLink
                      href={item2?.href}
                      active={location.pathname.includes(item2.href)}
                    >
                      {item2.icon}
                      <Text variant="text/md">{item2.title}</Text>
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
