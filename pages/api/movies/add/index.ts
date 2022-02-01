// /api/movies/add

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req

  switch (method) {
    case 'POST': {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB.json`,
          body
        )

        res.status(201).json({ id: response.data.name })
      } catch (err: any) {
        console.error(`Error occurred while posting the data to firebase, ${err.message}`)
      }

      break
    }

    default: {
      console.error('Not a support route')
    }
  }
}

export default handler
