module.exports = {
  apps: [
    {
      name: 'web', // Equivalent to --name "web"
      script: 'web/server.js', // Equivalent to "web/server.js"

      // Configuration for clustering and restart policy
      instances: 'max', // Equivalent to -i max (uses all available CPU cores)
      exec_mode: 'cluster', // Ensures the app runs in cluster mode

      // Memory limit configuration
      max_memory_restart: '400M', // Equivalent to --max-memory-restart 400M

      // Logging configuration (optional, but highly recommended)
      merge_logs: true, // All instances write to the same out/error files
      watch: false, // Set to true to restart on file changes
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      // Environment variables (optional)
      //env: {
      //  NODE_ENV: "production",
      //}
    },
  ],
};
