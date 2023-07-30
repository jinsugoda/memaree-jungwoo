import { LogBox } from 'react-native';

function checkSubstring(stringA, substrings) {
    return substrings.some((substring) => stringA.includes(substring));
}

function hasCommonString(array1, array2) {
    return array1.some((string) => array2.includes(string));
}

if (true) {
    const ignoreWarns = [
        'Non-serializable values were found in the navigation state.',
        'findNodeHandle was passed an instance of AnimatedComponent',
        'Please update the following components: AnimatedComponent',
        'Warning: findNodeHandle is deprecated in StrictMode',
    ];
    const variableIgnoreWarns = [
        'Please update the following components: %s',
        'Warning: %s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode',
    ];
    const ignoreVariables = ['AnimatedComponent', 'findNodeHandle', 'AnimatedComponent(View)'];
    const warn = console.warn;
    console.warn = (...arg) => {
        for (const warning of ignoreWarns) {
            if (arg && arg[0] && typeof arg[0] === 'string' && arg[0].startsWith(warning)) {
                return;
            }
        }
        warn(...arg);
    };
    const error = console.error;
    console.error = (...arg) => {
        const variables = JSON.stringify(arg);
        for (const warning of ignoreWarns) {
            if (arg && arg[0] && typeof arg[0] === 'string') {
                if (arg[0].includes(warning)) {
                    return;
                }
                if (
                    arg &&
                    arg.length > 1 &&
                    checkSubstring(JSON.stringify(arg[0]), variableIgnoreWarns)
                ) {
                    const argCopy = [...arg];
                    argCopy.shift();
                    if (hasCommonString(argCopy, ignoreVariables)) {
                        return;
                    }
                }
            }
        }
        error(...arg);
    };
    LogBox.ignoreLogs(ignoreWarns);
}
