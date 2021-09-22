import { existsSync, mkdirSync } from 'fs';
export abstract class SystemService {
  static init() {
    const root = SystemService.getSystemFolder();
    if (!existsSync(root)) {
      mkdirSync(root);
    }
  }

  static getSystemFolder(): string {
    switch (process.platform) {
      case 'win32':
        const root = process.env.USERPROFILE;
        console.log(root);
        return `${root}/.localclusterctl`;
      case 'linux':
        return '~/.localclusterctl';
      default:
        return;
    }
  }
}
