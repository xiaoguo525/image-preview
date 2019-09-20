import ImgPreview from "../ts/ImagePreview";
export let _Vue;
let component =  {
    props:{
        images: Array
    },
    data:function(){
        return{
            imgPreview: null
        }
    },
    mounted:function(){

        let childNodes = this.$refs.imgs.childNodes;
        childNodes = Array.prototype.filter.call(childNodes,( item => item.nodeType === 1))
        let imgPreview = new ImgPreview({
            curImg:"",
            imgs: this.images
        })
        this.imgPreview = imgPreview;
        for( let i = 0 ; i < childNodes.length; i++){
            let childNode = childNodes[i];
            childNode.addEventListener('click',function(){
                imgPreview.show(i)
            })
        }

    },
    beforeDestroy:function(){
        this.imgPreview.destroy();
    },
    template: `
        <div ref="imgs">
            <slot></slot>  
        </div>     
    `
}
let ImagePreviewVue = {
    install: function(Vue){
        if( this.installed && _Vue === Vue) return;
        _Vue = Vue;
        this.installed = true;
        Vue.component('image-preivew', this.imagePreview ) 
    },

    imagePreview: component
}

export {ImagePreviewVue};
