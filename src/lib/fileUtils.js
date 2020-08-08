const base64ToBlob = (base64)=>{
    var type =base64.split(",")[0].match(/:(.*?);/)[1];//提取base64头的type如 'image/png'
    var bytes=window.atob(base64.split(',')[1]);//去掉url的头，并转换为byte (atob:编码 btoa:解码)

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);//通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type :type});
}
export {
    base64ToBlob
}
