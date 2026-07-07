import { createLogger, format, transports } from "winston";
import type {
  ConsoleTransportInstance,
  FileTransportInstance
} from "winston/lib/winston/transports/index.js";
import util from "util";
import config from "@config/config.js";
import { EApplicationEnvironment } from "@constant/application.js";
import path from "path";
import * as sourceMapSupport from "source-map-support";
import { blue, green, magenta, red, yellow } from "colorette";
import "winston-mongodb";
import type { MongoDBTransportInstance } from "winston-mongodb";

// Linking trace support
sourceMapSupport.install();

const colorizeLevel = (level: string) => {
  switch (level) {
    case "ERROR":
      return red(level);
    case "INFO":
      return blue(level);
    case "WARN":
      return yellow(level);
    default:
      return level;
  }
};

const consoleLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const customLevel = colorizeLevel(level.toUpperCase());
  const customTimestamp = green(timestamp as string);

  const customMessage = message;

  const customMeta = util.inspect(meta, {
    showHidden: false,
    depth: null,
    colors: true
  });

  const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta("META")} ${customMeta}\n`;

  return customLog;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
  // Production Env Check
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: "info",
        format: format.combine(format.timestamp(), consoleLogFormat)
      })
    ];
  }

  return [];
};

const fileLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const logMeta: Record<string, unknown> = {};

  if (meta && typeof meta === "object") {
    for (const [key, value] of Object.entries(meta)) {
      if (value instanceof Error) {
        logMeta[key] = {
          name: value.name,
          message: value.message,
          trace: value.stack || ""
        };
      } else {
        logMeta[key] = value;
      }
    }
  }

  const logData = {
    level: level.toUpperCase(),
    message,
    timestamp,
    meta: logMeta
  };

  return JSON.stringify(logData, null, 4);
});

const fileTransport = (): Array<FileTransportInstance> => {
  return [
    new transports.File({
      filename: path.join(
        import.meta.dirname,
        "../",
        "../",
        "logs",
        `${config.ENV}.log`
      ),
      level: "info",
      format: format.combine(format.timestamp(), fileLogFormat)
    })
  ];
};

const mongodbTransport = (): Array<MongoDBTransportInstance> => {
  return [
    new transports.MongoDB({
      level: "info",
      db: config.MONGODB_URL as string,
      metaKey: "meta",
      expireAfterSeconds: 3600 * 24 * 30,
      collection: "server_logs",
      dbName: "server_logs"
    })
  ];
};

export default createLogger({
  defaultMeta: {
    meta: {}
  },
  transports: [...fileTransport(), ...mongodbTransport(), ...consoleTransport()]
});
