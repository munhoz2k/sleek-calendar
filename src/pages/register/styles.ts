import { Box, Heading, styled, Text } from '@munhoz-tech-ui/react'

export const Container = styled('div', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '$4',
})

export const Header = styled('div', {
  padding: '0 $6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const Form = styled(Box, {
  display: 'flex',
  flexDirection: 'column',

  gap: '$4',
  marginTop: '$6',

  label: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '$1',
  },
})

export const FormError = styled(Text, {
  color: '$red300',
})
