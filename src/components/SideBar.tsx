import { Button } from './Button'
import '../styles/sidebar.scss'
import { GenreResponseProps, MovieProps } from '../App'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

interface SideBarProps {
  setMovies: (movies: any) => void
  setSelectedGenre: (response: any) => void
}

export function SideBar({ setMovies, setSelectedGenre }: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1)

  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data)
    })
  }, [])

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then(response => {
        setMovies(response.data)
      })

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data)
    })
  }, [selectedGenreId])

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }

  return (
    <nav className='sidebar'>
      <span>
        Watch<p>Me</p>
      </span>

      <div className='buttons-container'>
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}
