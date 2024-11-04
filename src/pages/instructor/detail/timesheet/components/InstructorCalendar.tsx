import { Box } from '@mui/material'
import Calendar from '~/components/calendar/Calendar'

export type CalendarEvent = {
  start: string
  end: string
  title?: string
  display?: string
  backgroundColor?: string
}

interface InstructorCalendarProps {
  events: CalendarEvent[]
  onDatesChange: (viewType: string, startDate: string) => Promise<void>
}

const InstructorCalendar = ({ events, onDatesChange }: InstructorCalendarProps) => {
  return (
    <Box marginTop='1.25rem'>
      <Calendar events={events} onDatesChange={onDatesChange} />
    </Box>
  )
}

export default InstructorCalendar
