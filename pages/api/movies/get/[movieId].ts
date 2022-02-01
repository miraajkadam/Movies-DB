// /api/movies/get/[movieId]

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET': {
      const { movieId } = req.query

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB/${movieId}.json`
      )

      res.status(200).json(response.data)
      break
    }
    default: {
      console.error('Not a supported route')
    }
  }
}

export default handler
