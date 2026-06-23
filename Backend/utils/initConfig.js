import Config from "../Models/Config.js";

const initConfig = async () => {
  const existing = await Config.findOne();
  if (!existing) {
    await Config.create({});
    console.log("✅ Config created for the first time");
  } else {
    console.log("✅ Config already exists");
  }
};

export default initConfig;
