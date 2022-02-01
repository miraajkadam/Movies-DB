import axios from 'axios'

export const httpRequest = async (method: string, url: string) => {
  return new Promise(async (resolve, reject) => {
    // const response = await axios.get(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}`).then(() => {
      // if (response.statusText === 'OK') {
      // console.log(response)
      // return resolve({ data: response.data })
      // } else {
      //   console.log(response)

      //   // return reject({ data: response })
      // }
    })
  })
}
