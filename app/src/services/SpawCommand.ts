import { SpawnCommandResponse } from './../interfaces/SpawnCommandResponse';
import { SpawnCommandRequest } from './../interfaces/SpawnCommandRequest';
import { spawn } from 'child_process';
import { Logger } from './logger';

export abstract class SpawnCommand {
  static exec(request: SpawnCommandRequest): Promise<SpawnCommandResponse> {
    return new Promise((p) => {
      const response: SpawnCommandResponse = {
        code: -1,
        error: [],
        output: [],
      };

      if (!request.cmd) {
        Logger.debug('No command present, returning nul');
        p(response);
      }

      let cmd = spawn(request.cmd, request.args);

      cmd.stdout.on('data', (data) => {
        Logger.debug(`[CMD] ${data}`);
        response.output.push(data.toString());
      });

      cmd.stderr.on('data', (data) => {
        Logger.debug(`[CMD] [ERR] ${data}`);
        response.error += data.toString();
      });

      cmd.on('close', (code) => {
        Logger.debug(`[CMD] exited with code ${code}`);
        response.code = code;
        p(response);
      });
    });
  }
}
