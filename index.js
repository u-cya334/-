windowWidth = $(window).width();
windowHeigh = $(window).height();
windowSm = 640;
$title = document.getElementById('items');
$titlePic = document.getElementById('titlePic');
$loading = document.getElementById('loading');
$loadingTxt = document.getElementById('loadingTxt')
const fontsizeChange = function(){
    $loading.style.width = windowWidth + 'px';
    $loading.style.height = windowHeigh + "px";
    if(windowWidth<=windowSm){
        console.log($title);
        console.log($title.style.fontSize);
        $titlePic.src = "https://source.unsplash.com/random/"+windowWidth+"x"+windowWidth/3
        $title.style.fontSize = 30+"px";
        console.log('hi');
    }else{
        $titlePic.src = "https://source.unsplash.com/random/"+windowWidth+"x"+windowWidth/5
        console.log('PC');
    }
}
window.onload = fontsizeChange();

let $img = $("img");

$img.on("load",function(){
    $loading.style.display = "none";
    $loadingTxt.style.display = "none";
})