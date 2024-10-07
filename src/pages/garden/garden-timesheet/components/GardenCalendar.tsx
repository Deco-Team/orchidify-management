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
}

const GardenCalendar = ({ events, onDatesChange }: EventProps) => {
  return <Calendar events={events} onDatesChange={onDatesChange} />
}

export default GardenCalendar
