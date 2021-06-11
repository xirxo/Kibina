// PM2 configuration

module.exports = {
  // List of our apps
  apps : [
    {
      script: './build/index.js',
      watch: '.'
    }
  ],
};