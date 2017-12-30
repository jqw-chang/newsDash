const Sequelize = require('sequelize');
const db = new Sequelize('postgres://swquwnqp:TbmD-29S-R2oF1UygZycJHcri94dJMtK@baasu.db.elephantsql.com:5432/swquwnqp', {
  dialect: 'postgres'
});

db.authenticate().then(() => {
  console.log('DB successfully connected!');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

const Articles = db.define('article', {
  id: { type: Sequelize.STRING, primaryKey: true },
  sourceID: Sequelize.STRING,
  sourceName: Sequelize.STRING,
  title: Sequelize.STRING,
  url: {type: Sequelize.STRING, unique: true },
  description: Sequelize.STRING,
  author: Sequelize.STRING,
  publishedAt : Sequelize.STRING,
  urlToImage: Sequelize.STRING
})

db.sync();

module.exports = Articles;