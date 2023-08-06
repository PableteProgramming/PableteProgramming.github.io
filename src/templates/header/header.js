var small_screen=false
var small_screen_limit=-1

function header(tag,file,_small_screen_limit){
    small_screen_limit=_small_screen_limit

    //Adding the templates elements
    const headerr= new Template(tag,file)
    headerr.Append()

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
}

/* Triggered functions */
function phonebtn_clicked(){
    $(".navbar").toggleClass("show")
    $(".phone-btn").toggleClass("close")
}

function ShowSubmenu(submenu_class){
    $("."+submenu_class).toggleClass("show")
}

function WindowResize(){
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