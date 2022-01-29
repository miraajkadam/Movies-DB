import Head from 'next/head'
import { FC, Fragment, ReactNode } from 'react'
import Navigation from './Navigation'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = props => {
  return (
    <Fragment>
      <Head>
        <title>Movie Database</title>
      </Head>
      <Navigation />
      {props.children}
    </Fragment>
  )
}

export default Layout
