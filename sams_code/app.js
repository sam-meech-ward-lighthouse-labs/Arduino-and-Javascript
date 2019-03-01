const setupHand = require('./board');

(async () => {
  const {bounce, reset, play, wait} = await setupHand();

  await bounce(2);
  await play(process.argv[2]);
})();
