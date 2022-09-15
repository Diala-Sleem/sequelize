module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isAlpha: true,
      // },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isEmail: true,
      //   isLowercase: true,
      // },
    },
    password: {
      type: DataTypes.STRING,
      // validate: {
      //   is: /^[0-9a-f]{64}$/i,
      // },
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Product, { onDelete: "cascade" });
    User.hasOne(models.Profile, { onDelete: "cascade" });
  };

  return User;
};
