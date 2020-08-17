$(document).ready(() => {
  // Getting references to our form and input
  const typeChoice = $("#type-choice");
  const titleInput = $("#document-title");
  const bodyInput = $("#document-body");
  const newDocForm = $("form.newDocForm");
  const studentSubmitting = $("#studentSubmitting");
  // When the signup button is clicked, we validate the email and password are not blank
  newDocForm.on("submit", event => {
    event.preventDefault();
    const docData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      documentType: typeChoice.val().trim()
    };
    if (!docData.title || !docData.body || !docData.documentType) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    createNewDoc(
      docData.title,
      docData.body,
      docData.documentType,
      studentSubmitting.text()
    );
  });

  // Does a post to the newdoc route. If successful, we are redirected to the render dashboard page
  // Otherwise we log any errors
  function createNewDoc(title, body, documentType, studentId) {
    $.post("/api/newdoc", {
      title: title,
      body: body,
      documentType: documentType,
      id: studentId
    })
      .then(() => {
        // Remember to update with correct route for dashboard page
        window.location.replace("/dashboard");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleDocErr);
  }

  function handleDocErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
