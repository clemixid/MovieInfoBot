/* @flow */

const request = require('request');
const functions = require('firebase-functions');

const host = 'http://www.omdbapi.com';
const OMDbApiKey = '<ENTER_OMDb_API_KEY_HERE>';

/**
 * a call to the external API OMDb to get the movie infos
 * @param {string} title - the title of the movie
 * @return {Promise} the output text
 */
function callOMDbApi(title) {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the movie infos
    const path = `/?apikey=${OMDbApiKey}&t=${encodeURIComponent(title)}`;

    // Make the HTTP request
    request(host + path, { json: true }, (err, res, body) => {
      if (err || body.Title === undefined) {
        reject();
      }
      // Resolve the promise with the output text
      const output = `${body.Title}(${body.Year}): ${body.Plot}`;
      resolve(output);
    });
  });
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  // Get the title and date from the request
  const title = req.body.queryResult.parameters['movie-title'];
  // Call the OMDb API
  callOMDbApi(title).then((output) => {
    res.json({ fulfillmentText: output });
  }).catch(() => {
    res.json({ fulfillmentText: "Sorry, I don't know this movie (misspelled?). Be sure to give the english title." });
  });
});


callOMDbApi('batman');
