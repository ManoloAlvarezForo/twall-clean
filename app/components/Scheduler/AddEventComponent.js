import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MomentUtils from '@date-io/moment';
import {
  InlineDatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from 'material-ui-pickers';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import { Query } from 'react-apollo';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { GET_APPLICANTS_BY_FILTER } from '../Applicants/ApplicantsQueries';
import SelectMultipleComponent from '../Select/SelectMultipleComponent';

const ItemWithAvatar = ({ avatar, title }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      {avatar.length === 1 ? (
        <Avatar style={{ width: 35, height: 35 }}>
          {avatar === '' && title[0]}
        </Avatar>
      ) : (
        <Avatar src={avatar} style={{ margin: 10, width: 35, height: 35 }} />
      )}
      <Typography style={{ margin: '0px 10px' }} variant="body1">
        {title}
      </Typography>
    </div>
  );
};

ItemWithAvatar.propTypes = {
  avatar: PropTypes.string,
  title: PropTypes.string
};

ItemWithAvatar.defaultProps = {
  avatar: '',
  title: 'None'
};

const CustomMenuItem = ({
  suggestion,
  itemAvatar: ItemAvatar,
  getItemProps
}) => {
  return (
    <MenuItem
      {...getItemProps({
        item: {
          name: `${suggestion.name} ${suggestion.lastName}`,
          id: suggestion.id
        }
      })}
      component="div"
    >
      <ItemAvatar
        avatar={suggestion.avatar}
        title={`${suggestion.name} ${suggestion.lastName}`}
      />
    </MenuItem>
  );
};

CustomMenuItem.propTypes = {
  suggestion: PropTypes.instanceOf(Object),
  itemAvatar: PropTypes.instanceOf(Object),
  getItemProps: PropTypes.func
};

CustomMenuItem.defaultProps = {
  suggestion: {},
  itemAvatar: {},
  getItemProps: () => {}
};

const Suggestions = ({ query, getItemProps, item: Item }) => {
  return (
    <Query
      query={GET_APPLICANTS_BY_FILTER}
      variables={{ query }}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        if (loading) return <div />;
        if (error) return `Error!: ${error}`;
        return data.applicantsByFilter.map(suggestion => {
          return (
            <Item
              key={suggestion}
              suggestion={suggestion}
              itemAvatar={ItemWithAvatar}
              getItemProps={getItemProps}
            />
          );
        });
      }}
    </Query>
  );
};

Suggestions.propTypes = {
  query: PropTypes.string,
  getItemProps: PropTypes.func,
  item: PropTypes.instanceOf(Object)
};

Suggestions.defaultProps = {
  query: '',
  getItemProps: () => {},
  item: {}
};

const AddEventComponent = props => {
  const fromTmp = moment();
  fromTmp.hour(8);
  fromTmp.minutes(0);

  const toTmp = moment();
  toTmp.hour(8);
  toTmp.minutes(30);
  const { selectedDate, setData } = props;
  const [date, setDate] = useState(selectedDate);
  const [timeFrom, setTimeFrom] = useState(fromTmp);
  const [timeTo, setTimeTo] = useState(toTmp);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState([]);

  const setTimeFromFunction = value => {
    setTimeFrom(value);
    setTimeTo(value.clone().minutes(30));
  };

  // TODO: Validate "Time TO" to set the "Time FROM"
  // const _setTimeTo = value => {
  //     setTimeFrom(value.clone().minutes(0));
  //     setTimeTo(value);
  // }

  useEffect(() => {
    const newData = {
      title,
      date: date.format('YYYY-MM-DD'),
      timeFrom: timeFrom.format('hh:mm A'),
      timeTo: timeTo.format('hh:mm A'),
      participants: participants.map(p => {
        return p.id;
      }),
      description
    };

    setData(newData);
  }, [title, date, timeTo, timeFrom, participants, description]);

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            style={{ margin: '5px' }}
            id="outlined-name"
            name="title"
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <div
            style={{ display: 'flex', flexDirection: 'row', margin: '5px 0' }}
          >
            <InlineDatePicker
              name="date"
              style={{ margin: '5px' }}
              keyboard
              clearable
              variant="outlined"
              label="Date"
              value={date}
              onChange={value => setDate(value)}
              format="MM-DD-YYYY"
            />
            <TimePicker
              style={{ margin: '5px' }}
              name="timeFrom"
              variant="outlined"
              showTodayButton
              todayLabel="now"
              label="From"
              value={timeFrom}
              minutesStep={5}
              onChange={value => setTimeFromFunction(value)}
              format="hh:mm A"
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                style={{ display: 'flex', alignItems: 'end' }}
              >
                -
              </Typography>
            </div>
            <TimePicker
              style={{ margin: '5px' }}
              name="timeTo"
              variant="outlined"
              showTodayButton
              todayLabel="now"
              label="To"
              value={timeTo}
              minutesStep={5}
              onChange={value => setTimeTo(value)}
            />
          </div>
          <SelectMultipleComponent
            placeHolder="Select Participants"
            label="Participants"
            suggestions={Suggestions}
            item={CustomMenuItem}
            setItems={setParticipants}
          />
          <TextField
            name="desciption"
            style={{ margin: '10px 5px' }}
            id="outlined-multiline-static"
            label="Description"
            multiline
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
            margin="normal"
            variant="outlined"
          />
        </div>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

AddEventComponent.propTypes = {
  selectedDate: PropTypes.string,
  setData: PropTypes.func
};

AddEventComponent.defaultProps = {
  selectedDate: '',
  setData: () => {}
};

export default AddEventComponent;
