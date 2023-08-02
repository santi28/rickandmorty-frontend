'use client'

import CharacterCard from '@/components/CharacterCard'
import { Character, getCharacters } from '@/services/characters.service'
import { CircularProgress, Grid, Pagination, Typography } from '@mui/material'
import { use, useEffect, useState } from 'react'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [info, setInfo] = useState<any>({ count: 0, pages: 0, next: 1, prev: null })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => { setPage(value) }

  useEffect(() => {
    setLoading(true)
    getCharacters(page)
      .then((characters) => {
        setCharacters(characters.results)
        setInfo(characters.info)
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

  return (
    <Grid container spacing={2} className='p-4 m-auto max-w-7xl' columns={{ xs: 6, sm: 8, md: 12 }}>
      <Grid item xs={12} sm={8} md={12}>
        <Typography variant='h5' component='h1'>Personajes de Rick and Morty</Typography>
        <Typography variant='caption'>Se encontraron {info.count} personajes</Typography>
      </Grid>
      {
        characters.map((character) => (
          <Grid item key={character.id} xs={6} sm={4} md={3}>
            <CharacterCard character={character} />
          </Grid>
        ))
      }
      <Grid item xs={12} sm={12} md={12} className='flex items-center justify-center'>
        <Pagination count={info.pages} onChange={handlePagination} />
      </Grid>
    </Grid>
  )
}
