var oPrev = document.getElementById('prev'),
    oNext = document.getElementById('next'),
    oMod = document.getElementsByClassName('mod')[0],
    oBg = document.getElementsByClassName('wrapperbg')[0];
var timer, timer2,
    flag = true;

var oList = document.getElementsByClassName('bgcircle')[0],
    oLi = oList.getElementsByTagName('a'),
    liLength = oLi.length,
    index = 0;

// 圖片移動函數
function moveImg(dis) {
    flag = false;
    var time = 600;
    var eachTime = 40;
    var eachDis = dis / (time / eachTime);
    var newLeft = oMod.offsetLeft + dis;

    function eachMove() {
        if (dis > 0 && oMod.offsetLeft < newLeft || dis < 0 && oMod.offsetLeft > newLeft) {
            oMod.style.left = oMod.offsetLeft + eachDis + 'px';
        } else {
            clearInterval(timer);
            oMod.style.left = newLeft + 'px';

            //  無縫連接
            if (newLeft == -7356) {
                oMod.style.left = -1226 + 'px';
            }
            if (newLeft == 0) {
                oMod.style.left = -6130 + 'px';
            }
            flag = true;
        }

    }

    timer = setInterval(eachMove, eachTime);
}

// 頁面上翻
oPrev.onclick = function() {
        if (flag == false) return;

        moveImg(1226);

        if (index == 0) {
            index = 4;
        } else {
            index--;
        }
        styleCircle();
    }
    // 頁面下翻
oNext.onclick = function() {
    if (flag == false) return;
    moveImg(-1226);


    if (index == 4) {
        index = 0;
    } else {
        index++;
    }
    styleCircle();
}




function styleCircle() {
    oList.getElementsByClassName('active')[0].className = '';
    oLi[index].className = 'active';
}
for (var i = 0; i < liLength; i++) {
    (function(j) {
        oLi[j].onclick = function() {
            var offset = (j - index) * -1226;
            moveImg(offset);
            index = j;
            styleCircle();
        }
    })(i);

}

//  自動輪播
timer2 = setInterval(oNext.onclick, 5000);

oBg.onmouseover = function() {
    clearInterval(timer2);
}
oBg.onmouseout = function() {
    timer2 = setInterval(oNext.onclick, 5000);
}