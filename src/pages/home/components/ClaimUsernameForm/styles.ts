import { Box, styled, Text } from '@munhoz-tech-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',

  gap: '$2',
  padding: '$4',
  marginTop: '$8',

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const FormAnnotation = styled('div', {
  marginTop: '$2',

  [`${Text}`]: {
    color: '$gray400',
  },
})
