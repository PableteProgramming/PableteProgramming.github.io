var small_screen_limit=480

// Once the document is ready, add all the events
$(document).ready(function(){
    //Adding the templates elements
    header("header","src/templates/header/header.html",small_screen_limit)
    footer("footer","src/templates/footer/footer.html")

    //Adding the carousel
    const carousel= new Carousel(".carousel")
    carousel.activate()
})