import { SpawnCommandRequest } from './../interfaces/SpawnCommandRequest';
import { SpawnCommandResponse } from '../interfaces/SpawnCommandResponse';
import { spawn } from 'child_process';
import { ipcMain } from 'electron';

export class SpawnCommandService {
  private command: string;
  private args?: string[];

  constructor(private channel: string) {
    const isDebug =
      process.env.DEBUG_ON == 'true' || process.env.DEBUG_ON == '1';

    ipcMain.on(this.channel, (event, arg) => {
      const request: SpawnCommandRequest = arg;
      const response: SpawnCommandResponse = {
        code: 1,
        output: [],
        error: [],
      };

      this.command = request.cmd;
      this.args = request.args;

      if (!this.command) {
        response.code = -1;
        event.reply(event.reply(`${this.channel}Response`, response));
      }

      let cmd = spawn(this.command, this.args);

      cmd.stdout.on('data', (data) => {
        if (isDebug) {
          console.log('[CMD] ' + data);
        }

        response.output.push(data.toString());
      });

      cmd.stderr.on('data', (data) => {
        if (isDebug) {
          console.log('[CMD] [ERR]' + data);
        }
        let lines: string[] = data.toString().split('\n');
        lines.forEach((line) => {
          if (line) {
            response.output.push(line);
          }
        });
      });

      cmd.on('close', (code) => {
        if (isDebug) {
          console.log(`[CMD] exited with code ${code}`);
        }
        response.code = code;

        if (!request?.name) {
          request.name = request.cmd;
        }

        event.reply(`${this.channel}_${request.name}_Response`, response);
      });
    });
  }
}
