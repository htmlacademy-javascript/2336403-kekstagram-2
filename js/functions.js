import {rndmIntgrGen} from './utils.js';

const testStartDaySet = ['08:00', '8:12', '14:00', '8:00', '12:0'];
const testEndDaySet = ['17:30', '10:0', '14:30', '18:00'];
const testMeetingStartSet = ['14:00', '8:0', '14:30', '16:00'];
const testDurationSet = [90, 120, 30, 60];


const chekWorkMeeting = (workDayStart, workDayEnd, meetingStart, meetingDuration) => {
  const timeStart = workDayStart.split(':');
  const timeEnd = workDayEnd.split(':');
  const meetingTimeStart = meetingStart.split(':');
  const workDayStartInMinutes = Number(timeStart[0] * 60) + Number(timeStart[1]);
  const workDayEndInMinutes = Number(timeEnd[0] * 60) + Number(timeEnd[1]);
  const workMeetingStartInMinutes = Number(meetingTimeStart[0] * 60) + Number(meetingTimeStart[1]);
  const workMeetingEndInMinutes = workMeetingStartInMinutes + meetingDuration;
  return ((workMeetingStartInMinutes >= workDayStartInMinutes) && (workMeetingEndInMinutes <= workDayEndInMinutes));
};

function mockChekWorkMeeting (testQuantity) {
  for (let i = 0; i <= testQuantity; i++) {
    const a = testStartDaySet[rndmIntgrGen(0, testStartDaySet.length - 1)];
    const b = testEndDaySet[rndmIntgrGen(0, testEndDaySet.length - 1)];
    const c = testMeetingStartSet[rndmIntgrGen(0, testMeetingStartSet.length - 1)];
    const d = testDurationSet[rndmIntgrGen(0, testDurationSet.length - 1)];
    window.console.log('Время начала рабочего дня: ', a, '\nВремя конца рабочего дня: ', b,'\nВремя начала рабочей встречи: ', c,'\nПродолжительность рабочей встречи ', d);
    window.console.log('Успеваем: ', chekWorkMeeting (a, b, c, d));
  }
}

mockChekWorkMeeting(16);
