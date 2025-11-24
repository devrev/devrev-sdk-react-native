const path = require('path');
const pak = require('./package.json');

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  dependencies: {
    '@devrev/sdk-react-native': {
      root: path.join(__dirname, '../..'),
    },
  },
};
