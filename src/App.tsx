import { useEffect, useState } from 'react'

import { SideBar } from './components/SideBar'
import { Content } from './components/Content'

import './styles/global.scss'
import { api } from './services/api'

export interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

export interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Ratings: Array<{
    Source: string
    Value: string
  }>
  Runtime: string
}

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar setMovies={setMovies} setSelectedGenre={setSelectedGenre} />
      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  )
}
