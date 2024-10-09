import { DatesSetArg } from '@fullcalendar/core/index.js'
import viLocale from '@fullcalendar/core/locales/vi'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import '~/components/calendar/Calendar.css'

interface GardenCalendarProps {
  events: Array<object>
  onDatesChange: (viewType: string, startDate: string, endDate: string) => void
}

const Calendar: React.FC<GardenCalendarProps> = ({ events = [], onDatesChange }) => {
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
      displayEventTime={true}
      displayEventEnd={true}
      allDaySlot={false}
      nowIndicator
      slotMinTime={'7:00:00'}
      slotMaxTime={'17:00:00'}
      expandRows={true}
      datesSet={handleDatesSet}
    />
  )
}

export default Calendar
