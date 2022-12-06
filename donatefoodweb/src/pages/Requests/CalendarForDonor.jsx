import React from 'react';
import { Eventcalendar } from '@mobiscroll/react';
import { Box } from '@mui/system';


const now = new Date();
const myEvents = [{
    start: '2022-12-06T09:00',
    end: '2022-12-09T18:00',
    title: 'Sujatha elders Home - Nikawaratiya',
    color: '#ff6d42'
}, {
    start: '2022-12-06T13:00',
    end: '2022-12-07T21:00',
    title: 'Mahamaya Elders home - Kandy',
    color: '#7bde83'
}, {
    start: '2022-12-13T13:00',
    end: '2022-12-14T21:00',
    title: 'Samadhi Childrens Home ',
    color: '#7bde83'
}, {
    start: '2022-12-06T08:00',
    end: '2022-12-06T09:00',
    title: 'Sumihiri Non Gov.Org.',
    color: '#913aa7'
}, {
    start: '2022-12-07T07:00',
    end: '2022-12-07T08:00',
    title: 'Prarthana Childrens home',
    color: '#6e7f29'
}, {
    start: '2022-12-05T08:45',
    end: '2022-12-05T10:00',
    title: 'Samadhi Childrens Home ',
    color: '#de3d83'
}, {
    start: '2022-12-08T09:30',
    end: '2022-12-08T10:30',
    title: 'Samadhi Childrens Home ',
    color: '#f67944'
}, {
    start: '2022-12-08T11:00',
    end: '2022-12-08T11:45',
    title: 'Samadhi Childrens Home ',
    color: '#a144f6'
}, {
    start: '2022-12-08T13:00',
    end: '2022-12-08T13:45',
    title: 'Kalutara Sumithuro Childrens home',
    color: '#00aabb'
}, {
    start: '2022-12-08T15:00',
    end: '2022-12-08T16:00',
    title: 'Panadura Base Hospital',
    color: '#a71111'
}, {
    recurring: {
        repeat: 'yearly',
        month: now.getMonth() + 1,
        day: 14
    },
    allDay: true,
    title: 'Dexter BD',
    color: '#37bbe4'
}, {
    recurring: {
        repeat: 'yearly',
        month: now.getMonth() + 1,
        day: 25
    },
    allDay: true,
    title: 'Luke BD',
    color: '#37bbe4'
}, {
    recurring: {
        repeat: 'weekly',
        weekDays: 'WE'
    },
    // allDay: true,
    // title: 'Employment (Semi-weekly)',
    // color: '#228c73'
}, {
    // start: '2022-12-10T00:00',
    // end: '2022-12-15T00:00',
    // allDay: true,
    // title: 'Sam OFF',
    // color: '#ca4747'
}, {
//     start: '2022-12-18T00:00',
//     end: '2022-12-29T00:00',
//     allDay: true,
//     title: 'Europe tour',
//     color: '#56ca70'
// }, {
//     start: '2022-02-07T00:00',
//     end: '2022-02-25T00:00',
//     allDay: true,
//     title: 'Dean OFF',
//     color: '#99ff33'
// }, {
//     start: '2022-03-05T00:00',
//     end: '2022-03-14T00:00',
//     allDay: true,
//     title: 'Mike OFF',
//     color: '#e7b300'
// }, {
//     start: '2022-05-07T00:00',
//     end: '2022-05-16T00:00',
//     allDay: true,
//     title: 'John OFF',
//     color: '#669900'
// }, {
//     start: '2022-06-01T00:00',
//     end: '2022-06-11T00:00',
//     allDay: true,
//     title: 'Carol OFF',
//     color: '#6699ff'
// }, {
//     start: '2022-07-02T00:00',
//     end: '2022-07-17T00:00',
//     allDay: true,
//     title: 'Jason OFF',
//     color: '#cc9900'
// }, {
//     start: '2022-08-06T00:00',
//     end: '2022-08-14T00:00',
//     allDay: true,
//     title: 'Ashley OFF',
//     color: '#339966'
// }, {
//     start: '2022-09-10T00:00',
//     end: '2022-09-20T00:00',
//     allDay: true,
//     title: 'Marisol OFF',
//     color: '#8701a9'
// }, {
//     start: '2022-10-01T00:00',
//     end: '2022-10-12T00:00',
//     allDay: true,
//     title: 'Sharon OFF',
//     color: '#cc6699'
// }, {
//     recurring: {
//         repeat: 'yearly',
//         month: 12,
//         day: 25
//     },
//     allDay: true,
//     title: 'Christmas Day',
//     color: '#ff0066'
// }, {
//     recurring: {
//         repeat: 'yearly',
//         month: 1,
//         day: 1
//     },
//     allDay: true,
//     title: 'New Year\'s day',
//     color: '#99ccff'
// }, {
//     recurring: {
//         repeat: 'yearly',
//         month: 4,
//         day: 1
//     },
//     allDay: true,
//     title: 'April Fool\'s Day',
//     color: '#ff6666'
// }, {
//     recurring: {
//         repeat: 'yearly',
//         month: 11,
//         day: 2
//     },
//     allDay: true,
//     title: 'File Form 720 for the third quarter',
//     color: '#147ea6'
// }, {
//     recurring: {
//         repeat: 'yearly',
//         month: 11,
//         day: 2
//     },
//     allDay: true,
//     title: 'File Form 730 and pay tax on wagers accepted during September',
//     color: '#a73a4e'
// }, {
//     recurring: {
//         repeat: 'yearly',
//         month: 11,
//         day: 2
//     },
//     allDay: true,
//     title: 'File Form 2290 and pay the tax for vehicles first used during September',
//     color: '#218e0d'
// }, {
//     recurring: {
//         repeat: 'yearly',
//         month: 11,
//         day: 2
//     },
//     allDay: true,
//     title: 'File Form 941 for the third quarter',
//     color: '#a67914'
// }, {
    // recurring: {
    //     repeat: 'yearly',
    //     month: 11,
    //     day: 2
    // },
    // allDay: true,
    // title: 'Deposit FUTA owed through Sep if more than $500',
    // color: '#3c0707'
}, {
    // recurring: {
    //     repeat: 'yearly',
    //     month: 11,
    //     day: 30
    // },
    // allDay: true,
    // title: 'Deposit payroll tax for payments on Nov 21-24 if the semiweekly deposit rule applies',
    // color: '#14a618'
}, {
    // recurring: {
    //     repeat: 'yearly',
    //     month: 11,
    //     day: 30
    // },
    // allDay: true,
    // title: 'File Form 730 and pay tax on wagers accepted during October',
    // color: '#722ac1'
},
{
    // recurring: {
    //     repeat: 'yearly',
    //     month: 11,
    //     day: 30
    // },
    // allDay: true,
    // title: 'File Form 2290 and pay the tax for vehicles first used during October',
    // color: '#256069'
}];

function CalendarForDonor() {
    const view = React.useMemo(() => {
        return {
            calendar: { labels: true }
        };
    }, []);

    return (
        <Box>
        <div className="calendarMargin">
        <Eventcalendar
            theme="ios" 
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            eventDelete={false}
            data={myEvents}
            view={view}
       /></div></Box>
    ); 
}
export default CalendarForDonor;
