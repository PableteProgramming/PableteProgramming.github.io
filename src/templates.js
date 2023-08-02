class Template{
    constructor(tag,file){
        this.tag=tag
        this.file=file
    }
    Append(){
        let $this=this
        $.get($this.file,function(data){
            $($this.tag).append(data)
        })
    }
}