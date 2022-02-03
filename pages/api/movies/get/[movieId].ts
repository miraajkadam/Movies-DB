// /api/movies/get/[movieId]

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET': {
      try {
        const { movieId } = req.query
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB/${movieId}.json`
        )

        if (!response.data) res.status(404).json({ message: "Movie doesn't exist...!" })
        res.status(200).json(response.data)
      } catch (err: any) {
        console.error(
          `Error occurred while fetching the movie from the database, ${err.message && err.message}`
        )

        res.status(500).json({ message: 'Error in fetching the movie from the database' })
      }

      break
    }
    default: {
      console.error('Not a supported route')
    }
  }
}

export default handler
