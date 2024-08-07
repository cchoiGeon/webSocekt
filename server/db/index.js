import { Sequelize } from 'sequelize';
import { config as dbConfig } from '../config/db.config.js';
import { User } from './models/user.js';
import { Room } from './models/room.js';
import { Chat } from './models/chat.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

User.initiate(sequelize);
Room.initiate(sequelize);
Chat.initiate(sequelize);

db.User = User;
db.Room = Room;
db.Chat = Chat;

User.associate(db);
Room.associate(db);
Chat.associate(db);

export const init = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('데이터베이스 연결이 성공적으로 이루어졌습니다.');
    await db.sequelize.sync();
    console.log('데이터베이스 동기화가 완료되었습니다.');
  } catch (error) {
    console.error('데이터베이스 연결에 실패했습니다:', error);
  }
};

export default db;
