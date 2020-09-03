const workflowRouter = require('./workflow');
const processRouter = require('./process');
const packagesRouter = require('./packages');
const activityManagerRouter = require('./activity-manager');
const cockpitRouter = require('./cockpit');

module.exports = (config) => {
  const { api } = config;

  //TODO: setup routes by api configuration
  const workflow = workflowRouter();
  const packages = packagesRouter();
  const activityManager = activityManagerRouter();
  const cockpit = cockpitRouter();
  const process = processRouter();

  return [workflow, process, packages, activityManager, cockpit];
};
