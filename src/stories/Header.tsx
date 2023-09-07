import React, { useRef, useState } from 'react'
import './header.css'
import { Input } from '@/components/ui/input'
import { Search, Bell, Settings, ChevronDown, User2, Menu } from 'lucide-react'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import useClickAway from '@/lib/useClickAway'


export const Header = () => {
  const menuRef = useRef(null);
    useClickAway(menuRef, () => setVisible(false));
  const [visible, setVisible]= useState<boolean>(false)
  return (
  <header>
    <div className='flex bg-grey-50 justify-between border-b-[1px] border-grey-100 items-center px-4 md:px-8 py-4 '>
      <div>
       <Input leadingIcon={<Search size={20} />} className='rounded-[49px] bg-grey-100' placeholder='Search for something...'/>
      </div>
      <div>
       
        <div className='md:flex flex-row space-x-2 md:space-x-4 items-center hidden'>
         <div className='bg-grey-100 p-3 rounded-full'>
          <Bell/>
          </div>  
         <div className='bg-grey-100 p-3 rounded-full'>
          <Settings/>
          </div>  
         <div className='bg-grey-100 p-3 rounded-full'>
          <User2/>
          </div>  
          <Text className='font-medium text-grey-600 text-xs sm:text-base '>School Name here</Text>
          <ChevronDown/>
        </div>
        <div className='md:hidden flex items-center cursor-pointer focus:bg-black  active:bg-gray-200 transition-all duration-300 ease-in-out' onClick={()=>setVisible(!visible)} >
        <Menu/>
        </div>
      </div>
    </div>
    <div ref={menuRef} className={cn('flex flex-col p-3 md:hidden bg-grey-50 justify-center space-y-3 items-start shadow-xl absolute right-7', visible ? 'flex' : 'hidden')}>
                     <Text className='font-medium text-grey-600 text-xs'>School Name here</Text>
<div className='flex flex-row items-center space-x-2 cursor-pointer px-2 hover:bg-grey-200 w-full'>
           <div className='bg-grey-100 p-2 rounded-full'>
          <Bell size={18}/>
          </div>  
           <Text>Notification</Text>
</div>
<div className='flex flex-row items-center space-x-2 cursor-pointer px-2 hover:bg-grey-200 w-full'>
         <div className='bg-grey-100 p-2 rounded-full'>
          <Settings size={18}/>
          </div>  
            <Text>Settings</Text>
          </div>
          <div className='flex flex-row items-center space-x-2 cursor-pointer px-2 hover:bg-grey-200 w-full'>

         <div className='bg-grey-100 p-2 rounded-full'>
          <User2 size={18}/>
          </div>  
            <Text>Profile</Text>
          </div>
          
    </div>
  </header>
  )
}
