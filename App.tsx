// THIS GESTURE IMPORT MUST COME FIRST:
import 'react-native-gesture-handler';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as Sentry from 'sentry-expo';
import { Amplify } from 'aws-amplify';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// configs
import apolloClient from './apollo';
import awsconfig from './src/aws-exports';
import awsconfigStaging from './src/aws-exports-stg';
import awsconfigProduction from './src/aws-exports-prd';
import './ignoreWarnings';

// redux store
import { store } from './src/store/store';

// main navigator
import MainNavigator from './src/MainNavigator';

// 1st party providers
import { MediaProvider } from './src/hooks/useMedia';
import { ProvideAuth } from './src/hooks/useAuth';

// styles
import darkTheme from './src/styles/theme/darkTheme';
import defaultTheme from './src/styles/theme/defaultTheme';

// Don't delete, global icon import.
import './src/utils/iconsLibrary';

// constants
import { ENVIRONMENT_NAME, SENTRY_DSN } from './environment';

Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT_NAME,
});

if (ENVIRONMENT_NAME === 'staging') {
    //Sentry.setRelease('staging');
    Amplify.configure(awsconfigStaging);
} else if (
    ENVIRONMENT_NAME === 'prd' ||
    ENVIRONMENT_NAME === 'prod' ||
    ENVIRONMENT_NAME === 'production'
) {
    //Sentry.setRelease('production');
    Amplify.configure(awsconfigProduction);
} else {
    Amplify.configure(awsconfig);
}

// Change this value between "light" and "dark"
let selectedTheme = 'dark';

function App() {
    const [fontsLoaded] = useFonts({
        'Outfit-Bold': require('./assets/fonts/Outfit-Bold.ttf'),
        Outfit: require('./assets/fonts/Outfit-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <>
            <StrictMode>
                <MediaProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <Provider store={store}>
                            <ApolloProvider client={apolloClient}>
                                <ProvideAuth>
                                    <PaperProvider
                                        theme={selectedTheme === 'dark' ? darkTheme : defaultTheme}
                                    >
                                        <NavigationContainer
                                            theme={
                                                selectedTheme === 'dark' ? darkTheme : defaultTheme
                                            }
                                        >
                                            <MainNavigator />
                                        </NavigationContainer>
                                    </PaperProvider>
                                </ProvideAuth>
                            </ApolloProvider>
                        </Provider>
                    </GestureHandlerRootView>
                </MediaProvider>
            </StrictMode>
            <Toast />
        </>
    );
}
export default App;
