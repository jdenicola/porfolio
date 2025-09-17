import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import type { BioData, BioItem } from '../types/bio'
import { PortfolioItem } from './PortfolioItem'

export function Portfolio({ data }: { data: BioData }) {
  const renderItems = (items: BioItem[]) => (
    <div className="space-y-3">
      {items.map((entry, idx) => (
        <PortfolioItem key={idx} entry={entry} />
      ))}
    </div>
  )

  return (
    <Box className="space-y-6">
      {Object.entries(data).map(([sectionTitle, section]) => (
        <Paper
          key={sectionTitle}
          elevation={0}
          className="p-2 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700"
        >
          <Typography variant="h4" component="h1" className="m-8 mb-3">
            {sectionTitle} 
          </Typography>
          {Array.isArray(section) ? (
            renderItems(section)
          ) : (
            <div className="space-y-4">
              {Object.entries(section).map(([subTitle, items]) => (
                <div key={subTitle} className="p-2">
                  <Typography variant="h6" component="h2" className="mb-2">
                    {subTitle}
                  </Typography>
                  {renderItems(items)}
                </div>
              ))}
            </div>
          )}
        </Paper>
      ))}
    </Box>
  )
}
