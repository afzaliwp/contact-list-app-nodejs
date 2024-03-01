import {DataTypes} from "sequelize";

export default function (sequelize) {
    return sequelize.define( 'ContactCategory', {
        category: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        }
    });
}