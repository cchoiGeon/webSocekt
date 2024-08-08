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
        room_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'rooms',
            key: 'id',
          },
        },
        sender_id: {
          type: DataTypes.UUID,
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
    this.belongsTo(models.User, { as: 'Sender', foreignKey: 'sender_id' });
    this.belongsTo(models.Room, { as: 'Room', foreignKey: 'room_id' });
  }
}
