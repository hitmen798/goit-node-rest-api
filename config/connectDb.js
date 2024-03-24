// connectDb.js

const { connect } = require('mongoose');
require('colors');

const connectDb = async () => {
  try {
    if (!process.env.CONNECTION) {
      throw new Error('MongoDB connection string not provided.');
    }

    const db = await connect(process.env.CONNECTION, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `
      Name: ${db.connection.name}
      Port: ${db.connection.port}
      Host: ${db.connection.host}
      `.magenta.italic
    );
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDb
;