const setupHand = require('./rps');

(async () => {
  const {bounce, reset, play, wait} = await setupHand();

  await bounce(3);
  await play(process.argv[2]);
})();
