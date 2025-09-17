export type Linkable = string | { value: string; url: string }

export type Post = {
  id: string
  title: string
  excerpt: string
  image?: string
  featured?: boolean
  author?: Linkable
  date?: Linkable
  url?: string
}
