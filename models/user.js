// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = function (models) {
    // Associating User with Sessions
    User.hasMany(models.Session, {
      onDelete: "cascade"
    });
  };

  User.associate = function (models) {
    // Associating User with Documents
    User.hasMany(models.Document, {
      onDelete: "cascade"
    });
  };

  User.associate = function (models) {
    // We're saying that a Document should belong to an User
    // A Document can't be created without an User due to the foreign key constraint
    User.belongsTo(models.Session, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    console.log(`${password} as opposed to ${this.password}`);
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};