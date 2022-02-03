import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from '@chakra-ui/react'
import { FC } from 'react'

interface Props {
  title: string
  description: string
  onCloseClick: () => void
}

const Alert: FC<Props> = props => {
  return (
    <Box align='center'>
      <ChakraAlert w='50%' status='error'>
        <AlertIcon />
        <AlertTitle mr={2}>{props.title}</AlertTitle>
        <AlertDescription>{props.description}</AlertDescription>
        <CloseButton onClick={props.onCloseClick} position='absolute' right='8px' top='8px' />
      </ChakraAlert>
    </Box>
  )
}

export default Alert
