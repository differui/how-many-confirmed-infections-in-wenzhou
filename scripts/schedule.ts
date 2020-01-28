import util from 'util';
import schedule from 'node-schedule';

const EVERY_THIRTY_SEC = '30 * * * * *';
const EVERY_MORNING = '30 1 1 * * *';

const updateDXY = () => {
  const exec = util.promisify(require('child_process').exec);

  schedule.scheduleJob(EVERY_THIRTY_SEC, async () => {
    console.log(`Rebuilding start at ${new Date().toLocaleString()}`);
    await exec('npx ts-node ./scripts/update-dxy-data.ts');
    await exec('npx npm run build index.html');
    console.log(`Rebuilding finished at ${new Date().toLocaleString()}`);
  });
};

updateDXY();
