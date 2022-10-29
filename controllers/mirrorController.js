//Imports
const Mirror = require("../models/mirrorModel");

exports.createMirror = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newMirror = await Mirror.create({
        userID: userID,
      });
      resolve(newMirror.id);
    } catch (err) {
      reject(err);
    }
  });
};
