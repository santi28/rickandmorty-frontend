import { Character } from "@/services/characters.service";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Card variant='outlined' className='h-full'>
      <CardMedia
        sx={{ height: 240 }}
        image={character.image}
        title={ character.name }
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>{ character.name }</Typography>
        <Typography variant='body2' color='text.secondary'>{ character.gender }, { character.origin.name }</Typography>
      </CardContent>
    </Card>
  )
}