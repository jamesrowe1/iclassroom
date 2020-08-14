const dropdown = $("#typeInput");
let users;
const studentRequesting = $("#studentRequesting");
const schedule = $("form.schedule");
const workOn = $("#workOn");

function getUsers() {
  $.get("/api/users", data => {
    console.log("users", data);
    users = data;
    users.forEach(student => {
      dropdown.append(
        $(
          `<option value = ${student.id}> ${student.firstName} ${student.lastName}</option>`
        )
      );
    });
  });
}

getUsers();

$(".dropdown-trigger").dropdown();

schedule.on("submit", event => {
  event.preventDefault();
  const userData = {
    studentRequesting: studentRequesting.text(),
    tutor: dropdown.val(),
    workOn: workOn.val().trim()
  };
  console.log(userData);
});
