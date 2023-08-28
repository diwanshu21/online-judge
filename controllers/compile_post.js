var path = require("path");
var cp = require("child_process");
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { timeLog } = require("console");

let lang = {
  "c++": {
    extension: ".cpp",
    command: "g++ ./program.cpp -o program && ./program < './input.txt'",
  },
};
async function compile_post(req, res) {
  let folder = uuidv4();

  // let currentDirectory=__dirname;
  // let parentPath=path.dirname(currentDirectory);
  // let codeSubmit=path.join(parentPath,'codesubmit');
  // let dir =path.join(codeSubmit,folder);
  let dir =`../codesubmit/${folder}`;
  let cmd = ` cd ${dir} &&  g++ ./program.cpp -o program  && ./program < './input.txt' > './output.txt'`;

  try {
    let { code, input } = req.body;
    // console.log(code, input);
    // console.log(req.body);
    if (!fs.existsSync(dir)) {
      console.log(dir)
      fs.mkdirSync(dir,{recursive:true});
    }
    try {
      fs.writeFileSync(path.join(dir, "/program.cpp"), code);
      fs.writeFileSync(path.join(dir, "/input.txt"), input);
      fs.writeFileSync(path.join(dir, "/output.txt"), "");
      fs.writeFileSync(path.join(dir, "/time.txt"), "");
    } catch (err) {
      console.log(err);
    }

    console.log("started compiling");
    let start = Date.now();

    cp.exec(cmd, { shell: true, timeout: 10000 }, (error, stdout, stderr) => {
      console.log((Date.now() - start) / 1000);
      let result;

      {
        if (stderr) {
          result = stderr;
        } else {
          result = stdout;
        }
      }
      let output = fs.readFileSync(path.join(dir, "/output.txt"), {
        encoding: "utf-8",
      });
      // let timedata = fs.readFileSync(path.join(dir, "/time.txt"), {
      //   encoding: "utf-8",
      // });
      // console.log({ output }, { timedata });
      console.log({ error }, { stderr }, { stdout });
      let tm;
      if (!error) {
        result = output;
//         const elapsedTimeRegex = /(\d+:\d+\.\d+)elapsed/;
// const match = stderr.match(elapsedTimeRegex);

// if (match) {
//   const elapsedTime = match[1];
//   const [minutes, secondsAndHundredths] = elapsedTime.split(":");
//   const [seconds, hundredths] = secondsAndHundredths.split(".");
//   const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds) + parseFloat(`0.${hundredths}`);
  
//   tm=totalSeconds;
//   console.log(`Elapsed Time: ${elapsedTime}`);
// } else {
//   console.log("Elapsed time not found in the output.");
// }
      } else if(stderr) {
        result = stderr;
        console.log(stderr)
      }
      else {
        result="Timeout";
        console.log()
      }
      res.json({output:result,time:null});

      console.log("compiling finished");
      fs.rm(dir, { recursive: true, force: true }, (err) => {});
    });
    
  } catch (error) {
    console.log("error in compiling");
    console.log(error);
    res.send("Could not compile");
    fs.rm(dir, { recursive: true, force: true }, (err) => {});
  }
}

module.exports = { compile_post };
