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
  let dir = `/home/diwanshu/books/WEB/4.Nodejs/4.2OnlineJudge/codesubmit/${folder}`;
  let cmd2 = `cd ${dir} && rsync -a /bin ./`;
  let limit = `cd ${dir} && ulimit -f 100000 && ulimit -v 100000 && ulimit -n 5 && ulimit -t 1 && ulimit -s 100000`;
  let cmd = `cd ${dir} &&  g++ ./program.cpp -o program  && ./program < './input.txt' > ./output.txt`;
  try {
    let { code, input } = req.body;
    console.log(code, input);
    console.log(req.body);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    try {
      fs.writeFileSync(path.join(dir, "/program.cpp"), code);
      fs.writeFileSync(path.join(dir, "/input.txt"), input);
      fs.writeFileSync(path.join(dir, "/output.txt"), "");
      fs.writeFileSync(path.join(dir, "/time.txt"), "");
    } catch (err) {
      console.log(err);
    }
    cp.execSync(
      cmd2,
      { shell: true, timeout: 10000 },
      (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
      }
    );
    cp.execSync(
      limit,
      { shell: true, timeout: 2000 },
      (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
      }
    );
    console.log("started compiling");
    let start = Date.now();


    const command = cmd; // Replace with the actual script/command you want to run
const timeout = 5000; // Timeout in milliseconds (5 seconds)
const memoryLimit = 512 * 1024 * 1024; // Memory limit in bytes (e.g., 512MB)

const options = {
    env: {
        ...process.env,
        NODE_OPTIONS: `--max-old-space-size=${memoryLimit}`
    },
    timeout: timeout
};



    cp.exec(cmd, options, (error, stdout, stderr) => {
      console.log((Date.now() - start) / 1000);

      if (error) {
        if (error.killed) {
            console.error(`Child process terminated due to timeout`);
        } else {
            console.error(`Error occurred: ${error.message}`);
        }
    } else {
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    }


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
      if (!error) {
        result = output;
      } else {
        result = stderr;
        console.log(stderr)
      }
      res.json(result);

      console.log("compiling finished");
      fs.rm(dir, { recursive: true, force: true }, (err) => {});
    });
    // cp.exec(cmd, { shell: true, timeout: 10000 }, (error, stdout, stderr) => {
    //   console.log((Date.now() - start) / 1000);
    //   let result;

    //   {
    //     if (stderr) {
    //       result = stderr;
    //     } else {
    //       result = stdout;
    //     }
    //   }
    //   let output = fs.readFileSync(path.join(dir, "/output.txt"), {
    //     encoding: "utf-8",
    //   });
    //   // let timedata = fs.readFileSync(path.join(dir, "/time.txt"), {
    //   //   encoding: "utf-8",
    //   // });
    //   // console.log({ output }, { timedata });
    //   console.log({ error }, { stderr }, { stdout });
    //   if (!error) {
    //     result = output;
    //   } else {
    //     result = stderr;
    //     console.log(stderr)
    //   }
    //   res.json(result);

    //   console.log("compiling finished");
    //   fs.rm(dir, { recursive: true, force: true }, (err) => {});
    // });


    
  } catch (error) {
    console.log("error in compiling");
    console.log(error);
    res.send("Could not compile");
    fs.rm(dir, { recursive: true, force: true }, (err) => {});
  }
}

module.exports = { compile_post };
