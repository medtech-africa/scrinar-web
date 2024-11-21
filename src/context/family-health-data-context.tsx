import { create } from 'zustand'
interface IFormValue {
  search: string
  setSearch: (val: string) => void
  sort: string
  setSort: (val: string) => void
}
const useFHDSharedData = create<IFormValue>((set) => ({
  search: '',
  setSearch: (val: any) => set({ search: val }),
  sort: '',
  setSort: (val: any) => set({ sort: val }),
}))
export { useFHDSharedData }
