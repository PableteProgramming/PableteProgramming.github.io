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
    constructor(tag,ImgWidth,index=0){
        //Initializing the variables
        this.error=false
        this.slider=tag
        this.images= tag+" .img"
        this.index=index-1
        this.maxIndex= $(this.images).toArray().length-1
        this.Imgwidth=ImgWidth
        this.ImgwidthValue= parseInt(this.getValue(this.Imgwidth)[0])
        this.ImgwidthUnit= this.getValue(this.Imgwidth)[1]
        
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

        //Showing the first image and setting previous and next image
        $($(this.images).toArray()[this.index]).attr("id","active")
        $($(this.images).toArray()[this.nextIndex]).attr("id","next")
        $($(this.images).toArray()[this.prevIndex]).attr("id","prev")

        //Adding the styles depending on height
        $(this.slider +" .imgs").css("height",this.Imgwidth)
        $(this.images).css("width",this.Imgwidth)
        this.addImgStyles()
        $(this.right_arrow).css("transform",`translateX(${this.ImgwidthValue/1.6}${this.ImgwidthUnit})`)
        $(this.left_arrow).css("transform",`translateX(-${this.ImgwidthValue/1.6}${this.ImgwidthUnit})`)
    }
    //Delete the dynamic transform styles for the old next and prev
    deleteImgStyles(){
        $(this.images+"#next").css("transform","")
        $(this.images+"#prev").css("transform","")
    }
    //Add the dynamic transform styles for the new next and prev
    addImgStyles(){
        $(this.images+"#next").css("transform",`translateX(${this.ImgwidthValue/2}${this.ImgwidthUnit}) scale(75%)`)
        $(this.images+"#prev").css("transform",`translateX(-${this.ImgwidthValue/2}${this.ImgwidthUnit}) scale(75%)`)
    }
    //Split value and unit
    getValue(value){
        var valueValue= this.Imgwidth.match(/\d+/gi)[0]
        var valueUnit= this.Imgwidth.match(/[^0-9]+/)[0] //Error
        return [valueValue,valueUnit]
    }
    //Updating the slider
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

        //delete old styles
        this.deleteImgStyles()

        //Update graphics
        $($(this.images).toArray()[this.index]).attr("id","active")
        $($(this.images).toArray()[this.nextIndex]).attr("id","next")
        $($(this.images).toArray()[this.prevIndex]).attr("id","prev")

        //Delete the ones that have old ids
        if($($(this.images).toArray()[old_index]).attr("id")=="active"){$($(this.images).toArray()[old_index]).attr("id","")}
        if($($(this.images).toArray()[old_nextIndex]).attr("id")=="next"){$($(this.images).toArray()[old_nextIndex]).attr("id","")}
        if($($(this.images).toArray()[old_prevIndex]).attr("id")=="prev"){$($(this.images).toArray()[old_prevIndex]).attr("id","")}
    
        //update styles
        this.addImgStyles()
    }
    //Activating the slider
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