// parallax for pictures
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
  });
  
  // for drop down menu
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
  
    // for the form
  
    $(document).ready(function() {
      $('input#input_text, textarea#textarea2').characterCounter();
    });
        

    