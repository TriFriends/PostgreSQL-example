const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user',
        {
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            instanceMethods: {
                comparePassword: function (candidatePassword, cb) {
                    
                }
            }
        });

    User.associate = models => {
        User.belongsToMany(models.Classes, {
            through: "users_classes",
            foreignKey: "user_id"
        })
    }

    User.findByLogin = async login => {
        let user = await User.findOne({
            where: { username: login },
        });

        if (!user) {
            user = await User.findOne({
                where: { email: login },
            });
        }

        return user;
    };

    return User;
};

export default user;