import Typography from '@mui/material/Typography'
import type { BioItem } from '../types/bio'

export function PortfolioItem({ entry }: { entry: BioItem }) {
  const renderValue = () => {
    if (entry.link) {
      const label = typeof entry.value === 'string' ? entry.value : entry.value.value
      return (
        <a
          href={entry.link}
          target="_blank"
          rel="noreferrer noopener"
          className="text-red-600 dark:text-red-800 hover:underline"
        >
          {label}
        </a>
      )
    }
    if (typeof entry.value === 'object' && 'url' in entry.value) {
      return (
        <a
          href={entry.value.url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-red-600 dark:text-red-800 hover:underline"
        >
          {entry.value.value}
        </a>
      )
    }
    return <>{entry.value as string}</>
  }

  return (
    <div className="leading-relaxed p-2">
      <Typography component="p" className="text-red-600 bg-gray-100">
        <strong>{entry.item}: </strong> {renderValue()}
      </Typography>
      {entry.image ? (
        <img
          src={entry.image}
          alt={entry.item}
          className="max-w-full"
        />
      ) : null}
    </div>
  )
}
