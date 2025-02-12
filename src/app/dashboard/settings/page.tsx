'use client'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageCard } from '@/components/ui/page-card'
import { Switch } from '@/components/ui/switch'

import { TabList } from '@/components/ui/tab-list'

import { Text } from '@/components/ui/text'
import validation from '@/constants/validation'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import { useMutation } from '@tanstack/react-query'

import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AccountSettings } from './account-settings'
import ConditionAvatar from '@/components/ui/condition-avatar'
import useSelectImage from '@/hooks/useSelectImage'
import { useUser } from '@/context/user'

type IFormData = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

const SecurityPrivacy = () => {
  const { isPending: updateLoading, mutate } = useMutation({
    mutationFn: (dataToSend: Omit<IFormData, 'confirmNewPassword'>) =>
      baseAxios.put(API.updatePassword, dataToSend),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: validation.updatePasswordSchema,
  })

  const onSubmit = (data: IFormData) => {
    mutate(
      {
        currentPassword: data?.currentPassword,
        newPassword: data?.newPassword,
      },
      {
        onSuccess: () => {
          toast.success('Successfully updated password')
          reset()
        },
        onError: (err) => {
          errorMessage(err)
        },
      }
    )
  }
  return (
    <PageCard title="Security & Privacy" bodyStyle="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <Controller
            control={control}
            render={({ field: { value, ...field } }) => (
              <Input
                {...field}
                value={value ?? ''}
                placeholder="Old Password"
                label="Old Password"
                labelStyle="lg:text-sm text-xs"
                variant={errors?.currentPassword ? 'destructive' : 'default'}
                message={
                  errors.currentPassword && errors.currentPassword.message
                }
                type="password"
              />
            )}
            name="currentPassword"
          />

          <Controller
            control={control}
            render={({ field: { value, ...field } }) => (
              <Input
                {...field}
                value={value ?? ''}
                placeholder="Create new password"
                label="New Password"
                labelStyle="lg:text-sm text-xs"
                variant={errors?.newPassword ? 'destructive' : 'default'}
                message={errors.newPassword && errors.newPassword.message}
                type="password"
              />
            )}
            name="newPassword"
          />

          <Controller
            control={control}
            render={({ field: { value, ...field } }) => (
              <Input
                {...field}
                value={value ?? ''}
                labelStyle="lg:text-sm text-xs"
                placeholder="Re-enter New Password"
                label="Re-enter New Password"
                variant={errors?.confirmNewPassword ? 'destructive' : 'default'}
                message={
                  errors.confirmNewPassword && errors.confirmNewPassword.message
                }
                type="password"
              />
            )}
            name="confirmNewPassword"
          />

          <div className="flex items-center">
            <Text
              variant="text/sm"
              className="text-primary cursor-pointer underline my-1.1"
              as="span"
            >
              Forgotten Password? Reset Now
            </Text>
          </div>
        </div>
        <Button
          variant={'primary'}
          value="Update Password"
          className="mt-6 py-3 px-4"
          type="submit"
          loading={updateLoading}
          disabled={updateLoading}
        />
      </form>
    </PageCard>
  )
}

const _Notifications = () => {
  return (
    <PageCard title="Security & Privacy" bodyStyle="p-4">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center space-x-2">
          <Switch id="screening" />
          <Label htmlFor="screening">Screening Reminders</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="training" />
          <Label htmlFor="training">Training Sessions</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="health" />
          <Label htmlFor="health">Health Trends Report</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="nScreening" />
          <Label htmlFor="nScreening">New Screenings</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="alerts" />
          <Label htmlFor="alerts">Training Alerts</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="announcements" />
          <Label htmlFor="announcements">Updates and Announcements</Label>
        </div>
      </div>
      <Button
        variant={'primary'}
        value="Update Settings"
        className="mt-6 py-3 px-4"
      />
    </PageCard>
  )
}

// type DataType = {
//   id?: number
//   image?: React.ReactNode
//   firstName?: string
//   lastName?: string
//   role?: string
//   access?: string
//   lastLogin?: string
//   timestamp?: string
// }[]
// const PermissionsRoles = () => {
//   const [deleteModal, setDeleteModal] = useState(false)
//   const [selectedRow, setSelectedRow] = useState(null)
//   const handleMoreClick = (rowIndex: any) => {
//     setSelectedRow(selectedRow === rowIndex ? null : rowIndex)
//   }

//   const data: DataType = [
//     {
//       id: 1,

//       firstName: 'Emmanuel',
//       lastName: 'adebayo',
//       role: 'Admin',
//       access: 'Full',
//       lastLogin: '2023-08-15 10:34 AM',
//     },
//     {
//       id: 2,

