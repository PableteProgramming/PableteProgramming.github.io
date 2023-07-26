$(document).ready(function(){
    $(".phone-btn").on("click",phonebtn_clicked)
})



function phonebtn_clicked(){
    $(".navbar").toggleClass("show")
    $(".phone-btn").toggleClass("close")
}