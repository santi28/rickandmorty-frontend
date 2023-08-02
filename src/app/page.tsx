import { Character, getCharacters } from '@/services/characters.service'
import { CircularProgress } from '@mui/material'
import { use, useEffect, useState } from 'react'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCharacters()
      .then((characters) => {
        setCharacters(characters.results)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-screen gap-4'>
        <CircularProgress size={60} />
        <span className='ml-4 text-2xl font-bold'>Cargando personajes...</span>
      </div>
    )
  }
}
