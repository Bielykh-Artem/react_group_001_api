module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'API',
      script: './dist/app.js',
      instances: 'max',
      max_memory_restart: '400M',
    },
  ],
}
