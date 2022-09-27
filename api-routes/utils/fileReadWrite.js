import path from "path";
import process from "process";
import fs from "fs";

// TODO: Create buildFeedbackPath to get the file location/path
export const buildPath = (apiName) => {
  const pathh = path.join(process.cwd(), "data", `${apiName}`);
  return pathh;
};

// TODO: Create a func which returns feedback data
export const dataFromPath = (path) => {
  const file = fs.readFileSync(path);
  const data = JSON.parse(file);
  return data;
};

export const writeFile = (data, apiName) => {
  const filePath = path.join(process.cwd(), "data", `${apiName}`);
  
  // fs.writeFileSync(filePath, data, { flag: "a+" }, (err) => {
  //   if (!err) {
  //     return {message: "error deleting feedback"};
  //   } else {
  //       const file = fs.readFileSync(path);
  //       const data = JSON.parse(file);
  //       return data;
  //   }
  // });

  fs.writeFileSync(filePath, data);
};
