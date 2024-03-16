import {DataTypes} from "sequelize";

export default function (sequelize) {
    return sequelize.define('Contact', {
            firstName: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            mobilePhone: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            isFavorite: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            profilePicture: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
        }
    );
}