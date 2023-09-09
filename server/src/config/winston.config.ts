import winston from 'winston';

export const winstonConfig: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        ...[
          winston.format.json(),
          ...(process.env.NODE_ENV === 'dev'
            ? [
                winston.format.prettyPrint({
                  colorize: true,
                  depth: 3,
                }),
              ]
            : []),

          winston.format.errors({
            stack: true,
          }),

          winston.format.timestamp(),
        ],
      ),
    }),
  ],
};
