var small_screen=false
var small_screen_limit=470

// Once the document is ready, add all the events
$(document).ready(function(){
    //Setting initial window width vars
    if($(window).width()<=small_screen_limit){
        small_screen=true
    }

    //Adding the event for the phone button
    $(".phone-btn").on("click",phonebtn_clicked)

    //Adding the events for the submenus
    $(".submenu-btn").each(function(){
        id= $(this).attr("id")
        $(this).on("click",function(){
            ShowSubmenu("submenu-"+id)
        })
    })

    //Adding the window resize triggering
    $(window).on("resize",WindowResize)

    //Adding the carousel
    const carousel= new Carousel(".carousel")
    carousel.activate()
})

/* Triggered functions */
function phonebtn_clicked(){
    $(".navbar").toggleClass("show")
    $(".phone-btn").toggleClass("close")
}

function ShowSubmenu(submenu_class){
    $("."+submenu_class).toggleClass("show")
}

function WindowResize(){
    console.log(small_screen)
    if(($(window).width()<=small_screen_limit && small_screen==false) || ($(window).width()>small_screen_limit && small_screen==true)){
        //Change to screen type
        $(".navbar").removeClass("show")
        $(".phone-btn").removeClass("close")
        $(".submenu-btn").each(function(){
            id= $(this).attr("id")
            $(".submenu-"+id).removeClass("show")
        })
        if(small_screen){
            small_screen=false
        }
        else{
            small_screen=true
        }
    }
}

