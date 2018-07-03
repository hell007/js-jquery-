
##   html2canvas 


```

<style type="text/css">
  .test{width:150px;border:1px solid blue;position:relative;}
  .flag{position:absolute;right:10px;top:10px;color:red;}
</style>
<header>html2canvas-image</header><br/>
<div id="test" class="test">
    <span>Hello World!</span>
    <br>
    <span><h2>Are you hear me?</h2></span>
    <img src="upload/signature.png" />
    <span class="flag">test</span>
</div>

<button type="button" class="btn btn--primary" id="btnSave">button</button>

```


```
$('#btnSave').click(function(event) {
  html2canvas(document.querySelector("#test")).then(canvas => {
      //document.body.appendChild(canvas);
      convertCanvasToImage(canvas);
  });
});

function convertCanvasToImage(canvas) {
    console.log("base64图片提交====",canvas.toDataURL("image/png").replace("data:image/png;base64,", ""))
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    document.body.appendChild(image);
    return image;
}
```

## 总结

不受css非标准布局影响；

生成的图片（原来的图片有模糊）；
