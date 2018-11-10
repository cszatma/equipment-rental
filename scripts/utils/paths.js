'use strict';

const fs = require('fs');
const path = require('path');

// Resolve paths relative to the root project directory
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('build'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appIndex: resolveApp('src/index'),
  appNodeModules: resolveApp('node_modules'),
  yarnLockFile: resolveApp('yarn.lock'),
  appTsBuildConfig: resolveApp('tsconfig.build.json'),
  appTsConfig: resolveApp('tsconfig.json'),
  appBuildClient: resolveApp('build/client'),
  appClient: resolveApp('client'),
  appClientBuild: resolveApp('client/build'),
  clientPackageJson: resolveApp('client/package.json'),
  reactScripts: resolveApp(
    'client/node_modules/@cszatma/react-scripts-ts/scripts',
  ),
};
