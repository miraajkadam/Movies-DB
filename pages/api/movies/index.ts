// /api/movies

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET': {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB.json`)

        res.status(200).json(response.data)
      } catch (err: any) {
        console.error(`Error occurred while fetching the movies ${err.message && err.message}`)
        res.status(500).json({ message: 'Error in fetching the movies from the database' })
      }
      break
    }

    default: {
      console.error('Not a supported route')
    }
  }
}

export default handler
