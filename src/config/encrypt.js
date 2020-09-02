const bcrypt = require('bcrypt');

const saltRounds = 10;

const convertToBcrypt = data =>
	bcrypt.hashSync(data.toString(), bcrypt.genSaltSync(saltRounds), null);

const compareBcrypt = (entity, encryptEntity) =>
	bcrypt.compareSync(entity, encryptEntity);

module.exports = { convertToBcrypt, compareBcrypt };
