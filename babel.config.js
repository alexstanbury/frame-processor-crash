module.exports = {
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__labelImage'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
