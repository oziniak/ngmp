import winston from "winston";

export const appLogger = winston.createLogger({
  level: "silly",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});
