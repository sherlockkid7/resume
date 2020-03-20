
// 标签、商品切换 显示
// 方法一
var tabs = document.getElementById('tabs'),
    fLi = tabs.getElementsByTagName('li'),
    liLength = fLi.length,
    index = 0;


console.log(fLi);
var shopbod = document.getElementsByClassName('flashbod')[0],
    list = shopbod.getElementsByTagName('ul');

// 改变样式
function changestyle() {
    tabs.getElementsByClassName('active')[0].className = '';
    fLi[index].className = 'active';

    shopbod.getElementsByClassName('active')[0].className = 'clearfix';
    list[index].className = 'active clearfix';
}

for (var i = 0; i < liLength; i++) {
    (function (j) {
        fLi[j].onclick = function () {
            index = j;
            changestyle();
        }
    })(i);
}


// 方法二(有问题，可以实现功能，会影响后面的html代码)
// var tabs = document.getElementById('tabs'),
//     fLi = tabs.getElementsByTagName('li'),
//     liLength = fLi.length;
// var shopbod = document.getElementsByClassName('flashbod')[0],
//     list = shopbod.getElementsByTagName('ul');

// for(var i = 0;i < liLength;i++){
//     fLi[i].onclick = flashswitch;
// }

// function flashswitch(){
//     for(var i = 0;i < liLength;i++){
//         if(fLi[i] === this){
//             fLi[i].className = 'active';
//             list[i].className = 'active cleafix';
//         }else{
//             fLi[i].className = '';
//             list[i].className = 'cleafix';
//         }
//     }
// }

// 控制菜单固定

var listFixed = document.getElementById('listfixed');

window.onscroll = function () {
    var scorllDis = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (scorllDis >= 260) {
        listFixed.className = 'flist flist-fixed';
    } else {
        listFixed.className = 'flist';
    }
    console.log(scorllDis);
}