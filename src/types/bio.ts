export type Linkable = string | { value: string; url: string }

export type BioItem = {
  item: string
  value: Linkable
  link?: string
  image?: string
}

export type BioSection = BioItem[] | Record<string, BioItem[]>

export type BioData = Record<string, BioSection>

