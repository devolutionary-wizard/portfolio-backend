import expressListEndpoints from 'express-list-endpoints';
import { Application } from 'express';
import { logger } from './logger';
import { PORT } from '../constants';

export interface EndpointAttributes {
  path: string;
  methods: string[];
  middlewares: string[];
}

export const getEndPoints = (app: Application): EndpointAttributes[] => {
  return expressListEndpoints(app);
};

export function printEndpoints(app: Application): void {
  const endpoints = getEndPoints(app);
  logger.info('┌───────────────────────────────────────────────────────┐');
  logger.warn('│   Available Endpoints (HTTP Method | URL)  🚀        │');
  logger.info('└───────────────────────────────────────────────────────┘');
  const baseUrl = `http://localhost:${PORT}`;

  const methods2dArray = concatMethods(endpoints.slice(0, -1));
  const [longestMethods, len] = longestLength(methods2dArray);
  const longestPath = getlongestPath(endpoints);

  endpoints.forEach(endpoint => {
    if (endpoint.path !== '*') {
      const length = endpoint.methods.length;
      logger.info(`│  ${endpoint.methods.join(',')} │\t${baseUrl}${endpoint.path}\t│`);
    }
  });
  logger.info('└───────────────────────────────────────────────────────┘');
}

export const concatMethods = (endpoints: EndpointAttributes[]): string[][] => {
  const methods2dArray: string[][] = [];
  endpoints.forEach(endpoint => {
    methods2dArray.push(endpoint.methods);
  });
  return methods2dArray;
};

export const longestLength = (methods: string[][]): [number, number] => {
  let longest = 0;
  let len = 0;
  methods.forEach((method: string[]) => {
    const methodsLength = method.join('').length;
    if (methodsLength > longest) longest = methodsLength;
    if (method.length > len) len = method.length;
  });
  return [longest, len];
};

export const getlongestPath = (routes: EndpointAttributes[]): number => {
  return routes.reduce((acc, curr) => (acc > curr.path.length ? acc : curr.path.length), 0);
};
