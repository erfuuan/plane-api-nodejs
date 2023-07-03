export default (sequelize, DataTypes) => {
    return sequelize.define('', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
    }, {
        tableName: '',
        timestamps: false,
    });
};
