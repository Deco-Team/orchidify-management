import { DatesSetArg } from '@fullcalendar/core/index.js'
import viLocale from '@fullcalendar/core/locales/vi'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useMemo } from 'react'
import '~/components/calendar/Calendar.css'

interface GardenCalendarProps {
  events: Array<object>
  onDatesChange: (viewType: string, startDate: string, endDate: string) => void
  onEventClick?: (info: { event: object; view: { type: string } }) => void
}

const Calendar: React.FC<GardenCalendarProps> = ({ events = [], onDatesChange, onEventClick }) => {
  const validRange = useMemo(() => {
    const today = new Date()
    const startDate = `${today.getFullYear() - 2}-${today.getMonth() + 1}-${today.getDate()}`
    const endDate = `${today.getFullYear() + 1}-${today.getMonth() + 1}-${today.getDate()}`

    return {
      start: startDate,
      end: endDate
    }
  }, [])

  const handleDatesSet = (arg: DatesSetArg) => {
    const viewType = arg.view.type
    const startDate = arg.startStr
    const endDate = arg.endStr
    onDatesChange(viewType, startDate, endDate)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
      initialView={'dayGridMonth'}
      validRange={validRange}
      editable={false}
      selectable={false}
      weekends={true}
      events={events}
      locale={viLocale}
      height={1000}
      dayMaxEvents={true}
      // aspectRatio={2}
      titleFormat={{
        year: 'numeric',
        month: '2-digit'
      }}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit'
      }}
      showNonCurrentDates={false}
      fixedWeekCount={false}
      displayEventEnd={true}
      allDaySlot={false}
      nowIndicator
      slotMinTime={'7:00:00'}
      slotMaxTime={'18:00:00'}
      slotEventOverlap={false}
      expandRows={true}
      datesSet={handleDatesSet}
      eventClick={onEventClick}
    />
  )
}

export default Calendar
