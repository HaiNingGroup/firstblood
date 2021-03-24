const lunar = require('./calendar');




let birthday = lunar.calendar.lunar2solar(1992, 02, 04);


console.log(JSON.stringify(birthday) );