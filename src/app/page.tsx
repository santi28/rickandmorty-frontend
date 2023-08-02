'use client'

import { Character, getCharacters } from '@/services/characters.service'
import { CircularProgress, Grid, Typography } from '@mui/material'
import { use, useEffect, useState } from 'react'

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [info, setInfo] = useState<any>({ count: 0, pages: 0, next: 1, prev: null })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCharacters()
      .then((characters) => {
        setCharacters(characters.results)
        setInfo(characters.info)
        console.log(characters)
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
    </Grid>
  )
}
