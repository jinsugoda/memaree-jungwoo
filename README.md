# Memaree-App-V1


## Install

1. Install node and expo
2. Install ESLint by Microsoft and Prettier - Code formatter extensions on VS Code
3. In VS Code Settings, use Workspace settings by clicking Workspace Tab
4. expo install
5. Copy `environment.template.js` to `environment.js`
   - Fill in dev server values. Defaults should work but you may need to adjust the IP of your local host
6. Create a `.env` file and add the required env vars (see below)
7. expo start


# Building with Different Environments

You need to specify the release channel / profile, like so:

1. Development environment for Android:
```
eas build -p android --profile development
eas submit -p android --profile development
```

2. Staging environment for Android:
```
eas build -p android --profile staging
eas submit -p android --profile staging
```

3.  Development environment for iOS:
```
eas build -p ios --profile development
eas submit -p ios --profile development
```

4. Staging environment for iOS:
```
eas build -p ios --profile staging
eas submit -p ios --profile staging
```


