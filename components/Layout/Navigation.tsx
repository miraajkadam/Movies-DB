import { Box, Divider, Flex, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

const Navigation = () => {
  return (
    <Box mb={5}>
      <Flex mb={2} justify='flex-end'>
        <Box mr={4}>
          <NextLink href='/' passHref>
            <Heading as='h3' size='lg'>
              <Link>All Movies</Link>
            </Heading>
          </NextLink>
        </Box>
        <Box mr={6}>
          <NextLink href='/add' passHref>
            <Heading as='h3' size='lg'>
              <Link>Add a movie</Link>
            </Heading>
          </NextLink>
        </Box>
      </Flex>
      <Divider />
    </Box>
  )
}

export default Navigation
