import { Box, styled, Text } from '@munhoz-tech-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',

  gap: '$2',
  padding: '$4 $4 $2 $4',
  marginTop: '$8',

  [`${Text}`]: {
    color: '$gray400',
    marginLeft: '$1',
  },

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const FormAnnotation = styled('div', {
  marginTop: '$2',

  [`${Text}`]: {
    color: '$gray200',
    marginLeft: '$1',
    marginTop: '$4',
  },

  a: {
    all: 'unset',
    cursor: 'pointer',
    textDecoration: 'underline',

    '&:hover': {
      color: '$gray400',
    },
  },
})
