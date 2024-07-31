/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const path = require('path');

const nextConfig = {
    images:{
        domains:['8r8rpl19e6.execute-api.us-east-1.amazonaws.com']
    },
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        // Ignore all knex drivers except mysql
        config.plugins.push(
            new webpack.IgnorePlugin({
              checkResource(resource) {
                const unwantedModules = [
                    'mssql',
                    'oracle',
                    'oracledb',
                    'pg',
                    'pg-query-stream',
                    'sqlite3',
                    'better-sqlite3',
                    'pg-native',
                  ];
                  return unwantedModules.includes(resource);
              },
            })
          );

          // fix Critical dependency erros by using the noop-module.js for few imports
          config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
              /knex\/lib\/migrations\/util\/import-file/,
              path.resolve(__dirname, 'noop-module.js')
            )
          );
      
          config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
              /knex\/lib\/knex-builder\/internal\/parse-connection/,
              path.resolve(__dirname, 'noop-module.js')
            )
          );
      
          config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
              /knex\/lib\/util\/constants/,
              path.resolve(__dirname, 'noop-module.js')
            )
          );

        return config;
      },
}

module.exports = nextConfig
