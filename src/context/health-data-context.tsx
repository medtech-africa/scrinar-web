import { IExerciseValue } from '@/app/dashboard/health-data/add-record/exerciseModal'
import { INutritionalValue } from '@/app/dashboard/health-data/add-record/nutritionalModal'
import { create } from 'zustand'
interface IFormValue {
  nutritionalData: INutritionalValue | null
  setNutritionalData: (val: INutritionalValue | null) => void
  exerciseData: IExerciseValue | null
  setExerciseData: (val: IExerciseValue | null) => void
}
const useHealthValue = create<IFormValue>((set) => ({
  nutritionalData: null,
  exerciseData: null,
  setNutritionalData: (val: any) => set({ nutritionalData: val }),
  setExerciseData: (val: any) => set({ exerciseData: val }),
}))
export { useHealthValue }
