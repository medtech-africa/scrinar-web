import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar-new'
import { useUser } from '@/context/user'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IconNames } from '../ui/icon-picker/icon-names'
import { useMemo } from 'react'
import { IconPicker } from '../ui/icon-picker'
import { Text } from '../ui/text'
import { NavMain } from './nav-main'
import { NavLink } from './nav-link'

interface Datatype {
  title: string
  url: string
  icon: IconNames
  roles?: string[]
}

const generalData = [
  {
    title: 'Dashboard',
    icon: 'grid7',
    url: '',
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
    url: 'interviews',
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
    url: 'risk-assessment',
    roles: [
      'school',
      'instructor',
      'organization',
      'play4health_admin',
      'super_admin',
      'jica_enumerators',
      'jica_researchers',
    ],
  },
  // {
  //   title: 'Health Data',
  //   icon: 'health',
  //   url: 'health-data',
  //   roles: ['school', 'instructor', 'play4health_admin', 'super_admin'],
  // },
  {
    title: 'Schedule',
    icon: 'calendar',
    url: 'screening',
    roles: [
      'school',
      'instructor',
      'organization',
      'play4health_admin',
      'super_admin',
      'jica_enumerators',
      'jica_researchers',
    ],
  },
  {
    title: 'Surveillance',
    icon: 'survey',
    url: 'surveillance',
    roles: [
      'school',
      'instructor',
      'organization',
      'play4health_admin',
      'super_admin',
      'jica_enumerators',
      'jica_researchers',
    ],
  },
  {
    title: 'Forms',
    icon: 'book',
    url: 'forms',
    roles: ['organization'],
  },
  // {
  //   title: 'Training Module',
  //   icon: 'book',
  //   url: 'training-module',
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
    url: 'training-module/admin',
    roles: ['play4health_admin', 'admin', 'super_admin'],
  },
] as Datatype[]

const othersData = [
  {
    title: 'App Settings',
    icon: 'setting2',
    url: '/dashboard/settings',
  },
  // {
  //   title: 'Support',
  //   icon: 'messageQuestion',
  //   href: 'support',
  // },
] as Datatype[]

const data = {
  navMain: [
    {
      title: 'Health Data',
      url: '#',
      icon: <IconPicker icon="healthdata" />,
      isActive: (pathname) =>
        pathname.startsWith('/dashboard/family-health-data'),
      items: [
        {
          title: 'All',
          url: '/dashboard/family-health-data/all',
          isActive: (pathname) => pathname.includes('/family-health-data/all'),
        },
        {
          title: 'Households',
          url: '/dashboard/family-health-data/household',
          isActive: (pathname) =>
            pathname.includes('/family-health-data/household'),
        },
        {
          title: 'Children',
          url: '/dashboard/family-health-data/students',
          isActive: (pathname) =>
            pathname.includes('/family-health-data/students'),
        },
        {
          title: 'Fathers',
          url: '/dashboard/family-health-data/fathers',
          isActive: (pathname) =>
            pathname.includes('/family-health-data/fathers'),
        },
        {
          title: 'Mothers',
          url: '/dashboard/family-health-data/mothers',
          isActive: (pathname) =>
            pathname.includes('/family-health-data/mothers'),
        },
      ],
    },
    {
      title: 'User Profile',
      url: '#',
      icon: <IconPicker icon="profile2User" />,
      isActive: (pathname) => pathname.startsWith('/dashboard/user-profile'),
      items: [
        {
          title: 'Children',
          url: '/dashboard/user-profile/students',
          isActive: (pathname) => pathname.includes('/user-profile/students'),
        },
        {
          title: 'Parents',
          url: '/dashboard/user-profile/parents',
          isActive: (pathname) => pathname.includes('/user-profile/parents'),
        },
      ],
    },
  ],
} as Record<
  string,
  {
    title: string
    url: string
    icon?: React.ReactElement
    isActive?: (pathname: string) => boolean
    items?: {
      title: string
      url: string
      isActive?: (pathname: string) => boolean
    }[]
  }[]
>

export function AppSidebar() {
  const pathname = usePathname()

  const user = useUser((state) => state.user)
  const generalSidebarMenu = useMemo(() => {
    return generalData.filter((item) => {
      if (item.roles) {
        return item.roles.some((role) => user?.roles?.includes(role))
      }
      return true
    })
  }, [user?.roles])

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <span className="block md:hidden lg:block">
          <Image
            src={'/logo_large.png'}
            alt="logo"
            height={24}
            width={120}
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalSidebarMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="[&>svg]:size-5">
                    <NavLink href={`/dashboard/${item?.url}`}>
                      <IconPicker icon={item.icon} size={20} />
                      <Text className="" variant="text/md">
                        {item.title}
                      </Text>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <NavMain items={data.navMain} pathname={pathname} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {othersData.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="[&>svg]:size-6">
                  <NavLink href={item.url}>
                    <IconPicker icon={item.icon} size={24} />
                    <Text className="" variant="text/md">
                      {item.title}
                    </Text>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
