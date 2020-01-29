import { get as getHTTPs } from 'https';
import { get as getHTTP } from 'http';
import { resolve as resolvePath } from 'path';
import { createWriteStream } from 'fs';

getHTTPs(
  'https://service-f9fjwngp-1252021671.bj.apigw.tencentcs.com/release/pneumonia',
  res => {
    const ws = createWriteStream(
      resolvePath(process.cwd(), './src/assets/dxy.json')
    );

    res.pipe(ws);
  }
);

getHTTP(
  'http://lab.isaaclin.cn/nCoV/api/area?province=%E6%B5%99%E6%B1%9F%E7%9C%81&latest=0',
  res => {
    const ws = createWriteStream(
      resolvePath(process.cwd(), './src/assets/isaaclin.json')
    );

    res.pipe(ws);
  }
);
