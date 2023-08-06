var small_screen_limit=480
//Slider
var small_screen=false
var slider_small_screen_limit=900
var slider= null
// Once the document is ready, add all the events
$(document).ready(function(){
    //Adding the templates elements
    header("header","../templates/header/header.html",small_screen_limit)
    footer("footer","../templates/footer/footer.html")

    //Setting initial window width vars
    if($(window).width()<=slider_small_screen_limit){
        small_screen=true
    }

    //Adding the slider
    slider= new Slider(".slider","40vw",1)
    slider.activate()
    //Adding the window resize triggering
    $(window).on("resize",WindowResize)
})

function WindowResize(){
    if(($(window).width()<=slider_small_screen_limit && small_screen==false)){
        //Change to small screen type
        slider.updateSliderWidth("40vw")
        small_screen=true
    }
    else if(($(window).width()>slider_small_screen_limit && small_screen==true)){
        //Big screen type
        console.log("big screen")
        slider.updateSliderWidth("30vw")
        small_screen=false
    }
}