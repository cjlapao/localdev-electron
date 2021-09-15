import { SpawnCommandResponse } from '../interfaces/SpawnCommandResponse';
import { spawn } from 'child_process';
import { ipcMain } from 'electron';

export class SpawnCommandService {
  constructor(
    private channel: string,
    private command: string,
    private args?: string[]
  ) {
    const isDebug =
      process.env.DEBUG_ON == 'true' || process.env.DEBUG_ON == '1';

    ipcMain.on(this.channel, (event, arg) => {
      const response: SpawnCommandResponse = {
        code: 1,
        output: [],
        error: [],
      };

      let cmd = spawn(this.command, this.args);
      let output: string = '';

      cmd.stdout.on('data', (data) => {
        if (isDebug) {
          console.log('[CMD] ' + data);
        }

        let lines: string[] = data.toString().split('\n')
        lines.forEach(line => {
          if(line) {
            response.output.push(line);
          }
        })
      });

      cmd.stderr.on('data', (data) => {
        if (isDebug) {
          console.log('[CMD] [ERR]' + data);
        }
        let lines: string[] = data.toString().split('\n')
        lines.forEach(line => {
          if(line) {
            response.output.push(line);
          }
        })
      });

      cmd.on('close', (code) => {
        if (isDebug) {
          console.log(`[CMD] exited with code ${code}`);
        }
        response.code = code;
        event.reply(`${this.channel}Response`, response);
      });
    });
  }
}
