const dropdown = $("#usersDropdown");
let users;

function getUsers() {
  $.get("/api/users", data => {
    console.log("users", data);
    console.log(this);
    users = data;
    users.forEach(student => {
      dropdown.append(
        $("<li />").text(student.firstName + " " + student.lastName)
      );
    });
  });
}

getUsers();

$(".dropdown-trigger").dropdown();

// function scheduleSession() {

// }
