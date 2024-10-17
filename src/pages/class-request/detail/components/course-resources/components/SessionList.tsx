import { Divider, List, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { SessionDto } from '~/data/course.dto'
import SessionListItem from './SessionListItem'

interface SessionListProps {
  sessions: Array<SessionDto>
}

const SessionList = ({ sessions }: SessionListProps) => {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const theme = useTheme()

  const handleClick = (item: string) => {
    if (openItem === item) {
      setOpenItem(null)
    } else {
      setOpenItem(item)
    }
  }

  return (
    <List
      sx={{ width: '100%' }}
      component='nav'
      disablePadding
      aria-labelledby='session-list-subheader'
      subheader={
        <Typography variant='subtitle1' marginBottom='0.5rem' sx={{ color: theme.palette.info.dark }}>
          Danh sách nội dung buổi học
        </Typography>
      }
    >
      {sessions.map((session, index) => {
        const listItems = []
        if (openItem === session._id)
          listItems.push(
            <SessionListItem
              key={`session-${index}`}
              session={session}
              open={true}
              onClick={() => handleClick(session._id)}
            />
          )
        else
          listItems.push(
            <SessionListItem
              key={`session-${index}`}
              session={session}
              open={false}
              onClick={() => handleClick(session._id)}
            />
          )

        if (index !== sessions.length - 1)
          listItems.push(<Divider key={`divider-${index}`} variant='inset' component='li' sx={{ margin: '0' }} />)
        return listItems
      })}
    </List>
  )
}

export default SessionList
