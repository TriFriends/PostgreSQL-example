const classes = (sequelize, DataTypes) => {
    const Classes = sequelize.define('classes', {
        number: {
            type: DataTypes.STRING
        }
    });

    Classes.associate = models => {
        Classes.belongsToMany(models.Users, {
            through: "users_classes",
            foreignKey: "classes_id"
        })
    }

    return Classes;
};

export default classes;