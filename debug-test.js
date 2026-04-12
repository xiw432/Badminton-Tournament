import { getAllEligibleEvents } from './src/utils/events.js';

const dob = '2016-06-15';
const gender = 'Male';

const result = getAllEligibleEvents(dob, gender);
console.log('Result:', JSON.stringify(result, null, 2));
