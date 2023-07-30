declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const ENV: string;
  export const GRAPHQL_ENDPOINT_URL: string;
  export const S3_URL: string;
  export const SENTRY_DSN_URL: string;
}
