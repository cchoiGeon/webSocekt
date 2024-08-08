import { Sequelize, DataTypes } from 'sequelize';

export class Room extends Sequelize.Model {
  static initiate(sequelize) {
    Room.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user1_id: {
          type: DataTypes.UUID, // UUID 타입으로 변경
          allowNull: false,
          references: {
            model: 'users',
            key: 'uuid',
          },
        },
        user2_id: {
          type: DataTypes.UUID, // UUID 타입으로 변경
          allowNull: false,
          references: {
            model: 'users',
            key: 'uuid',
          },
        },
      },
      {
        sequelize,
        modelName: 'Room',
        tableName: 'rooms',
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'User1', foreignKey: 'user1_id' });
    this.belongsTo(models.User, { as: 'User2', foreignKey: 'user2_id' });
  }
}
