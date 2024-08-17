import { Box, styled, Text } from '@munhoz-tech-ui/react'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  borderRadius: '$md',
  border: '1px solid $gray600',

  marginBottom: '$2',
  padding: '$4 $6',
})

export const AuthError = styled(Text, {
  color: '$red300',
  marginBottom: '$4',
})
