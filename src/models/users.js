import {DataTypes} from "sequelize";
import md5 from "md5";

function hashPassword(user) {
    user.password = md5(user.password);
}

export default function (sequelize) {
  return sequelize.define('Users', {
        fullName: {
          type: DataTypes.STRING(25),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
          hooks: {
              beforeCreate: hashPassword,
              beforeUpdate: hashPassword,
              beforeBulkCreate: hashPassword,
              beforeBulkUpdate: hashPassword,
          }
      }
  );
}