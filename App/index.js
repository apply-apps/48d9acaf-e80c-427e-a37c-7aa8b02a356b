// Filename: index.js
// Combined code from all files

const { exec } = require('child_process');
const fs = require('fs');

const buildIOS = () => {
  console.log('Building for iOS...');
  exec('expo build:ios', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error building iOS: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Build stderr: ${stderr}`);
      return;
    }
    console.log(`Build stdout: ${stdout}`);
  });
};

const buildAndroid = () => {
  console.log('Building for Android...');
  exec('expo build:android', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error building Android: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Build stderr: ${stderr}`);
      return;
    }
    console.log(`Build stdout: ${stdout}`);
  });
};

const buildWithEAS = (platform) => {
  console.log(`Building for ${platform} using EAS...`);
  exec(`eas build --platform ${platform}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error building with EAS: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Build stderr: ${stderr}`);
      return;
    }
    console.log(`Build stdout: ${stdout}`);
  });
};

// Prepare your app
const prepareApp = () => {
  const appConfigPath = './app.json'; // or './app.config.js'
  if (!fs.existsSync(appConfigPath)) {
    console.error('App configuration file not found!');
    return;
  }
  const appConfig = require(appConfigPath);
  console.log('App configuration loaded:', appConfig);

  // Additional preparation code (e.g., checking icons, splash screens)
};

prepareApp();

// Build commands
// Uncomment the following lines to run builds
// buildIOS();
// buildAndroid();
// buildWithEAS('ios');
// buildWithEAS('android');

// Note: For the build with EAS commands, ensure that EAS CLI is installed and configured properly.