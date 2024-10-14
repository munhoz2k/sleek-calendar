import { Box, styled, Text, TextArea } from '@munhoz-tech-ui/react'

export const ProfileBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  marginTop: '$6',

  label: {
    '&:first-child': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },

  [`${TextArea}`]: {
    resize: 'none',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
