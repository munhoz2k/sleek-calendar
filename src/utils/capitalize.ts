const capitalizeIgnoreList = ['de', 'da', 'do']

export function capitalize(name: string, ignoreWord: string = '') {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => {
      if (
        capitalizeIgnoreList.includes(word) ||
        word === ignoreWord.toLowerCase()
      ) {
        return word
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
