const assert = require('assert');
const OMDbApiCaller = require('../index');

describe('OMDb Api Call known', () => {
  it('give info on a movie known', (done) => {
    const batmanMock = { body: { queryResult: { parameters: { 'movie-title': 'batman' } } } };
    const mockOut = { res: '', json(o) { assert(o.fulfillmentText.slice(0, 12) === 'Batman(1989)'); done(); } };
    OMDbApiCaller.dialogflowFirebaseFulfillment(batmanMock, mockOut);
  });
});

describe('OMDb Api Call unknown', () => {
  it('give info on a movie unknown', (done) => {
    const unknownMock = { body: { queryResult: { parameters: { 'movie-title': '' } } } };
    const mockOut = { res: '', json(o) { assert(o.fulfillmentText.slice(0, 5) === 'Sorry'); done(); } };
    OMDbApiCaller.dialogflowFirebaseFulfillment(unknownMock, mockOut);
  });
});
