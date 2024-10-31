import Calendar from '~/components/calendar/Calendar'
import { GardenTimesheetStatus } from '~/global/app-status'

interface EventProps {
  events: Array<{
    start: string
    end: string
    status: GardenTimesheetStatus
    classId?: string
  }>
  onDatesChange: (viewType: string, startDate: string) => Promise<void>
  onEventClick?: (info: { event: { extendedProps?: { classId?: string } }; view: { type: string } }) => void
}

const GardenCalendar = ({ events, onDatesChange, onEventClick }: EventProps) => {
  return <Calendar events={events} onDatesChange={onDatesChange} onEventClick={onEventClick} />
}

export default GardenCalendar
