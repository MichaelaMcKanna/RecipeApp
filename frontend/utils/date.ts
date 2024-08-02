export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function getDateWithoutTimeZoneAdjustment(dateString: string): Date {
  const parts = dateString.split('-')
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
}