<<<<<<< HEAD
module.exports = function(sequelize, DataTypes) {
    const Document = sequelize.define("document", {
        // The email cannot be null, and must be a proper email before creation
        title: {

        },
        body: {

        },
        // The password cannot be null
        grade: {

        },
        document_type: {

        },
        user: {
            // Foreign key for user user.id
        }
=======
module.exports = function (sequelize, DataTypes) {
  const Document = sequelize.define("document", {
    // The title of the document
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The body text of the document
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Notes don't have to be graded but assignments should be
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [1, 3],
        max: 110,
        min: 0,
      },
    },
    // Whether the document is a note or an assignment
    document_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Document.associate = function (models) {
    // We're saying that a Document should belong to an User
    // A Document can't be created without an User due to the foreign key constraint
    Document.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
>>>>>>> 6844ba5654d78b82724cd35cbc60c86c87cc1c9e
    });
  };
  return Document;
};
