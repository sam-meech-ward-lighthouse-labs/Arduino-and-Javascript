var five = require("johnny-five");
var board = new five.Board();

async function wait(time)  {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

module.exports = async () => {
  return new Promise((resolve) => {
    board.on("ready", async function() {
      const led = new five.Led(13);
      const base = new five.Servo(9);
      const rock = new five.Servo(10);
      const scissors = new five.Servo(11);
      const all = [base, rock, scissors];

      led['on']();
      await wait(1000);
      led['off']();

      function turnLED(state) {
        (led[state].bind(led) || (() => {}))();
        console.log("turn LED", state);
      }
      exports.turnLED = turnLED;

      function reset() {
        base.min();
        rock.min();
        scissors.max();
      }
      exports.reset = reset;

      async function up() {
        console.log("up");
        base.to(90);
        rock.to(45);
        scissors.to(180-45);
        await wait(500);
      }

      async function down() {
        console.log("down");
        reset();
        await wait(500);
      }


      async function bounce(times) {
        for (let i = 0; i < times; i++) {
          await up();
          await down();
        }
      }
      exports.bounce = bounce;

      async function play(hand) {
        await up();
        switch (hand) {
          case "rock":
            rock.max();
            scissors.min();
            break;
          case "paper":
            rock.min();
            scissors.max();
            break;
          case "scissors":
            rock.min();
            scissors.min();
            break;
        }
        base.min();
        console.log(hand);
        // await down();
      }
      exports.play = play;

      reset();

      resolve({turnLED, bounce, reset, play, wait});
    });
  });
};


