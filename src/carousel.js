/* Caroussel structure:
<div class="${id}">
    <div class="items">
        <div class="item show" style="background:red;"></div>
        <div class="item" style="background:green;"></div>
        <div class="item" style="background:yellow;"></div>
        <div class="item" style="background:violet;"></div>
    </div>
    <div class="buttons">
        <div class="button selected"></div>
        <div class="button"></div>
        <div class="button"></div>
        <div class="button"></div>
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

        //Show the first slide
        $($(this.items+" .item").toArray()[this.index]).addClass("show")
        $($(this.buttons+" .button").toArray()[this.index]).addClass("selected")
        
    }
    buttonclicked(index){
        //Unselecting the current slide
        $($(this.items+" .item").toArray()[this.index]).removeClass("show")
        $($(this.buttons+" .button").toArray()[this.index]).removeClass("selected")
        
        //Selecting the selected slide
        $($(this.items+" .item").toArray()[index]).addClass("show")
        $($(this.buttons+" .button").toArray()[index]).addClass("selected")
        this.index=index
    }
    activate(){
        let $this=this
        $(this.buttons+" .button").each(function(index){
            var button=$(this)
            button.on("click",function(){
                $this.buttonclicked(index)
            })
        })
    }
}