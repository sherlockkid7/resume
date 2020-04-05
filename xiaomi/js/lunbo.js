var oPrev = document.getElementById('prev'),
    oNext = document.getElementById('next'),
    oBg = document.getElementsByClassName('wrapperbg'),
    oMod = document.getElementsByClassName('mod')[0],
    oitems = oMod.getElementsByTagName('img');
var timer, timer2,
    flag = true;

var oList = document.getElementsByClassName('bgcircle')[0],
    oLi = oList.getElementsByTagName('a'),
    liLength = oLi.length,
    index = 0;//index表示第几张图片在展示，加上active这个类名

    
// function clearActive(){
        
//     }
function goIndex(){
    for(var i=0;i < oitems.length; i++){
        oitems[i].className='';
        oLi[i].className = ''
    }
    oitems[index].className='active';
    oLi[index].className='active';
}
    
    oPrev.onclick = function(){  
        if(index == 0){
            index = 4;
        } else{
            index--;      
        }
        console.log(index);
        goIndex();     
    }
    oNext.onclick = function(){
        if(index == 4){
            index = 0;
        }else{
            index++;
        }
        console.log(index);
        goIndex();
    }

    for(var i = 0;i<liLength;i++){
    oLi[i].onclick=function(){
            var oLiIndex = this.getAttribute('data-index');
            index = oLiIndex;
            console.log(index);
            goIndex();
    }
    } 

    //  自動輪播
timer2 = setInterval(oNext.onclick, 5000);

oBg.onmouseover = function() {
    clearInterval(timer2);
}
oBg.onmouseout = function() {
    timer2 = setInterval(oNext.onclick, 5000);
}


// // 圖片移動函數
// function moveImg(dis) {
//     flag = false;
//     var time = 600;
//     var eachTime = 40;
//     var eachDis = dis / (time / eachTime);
//     var newLeft = oMod.offsetLeft + dis;

//     function eachMove() {
//         if (dis > 0 && oMod.offsetLeft < newLeft || dis < 0 && oMod.offsetLeft > newLeft) {
//             oMod.style.left = oMod.offsetLeft + eachDis + 'px';
//         } else {
//             clearInterval(timer);
//             oMod.style.left = newLeft + 'px';

//             //  無縫連接
//             if (newLeft == -7356) {
//                 oMod.style.left = -1226 + 'px';
//             }
//             if (newLeft == 0) {
//                 oMod.style.left = -6130 + 'px';
//             }
//             flag = true;
//         }

//     }

//     timer = setInterval(eachMove, eachTime);
// }

// // 頁面上翻
// oPrev.onclick = function() {
//         if (flag == false) return;

//         moveImg(1226);

//         if (index == 0) {
//             index = 4;
//         } else {
//             index--;
//         }
//         styleCircle();
//     }
//     // 頁面下翻
// oNext.onclick = function() {
//     if (flag == false) return;
//     moveImg(-1226);


//     if (index == 4) {
//         index = 0;
//     } else {
//         index++;
//     }
//     styleCircle();
// }




// function styleCircle() {
//     oList.getElementsByClassName('active')[0].className = '';
//     oLi[index].className = 'active';
// }
// for (var i = 0; i < liLength; i++) {
//     (function(j) {
//         oLi[j].onclick = function() {
//             var offset = (j - index) * -1226;
//             moveImg(offset);
//             index = j;
//             styleCircle();
//         }
//     })(i);

// }

