module.exports = function(sequelize, DataTypes) {
  const Session = sequelize.define("Session", {
    // The email cannot be null, and must be a proper email before creation
    // studentRequesting: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // tutor: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Session.associate = function(models) {
    // We're saying that a Document should belong to an User
    // A Document can't be created without an User due to the foreign key constraint
    Session.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      as: "studentRequesting"
    });

    Session.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      as: "tutor"
    });
  };

  // Session.associate = function(models) {
  //   // Associating Sessions with Users
  //   Session.hasMany(models.User, {});
  // };

  return Session;
};
