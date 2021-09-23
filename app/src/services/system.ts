import { existsSync, mkdirSync } from 'fs';
export abstract class SystemService {
  static init() {
    const root = SystemService.getSystemFolder();
    if (!existsSync(root)) {
      mkdirSync(root);
    }
  }

  static getSystemFolder(): string {
    let root: string;
    switch (process.platform) {
      case 'win32':
        root = process.env.USERPROFILE;
        console.log(root);
        return `${root}/.localclusterctl`;
      case 'linux':
        root = process.env.HOME;
        return `${root}/.localclusterctl`;
      default:
        return;
    }
  }
}
