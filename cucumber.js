module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['test/functional/support/steps/*.ts'],
    format: ['html:cucumber-report.html'],
  },
};
