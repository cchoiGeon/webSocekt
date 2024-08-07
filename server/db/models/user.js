import { Sequelize, DataTypes } from 'sequelize';

export class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(      
      {
        uuid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id:{
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
    this.hasMany(models.Room, { as: 'User1Chats', foreignKey: 'user1Id' });
    this.hasMany(models.Room, { as: 'User2Chats', foreignKey: 'user2Id' });
  }
}
