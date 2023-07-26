var small_screen=false
var small_screen_limit=470

// Once the document is ready, add all the events
$(document).ready(function(){
    //Adding the event for the phone button
    $(".phone-btn").on("click",phonebtn_clicked)

    //Adding the events for the submenus
    $(".submenu-btn").each(function(){
        id= $(this).attr("id")
        $(this).on("click",function(){
            ShowSubmenu("submenu-"+id)
        })
    })
    $(window).on("resize",WindowResize)
})

/* Triggered functions */
function phonebtn_clicked(){
    $(".navbar").toggleClass("show")
    $(".phone-btn").toggleClass("close")
}

function ShowSubmenu(submenu_class){
    $("."+submenu_class).toggleClass("show")
}