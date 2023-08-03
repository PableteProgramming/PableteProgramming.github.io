class Template{
    constructor(tag,file){
        this.tag=tag
        this.file=file
    }
    Append(){
        let $this=this
        jQuery.ajaxSetup({async:false})
        $.get($this.file,function(data){
            $($this.tag).append(data)
        })
        jQuery.ajaxSetup({async:true})
    }
}