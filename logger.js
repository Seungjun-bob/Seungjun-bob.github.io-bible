const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');

// 로그 포맷 정의
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// 로그 디렉토리 경로
const logDir = 'logs';
const errorLogDir = path.join(logDir, 'error');

// Logger 생성
const logger = createLogger({
  level: 'info', // 로그 레벨 설정
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(logDir, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: path.join(errorLogDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    })
  ],
});

module.exports = logger;