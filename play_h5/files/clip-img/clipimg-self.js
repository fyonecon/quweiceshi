
var clipimg=Clipimg(document.querySelector('.dialog_clip'));

function demo_loadFile(files)
{
	  console.log("up-img")
    if(files.length>0)
    {
        clipimg.loadFile(files[0]);
    }
}

function demo_zoomIn()
{
    clipimg.zoomIn();
}

function demo_zoomOut()
{
    clipimg.zoomOut();
}

function demo_rotate()
{
    clipimg.rotate();
}

function demo_getDataURL()
{
    var url=clipimg.getDataURL(128);
    document.querySelector('.dialog_clipped_img').src=url;
    var key = "clip_img";
    localStorage.setItem(key, url);
    //console.log(localStorage.getItem(key));
    setTimeout("back_url()", 500);
}

function back_url(){

  window.location.replace("http://ywfbt.mukzz.pw/dist/index.html#/dashuaimai");

}
