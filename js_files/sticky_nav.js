$(function(){
  $(window).scroll(function(){
    var winTop = $(window).scrollTop();
    if(winTop >= 30){
      $("body").addClass("sticky");
    }else{
      $("body").removeClass("sticky");
    }//if-else
  });//win func.
});//ready func.