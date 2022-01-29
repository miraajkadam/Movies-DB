import Link from 'next/link'
import { Fragment } from 'react'

const Navigation = () => {
  return (
    <Fragment>
      <Link href='/'>All Movies</Link>
      <br />
      <Link href='/add'>Add a movie</Link>
      <hr />
    </Fragment>
  )
}

export default Navigation
