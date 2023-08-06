/* Slider structure:
<div class="slider">
    <div class="imgs">
        <div class="img" id="prev"><img src="../../resources/img/cat.png" alt="" class="link" id="/"></div>
        <div class="img" id="active"><img src="../../resources/img/cat-green.png" alt=""></div>
        <div class="img" id="next"><img src="../../resources/img/cat-red.png" alt=""></div>
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
    constructor(tag,resize_params,index=0){
        console.log("test")
        //Initializing the variables
        this.error=false
        this.slider=tag
        this.images= tag+" .img"
        this.index=index-1
        if(this.index<0){this.index=0}
        //Checking if slider can be displayed
        this.maxIndex= $(this.images).toArray().length-1
        if(this.maxIndex<=2){this.showError("Not enough elements in the slider")}
        //More vars
        this.nextIndex=this.index+1
        if(this.nextIndex>this.maxIndex){this.nextIndex=0}
        this.prevIndex= this.index-1
        if(this.prevIndex<0){this.prevIndex=this.maxIndex}
        
        //Showing the first image and setting previous and next image
        $($(this.images).toArray()[this.index]).attr("id","active")
        $($(this.images).toArray()[this.nextIndex]).attr("id","next")
        $($(this.images).toArray()[this.prevIndex]).attr("id","prev")

        //Initializing more vars
        this.right_arrow= tag+ " #right-arrow"
        this.left_arrow= tag+ " #left-arrow"

        //Check if the images are links and adding styles and triggering if they are
        $(this.images+">img").each(function(){
            if($(this).hasClass("link")){
                //Adding styles
                $(this).css("cursor","pointer")
                //Redirect to link if clicked
                var link= $(this).attr("id")
                $(this).on("click",function(){
                    $(location).attr("href",link)
                })
            }
        })

        //Checking for the custom size change and setting vars
        this.resize_params=resize_params
        this.last_window_size_index=-1
        this.window_resize(this)

        //Adding the trigger event
        let $this=this
        $(window).on("resize",function(){
            $this.window_resize($this)
        })
    }

    //Updates the elements size depending on sliders
    updateElementsSize(){
        this.ImgwidthValue= parseInt(this.getValue(this.Imgwidth)[0])
        this.ImgwidthUnit= this.getValue(this.Imgwidth)[1]
        $(this.slider +" .imgs").css("height",this.Imgwidth)
        $(this.images).css("width",this.Imgwidth)
        this.deleteImgStyles()
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
        var valueValue= value.match(/\d+/gi)[0]
        var valueUnit= value.match(/[^0-9]+/)[0] //Error
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

    //Showing error if not enough elements in slider
    showError(_text){
        this.error=true
        $(this.slider).text("")
        $(this.slider).append(`<p>${_text}</p>`)
        $(this.slider).addClass("error")
    }

    //Update the slider width to the one passed
    updateSliderWidth(n_width){
        this.Imgwidth= n_width
        this.updateElementsSize()
    }

    //Function triggered when window has been resized
    window_resize($this){
        //Check for errors
        if($this.error){return}

        //Check for window size change and adapt if necessary
        //First check at what index of the resize_params we are at
        var changed=false
        console.log($this.resize_params)
        console.log($this.resize_params.length)
        for(let i=0; i<$this.resize_params.length;i++){
            if(i==0){
                //First item
                if($(window).width()<$this.resize_params[i][0] && $this.last_window_size_index!=i){
                    changed=true
                }
            }
            else if(i==($this.resize_params.length-1)){
                //Last item
                if($(window).width()>=$this.resize_params[i-1][0] && $this.last_window_size_index !=i){
                    changed=true
                }
            }
            else{
                //Middle items
                if(($this.resize_params[i-1][0]<=$(window).width()<$this.resize_params[i+1][0]) && $this.last_window_size_index!=i){
                    changed=true
                }
            }

            if(changed){
                $this.last_window_size_index=i
                break
            }
        }

        //Once we find the index of the new width to apply, we apply it
        $this.updateSliderWidth($this.resize_params[$this.last_window_size_index][1])
    }
}