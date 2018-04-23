/* eslint-disable import/no-dynamic-require */

import fs from 'fs';
import path from 'path';
import { logEntry } from '../tracer';

const load_query = fname => ({
  query: fs.readFileSync(path.join(__dirname, fname)).toString(),
});

const tests = [
  {
    name: 'formats allFlights query',
    fixture: 'allFlights',
    rootQuery: 'allFlights',
  },
  {
    name: 'formats allLocations query',
    fixture: 'allLocations',
    rootQuery: 'allLocations',
  },
];

describe('logEntry', () => {
  tests.forEach(test => {
    const graphql = load_query(
      `./fixtures/${test.fixture}/${test.fixture}_graphql.txt`,
    );
    const spec = {
      input: {
        request: {
          definitions: require(`./fixtures/${test.fixture}/${
            test.fixture
          }_defs.json`),
          graphql,
        },
        metrics: require(`./fixtures/${test.fixture}/${
          test.fixture
        }_metrics.json`),
      },
      output: {
        rootQuery: test.rootQuery,
        graphql,
        metrics: require(`./fixtures/${test.fixture}/${
          test.fixture
        }_metrics.json`),
      },
    };
    it(test.name, () => {
      const entry = logEntry(spec.input);
      expect(entry).toEqual(spec.output);
    });
  });
});
