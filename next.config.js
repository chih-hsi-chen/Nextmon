const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const dotenv = require('dotenv');
const path = require('path');

let result = null;

module.exports = (phase, { defaultConfig }) => {
    if(phase === PHASE_DEVELOPMENT_SERVER) {
        result = dotenv.config();
    } else {
        result = dotenv.config({
            path: path.resolve(process.cwd(), '.env.production'),
        });
    }
    return {
        env: {
            MONGODB_URI: process.env.MONGODB_URI,
            DB_NAME: process.env.DB_NAME,
            SECRET: process.env.SECRET,
            SESSION_STORE_URL: process.env.SESSION_STORE_URL,
            SESSION_STORE_DB_NAME: process.env.SESSION_STORE_DB_NAME
        },
    }
};