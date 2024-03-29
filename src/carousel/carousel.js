/* Caroussel structure:
<div class="${id}">
    <div class="items">
        <div class="item show"><img src="" alt=""></div>
        <div class="item"><img src="" alt=""></div>
        <div class="item"><img src="" alt=""></div>
        <div class="item"><img src="" alt=""></div>
    </div>
    <div class="buttons">
        <!--This part will be added dynamically-->
        <div class="button selected"></div>
        <div class="button"></div>
        <div class="button"></div>
        <div class="button"></div>
        <!--------------------------------->
    </div>
    <div class="arrows">
        <div class="left-arrow-container">
            <i class="fa-solid fa-caret-left" id="left-arrow"></i>
        </div>       
        <div class="right-arrow-container">
            <i class="fa-solid fa-caret-right" id="right-arrow"></i>
        </div>
    </div>
</div>
*/
class Carousel{
    constructor(id,index=1){
        //Initialize values
        this.id=id;
        this.buttons=this.id+" .buttons"
        this.items= this.id+" .items"
        this.index=index-1
        this.arrows= this.id+" .arrows"
        this.maxIndex= $(this.items+" .item").toArray().length-1

        //Checking for overflow
        if(this.index<0){this.index=0}
        
        //Add the buttons dynamically
        //Avoid getting mixed with class "this" and jquery "this"
        let $this=this
        $(this.items+" .item").each(function(){
            $($this.buttons).append('<div class="button"></div>')
        })

        //Show the first slide
        $($(this.items+" .item").toArray()[this.index]).addClass("show")
        $($(this.buttons+" .button").toArray()[this.index]).addClass("selected")
    }
    arrowClicked(right=true){
        //Changing to the next slide
        if(right){
            this.update(this.index+1)
        }else{
            this.update(this.index-1)
        }
    }
    update(index){
        //Checking for overlapping Array
        if(index<0){
            index=this.maxIndex
        }else if(index>this.maxIndex){
            index=0
        }

        //Unselecting the current slide
        $($(this.items+" .item").toArray()[this.index]).removeClass("show")
        $($(this.buttons+" .button").toArray()[this.index]).removeClass("selected")
        
        //Selecting the selected slide
        $($(this.items+" .item").toArray()[index]).addClass("show")
        $($(this.buttons+" .button").toArray()[index]).addClass("selected")
        this.index=index
    }
    activate(){
        //Avoid getting mixed with class "this" and jquery "this"
        let $this=this

        //Adding the functionalities to the buttons
        $(this.buttons+" .button").each(function(index){
            var button=$(this)
            button.on("click",function(){
                $this.update(index)
            })
        })

        //Adding the functionalities to the arrows
        $(this.arrows+" #left-arrow").on("click",function(){
            $this.arrowClicked(false)
        })
        $(this.arrows+" #right-arrow").on("click",function(){
            $this.arrowClicked()
        })
    }
}