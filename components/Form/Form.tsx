import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import Movie from '../../model/Movie'

interface Props {
  onFormSubmit: (movie: Movie) => void
  editableData?: Movie | null
  isLoading: boolean
}

const Form: FC<Props> = props => {
  const [movie, setMovie] = useState<Movie>({
    name: '',
    rating: '',
    date: '',
    plot: '',
  })

  const { editableData } = props
  useEffect(() => {
    if (editableData) setMovie(editableData)
  }, [editableData])

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      let movieAfterSubmit: Movie

      if (props.editableData) {
        movieAfterSubmit = new Movie(movie.name, +movie.rating, movie.date, movie.plot, movie.id)
      } else {
        movieAfterSubmit = new Movie(movie.name, +movie.rating, movie.date, movie.plot)
      }

      props.onFormSubmit(movieAfterSubmit)
    } catch (err: any) {
      let error = `Error in creating the movie ${err.message && err.message}`
      console.error(error)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setMovie((pre: Movie) => ({ ...pre, [name]: value }))
  }

  const handleRatingChange = (value: string | number) => {
    setMovie((pre: Movie) => ({ ...pre, rating: +value }))
  }

  return (
    <Center pt={30}>
      <Box w='50%' borderWidth='1px' borderRadius='lg' px={2} py={5}>
        <form onSubmit={handleFormSubmit}>
          <Flex direction='column'>
            <Text fontSize='xl' mb={1}>
              <label htmlFor='name'>
                <strong>Name</strong>
              </label>
            </Text>
            <Input
              onChange={handleInputChange}
              value={movie.name}
              type='text'
              name='name'
              variant='outline'
            />
            <Divider mt={3} mb={3} />
            <Text fontSize='xl' mb={1}>
              <strong>
                <label htmlFor='rating'>Rating</label>
              </strong>
            </Text>
            <Flex name='rating'>
              <NumberInput
                value={movie.rating.toString()}
                onChange={handleRatingChange}
                min={1}
                max={5}
                maxW='100px'
                mr='2rem'
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                min={1}
                max={5}
                flex='1'
                focusThumbOnChange={false}
                value={+movie.rating}
                onChange={handleRatingChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize='sm' boxSize='32px' children={movie.rating?.toString()} />
              </Slider>
            </Flex>

            <Divider mt={3} mb={3} />
            <Text fontSize='xl' mb={1}>
              <strong>
                <label htmlFor='date'>Release Date</label>
              </strong>
            </Text>
            <Input onChange={handleInputChange} value={movie.date} type='date' name='date' />

            <Divider mt={3} mb={3} />
            <Text fontSize='xl' mb={1}>
              <strong>
                <label htmlFor='plot'>Plot</label>
              </strong>
            </Text>
            <Textarea onChange={handleInputChange} value={movie.plot} name='plot' />
            <Flex justify={props.isLoading ? 'space-between' : 'flex-end'}>
              {props.isLoading && <Spinner alignSelf='end' />}
              <Button
                isLoading={props.isLoading}
                loadingText='Loading'
                type='submit'
                variant='solid'
                mt='5'
                w={100}
              >
                {props.editableData ? 'Update' : 'Add'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
    </Center>
  )
}

export default Form
