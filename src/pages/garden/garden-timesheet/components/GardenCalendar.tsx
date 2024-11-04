import Calendar from '~/components/calendar/Calendar'

export type CalendarEvent = {
  start: string
  end: string
  title?: string
  allDay?: boolean
  display?: string
  backgroundColor?: string
  classNames?: string
  classId?: string
}

interface EventProps {
  events: Array<CalendarEvent>
  onDatesChange: (viewType: string, startDate: string) => Promise<void>
  onEventClick?: (info: { event: { extendedProps?: { classId?: string } }; view: { type: string } }) => void
}

const GardenCalendar = ({ events, onDatesChange, onEventClick }: EventProps) => {
  return <Calendar events={events} onDatesChange={onDatesChange} onEventClick={onEventClick} />
}

export default GardenCalendar
