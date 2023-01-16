export interface Movie{
  id: number
  title: string
  overview: string
  release_date: Date
  backdrop_path: string
  poster_path: string
  vote_average: number
  vote_count: number
  genre_ids: Array<number>
}
