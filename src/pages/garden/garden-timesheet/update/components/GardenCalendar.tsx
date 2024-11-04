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
  classNames?: string
  classId?: string
  hasEvent?: boolean
}

interface EventProps {
  events: Array<CalendarEvent>
  onDatesChange: (viewType: string, startDate: string) => Promise<void>
  onDateClick?: (info: { date: Date; view: { type: string } }) => void
}

const GardenCalendar = ({ events, onDatesChange, onDateClick }: EventProps) => {
  return (
    <Calendar
      events={events}
      onDatesChange={onDatesChange}
      headerToolbar={{
        left: 'today',
        center: 'title',
        right: 'prev,next'
      }}
      dayCellClassNames={({ date }) => {
        const today = new Date()
        const sevenDaysFromNow = new Date(today)
        sevenDaysFromNow.setDate(today.getDate() + 7)

        return date <= sevenDaysFromNow ||
          events.some((event) => new Date(event.start).toDateString() === date.toDateString() && event.hasEvent)
          ? []
          : ['clickable-day']
      }}
      onDateClick={onDateClick}
    />
  )
}

export default GardenCalendar
