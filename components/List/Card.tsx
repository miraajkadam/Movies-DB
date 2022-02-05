import { DeleteIcon, EditIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Head from 'next/head'
import { FC, Fragment } from 'react'

interface Props {
  key: number
  id: string
  name: string
  rating: number | string
  date: string
  plot: string
  onMovieEdit: (id: string) => void
  onMovieDelete: (id: string) => void
}

const Card: FC<Props> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Fragment>
      {isOpen && (
        <Head>
          <title>{props.name}</title>
        </Head>
      )}
      <Flex direction='column' align='flex-end' border='1px' borderRadius='lg' p={5}>
        <Box align='right'>
          <Heading mb={3} as='h1' size='xl'>
            {props.name}
          </Heading>
        </Box>
        <Divider />
        <Text mt={4} fontSize='2xl'>
          <strong>Rating: </strong>
          {props.rating}
        </Text>
        <Text mt={2} fontSize='2xl'>
          <strong>Released: </strong>
          {props.date}
        </Text>
        <Box style={{ textAlign: 'center' }}>
          <Text mt={2} fontSize='sm'>
            {props.plot}
          </Text>
        </Box>
        <Box mt='auto'>
          <Button colorScheme='grey' variant='ghost' onClick={onOpen}>
            {isOpen ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
          <Button
            ml={2}
            colorScheme='blue'
            variant='ghost'
            onClick={() => props.onMovieEdit(props.id!)}
          >
            <EditIcon />
          </Button>
          <Button
            ml={2}
            colorScheme='red'
            variant='ghost'
            onClick={() => props.onMovieDelete(props.id!)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.plot}</ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default Card
