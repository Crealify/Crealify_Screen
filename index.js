import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit().addConfig('user.name', 'Crealify')
                      .addConfig('user.email', 'bhattaraianil2015@gmail.com');

async function makeCommit(weeks, days) {
  const date = moment().subtract(1, "year")
                      .add(weeks, "weeks")
                      .add(days, "days")
                      .format();
  
  const data = { date };
  
  try {
    await jsonfile.writeFile(path, data);
    await git.add(path)
             .commit(date, { "--date": date });
    console.log(`Commit created for ${date}`);
    return true;
  } catch (error) {
    console.error(`Failed commit for ${date}:`, error.message);
    return false;
  }
}

async function makeCommits(total) {
  let successful = 0;
  
  for (let i = 0; i < total; i++) {
    const weeks = random.int(0, 52);
    const days = random.int(0, 6);
    
    if (await makeCommit(weeks, days)) {
      successful++;
    }
    
    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`Finished: ${successful}/${total} commits created`);
  await git.push();
}

makeCommits(90).catch(console.error);