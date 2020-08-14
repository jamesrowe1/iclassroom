const dropdown = $("#usersDropdown");
let users;
const studentRequesting = $("#studentRequesting");

function getUsers() {
  $.get("/api/users", data => {
    console.log("users", data);
    users = data;
    users.forEach(student => {
      dropdown.append(
        $("<li />")
          .val(student.id)
          .text(student.firstName + " " + student.lastName)
      );
    });
  });
}

getUsers();

$(".dropdown-trigger").dropdown();

function scheduleSession() {
  console.log(usersDropdown.val());
}
