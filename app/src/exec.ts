import { SpawnCommandResponse } from './interfaces/SpawnCommandResponse';
import { spawn } from 'child_process';
import { ipcMain } from 'electron';

export class MinikubeService {
  constructor() {
    ipcMain.on('getMinikubeStatusAsync', (event, arg) => {
      let cmd = spawn('minikube', ['status', '-o', 'json']);
      let output: string;

      cmd.stdout.on('data', (data) => {
        console.log('from backend ' + data);
        output += data;
      });

      cmd.stderr.on('data', (data) => {
        console.log('from backend error ' + data);
        output += data;
      });

      cmd.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        event.reply('getMinikubeStatusAsyncResponse', output);
      });
    });
  }
}

export class SpawnCommandService {
  constructor(
    private channel: string,
    private command: string,
    private args?: string[]
  ) {
    const isDebug =
      process.env.DEBUG_ON == 'true' || process.env.DEBUG_ON == '1';

    const response: SpawnCommandResponse = {
      code: 1,
      lines: [],
      errors: [],
    };

    ipcMain.on(this.channel, (event, arg) => {
      let cmd = spawn(this.command, this.args);
      let output: string = '';

      cmd.stdout.on('data', (data) => {
        if (isDebug) {
          console.log('[CMD] ' + data);
        }
        response.lines.push(data);
      });

      cmd.stderr.on('data', (data) => {
        if (isDebug) {
          console.log('[CMD] [ERR]' + data);
        }
        response.errors.push(data);
      });

      cmd.on('close', (code) => {
        if (isDebug) {
          console.log('[CMD] exited with code ${code}');
        }
        response.code = code;
        event.reply(`${this.channel}Response`, response);
      });
    });
  }
}
