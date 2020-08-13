module.exports = function (sequelize, DataTypes) {
    const Session = sequelize.define("Session", {
        // The email cannot be null, and must be a proper email before creation
        event_title: {

        },
        date: {

        },
        time: {

        },
        attendees: {
            // Add foreign key for user.id

        }
    });
    return Session;
};
