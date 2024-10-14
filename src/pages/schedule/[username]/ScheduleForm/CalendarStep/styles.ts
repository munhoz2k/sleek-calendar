import { styled, Box, Text } from '@munhoz-tech-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: '0',
  maxWidth: '100%',

  position: 'relative',
  display: 'grid',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },

      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimePicker = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 4,

  width: 280,
  padding: '$6 $6 0',
  borderLeft: '1px solid $gray600',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: '10px',
  },

  '&::-webkit-scrollbar-track': {
    margin: '$2 0 $2',
    borderRadius: '8px',
    backgroundColor: '$gray200',
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    backgroundColor: '$gray600',
  },
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',

  span: {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',
  marginTop: '$3',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',
  },
})

export const TimePickerItem = styled('button', {
  cursor: 'pointer',

  backgroundColor: '$gray600',
  color: '$gray100',
  fontSize: '$sm',
  lineHeight: '$base',

  border: 0,
  borderRadius: '$md',
  padding: '$2 0',

  outline: 'none',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus-visible': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
