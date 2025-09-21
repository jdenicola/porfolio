export type Linkable = string | { value: string; url: string }

export type BioItem = {
  item: string
  value: Linkable
  extra_info?: string
  link?: string
  image?: string
}

export type BioSection = BioItem[] | Record<string, BioItem[]>

export type BioData = Record<string, BioSection>

