'use strict';

const path = require('path');
const child_process = require('child_process');
const dataHubPath = require.resolve('macaca-datahub');

const binPath = path.join(dataHubPath, '..', 'bin', 'datahub.js');

const defaultConfig = {
  port: 5678,
};

module.exports = app => {
  const config = Object.assign(defaultConfig, app.config.datahub);

  const child = child_process.spawn(
    binPath,
    [
      'server',
      '-o',
      JSON.stringify(config),
    ],
  );

  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');

  child.stdout.on('data', data => {
    console.log(data);
  });

  child.stderr.on('data', data => {
    console.log(data);
  });

  child.on('close', code => {
    console.log(`datahub exit code: ${code}`);
  });
};
