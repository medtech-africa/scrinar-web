import { create } from 'zustand'
interface IFormValue {
  search: string
  setSearch: (val: string) => void
}
const useFHDSharedData = create<IFormValue>((set) => ({
  search: '',
  setSearch: (val: any) => set({ search: val }),
}))
export { useFHDSharedData }
