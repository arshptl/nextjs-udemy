import path from "path";
import process from "process";
import fs from "fs";

// TODO: Create buildFeedbackPath to get the file location/path
export const buildPath = (fileName) => {
  const pathh = path.join(process.cwd(), "data", `${fileName}`);
  return pathh;
};

// TODO: Create a func which returns feedback data
export const dataFromPath = (path) => {
  const file = fs.readFileSync(path);
  const data = JSON.parse(file);
  return data;
};

// TODO: Overrides the file with new data
export const writeFile = (data, fileName) => {
  const filePath = path.join(process.cwd(), "data", `${fileName}`);
  fs.writeFileSync(filePath, data);
};
