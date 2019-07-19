import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { Query, Mutation } from 'react-apollo';
import Button from '@material-ui/core/Button';
import { getDatesFromToByMonth } from './CalendarTools';
import { GET_EVENTS_BY_MONTH } from './EventQueries';
import ADD_EVENT from './EventMutations';
import DialogDetail from './DialogDetail';
import EventDetailContent from './EventDetailContent';
import CalendarEvent from './CalendarEvent';

moment.locale('es');

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    height: '100%'
  }
});

// TODO: verify if the event list is empty or there is an exception to load.
/**
 * Gets the Events by a Date.
 *
 * @param {Object[]} events Event list.
 * @param {Object} date Date to be filtered.
 * @param {Func} onLeave Event when the component is on leave.
 * @param {Func} onOver Event when the component is over.
 * @param {Func} eventClick Event when the component is clicked.
 */
const getEventsByDate = (events, date, onLeave, onOver, eventClick) => {
  return events
    .filter(e => e.date === date)
    .map(eventDate => {
      return eventDate.events.map(calendarEvent => {
        return (
          <CalendarEvent
            key={calendarEvent.id}
            onLeave={onLeave}
            onOver={onOver}
            calendarEvent={calendarEvent}
            eventClick={eventClick}
          />
        );
      });
    });
};

/**
 * Drawes a Grid with rows and columns (cells) for the Month Calendar.
 *
 * @param {object} object With options for the Month Calendar
 */
const EventGridList = ({
  events,
  days,
  classes,
  setOpenNewEventDialog,
  setSelectedDate,
  setOpenDetailEventDialog,
  setSelectedCalendarEvent
}) => {
  const [hoverCell, setHoverCell] = useState('tile-calendar');

  const onEventClick = (e, calendarEvent) => {
    e.stopPropagation();
    setSelectedCalendarEvent(calendarEvent);
    setOpenDetailEventDialog(true);
  };

  const onClickCalendarCell = date => {
    setSelectedDate(date);
    setOpenNewEventDialog(true);
  };

  return (
    <GridList
      style={{ padding: '3px 5px' }}
      cellHeight={10}
      className={classes.gridList}
      cols={7}
    >
      {days.map(item => {
        return (
          <GridListTile
            key={item}
            cols={1}
            style={{
              height: 'auto',
              borderBottom: '1px dotted #676666',
              zIndex: '0'
            }}
            className={hoverCell}
            onClick={() => onClickCalendarCell(item)}
          >
            <Typography style={{ margin: 0 }} variant="body2" gutterBottom>
              {item.format('D')}
            </Typography>
            {getEventsByDate(
              events,
              item.format('YYYY-MM-DD'),
              () => setHoverCell('tile-calendar'),
              () => setHoverCell(''),
              onEventClick
            )}
          </GridListTile>
        );
      })}
    </GridList>
  );
};

EventGridList.propTypes = {
  events: PropTypes.instanceOf(Array),
  days: PropTypes.instanceOf(Array),
  classes: PropTypes.instanceOf(Object),
  setOpenNewEventDialog: PropTypes.func,
  setSelectedDate: PropTypes.func,
  setOpenDetailEventDialog: PropTypes.func,
  setSelectedCalendarEvent: PropTypes.func
};

EventGridList.defaultProps = {
  events: [],
  days: [],
  classes: {},
  setOpenNewEventDialog: () => {},
  setSelectedDate: () => {},
  setOpenDetailEventDialog: () => {},
  setSelectedCalendarEvent: () => {}
};

const EventContainer = ({
  month,
  year,
  locale,
  daysPerMonth,
  classes,
  setOpenNewEventDialog,
  setSelectedDate,
  setOpenDetailEventDialog,
  setSelectedCalendarEvent
}) => {
  return (
    <Query
      query={GET_EVENTS_BY_MONTH}
      variables={{ month, year, locale }}
      skip={month === '' && locale === '' && year === ''}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (loading) return <div />;
        if (error) {
          return <div>{`Message [${error}]`}</div>;
        }

        return (
          <EventGridList
            events={data.calendarEventsByMonth}
            days={getDatesFromToByMonth(month, year, locale, daysPerMonth)}
            classes={classes}
            setOpenNewEventDialog={setOpenNewEventDialog}
            setOpenDetailEventDialog={setOpenDetailEventDialog}
            setSelectedCalendarEvent={setSelectedCalendarEvent}
            setSelectedDate={setSelectedDate}
          />
        );
      }}
    </Query>
  );
};

EventContainer.propTypes = {
  month: PropTypes.string,
  year: PropTypes.string,
  locale: PropTypes.string,
  daysPerMonth: PropTypes.number,
  classes: PropTypes.instanceOf(Object),
  setOpenNewEventDialog: PropTypes.func,
  setSelectedDate: PropTypes.func,
  setOpenDetailEventDialog: PropTypes.func,
  setSelectedCalendarEvent: PropTypes.func
};

EventContainer.defaultProps = {
  month: '',
  year: '',
  locale: '',
  daysPerMonth: 0,
  classes: {},
  setOpenNewEventDialog: () => {},
  setSelectedDate: () => {},
  setOpenDetailEventDialog: () => {},
  setSelectedCalendarEvent: () => {}
};

/**
 * Draws the week titles using the week days list.
 *
 * @param {Object[]} weekdays Titles for the Week.
 */
