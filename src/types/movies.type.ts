export type TMovieRequest = { 
  genres: string[]
  title: string
  year: number
  runtime: number
  director: string
  actors?: string
  plot?: string
  posterUrl?: string
}

export type TMovieData = TMovieRequest & {
  id?: number
}

// - a list of genres (only predefined ones from db file) (required, array of predefined strings)
// - title (required, string, max 255 characters)
// - year (required, number)
// - runtime (required, number)
// - director (required, string, max 255 characters)
// - actors (optional, string)
// - plot (optional, string)
// - posterUrl (optional, string)