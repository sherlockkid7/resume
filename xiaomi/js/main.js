$(function() {
    // 切换菜单栏显示
    $(".items #itemshow").mouseenter(function() {
        $(".hidenav").show();
    });
    $(".hidenav").mouseleave(function() {
        $(this).hide();
    });
    $(".flist li").mouseenter(function() {
        $(".flistgoods").show();
    });
    $(".flistgoods").mouseleave(function() {
        $(this).hide();
    });

    // 计时器
    var oDate = new Date();
    // var nowTime = oDate.getTime(); //现在的毫秒数
    oDate.setDate(oDate.getDate() + 1); // 设定截止时间为第二天
    var targetDate = new Date(oDate.toLocaleDateString());
    run(targetDate);

    $(window).scroll(function() {
        if ($(document).scrollTop() >= 1000) {
            $(".back").show();
        } else {
            $(".back").hide();
        }
    });


});

function run(enddate) {
    getDate(enddate);
    setInterval("getDate('" + enddate + "')", 500);
}

function getDate(enddate) {
    var oDate = new Date(); //获取日期对象
    var nowTime = oDate.getTime(); //现在的毫秒数
    var enddate = new Date(enddate);
    var targetTime = enddate.getTime(); //截止时间的毫秒数
    var second = Math.floor((targetTime - nowTime) / 1000); //截止时间距离现在的秒数

    var day = Math.floor(second / 24 * 60 * 60); //整数部分代表的是天；一天有24*60*60=86400秒 
    second = second % 86400; //余数代表剩下的秒数
    var hour = Math.floor(second / 3600); //整数部分代表小时
    second = second % 3600; //余数代表 剩下的秒数；
    var minute = Math.floor(second / 60); //整数部分代表分钟
    second %= 60;
    var h = $(".time-txt")[0];
    var m = $(".time-txt")[1];
    var s = $(".time-txt")[2];
    h.innerHTML = settime(hour);
    m.innerHTML = settime(minute);
    s.innerHTML = settime(second);

}

function settime(n) {
    return n < 10 ? '0' + n : n;
}