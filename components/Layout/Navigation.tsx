import { Box, Divider, Flex, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Navigation = () => {
  return (
    <Box mb={5}>
      <Flex mb={2} justify='flex-end'>
        <Box mr={4}>
          <NextLink href='/' passHref>
            <Link>
              <Heading as='h3' size='lg'>
                All Movies
              </Heading>
            </Link>
          </NextLink>
        </Box>
        <Box mr={6}>
          <NextLink href='/add' passHref>
            <Link>
              <Heading as='h3' size='lg'>
                Add a movie
              </Heading>
            </Link>
          </NextLink>
        </Box>
      </Flex>
      <Divider />
    </Box>
  )
}

export default Navigation
