import { spawn } from 'child_process';
import { ipcMain } from 'electron';

export class MinikubeService {
  constructor() {
    ipcMain.on('getMinikubeStatusAsync', (event, arg) => {
      let cmd = spawn('minikube', ['status', '-o json']);

      cmd.stdout.on('data', (data) => {
        console.log('from backend ' + data);
        event.reply('getMinikubeStatusAsyncResponse', data);
      });

      cmd.stderr.on('data', (data) => {
        console.log('from backend error ' + data);
        event.reply('getMinikubeStatusAsyncResponse', data);
      });

      cmd.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    });
  }
}
