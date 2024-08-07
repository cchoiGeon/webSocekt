import { Sequelize, DataTypes } from 'sequelize';

export class Chat extends Sequelize.Model {
  static initiate(sequelize) {
    Chat.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        send: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uuid',
          },
        },
        recive: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uuid',
          },
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Chat',
        tableName: 'chats',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'User1', foreignKey: 'user1Id' });
    this.belongsTo(models.User, { as: 'User2', foreignKey: 'user2Id' });
  }
}
