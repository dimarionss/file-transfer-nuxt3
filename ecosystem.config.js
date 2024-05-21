module.exports = {
  apps: [
    {
      name: 'admin-bet',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}