require('dotenv').config();

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    NEXT_PUBLIC_API_KEY_MAPS: process.env.API_KEY_MAPS,
    NEW_RELIC: process.env.NEW_RELIC,
    API_KEY_SENDGRID: process.env.API_KEY_SENDGRID,
    SENDGRID_FROM: process.env.SENDGRID_FROM,
    API_URL: process.env.API_URL,
  },
};
