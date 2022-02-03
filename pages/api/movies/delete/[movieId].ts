// /api/movies/delete/[movieId]

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'DELETE': {
      try {
        const { movieId } = req.query
        await axios.delete(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB/${movieId}.json`)

        res.status(200).json({ message: 'Movie deleted', id: movieId })
      } catch (err: any) {
        console.error(
          `Error occurred while deleting movie from the database, ${err.message && err.message}`
        )
      }
      break
    }
    default: {
      console.error('Not a supported route')
    }
  }
}

export default handler
