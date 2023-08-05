var small_screen_limit=480

// Once the document is ready, add all the events
$(document).ready(function(){
    //Adding the templates elements
    header("header","../templates/header/header.html",small_screen_limit)
    footer("footer","../templates/footer/footer.html")

    //Adding the slider
    const slider= new Slider(".slider","40vh",1)
    slider.activate()
})