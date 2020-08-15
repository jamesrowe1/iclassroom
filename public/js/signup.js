// Getting references to our form and input
const signUpForm = $("form.signup");
const firstNameInput = $("#firstNameInput");
const lastNameInput = $("#lastNameInput");
const emailInput = $("#emailInput");
const passwordInput = $("#passwordInput");
const typeInput = $("#typeInput");
const dropdown = $("#selectTeacher");
const selectTeacherFormGroup = $("#selectTeacherFormGroup");

$(document).ready(() => {
  typeInput.on("change", function() {
    if (this.value === "student") {
      selectTeacherFormGroup.show();
    } else {
      selectTeacherFormGroup.hide();
    }
  });
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      role: typeInput.val().trim(),
      teacherId: dropdown.val()
    };
    if (userData.teacherId === "") {
      userData.teacherId = null;
    }
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.role,
      userData.teacherId
    );
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, email, password, role, teacherId) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
      teacherId: teacherId
    })
      .then(() => {
        window.location.replace("/dashboard");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

function getUsers() {
  $.get("/api/users/teachers", data => {
    users = data;
    users.forEach(teacher => {
      console.log(teacher.lastName);
      dropdown.append(
        $(
          `<option value = ${teacher.id}> ${teacher.firstName} ${teacher.lastName}</option>`
        )
      );
    });
  });
}

getUsers();
