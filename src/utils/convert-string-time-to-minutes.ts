export function convertStringTimeToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(Number)

  return 60 * hours + minutes
}
