import moment from 'moment';

const DEAFAULT_DAYS_PER_MONTH = 35;

export const getStartAndEndDateFromMonth = (
  month,
  year,
  locale = moment().locale(),
  daysPerMonth = DEAFAULT_DAYS_PER_MONTH
) => {
  const now = moment();
  now.locale(locale);
  now.set('month', month);
  now.set('year', year);
  const myMoment = now.clone().set({ date: 1 });
  const daysInMonth = myMoment.daysInMonth();
  const weekDay = parseInt(myMoment.format('d'), 10);
  const startDate = myMoment.subtract(weekDay, 'days');
  const otherMoment = now.set({ date: daysInMonth });
  const endDate = otherMoment.add(daysPerMonth - daysInMonth - weekDay, 'days');

  return {
    startDate,
    endDate
  };
};

export const getDatesFromToByMonth = (month, year, locale, daysPerMonth) => {
  const list = [];
  const calculatedStartAndEndDateValues = getStartAndEndDateFromMonth(
    month,
    year,
    locale,
    daysPerMonth
  );
  let { startDate } = calculatedStartAndEndDateValues;
  const { endDate } = calculatedStartAndEndDateValues;

  while (!moment(startDate).isAfter(endDate)) {
    list.push(startDate.clone());
    startDate = startDate.add(1, 'days');
  }

  return list;
};

export const getWeekData = (startDate, endDate) => {
  const weekHoursList = getWeekHours();
  const weekDays = getDaysByStartDateAndEndDate(startDate, endDate);
  const response = [];
  for (let index = 0; index < weekHoursList.length; index += 1) {
    response.concat(
      weekDays.map(w => {
        return { hour: weekHoursList[index], day: w, index };
      })
    );
  }

  return response;
};

export const getWeekHours = () => {
  const timeA = [
    '12a',
    '1a',
    '2a',
    '3a',
    '4a',
    '5a',
    '6a',
    '7a',
    '8a',
    '9a',
    '10a',
    '11a'
  ];
  const timeP = [
    '12p',
    '1p',
    '2p',
    '3p',
    '4p',
    '5p',
    '6p',
    '7p',
    '8p',
    '9p',
    '10p',
    '11p'
  ];
  const response = [...timeA, ...timeP];

  return response;
};

export const getDaysByStartDateAndEndDate = (startDate, endDate) => {
  const response = [];
  let startDateTemp = startDateTemp;
  while (!moment(startDateTemp).isAfter(endDate)) {
    response.push(startDateTemp.clone());
    startDateTemp = startDateTemp.add(1, 'days');
  }

  return response;
};

export const getWeekDaysHeaderTitles = date => {
  const tempMoment = moment;
  tempMoment.locale(date.locale());
  const weekShort = tempMoment.weekdaysShort();
  // Show the week names for the moment is not used
  // let weekDays = moment.weekdays();
  const response = [];
  let startDate = date.weekday(0);

  for (let index = 0; index < 7; index += 1) {
    const headerDayTitle = startDate.format('D');
    response.push(
      `${
        headerDayTitle === 1
          ? `${startDate.format('MMM')} ${headerDayTitle}`
          : headerDayTitle
      } ${weekShort[index]}`
    );
    startDate = startDate.add(1, 'days');
  }

  return response;
};

export const getWeekOptionsLabel = date => {
  const startDate = date.clone().weekday(0);
  const endDate = date.clone().weekday(6);

  return {
    startDate,
    endDate
  };
};
