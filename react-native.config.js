module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
  assets: ['./src/assets/fonts'],
};
