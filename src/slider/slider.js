/* Slider structure:
<div class="slider">
    <div class="img main"><img src="../../resources/img/cat-blue.png" alt=""></div>
    <div class="img next"><img src="../../resources/img/cat-green.png" alt=""></div>
    <div class="img"><img src="../../resources/img/cat-red.png" alt=""></div>
    <div class="img"><img src="../../resources/img/cat-white.png" alt=""></div>
    <div class="img previous"><img src="../../resources/img/cat.png" alt=""></div>
</div>
*/
class Slider{
    constructor(tag,index=0){
        //Initializing the variables
        this.slider=tag
        this.images= tag+" .img"
        this.index=index-1
        this.maxIndex= $(this.images).toArray().length-1
        this.nextIndex=this.index+1
        if(this.nextIndex>this.maxIndex){this.nextIndex=0}
        this.previousIndex= this.index-1
        if(this.previousIndex<0){this.previousIndex=this.maxIndex}

        //Checking for overflow
        if(this.index<0){this.index=0}

        //Showing the first image and setting previous and next image
        $($(this.images).toArray()[this.index]).attr("id","main")
        $($(this.images).toArray()[this.nextIndex]).attr("id","next")
        $($(this.images).toArray()[this.previousIndex]).attr("id","prev")
    }
    activate(){
        
    }
}