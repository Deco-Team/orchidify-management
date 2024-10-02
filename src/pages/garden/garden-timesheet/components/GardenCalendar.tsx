import Calendar from '~/components/calendar/Calendar'
import { GardenTimesheetStatus } from '~/global/app-status'

interface EventProps {
  events: Array<{
    _id: string
    startTime: string
    endTime: string
    status: GardenTimesheetStatus
  }>
  onDatesChange: (viewType: string, startDate: Date) => Promise<void>
}

const GardenCalendar = ({ events, onDatesChange }: EventProps) => {
  return <Calendar events={events} onDatesChange={onDatesChange} />
}

export default GardenCalendar
