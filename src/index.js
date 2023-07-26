// Once the document is ready, add all the events
$(document).ready(function(){
    //Adding the event for the phone button
    $(".phone-btn").on("click",phonebtn_clicked)

    //Adding the events for the submenus
    $(".submenu-btn").each(function(){
        id= $(this).attr("id")
        console.log(id)
        $(this).on("click",function(){
            ShowSubmenu("submenu-"+id)
        })
    })
})

/* Triggered functions */
function phonebtn_clicked(){
    $(".navbar").toggleClass("show")
    $(".phone-btn").toggleClass("close")
}

function ShowSubmenu(submenu_class){
    $("."+submenu_class).toggleClass("show")
}