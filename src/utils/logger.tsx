/* REUSABLE LOGGER CLASS */

import * as Sentry from 'sentry-expo';

// Error Type Enum
export enum ErrorType {
    APOLLO_CLIENT_NETWORK = 'APOLLO_CLIENT_NETWORK',
    APOLLO_CLIENT_GRAPHQL = 'APOLLO_CLIENT_GRAPHQL',
    APOLLO_SERVER = 'APOLLO_SERVER',
    COGNITO = 'COGNITO',
    MEDIA = 'MEDIA',
    REDUX = 'REDUX',
    REQUEST = 'REQUEST',
    OTHER = 'OTHER',
}

class ApolloClientNetworkError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApolloClientNetworkError.prototype);
    }
}

class ApolloClientGraphQLError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApolloClientGraphQLError.prototype);
    }
}

class ApolloServerError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApolloServerError.prototype);
    }
}

class CognitoError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CognitoError.prototype);
    }
}

class MediaError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, MediaError.prototype);
    }
}

class ReduxError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ReduxError.prototype);
    }
}

class RequestError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RequestError.prototype);
    }
}

class OtherError extends Error {
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, OtherError.prototype);
    }
}

const returnError = (errorType: string) => {
    switch (errorType) {
        case ErrorType.APOLLO_CLIENT_NETWORK:
            return ApolloClientNetworkError;
        case ErrorType.APOLLO_CLIENT_GRAPHQL:
            return ApolloClientGraphQLError;
        case ErrorType.APOLLO_SERVER:
            return ApolloServerError;
        case ErrorType.COGNITO:
            return CognitoError;
        case ErrorType.MEDIA:
            return MediaError;
        case ErrorType.REDUX:
            return ReduxError;
        case ErrorType.REQUEST:
            return RequestError;
        case ErrorType.OTHER:
            return OtherError;
        default:
            return Error;
    }
};

export default function Logger(
    errorType: string,
    componentName: string,
    error: Error,
    fileName: string,
    lineNumber: number = 0,
    statusCode: number = 0,
    description: string = '',
    requestOptions: any = null,
    endpoint: string = '',
    extraData: any = null,
) {
    const err = returnError(errorType);
    Sentry.Native.captureException(
        new err(
            `${errorType} ERROR: ${componentName} - ${error.message}... \n\n` +
                `STATUS CODE: ${statusCode} \n\n` +
                `FILE: ${fileName} \n\n` +
                `LINE: ${lineNumber} \n\n` +
                `STACK: ${error.stack}`,
        ),
        {
            extra: {
                errorType,
                componentName,
                errorMessage: error.message,
                fileName,
                lineNumber,
                statusCode,
                errorStack: error.stack,
                description,
                requestOptions,
                endpoint,
                extraData: { data: JSON.stringify(extraData) },
            },
        },
    );
}
