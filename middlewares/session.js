const {PrismaSessionStore} = require('@quixo3/prisma-session-store')
const prisma = require('../config/db')
const expressSession = require('express-session');

const sessionMiddleware = expressSession({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // 2 minutes
      dbRecordIdIsSessionId: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  });

  module.exports = sessionMiddleware;
