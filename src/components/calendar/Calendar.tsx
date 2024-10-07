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
      showNonCurrentDates={false}
      fixedWeekCount={false}
    />
  )
}

export default Calendar
