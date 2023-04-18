import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const getDateObj = (
  time = '00:00:00',
  date = dayjs().format('DD/MM/YYYY')
) => {
  return dayjs(date + ' ' + time, 'DD/MM/YYYY HH:mm:ss');
};

export const generateTimeSlots = (
  startTime = '09:00:00',
  endTime = '14:00:00',
  timeBlock = 15
) => {
  const sDate = getDateObj(startTime);
  const eDate = getDateObj(endTime);
  const blocks = eDate.diff(sDate, 'm') / timeBlock;
  const timeBlocks = Array(Math.ceil(blocks))
    //   const timeBlocks = Array(blocks)
    .fill(0)
    .map((_, i) => {
      const sTime = sDate.add(i * timeBlock, 'm');
      const eTime = sTime.add(timeBlock, 'm');
      return {
        startTime: sTime.format('HH:mm:ss'),
        endTime: eTime.format('HH:mm:ss'),
        header: sTime.format('HH:mm') + ' - ' + eTime.format('HH:mm'),
      };
    });

  //console.log('timeBlocks: ', timeBlocks);
  return timeBlocks;
};
