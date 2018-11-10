'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const spawnSync = require('child_process').spawnSync;
const fs = require('fs-extra');

const paths = require('./utils/paths');
const checkChildStatus = require('./utils/checkChildStatus');

const args = process.argv.slice(2);

// Setup useful variables

// Parse args
const includesServer = args.includes('server');
const includesClient = args.includes('client');

const stdio = args.includes('--no-output') ? 'ignore' : 'inherit';

// If no selection is specified build both
const buildAll = includesServer === includesClient;
const buildServer = buildAll || includesServer || !includesClient;
const buildClient = buildAll || includesClient;

/* Start build process */

console.log(chalk.cyan('Build started.'));

// Make sure the build directory exists and it is empty
fs.ensureDirSync(paths.appBuild);
fs.emptyDirSync(paths.appBuild);

if (buildServer) {
  console.log(`\nBuilding ${chalk.cyan('server')}...\n`);

  // Run transpiler
  const result = spawnSync(
    require.resolve('typescript/bin/tsc'),
    ['-p', paths.appTsBuildConfig],
    {
      stdio,
    },
  );

  checkChildStatus(result.status, 'tsc');
  console.log(chalk.green('Successfully built the server!\n'));
}

if (buildClient) {
  console.log(`\nBuilding ${chalk.cyan('client')}...\n`);

  const result = spawnSync('node', [`${paths.reactScripts}/build`], {
    cwd: paths.appClient,
    stdio,
    env: process.env,
  });

  checkChildStatus(result.status, 'node');
  console.log(chalk.green('Successfully built the client!\n'));

  // Move the client to the build directory
  console.log(`Moving the built client to ${chalk.cyan(paths.appBuild)}\n`);

  // If keep client specifed copy the build directory, otherwise just move it
  if (args.includes('--keep-client')) {
    fs.ensureDirSync(paths.appBuildClient);
    fs.copySync(paths.appClientBuild, paths.appBuildClient);
  } else {
    fs.moveSync(paths.appClientBuild, paths.appBuildClient);
  }
}

console.log(chalk.green('Build complete!'));
console.log(`Application as available at ${chalk.cyan(paths.appBuild)}\n`);
