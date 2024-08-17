import { styled, Heading, Text } from '@munhoz-tech-ui/react'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  minHeight: '100vh',
  gap: '$20',

  overflow: 'hidden',
})

export const Hero = styled('div', {
  position: 'relative',

  maxWidth: 'min-content',
  padding: '0 $10',
  marginLeft: '15%',

  '> img': {
    position: 'absolute',
    zIndex: -1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Preview = styled('div', {
  marginRight: -120,

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
