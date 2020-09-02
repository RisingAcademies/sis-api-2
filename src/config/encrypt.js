const bcrypt = require("bcrypt");
const saltRounds = 10;

const convertToBcrypt = (data) => {
  return bcrypt.hashSync(data.toString(), bcrypt.genSaltSync(saltRounds), null);
};

const compareBcrypt = (entity, encryptEntity) => {
  return bcrypt.compareSync(entity, encryptEntity);
};

module.exports = { convertToBcrypt, compareBcrypt };
