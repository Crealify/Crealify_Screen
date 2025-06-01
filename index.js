import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";
const path = "./data.json";

// Configure git with your credentials
const git = simpleGit();
git.addConfig('user.name', 'Crealify');
git.addConfig('user.email', 'bhattaraianil2015@gmail.com');

const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    git.add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if(n===0) return git.push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    git.add([path]).commit(date, { "--date": date }, makeCommits.bind(this,--n));
  });
};

makeCommits(100);


// import jsonfile from "jsonfile";
// import moment from "moment";
// import simpleGit from "simple-git";
// import random from "random";
// const path = "./data.json";

// const markCommit = (x, y) => {
//   const date = moment()
//     .subtract(1, "y")
//     .add(1, "d")
//     .add(x, "w")
//     .add(y, "d")
//     .format();

//   const data = {
//     date: date,
//   };

//   jsonfile.writeFile(path, data, () => {
//     simpleGit().add([path]).commit(date, { "--date": date }).push();
//   });
// };

// const makeCommits = (n) => {
//   if(n===0) return simpleGit().push();
//   const x = random.int(0, 54);
//   const y = random.int(0, 6);
//   const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

//   const data = {
//     date: date,
//   };
//   console.log(date);
//   jsonfile.writeFile(path, data, () => {
//     simpleGit().add([path]).commit(date, { "--date": date },makeCommits.bind(this,--n));
//   });
// };

// makeCommits(100);
