// const fs = require('fs');
// const crypto = require('crypto');

// const generateSecret = () => {
//   return crypto.randomBytes(64).toString('hex');
// };

// const jwtSecret = generateSecret();
// const refreshTokenSecret = generateSecret();

// const envContent = `
// PORT=5000
// MONGO_URI=<your_mongodb_connection_string>
// JWT_SECRET=${jwtSecret}
// REFRESH_TOKEN_SECRET=${refreshTokenSecret}
// `;

// fs.writeFileSync('.env', envContent.trim(), { encoding: 'utf8' });
// console.log('Secrets generated and .env file updated.');
