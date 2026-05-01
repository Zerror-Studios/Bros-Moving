/** Sanity `date` fields are `YYYY-MM-DD`; avoids timezone shifting that day. */
export function formatPostDate(value) {
  if (!value) return ''
  const s = typeof value === 'string' ? value : String(value)
  const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(s)
  const d = isoDateOnly ? new Date(`${s}T12:00:00`) : new Date(s)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}
