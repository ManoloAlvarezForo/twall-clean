import gql from 'graphql-tag';

/**
 * GraphQL Query to gets the Calendar Events by a month and locale params from the Server.
 */
export const GET_EVENTS_BY_MONTH = gql`
  query getCalendarEventsByMonth(
    $month: String
    $year: String
    $locale: String
  ) {
    calendarEventsByMonth(month: $month, year: $year, locale: $locale) {
      date
      events {
        id
        title
        timeFrom
      }
    }
  }
`;
/**
 * GraphQL Query to gets Calendar Events by a date from and a date to with format "YYYY-MM-DD" from the Server.
 */
export const GET_EVENTS_BY_DATE = gql`
  query getEventsByDate($from: String, $to: String) {
    eventsByDate(from: $from, to: $to) {
      date
      events {
        id
        title
        date
        timeFrom
        timeTo
      }
    }
  }
`;
/**
 * GraphQL Query to gets an Calendar Event by a Event Id from the Server
 */
export const GET_EVENT_BY_ID = gql`
  query getEventById($id: String) {
    eventById(id: $id) {
      title
      date
      timeFrom
      timeTo
      participants
      description
    }
  }
`;
