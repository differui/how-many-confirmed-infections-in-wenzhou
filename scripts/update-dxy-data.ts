import { get } from 'https';
import { resolve as resolvePath } from 'path';
import { createWriteStream } from 'fs';

get(
  'https://service-f9fjwngp-1252021671.bj.apigw.tencentcs.com/release/pneumonia',
  res => {
    const ws = createWriteStream(
      resolvePath(process.cwd(), './src/assets/dxy.json')
    );

    res.pipe(ws);
  }
);
