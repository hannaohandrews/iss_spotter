// index2.js

const { nextISSTimesForMyLocation } = require('./iss_promised');


  nextISSTimesForMyLocation () 
    .then((passTimes) => {
      printPassTimes(passTimes);
    })
    .catch((error) => {
      console.log("Not worked", error.message)
    });