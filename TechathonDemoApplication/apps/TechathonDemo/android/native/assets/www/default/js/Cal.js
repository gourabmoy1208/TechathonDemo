
/* JavaScript content from js/Cal.js in folder common */

  
  /* This is the function that will get executed after the DOM is fully loaded */
  function dateSelect() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
  }
