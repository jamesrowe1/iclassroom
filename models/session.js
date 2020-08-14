module.exports = function (sequelize, DataTypes) {
  const Session = sequelize.define("Session", {
    // The email cannot be null, and must be a proper email before creation
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1, 2]
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1, 2]
    },
    hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1, 2]
    },
    minute: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [2]
    }
  });

  Session.associate = function (models) {
    // We're saying that a Document should belong to an User
    // A Document can't be created without an User due to the foreign key constraint
    Session.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Session.associate = function (models) {
    // Associating Sessions with Users
    Session.hasMany(models.User, {});
  };

  return Session;
};
// Session.associate = function (models) {
//   // Associating Sessions with Users
//   Session.hasMany(models.User, {});
// };

// return Session;
// };