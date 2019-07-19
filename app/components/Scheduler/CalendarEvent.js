import React from 'react';
import PropTypes from 'prop-types';

const CalendarEvent = ({ onLeave, onOver, calendarEvent, eventClick }) => {
  return (
    <div className="event-calendar" style={styles.mainContainer}>
      <div
        role="presentation"
        style={styles.eventStyle}
        onMouseLeave={onLeave}
        onMouseOver={onOver}
        onFocus={() => {}}
        onClick={e => eventClick(e, calendarEvent)}
      >
        {`${calendarEvent.timeFrom} - ${calendarEvent.title}`}
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    borderRadius: '3px'
  },
  eventStyle: {
    zIndex: '2',
    margin: '2px 3px',
    fontSize: '14px',
    color: 'white'
  }
};

CalendarEvent.propTypes = {
  onLeave: PropTypes.func,
  onOver: PropTypes.func,
  calendarEvent: PropTypes.instanceOf(Object),
  eventClick: PropTypes.func
};

CalendarEvent.defaultProps = {
  onLeave: () => {},
  onOver: () => {},
  calendarEvent: {},
  eventClick: () => {}
};

export default CalendarEvent;
