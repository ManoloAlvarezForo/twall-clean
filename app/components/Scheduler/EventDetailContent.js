import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { FiClock } from 'react-icons/fi';
import { MdDescription, MdFiberManualRecord } from 'react-icons/md';
import PropTypes from 'prop-types';
import { GET_EVENT_BY_ID } from './EventQueries';

const EventDetailQuery = ({ id }) => {
  return (
    <Query
      query={GET_EVENT_BY_ID}
      variables={{ id }}
      skip={id === ''}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (loading) return <div />;
        if (error) {
          return <div>{`Message [${error}]`}</div>;
        }

        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '10px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'flex-start',
                  marginRight: '20px'
                }}
              >
                <MdFiberManualRecord
                  style={{ fontSize: '22px', marginTop: '3px' }}
                  color="#afafaf"
                />
              </div>
              <div>
                <Typography variant="h5">{data.eventById.title}</Typography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '10px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'flex-start',
                  marginRight: '20px'
                }}
              >
                <FiClock
                  style={{ fontSize: '22px', marginTop: '3px' }}
                  color="#afafaf"
                />
              </div>
              <div>
                <Typography variant="subtitle1">
                  {moment(data.eventById.date).format('dddd')}{' '}
                  {moment(data.eventById.date).format('MMMM DD YYYY')}{' '}
                  {data.eventById.timeFrom} - {data.eventById.timeTo}
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '10px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'flex-start',
                  marginRight: '20px'
                }}
              >
                <MdDescription
                  style={{ fontSize: '22px', marginTop: '3px' }}
                  color="#afafaf"
                />
              </div>
              <div>
                <Typography variant="body2">
                  {data.eventById.description}
                </Typography>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

const EventDetailContent = ({ data: calendarEvent }) => {
  return <EventDetailQuery id={calendarEvent.id} />;
};

EventDetailQuery.propTypes = {
  id: PropTypes.string
};

EventDetailQuery.defaultProps = {
  id: ''
};

EventDetailContent.propTypes = {
  data: PropTypes.instanceOf(Object)
};

EventDetailContent.defaultProps = {
  data: {}
};

export default EventDetailContent;
