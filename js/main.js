$(function() {

    // 点击navIcon 切换图标 弹出nav导航栏
    var flag = true;
    $(".navIcon").click(function() {

        if (flag === true) {
            $(".navdh").hide();
            $(".close").show(function() {
                $(".nav-list").show();
            });
            flag = false;
        } else {
            $(".navdh").show();
            $(".close").hide(function() {
                $(".nav-list").hide();
            });
            flag = true;
        }
    });

    //第3屏幕3D动画效果
    //获取方向->获取进出->添加类名
    var oLi = Array.prototype.slice.call($('.skill-list li'));
    // console.log(oLi);
    //初始化
    //获取li位置信息，宽高

    //将li转换成数组
    oLi.forEach(function(ele, index) {
        ele.spec = update(ele);
        ele.addEventListener('mouseenter', function(e) {
            addClass(this, e, 'in');
        })
        ele.addEventListener('mouseleave', function(e) {
            addClass(this, e, 'out');
        });
    });

    function update(ele) {
        return {
            w: ele.offsetWidth,
            h: ele.offsetHeight
        }
    };

    function getDirection(ele, e) {
        var w = ele.spec.w,
            h = ele.spec.h;
        var x = e.offsetX - w / 2;
        var y = e.offsetY - h / 2;
        // console.log(x);
        // console.log(y);
        // 取到x,y两点的坐标
        return d = (Math.round(((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        console.log(d);
        //d的数值用于判断方向上下左右。

    };

    function addClass(ele, e, state) {
        //获取进入的方向
        var direction = getDirection(ele, e);
        var d = '';
        switch (direction) {
            case 0:
                d = '-top';
                break;
            case 1:
                d = '-right';
                break;
            case 2:
                d = '-bottom';
                break;
            case 3:
                d = '-left';
        }
        ele.className = state + d;
    };

    $("#fullpage").fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'], //定义锚链接
        menu: '#myMenu', //绑定导航栏菜单
        navigation: true,
        onLeave: function(origin, destination, direction) {
            $(".contact-row").css("opacity", 0);
            if (destination.index === 4) {
                $('.contact-title').animate({ "opacity": 1 }, 1000, function() {
                    $(".contact-text").animate({ "opacity": 1 }, 1000, function() {
                        $(".contact-icon").animate({ "opacity": 1 }, 1000);
                    });
                });
            }
        }
    });
});