import styled from '@emotion/styled'
import { Theme } from '@mui/material'

export const Label = styled.h6<{ theme: Theme }>`
  color: ${({ theme }) => theme.label.secondary};
  font-size: 1rem;
  font-weight: 500;
  text-align: right;
  margin: 0.5rem;
`
