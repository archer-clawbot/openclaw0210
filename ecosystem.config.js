// PM2 Ecosystem Config — OpenClaw Dispatcher
// Start:   pm2 start ecosystem.config.js
// Stop:    pm2 stop openclaw-dispatcher
// Logs:    pm2 logs openclaw-dispatcher
// Monitor: pm2 monit

module.exports = {
  apps: [
    {
      name: 'openclaw-dispatcher',
      script: 'cron/dispatcher.js',
      cwd: 'C:\\Users\\spart\\.openclaw',
      args: '--watch',
      interpreter: 'node',

      // Auto-restart on crash
      autorestart: true,
      max_restarts: 50,
      min_uptime: '10s',       // must run 10s+ to count as stable
      restart_delay: 5000,     // 5s between restarts

      // Exponential backoff on repeated crashes
      exp_backoff_restart_delay: 1000,

      // Memory limit — restart if exceeds 512MB
      max_memory_restart: '512M',

      // Logging
      log_file: 'C:\\Users\\spart\\.openclaw\\cron\\pm2-dispatcher.log',
      error_file: 'C:\\Users\\spart\\.openclaw\\cron\\pm2-dispatcher-error.log',
      out_file: 'C:\\Users\\spart\\.openclaw\\cron\\pm2-dispatcher-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Environment
      env: {
        NODE_ENV: 'production',
      },

      // Watch for file changes (auto-reload on code updates)
      watch: ['cron/dispatcher.js', 'cron/lib'],
      watch_delay: 3000,
      ignore_watch: ['cron/dispatcher.log*', 'cron/pm2-*', 'node_modules'],
    },
  ],
};
