// /api/movies/edit/[movieId]

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'PATCH': {
      const { body, query } = req
      const { movieId } = query
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB/${movieId}.json`,
        body
      )

      res.status(200).json({ message: 'Movie Updated', data: response.data })
      break
    }
    default: {
      console.error('Not a supported route')
    }
  }
}

export default handler
