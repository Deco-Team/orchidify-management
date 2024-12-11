import { SvgIconComponent } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'

interface StatisticCardProps {
  title: string
  value: number | string
  Icon: SvgIconComponent
  bgcolor: string
  borderColor: string
  iconBgcolor: string
}

const StatisticCard = ({ title, value, Icon, bgcolor, borderColor, iconBgcolor }: StatisticCardProps) => {
  return (
    <CardWrapper bgcolor={bgcolor} borderColor={borderColor}>
      <ContentWrapper>
        <IconContainer bgcolor={iconBgcolor}>
          <IconWrapper>
            <Icon sx={{ width: '100%', height: '100%', fill: '#FFFFFF' }} />
          </IconWrapper>
        </IconContainer>
        <Box>
          <Typography fontSize='1.75rem' fontWeight='500'>
            {value}
          </Typography>
          <Typography component='span' fontSize='1rem' fontWeight='400'>
            {title}
          </Typography>
        </Box>
      </ContentWrapper>
    </CardWrapper>
  )
}

export default StatisticCard

const CardWrapper = styled(Box)`
  border-radius: 30px 0 30px 0;
  padding: 1.5rem;
  height: 100%;
`

const ContentWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
`

const IconContainer = styled(Box)`
  display: flex;
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
`

const IconWrapper = styled(Box)`
  width: 100%;
  height: 50px;
  margin: auto;
`
