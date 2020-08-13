module.exports = function (sequelize, DataTypes) {
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
    });
    return Document;
};
