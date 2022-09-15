

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, { onDelete: "cascade" });
  };

  return Profile;
};
