import { styled, Box, Text } from '@munhoz-tech-ui/react'

export const ConfirmStepForm = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  maxWidth: 540,
  margin: '$6 auto 0',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  paddingBottom: '$6',
  marginBottom: '$2',
  borderBottom: '1px solid $gray600',

  [`${Text}`]: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    svg: {
      color: '$gray200',
      width: '$5',
      height: '$5',
    },
  },
})

export const FormError = styled(Text, {
  color: '$red300',
})

export const FormActions = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$4',
  marginTop: '$2',
})
