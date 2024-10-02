import viLocale from '@fullcalendar/core/locales/vi'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import '~/components/calendar/Calendar.css'
import FullCalendar from '@fullcalendar/react'
import { DatesSetArg } from '@fullcalendar/core/index.js'

interface GardenCalendarProps {
  events: Array<object>
  onDatesChange: (viewType: string, startDate: Date, endDate: Date) => void
}

const Calendar: React.FC<GardenCalendarProps> = ({ events = [], onDatesChange }) => {
  const handleDatesSet = (arg: DatesSetArg) => {
    const viewType = arg.view.type
    const startDate = arg.start
    const endDate = arg.end
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
      height={896}
      dayMaxEvents={true}
      aspectRatio={2}
      titleFormat={{
        year: 'numeric',
        month: 'long'
      }}
      displayEventTime={false}
      eventDisplay='block'
      expandRows={false}
      datesSet={handleDatesSet}
    />
  )
}

export default Calendar
