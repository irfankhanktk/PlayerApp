module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          "@components": "./src/components",
          "@navigation": "./src/navigation",
          "@config": "./src/config",
          "@assets": "./src/assets",
          "@hooks": "./src/hooks",
          "@screens": "./src/screens",
          "@services": "./src/services",
          "@store": "./src/store",
          "@translation": "./src/translation",
          "@types": "./src/types",
          "@typography": "./src/typography",
          "@utils": "./src/utils",
        }
      }
    ]
  ],
};
