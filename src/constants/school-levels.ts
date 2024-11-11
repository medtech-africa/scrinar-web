import { useUser } from "@/context/user"

const schoolLevels = [
  {
    label: 'Nursery 1',
    value: 'nursery 1',
  },
  {
    label: 'Nursery 2',
    value: 'nursery 2',
  },
  {
    label: 'Nursery 3',
    value: 'nursery 3',
  },
  {
    label: 'Primary 1',
    value: 'primary 1',
  },
  {
    label: 'Primary 2',
    value: 'primary 2',
  },
  {
    label: 'Primary 3',
    value: 'primary 3',
  },
  {
    label: 'Primary 4',
    value: 'primary 4',
  },
  {
    label: 'Primary 5',
    value: 'primary 5',
  },
  {
    label: 'Primary 6',
    value: 'primary 6',
  },
  {
    label: 'JS 1 (Junior Secondary School 1)',
    value: 'jss 1',
  },
  {
    label: 'JS 2 (Junior Secondary School 2)',
    value: 'jss 2',
  },
  {
    label: 'JS 3 (Junior Secondary School 3)',
    value: 'jss 3',
  },
  {
    label: 'SS 1 (Senior Secondary School 1)',
    value: 'ss 1',
  },
  {
    label: 'SS 2 (Senior Secondary School 2)',
    value: 'ss 2',
  },
  {
    label: 'SS 3 (Senior Secondary School 3)',
    value: 'ss 3',
  },
]

export const useSchoolLevels = () => {
  const template = useUser(state => state.template);

  if (template === 'jica') {
    return schoolLevels.filter(level => level.value.startsWith('jss'))
  }

  return schoolLevels
}

export default schoolLevels
