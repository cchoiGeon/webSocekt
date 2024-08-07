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
        user1Id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'uuid',
          },
        },
        user2Id: {
          type: DataTypes.INTEGER,
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
    this.belongsTo(models.User, { as: 'User1', foreignKey: 'user1Id' });
    this.belongsTo(models.User, { as: 'User2', foreignKey: 'user2Id' });
  }
}
