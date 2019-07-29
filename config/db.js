const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoURI');

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log('MongoDB connected');
    })
    .then(err => {
      console.err(err.msg);
      process.exit(1);
    });
};

module.exports = connectDB;
