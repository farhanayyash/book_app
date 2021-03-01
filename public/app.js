$(document).ready(function(){
  $("form").submit(function(){
if ($('input:checkbox').filter(':checked').length < 1){
      alert("Please Check at least one Check Box");
return false;
}
  });
});