const WeekNameGrid = ({ weekdays }) => {
  return (
    <Paper elevation={1}>
      <GridList
        style={{
          height: '35px',
          overflow: 'hidden',
          padding: '3px 3px',
          margin: 0
        }}
        cols={7}
      >
        {weekdays.map(weekName => {
          return (
            <Typography
              key={weekName}
              style={{
                margin: 0,
                height: '25px',
                display: 'flex',
                alignSelf: 'center',
                alignItems: 'center'
              }}
              variant="subtitle1"
              gutterBottom
            >
              {weekName}
            </Typography>
          );
        })}
      </GridList>
    </Paper>
  );
};

WeekNameGrid.propTypes = {
  weekdays: PropTypes.instanceOf(Array)
};

WeekNameGrid.defaultProps = {
  weekdays: []
};

/**
 * Button Mutation to save a new Calendar Event.s
 *
 * @param {Object} data That Represent the Calendar Event.
 * @param {func} setOpenDialog Func to set Open/Close Dialog.
 * @param {string} month Month to update the GraphQL queries/variable.
 * @param {string} year Year to update the GraphQL queries/variables.
 * @param {string} locale Locale According the Location e. g. "en" or "es".
 */
const SaveEventMutation = ({
  data: event,
  setOpenDialog,
  month,
  year,
  locale
}) => {
  const confirm = () => {
    // TODO: Add Snackbar to show message
    setOpenDialog(false);
  };

  const mutationSave = async mutationFn => {
    await mutationFn();
  };

  return (
    <Mutation
      mutation={ADD_EVENT}
      variables={{ event }}
      update={(cache, data) => {
        const { addEvent } = data.data;
        const { calendarEventsByMonth } = cache.readQuery({
          query: GET_EVENTS_BY_MONTH,
          variables: { month, year, locale }
        });
        let newEvents = [];

        const foundEvent = calendarEventsByMonth.find(
          c => c.date === event.date
        );
        const { date } = foundEvent;
        if (foundEvent !== undefined) {
          newEvents = calendarEventsByMonth.map(e => {
            if (e.date === date) {
              return e.events.concat(addEvent);
            }
            return e;
          });
        } else {
          newEvents = calendarEventsByMonth.concat([
            {
              date: addEvent.date,
              events: [event]
            }
          ]);
        }

        cache.writeQuery({
          query: GET_EVENTS_BY_MONTH,
          variables: { month, year, locale },
          data: {
            calendarEventsByMonth: newEvents
          }
        });
      }}
      onCompleted={data => confirm(data)}
    >
      {save => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => mutationSave(save, event)}
        >
          Save
        </Button>
      )}
    </Mutation>
  );
};

SaveEventMutation.propTypes = {
  data: PropTypes.instanceOf(Object),
  setOpenDialog: PropTypes.func,
  month: PropTypes.string,
  year: PropTypes.string,
  locale: PropTypes.string
};

SaveEventMutation.defaultProps = {
  data: {},
  setOpenDialog: () => {},
  month: '',
  year: '',
  locale: ''
};

/**
 * Draws the Month Calendar.
 *
 * @param {Object} data Selected Data from the Sheduler Component by Month.
 * @param {*} classes Styles from the Scheduler Component.
 * @param {*} dialogForm That represent a DialogForm to add new Calendar Events.
 * @param {*} dialogContent That represent the AddEventComponent Content.
 */
const MonthCalendar = ({
  data,
  classes,
  dialogForm: DialogForm,
  dialogContent: AddEventComponent
}) => {
  const [month, setMonth] = useState(data.get('month'));
  const [year] = useState(data.get('year'));
  const [selectedDate, setSelectedDate] = useState(moment());
  const [locale] = useState(moment().locale());
  const [weekdays] = useState(moment.weekdays());
  const [daysPerMonth] = useState(35);
  const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
  const [openDetaiEventlDialog, setOpenDetailEventDialog] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState({});

  const initDataModel = {
    title: '',
    date: '',
    timeFrom: '',
    timeTo: '',
    participants: [],
    description: ''
  };
  useEffect(() => {
    setMonth(data.get('month'));
  }, [data]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <WeekNameGrid weekdays={weekdays} />
      <EventContainer
        month={month}
        year={year}
        locale={locale}
        daysPerMonth={daysPerMonth}
        classes={classes}
        setOpenNewEventDialog={setOpenNewEventDialog}
        setOpenDetailEventDialog={setOpenDetailEventDialog}
        setSelectedCalendarEvent={setSelectedCalendarEvent}
        setSelectedDate={setSelectedDate}
      />
      <DialogForm
        selectedDate={selectedDate}
        month={month}
        year={year}
        locale={locale}
        title="Add Event"
        dataModel={initDataModel}
        open={openNewEventDialog}
        setOpenDialog={setOpenNewEventDialog}
        content={AddEventComponent}
        saveMutation={SaveEventMutation}
      />
      <DialogDetail
        data={selectedCalendarEvent}
        content={EventDetailContent}
        open={openDetaiEventlDialog}
        setOpenDetailEventDialog={setOpenDetailEventDialog}
      />
    </div>
  );
};

MonthCalendar.propTypes = {
  data: PropTypes.instanceOf(Object),
  classes: PropTypes.instanceOf(Object),
  dialogForm: PropTypes.instanceOf(Object),
  dialogContent: PropTypes.func
};

MonthCalendar.defaultProps = {
  data: {},
  classes: {},
  dialogForm: {},
  dialogContent: () => {}
};

export default withStyles(styles)(MonthCalendar);
