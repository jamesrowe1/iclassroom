const dropdown = $("#typeInput");
let users;
const studentRequesting = $("#studentRequesting");
const schedule = $("form.schedule");
const workOn = $("#workOn");
const datePicked = $(".datepicker");
const timePicked = $(".timepicker");

//inits
$(".dropdown-trigger").dropdown();
$(document).ready(() => {
  $(".timepicker").timepicker();
});
$(document).ready(() => {
  $(".datepicker").datepicker();
});

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

schedule.on("submit", event => {
  event.preventDefault();
  const userData = {
    studentRequesting: studentRequesting.text(),
    tutor: dropdown.val(),
    workOn: workOn.val().trim(),
    timePicked: timePicked.val(),
    datePicked: datePicked.val()
  };
  console.log(userData.studentRequesting);
  addSession(
    userData.studentRequesting,
    userData.tutor,
    userData.workOn,
    userData.datePicked,
    userData.timePicked
  );
});

function addSession(studentRequesting, tutor, workOn, datePicked, timePicked) {
  $.post("api/schedule", {
    studentRequesting: studentRequesting,
    tutor: tutor,
    subject: workOn,
    time: timePicked,
    date: datePicked
  })
    .then(() => {
      window.location.replace("/");
    })
    .catch(handleScheduleErr);
}

function handleScheduleErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}
