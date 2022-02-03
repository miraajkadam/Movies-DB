// /api/movies/edit/[movieId]

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'PATCH': {
      try {
        const { body, query } = req
        const { movieId } = query
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB/${movieId}.json`,
          body
        )

        res.status(200).json({ message: 'Movie Updated', data: response.data })
      } catch (err: any) {
        console.error(
          `Error occurred while posting the edited movie to database, ${err.message && err.message}`
        )

        res.status(500).json({ message: 'Error in posting the movie to database' })
      }
      break
    }
    default: {
      console.error('Not a supported route')
    }
  }
}

export default handler
