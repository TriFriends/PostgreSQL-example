import bcrypt from "bcryptjs";

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
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
      hooks: {
        beforeCreate(user, options) {
          user.hashPassword();
        }
      }
    }
  );

  User.prototype.getName = function getName() {
    console.log(this.first_name);
  };

  User.prototype.hashPassword = function hashPassword() {
    let hashed = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    console.log(hashed);
    this.password = hashed;
  };

  User.associate = models => {
    User.belongsToMany(models.Classes, {
      through: "users_classes",
      foreignKey: "user_id"
    });
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }

    return user;
  };

  return User;
};

export default user;
