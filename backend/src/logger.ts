import winston from 'winston';

// Define the log levels (info, warn, error, debug)
const logLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
    debug: 3
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'blue'
  }
};

// Create the logger
const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      ),
      level: process.env.LOG_LEVEL || 'info'
    }),
  ]
});

export default logger;
