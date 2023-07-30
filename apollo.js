import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, Observable } from '@apollo/client';
import { Auth } from 'aws-amplify';

// links
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// utils
import Logger, { ErrorType } from './src/utils/logger';

// env constants
import { GRAPHQL_ENDPOINT } from './environment';

// cached in memory access token
let inMemoryToken;

const unauthenticatedErrorLink = onError(
    ({ graphQLErrors, networkError, operation, forward, response }) => {
        if (networkError && networkError.statusCode === 401) {
            try {
                if (networkError && networkError.statusCode === 401) {
                    // unauthenticated. token expired. Re-fetch token using refresh token
                    console.warn('Refreshing token and trying again');
                    // get new token and set inMemoryToken
                    return promiseToObservable(
                        new Promise((resolve, reject) =>
                            Auth.currentSession().then((refreshedSession) => {
                                const token = refreshedSession.getIdToken().getJwtToken();
                                // console.log(inMemoryToken)
                                inMemoryToken = token;
                                resolve();
                            }),
                        ),
                    ).flatMap(() => forward(operation));
                }
            } catch (err) {
                console.log('failed to re-fetch token err: ', err);
                Auth.signOut();
            }
        } else {
            if (networkError) {
                Logger(
                    ErrorType.APOLLO_CLIENT_NETWORK,
                    'COMPONENT NAME UNAVAILABLE',
                    networkError,
                    'FILE NAME UNAVAILABLE',
                    0,
                    networkError.statusCode,
                    'APOLLO CLIENT NETWORK ERROR',
                    null,
                    'NO ENDPOINT',
                );
            } else {
                Logger(
                    ErrorType.APOLLO_CLIENT_GRAPHQL,
                    'COMPONENT NAME UNAVAILABLE',
                    graphQLErrors,
                    'FILE NAME UNAVAILABLE',
                    0,
                    0,
                    'APOLLO CLIENT GRAPHQL ERROR',
                    null,
                    'NO ENDPOINT',
                    // GRAPHQL ERRORS [{"message":"{\"message\":\"whoooooops!\",\"name\":\"Error\"}","locations":[{"line":2,"column":3}],"path":["getPosts"]}]
                    // OPERATION {"variables":{"input":{"limit":20}},"extensions":{},"operationName":"GetPosts","query":{"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPostsQueryInput"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"profilePicUrl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}],"loc":{"start":0,"end":474}}}
                    // RESPONSE {"data":{"getPosts":null},"errors":[{"message":"{\"message\":\"whoooooops!\",\"name\":\"Error\"}","locations":[{"line":2,"column":3}],"path":["getPosts"]}]}
                    {
                        graphQLErrors: graphQLErrors,
                        opeartion: operation,
                        response: response,
                    },
                );
            }
        }
    },
);

const setAuthorizationLink = setContext((request, previousContext) => {
    // if you have a cached value return immediately
    // console.log("cached token: ",inMemoryToken)
    if (inMemoryToken) return _buildAuthHeader(inMemoryToken);
    return Auth.currentSession().then((refreshedSession) => {
        const token = refreshedSession.getIdToken().getJwtToken();
        inMemoryToken = token;
        return _buildAuthHeader(inMemoryToken);
    });
});

const apolloClient = new ApolloClient({
    link: ApolloLink.from([
        // handle auth error + auth header middleware
        ApolloLink.from([unauthenticatedErrorLink, setAuthorizationLink]),
        // http request middleware
        new HttpLink({ debug: true, uri: GRAPHQL_ENDPOINT }),
    ]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getPosts: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                    circlePosts: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                    visionPosts: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                    getCircleAndVisionFlipsidePosts: {
                        merge(existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
});

apolloClient.onResetStore(() => {
    inMemoryToken = '';
});

export default apolloClient;

const _buildAuthHeader = (token) => {
    return {
        headers: {
            'content-type': 'application/json',
            jwtTokenString: token,
        },
    };
};

const promiseToObservable = (promise) =>
    new Observable((subscriber) => {
        promise.then(
            (value) => {
                if (subscriber.closed) return;
                subscriber.next(value);
                subscriber.complete();
            },
            (err) => subscriber.error(err),
        );
    });

// referenced from https://blog.benclmnt.com/blog/apollo-auth/#final-code
