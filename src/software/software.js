var small_screen_limit=480
//Slider
var small_screen=false
var slider_small_screen_limit=900
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
    const slider= new Slider(".slider",[[900,"40vw"],[null,"30vw"]],1)
    slider.activate()
    //Adding the window resize triggering
})