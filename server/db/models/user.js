import { Sequelize, DataTypes } from 'sequelize';

export class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(      
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4, // UUID 자동 생성
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Room, { as: 'User1Rooms', foreignKey: 'user1_id' });
    this.hasMany(models.Room, { as: 'User2Rooms', foreignKey: 'user2_id' });
    this.hasMany(models.Chat, { as: 'SentChats', foreignKey: 'sender_id' });
  }
}
