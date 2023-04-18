import React from 'react';
import FullCalendar from '@fullcalendar/react';
// import './calendar.css'

const Calendar = props => {
  const [state, setState] = React.useState({
    weekendsVisible: true,
    currentEvents: [],
  });
  const {
    plugins,
    headerToolbar,
    initialView,
    handleEventClick,
    eventData,
    allDaySlot,
    dayHeaders,
    customButtons,
    buttonText,
    reference,
    datesSet,
    eventContent
    // titleFormat
  } = props;
  return (
    <>
      {' '}
      <FullCalendar
        buttonText={buttonText}
        // timeZone="local"
        ref={reference}
        plugins={plugins}
        customButtons={customButtons}
        eventContent={eventContent}
        headerToolbar={headerToolbar}
        allDaySlot={allDaySlot}
        selectLongPressDelay={1}
        longPressDelay={1}
        eventLongPressDelay={1}
        initialView={initialView}
        editable={true} // False for stop resize
        selectable={true} // false for stop click the event
        // selectMirror={true}
        dayMaxEvents={true}
        weekends={state.weekendsVisible}
        dayHeaders={dayHeaders}
        events={eventData} // alternatively, use the `events` setting to fetch from a feed
        // handleDateSelect={handleDateSelect}
        eventClick={handleEventClick}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          // meridiem: false,
        }}
        datesSet={datesSet}
      />{' '}
    </>
  );
};

export default Calendar;
