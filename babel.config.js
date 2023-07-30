module.exports = function (api) {
 api.cache(true);
 return {
   presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
   plugins: [
     [
       "module:react-native-dotenv",
       {
         envName: "APP_ENV",
         moduleName: "@env",
         path: ".env",
         blocklist: null,
         allowlist: null,
         safe: false,
         allowUndefined: false,
         verbose: false
       },
     ],
     [
       "@simbathesailor/babel-plugin-use-what-changed",
       {
         "active": process.env.NODE_ENV === "development" // boolean
       }
     ],
   //   'transform-inline-environment-variables',
     [
       'module-resolver',
       {
         root: ['./src'],
         extensions: [
           '.ios.ts',
           '.android.ts',
           '.ts',
           '.ios.tsx',
           '.android.tsx',
           '.tsx',
           '.jsx',
           '.js',
           '.json',
           '.png',
           '.svg'
         ],
         alias: {
           "assets": "./assets",
         }
       },
     ],
     "react-native-reanimated/plugin", // Must come last
   ]
 };
};

