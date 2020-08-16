$("#submit-grade").on("click", () => {
  const userGrade = $("#gradearea1").val();
  const homeworkId = $("#idOfHomework").text();
  console.log(userGrade);
  console.log(homeworkId);
  $.ajax("/api/renderdoc/", {
    type: "PUT",
    data: { grade: userGrade, id: homeworkId }
  }).then(() => {
    window.location = "/gradebook";
  });
});
