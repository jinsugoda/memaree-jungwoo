export const SENTRY_DSN =
    'https://f8f06ca572f14b0aa1f7293bee66cdea@o4505332125007872.ingest.sentry.io/4505332152532992';
import * as Updates from 'expo-updates';
import { ENV, GRAPHQL_ENDPOINT_URL, S3_URL } from '@env';
console.log('ENV', ENV);
import { Platform } from 'react-native';
const HOST = 'host';
const LOCALHOST = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
const HTTP = 'http';
const HTTPS = 'https';
const PORT = 'port';
const PORT_8000 = '8000';
const ENV_VARS = {
    dev: { apiUrl: `${HTTP}://${LOCALHOST}:${PORT_8000}` },
    staging: { apiUrl: `${HTTPS}://${HOST}:${PORT}` },
    prod: { apiUrl: `${HTTPS}://${HOST}:${PORT}` },
};
const getEnvVars = () => {
    if (ENV === 'dev') {
        return ENV_VARS.dev;
    } else if (ENV === 'staging') {
        return ENV_VARS.staging;
    } else if (ENV === 'prod') {
        return ENV_VARS.prod;
    }
    return ENV_VARS.prod;
};
const { apiUrl } = getEnvVars();
export const API_ROOT_URL = apiUrl + '/api/';
export const API_AUTH_URL = API_ROOT_URL + 'auth/';
export const API_SIGNUP_URL = API_AUTH_URL + 'signup/';
export const API_GET_USER_URL = API_AUTH_URL + 'user/';
export const API_TOKEN_URL = API_AUTH_URL + 'login/';
export const API_LOGOUT_URL = API_AUTH_URL + 'logout/';
export const SECURE_STORE_TOKEN_KEY = 'MemareeAuthToken';
export const DEV_CAMERA_API_ENDPOINT =
    'https://kq7erzzw2m.execute-api.us-east-1.amazonaws.com/default/uploadPhoto';
export const STAGE_CAMERA_API_ENDPOINT =
    'https://kq7erzzw2m.execute-api.us-east-1.amazonaws.com/stage/uploadPhoto';
export const PROD_CAMERA_API_ENDPOINT =
    'https://kq7erzzw2m.execute-api.us-east-1.amazonaws.com/prod/uploadPhoto';
export const DEV_CAMERA_VIDEO_API_ENDPOINT =
    'https://wmj9rh65c7.execute-api.us-east-1.amazonaws.com/default/uploadVideo';
export const STAGE_CAMERA_VIDEO_API_ENDPOINT =
    'https://wmj9rh65c7.execute-api.us-east-1.amazonaws.com/stage/uploadVideo';
export const PROD_CAMERA_VIDEO_API_ENDPOINT =
    'https://wmj9rh65c7.execute-api.us-east-1.amazonaws.com/prod/uploadVideo';
export const MEMAREE_URL = 'https://www.memaree.com';
const DEV_GRAPHQL_ENDPOINT =
    'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/exploring-mongo-yorny/graphql';
const STAGE_GRAPHQL_ENDPOINT =
    'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/memaree-stg-tqcsi/graphql';
const PROD_GRAPHQL_ENDPOINT =
    'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/memaree-prd-dxjyj/graphql';
export const ENVIRONMENT_NAME = Updates.releaseChannel;
// LOCAL STAGE:
//export const ENVIRONMENT_NAME = 'staging';
// const getEnvVars2 = (env = Constants.manifest.releaseChannel) => {
const getEnvVars2 = (env = Updates.releaseChannel) => {
    // LOCAL STAGE:
    //env = 'staging';
    var ENVIRONMENT = ENV;
    var GRAPHQL_ENDPOINT = GRAPHQL_ENDPOINT_URL;
    var CAMERA_API_ENDPOINT = DEV_CAMERA_API_ENDPOINT;
    var MEMAREE_AVATARS_BUCKET = 'https://memareeavatars.s3.amazonaws.com/';
    var CAMERA_VIDEO_API_ENDPOINT = DEV_CAMERA_VIDEO_API_ENDPOINT;
    if (env === undefined || env === 'default' || env === 'dev' || env === 'development') {
        ENVIRONMENT = 'dev';
        GRAPHQL_ENDPOINT = DEV_GRAPHQL_ENDPOINT;
        CAMERA_API_ENDPOINT = DEV_CAMERA_API_ENDPOINT;
        CAMERA_VIDEO_API_ENDPOINT = DEV_CAMERA_VIDEO_API_ENDPOINT;
    } else if (env.indexOf('prd') !== -1 || env === 'production') {
        ENVIRONMENT = 'prd';
        GRAPHQL_ENDPOINT = PROD_GRAPHQL_ENDPOINT;
        CAMERA_API_ENDPOINT = PROD_CAMERA_API_ENDPOINT;
        MEMAREE_AVATARS_BUCKET = 'https://memareeavatars-prd.s3.amazonaws.com/';
        CAMERA_VIDEO_API_ENDPOINT = PROD_CAMERA_VIDEO_API_ENDPOINT;
    } else if (env.indexOf('stg') !== -1 || env === 'staging') {
        ENVIRONMENT = 'stg';
        GRAPHQL_ENDPOINT = STAGE_GRAPHQL_ENDPOINT;
        CAMERA_API_ENDPOINT = STAGE_CAMERA_API_ENDPOINT;
        MEMAREE_AVATARS_BUCKET = 'https://memareeavatars-stg.s3.amazonaws.com/';
        CAMERA_VIDEO_API_ENDPOINT = STAGE_CAMERA_VIDEO_API_ENDPOINT;
    }
    return {
        ENVIRONMENT,
        GRAPHQL_ENDPOINT,
        CAMERA_API_ENDPOINT,
        MEMAREE_AVATARS_BUCKET,
        CAMERA_VIDEO_API_ENDPOINT,
    };
};
export const VIDEO_API_KEY = 'teTLHoPPlj6aCDnQIln0K7Jf8hlSpkLC2qxgsqGP';
export const {
    ENVIRONMENT,
    GRAPHQL_ENDPOINT,
    CAMERA_API_ENDPOINT,
    MEMAREE_AVATARS_BUCKET,
    CAMERA_VIDEO_API_ENDPOINT,
} = getEnvVars2();
export const S3_IMAGE_URL = S3_URL;
// export const ENVIRONMENT_NAME = Constants.expoConfig.extra.ENVIRONMENT_NAME ?? 'dev';
// export const GRAPHQL_URL = Constants.expoConfig.extra.GRAPHQL_URL ?? thing;
//export const GRAPHQL_ENDPOINT = GRAPHQL_URL;
const env_suffix_lowercase = ENVIRONMENT_NAME.toLowerCase();
export const VERSION = `1.0.0-${env_suffix_lowercase}-${ENVIRONMENT}`;
export const FILE_UPLOAD_API_KEY = 'BNxAlayR5v1HgdqKeTG4266PCTKztaL65SToUw0r';
export const TEST_VAR = process.env.TEST === undefined ? 'UNDEFINED' : process.env.TEST;
