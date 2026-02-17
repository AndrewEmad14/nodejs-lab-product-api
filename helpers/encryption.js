const bcrypt = require('bcryptjs');

function hashPassword(plainTextPassword) {
  const saltRounds = 10;
  // Generate salt and hash in one step
  const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);
  return hashedPassword;
}

function verifyPassword(plainTextPassword, storedHash) {
  // Returns true if passwords match
  const isMatch = bcrypt.compareSync(plainTextPassword, storedHash);
  return isMatch;
}

module.exports = {
  hashPassword,
  verifyPassword
};
