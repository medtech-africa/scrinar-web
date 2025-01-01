import {
  DashboardCard,
  DashboardCardAvatar,
  DashboardCardDivider,
  DashboardCardFooter,
  DashboardCardHeader,
  DashboardCardIcon,
} from '@/components/ui/dashboard-card'
import {
  GenderIcon,
  HealthIcon,
  Profile2UserIcon,
  UserEditIcon,
} from '@/components/ui/icon-picker/icons'
import type { Meta } from '@storybook/react'

const meta = {
  title: 'Example/DashboardCard',
  component: DashboardCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardCard>

export default meta

const dataItems = [
  {
    icon: <UserEditIcon className="text-violet-900" />,
    subtitle: 'Students',
  },
  {
    icon: <GenderIcon className="text-emerald-900" />,
    subtitle: 'Instructors',
    className: 'bg-emerald-50 border-emerald-100 ',
  },
  {
    icon: <HealthIcon className="text-orange-900" />,
    subtitle: 'Health Data',
    className: 'bg-orange-100 border-orange-200 ',
  },
]

export const Base = () => {
  return (
    <DashboardCard>
      <DashboardCardHeader
        title="300"
        subtitle="Students"
        icon={
          <DashboardCardIcon>
            <Profile2UserIcon />
          </DashboardCardIcon>
        }
      />
      <DashboardCardDivider />
      <DashboardCardFooter>
        <div className="justify-start items-start flex">
          <DashboardCardAvatar
            src="https://i.pravatar.cc/100"
            background="bg-rose-100"
            border="border-rose-200"
          />
          <DashboardCardAvatar
            className="ml-[-7%]"
            src="https://i.pravatar.cc/200"
            background="bg-violet-100"
            border="border-violet-200"
          />
          <DashboardCardAvatar
            className="ml-[-7%]"
            src="https://i.pravatar.cc/60"
            background="bg-emerald-50"
            border="border-emerald-100"
          />
          <DashboardCardAvatar
            className="ml-[-7%]"
            src="https://i.pravatar.cc/40"
            background="bg-orange-50"
            border="border-orange-100"
          />
          <DashboardCardAvatar
            className="ml-[-7%]"
            background="bg-emerald-50"
            border="border-emerald-100"
          >
            <div className="left-[13px] top-[10px] absolute text-slate-800 text-[10px] font-bold leading-[10px]">
              +
            </div>
          </DashboardCardAvatar>
        </div>
        <div className="w-4 h-4 relative">
          <div className="w-4 h-4 left-0 top-0 absolute bg-zinc-300" />
        </div>
      </DashboardCardFooter>
    </DashboardCard>
  )
}

export const Example = () => {
  return (
    <div className="flex gap-4 w-full bg-white p-10">
      {dataItems.map((item) => (
        <DashboardCard key={item.subtitle}>
          <DashboardCardHeader
            title="300"
            subtitle={item.subtitle}
            icon={
              <DashboardCardIcon className={item.className}>
                {item.icon}
              </DashboardCardIcon>
            }
          />
          <DashboardCardDivider />
          <DashboardCardFooter>
            <div className="justify-start items-start flex">
              <DashboardCardAvatar
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                background="bg-rose-100"
                border="border-rose-200"
              />
              <DashboardCardAvatar
                className="ml-[-7%]"
                src="https://i.pravatar.cc/260"
                background="bg-violet-100"
                border="border-violet-200"
              />
              <DashboardCardAvatar
                className="ml-[-7%]"
                src="https://i.pravatar.cc/400?img=56"
                background="bg-emerald-50"
                border="border-emerald-100"
              />
              <DashboardCardAvatar
                className="ml-[-7%]"
                src="https://i.pravatar.cc/400?img=51"
                background="bg-orange-50"
                border="border-orange-100"
              />
              <DashboardCardAvatar
                className="ml-[-7%]"
                src="https://i.pravatar.cc/400?img=50"
                background="bg-emerald-50"
                border="border-emerald-100"
              >
                <div className="left-[13px] top-[10px] absolute text-slate-800 text-[10px] font-bold leading-[10px]">
                  +
                </div>
              </DashboardCardAvatar>
            </div>
            <div className="w-4 h-4 relative">
              <div className="w-4 h-4 left-0 top-0 absolute bg-zinc-300" />
            </div>
          </DashboardCardFooter>
        </DashboardCard>
      ))}
    </div>
  )
}
