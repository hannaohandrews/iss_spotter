/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
//{"ip":"50.92.221.80"}

const request = require("request");

// const request = require('request');

// // const fetchMyIP = function(callback) {
// //   // use request to fetch IP address from JSON API
// //   request('https://api.ipify.org?format=json', function(error, response, body) {
// //     // inside the request callback ...
// //     // error can be set if invalid domain, user is offline, etc.
// //     if (error) {
// //       callback(error, null);
// //       return;
//     // }

//     const fetchCoordsByIP = function (ip,callback) {
//       request (`https://ipvigilante.com/json/${ip}`, function(error,response,body){
//         if (error) {
//           callback(error, null);
//           return;
//       }
    
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching IP.: ${body}`), null);
//       return;
//     }

//     if (response.statusCode === 400) {
//       const msg = `It didn't work! Error: Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
    
//     // if it passes, give ip
//     const { latitude, longitutde } = JSON.parse(body).data;

//     callback(null, { latitude, longitutde });
//   });

// };


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
const url = `http://api.open-notify.org/iss-now.json?lat=${coords.latitude}&lon=${coords.longitude}`
  request ( url, function(error,response,body){
    if (error){
      callback(error,null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP.: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response
    callback(null, passes)

  })
};

const request = require('request');

// ... other three functions not included in solution ...

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.
module.exports = { nextISSTimesForMyLocation };






module.exports = { fetchMyIP ,fetchCoordsByIP, fetchISSFlyOverTimes ,nextISSTimesForMyLocation };