//       firstName: 'Asah',
//       lastName: 'Benjamin',
//       role: 'Health Coordinator',
//       access: 'Limited',
//       lastLogin: '2023-08-15 10:34 AM',
//     },
//     {
//       id: 3,
//       firstName: 'Asah',
//       lastName: 'Benjamin',
//       role: 'Teacher',
//       access: 'Limited',
//       lastLogin: '2023-08-15 10:34 AM',
//     },
//   ]
//   const menuItems: MenuItemProp[] = [
//     {
//       title: 'Delete',
//       icon: IconNames.trash,
//       action: () => {
//         setDeleteModal(true)
//         setSelectedRow(null)
//       },
//     },
//   ]
//   return (
//     <PageCard title="Roles & Permission">
//       <div className="flex justify-between items-center px-4 mb-4">
//         <Text className="text-grey-700 text-sm">All Roles</Text>
//         <Link href="settings/create-new-role">
//           <Button
//             variant={'primary'}
//             value="Create New Role"
//             className="py-3 px-4"
//             leadingIcon={<IconPicker icon="add" />}
//           />
//         </Link>
//       </div>
//       <Table>
//         <TableHeader className="bg-grey-100">
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Access</TableHead>
//             <TableHead>Last Login</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.length === 0 ? (
//             <EmptyData />
//           ) : (
//             data.map((val) => (
//               <TableRow
//                 key={val.id}
//                 className="font-normal text-sm text-grey-600"
//               >
//                 <TableCell className="flex gap-x-2 items-center">
//                   <div className="flex flex-row gap-x-[3px]">
//                     <div>{val.firstName}</div>
//                     <div>{val.lastName}</div>
//                   </div>
//                 </TableCell>

//                 <TableCell>{val.role}</TableCell>
//                 <TableCell>{val.access}</TableCell>
//                 <TableCell>{val.lastLogin}</TableCell>
//                 <TableCell className="relative">
//                   <div
//                     onClick={() => handleMoreClick(val.id)}
//                     className="p-2 rounded-full hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-50 w-fit"
//                   >
//                     <IconPicker icon="more" size="1.25rem" />
//                   </div>
//                   {selectedRow === val.id && (
//                     <DropDownMenu
//                       menuItems={menuItems}
//                       onClose={() => setSelectedRow(null)}
//                     />
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//       <Delete open={deleteModal} onClose={setDeleteModal} />
//     </PageCard>
//   )
// }

// const DataPrivacy = () => {
//   const [deleteModal, setDeleteModal] = useState(false)

//   return (
//     <PageCard title="Data & Privacy" bodyStyle="p-4">
//       <Button
//         value="Export Data"
//         leadingIcon={<IconPicker icon="add" />}
//         className="py-3 px-4 items-center flex"
//       />
//       <Button
//         value="Delete All Data"
//         leadingIcon={<IconPicker icon="trash" />}
//         className="mt-6 py-3 px-4 bg-lust-50 text-primary hover:bg-lust-100"
//         onClick={() => setDeleteModal(true)}
//       />
//       <Delete open={deleteModal} onClose={setDeleteModal} />
//     </PageCard>
//   )
// }

export default function Settings() {
  const [selected, setSelected] = useState('Account Settings')
  const labels = [
    'Account Settings',
    'Security & Privacy',
    // 'Notifications',
    // 'Permissions & Roles',
    // 'Data & Privacy',
  ]

  const inputFile = useRef<HTMLInputElement | null>(null)
  const { handleFileChange, selectedImg } = useSelectImage()

  const handleFileSelect = () => {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }

  const { user } = useUser()

  const returnContent = () => {
    switch (selected) {
      case labels[0]:
        return <AccountSettings selectedImg={selectedImg} />

      case labels[1]:
        return <SecurityPrivacy />

      // case labels[2]:
      //   return <Notifications />

      // case labels[3]:
      //   return <PermissionsRoles />
      // case labels[2]:
      //   return <DataPrivacy />

      default:
        return null
    }
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account settings: All in one place"
      />

      <TabList
        labels={labels}
        onClickTabItem={setSelected}
        activeTab={selected}
      />

      <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
        <div className="w-full h-full">{returnContent()}</div>
        <div className="">
          <PageCard title="Profile profile Picture">
            <div className="flex flex-col justify-center items-center py-4">
              <ConditionAvatar
                avatarUrl={
                  selectedImg
                    ? URL.createObjectURL(selectedImg)
                    : user?.user?.avatarUrl
                }
              />
              <Text
                className="mt-4 text-gray-900"
                variant="text/md"
                weight="medium"
              >
                School Logo
              </Text>
              <input
                type="file"
                onChange={handleFileChange}
                ref={inputFile}
                className="hidden"
                accept="image/*"
              />
              {selected === labels[0] && (
                <Text
                  variant="text/sm"
                  className="text-primary cursor-pointer underline my-1.1"
                  as="span"
                  onClick={handleFileSelect}
                >
                  Upload
                </Text>
              )}
            </div>
          </PageCard>
        </div>
      </div>
    </div>
  )
}
