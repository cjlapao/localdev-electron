export abstract class Logger {
  constructor() {}

  static debug(message: string) {
    const isDebug =
      process.env.DEBUG_ON == 'true' || process.env.DEBUG_ON == '1';

    if (isDebug) {
      console.log(message);
    }
  }
}
