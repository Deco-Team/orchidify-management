import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ListItemButton, ListItemText, Collapse, Box, Typography, Divider } from '@mui/material'
import Carousel from '~/components/slider/Carousel'
import { SessionDto } from '~/data/course.dto'
import { APP_MESSAGE } from '~/global/app-message'
import AssignmentDetailInformation from './AssignmentDetailInformation'

interface SessionListItemProps {
  session: SessionDto
  open: boolean
  onClick: () => void
}

const SessionListItem = ({ session, open, onClick }: SessionListItemProps) => {
  return (
    <>
      <ListItemButton onClick={onClick}>
        <ListItemText
          primary={
            <Typography variant='subtitle1' fontWeight={600}>
              Buổi học #{session.sessionNumber}: {session.title}
            </Typography>
          }
          sx={{ fontWeight: 600 }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit sx={{ width: '100%', padding: '0.5rem 1rem' }}>
        {/* <Box display='flex' alignItems='center' marginBottom='1.25rem'>
          <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '0.75rem' }}>
            Nội dung buổi học
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box> */}
        <Box key={session.title}>
          {/* <Box display='flex' gap='1rem' marginBottom='1.25rem'>
            <Box display='flex' flexDirection='column' justifyContent='space-between' flexGrow='1'>
              <Typography variant='subtitle1' fontWeight={600}>
                Buổi học #{session.sessionNumber}: {session.title}
              </Typography>
            </Box>
          </Box> */}
          <Box marginBottom='1.25rem'>
            <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
              Mô tả
            </Typography>
            <Typography variant='subtitle1' fontWeight={400}>
              {session.description}
            </Typography>
          </Box>
          <Box>
            {session.media.some((value) => value.resource_type === 'video') && (
              <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem' marginTop='1.25rem'>
                Video buổi học
              </Typography>
            )}
            {session.media.map((value, index) => (
              <div
                key={index}
                style={{
                  boxSizing: 'border-box'
                }}
              >
                {value.resource_type === 'video' ? (
                  <video controls height={200}>
                    <source src={value.url} type='video/mp4' />
                    {APP_MESSAGE.LOAD_DATA_FAILED('video')}
                  </video>
                ) : undefined}
              </div>
            ))}
            <Typography variant='subtitle1' fontWeight={600} marginBottom='0.5rem'>
              Tài nguyên buổi học
            </Typography>
            <Carousel>
              {session.media.map((value, index) => (
                <div
                  key={index}
                  style={{
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ width: '200px', height: '200px', padding: '0 2px' }}>
                    {value.resource_type === 'image' ? (
                      <img
                        src={value.url}
                        alt={`Session resource ${value.public_id}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    ) : undefined}
                  </div>
                </div>
              ))}
            </Carousel>
          </Box>
        </Box>
        <Divider sx={{ margin: '1.25rem 0' }} />
        {/*
          Only allow 1 assignment per session 
        */}
        {session.assignments.length > 0 ? <AssignmentDetailInformation assignment={session.assignments[0]} /> : null}
      </Collapse>
    </>
  )
}

export default SessionListItem
