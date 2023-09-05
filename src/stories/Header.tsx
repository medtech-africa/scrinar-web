import React from 'react'
import './header.css'
import { Input } from '@/components/ui/input'
import { Search, Bell, Settings, ChevronDown, User2 } from 'lucide-react'
import { Text } from '@/components/ui/text'



export const Header = () => (
  <header>
    <div className='flex bg-grey-50 justify-between border-b-[1px] border-grey-100 items-center px-4 md:px-8 py-4 '>
      <div>
       <Input leadingIcon={<Search size={20} />} className='rounded-[49px] bg-grey-100' placeholder='Search for something...'/>
      </div>
      <div>
       
        <div className='flex flex-row space-x-2 md:space-x-4 items-center'>
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
      </div>
    </div>
  </header>
)
