/* Slider structure:
<div class="slider">
    <div class="imgs">
        <div class="img"><img src="../../resources/img/cat.png" alt=""></div>
        <div class="img"><img src="../../resources/img/cat-green.png" alt=""></div>
        <div class="img"><img src="../../resources/img/cat-red.png" alt=""></div>
        <div class="img"><img src="../../resources/img/cat-white.png" alt=""></div>
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
class Slider{
    constructor(tag,height,index=0){
        //Initializing the variables
        this.error=false
        this.slider=tag
        this.images= tag+" .img"
        this.index=index-1
        this.maxIndex= $(this.images).toArray().length-1
        this.height=height
        
        //Checking if slider can be displayed
        if(this.maxIndex<=2){this.showError("Not enough elements in the slider")}
        
        //Initializing more vars
        this.right_arrow= tag+ " #right-arrow"
        this.left_arrow= tag+ " #left-arrow"
        this.nextIndex=this.index+1
        if(this.nextIndex>this.maxIndex){this.nextIndex=0}
        this.prevIndex= this.index-1
        if(this.prevIndex<0){this.prevIndex=this.maxIndex}

        //Checking for overflow
        if(this.index<0){this.index=0}

        //Adding the styles depending on height
        $(this.slider +" .imgs").css("height",this.height)
        $(this.images).css("width",this.height)
        /*$(this.right_arrow).css("transform",`translateX(${this.height/1.6})`)
        $(this.left_arrow).css("transform",`translateX(${this.height/1.6})`)*/

        //Showing the first image and setting previous and next image
        $($(this.images).toArray()[this.index]).attr("id","active")
        $($(this.images).toArray()[this.nextIndex]).attr("id","next")
        $($(this.images).toArray()[this.prevIndex]).attr("id","prev")
    }
    update(right=true){
        //checking for error
        if(this.error){return}

        //Old vars
        var old_index=this.index
        var old_nextIndex= this.nextIndex
        var old_prevIndex= this.prevIndex

        //Updating indexes
        if(right){
            this.index=this.index+1
            if(this.index>this.maxIndex){this.index=0}
        }
        else{
            this.index=this.index-1
            if(this.index<0){this.index=this.maxIndex}
        }
        this.nextIndex=this.index+1
        if(this.nextIndex>this.maxIndex){this.nextIndex=0}
        this.prevIndex= this.index-1
        if(this.prevIndex<0){this.prevIndex=this.maxIndex}

        //Update graphics
        $($(this.images).toArray()[this.index]).attr("id","active")
        $($(this.images).toArray()[this.nextIndex]).attr("id","next")
        $($(this.images).toArray()[this.prevIndex]).attr("id","prev")

        //Delete the ones that have old ids
        console.log(old_index)
        console.log(old_nextIndex)
        console.log(old_prevIndex)
        if($($(this.images).toArray()[old_index]).attr("id")=="active"){$($(this.images).toArray()[old_index]).attr("id","")}
        if($($(this.images).toArray()[old_nextIndex]).attr("id")=="next"){$($(this.images).toArray()[old_nextIndex]).attr("id","")}
        if($($(this.images).toArray()[old_prevIndex]).attr("id")=="prev"){$($(this.images).toArray()[old_prevIndex]).attr("id","")}
    }
    activate(){
        //checking for error
        if(this.error){return}

        //adding the trigger events
        let $this=this
        $(this.right_arrow).on("click",function(){
            $this.update()
        })
        $(this.left_arrow).on("click",function(){
            $this.update(false)
        })
    }
    showError(_text){
        this.error=true
        $(this.slider).text("")
        $(this.slider).append(`<p>${_text}</p>`)
        $(this.slider).addClass("error")
    }
}