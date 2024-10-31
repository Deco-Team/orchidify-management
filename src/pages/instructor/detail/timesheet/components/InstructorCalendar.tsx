import Calendar from '~/components/calendar/Calendar'
import { GardenTimesheetStatus } from '~/global/app-status'

export type CalendarEvent = {
  start: string
  end: string
  status: GardenTimesheetStatus
  title?: string
  allDay?: boolean
  display?: string
  backgroundColor?: string
}

interface InstructorCalendarProps {
  events: CalendarEvent[]
  onDatesChange: (viewType: string, startDate: string) => Promise<void>
}

const InstructorCalendar = ({ events, onDatesChange }: InstructorCalendarProps) => {
  return <Calendar events={events} onDatesChange={onDatesChange} />
}

export default InstructorCalendar
