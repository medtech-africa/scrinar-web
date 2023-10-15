export const returnJoinedFirstCharacter = (str1 = '', str2 = '') =>
  str1 && str2
    ? str1?.[0] + str2?.[0]
    : str1
        ?.split(' ')
        ?.map((s) => s?.[0])
        ?.join('') ?? ''
