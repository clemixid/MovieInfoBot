const assert = require('assert');
const nock = require('nock');
const OMDbApiCaller = require('../index');

describe('OMDb Api Call known', () => {
  beforeEach(() => {
    const batmanBody = { Title: 'Batman', Year: '1989' };
    nock('http://www.omdbapi.com').get(() => true).reply(200, batmanBody);
  });
  it('give info on a movie known', (done) => {
    const batmanMock = { body: { queryResult: { parameters: { 'movie-title': 'batman' } } } };
    const mockOut = { res: '', json(o) { assert(o.fulfillmentText.slice(0, 12) === 'Batman(1989)'); done(); } };
    OMDbApiCaller.dialogflowFirebaseFulfillment(batmanMock, mockOut);
  });
});

describe('OMDb Api Call unknown', () => {
  beforeEach(() => {
    const unknownBody = { Title: undefined };
    nock('http://www.omdbapi.com').get(() => true).reply(200, unknownBody);
  });
  it('give info on a movie unknown', (done) => {
    const unknownMock = { body: { queryResult: { parameters: { 'movie-title': '' } } } };
    const mockOut = { res: '', json(o) { assert(o.fulfillmentText.slice(0, 5) === 'Sorry'); done(); } };
    OMDbApiCaller.dialogflowFirebaseFulfillment(unknownMock, mockOut);
  });
});
