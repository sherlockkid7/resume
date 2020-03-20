(function(window) {
    function Progress($proLine, $proBar, $proCur) {
        return new Progress.prototype.init($proLine, $proBar, $proCur);
    }
    Progress.prototype = {
        constructor: Progress,
        init: function($proLine, $proBar, $proCur) {
            this.$proLine = $proLine;
            this.$proBar = $proBar;
            this.$proCur = $proCur;
        },
        isMove: false,
        progressClick: function(callBack) {
            var $this = this; //此时的this是progress
            // 监听背景的点击
            this.$proLine.click(function(event) {
                // 获取背景距离窗口的位置
                var normalLeft = $(this).offset().left;
                // 获取点击位置距离窗口的位置
                var eventLeft = event.pageX;
                // 设置前景的宽度
                $this.$proBar.css("width", eventLeft - normalLeft);
                $this.$proCur.css("left", eventLeft - normalLeft);
                // 计算进度条的比例
                var value = (eventLeft - normalLeft) / $(this).width();
                callBack(value);
            });

        },
        progressMove: function(callBack) {
            var $this = this;
            // 获取背景距离窗口的位置
            var normalLeft = this.$proLine.offset().left;
            var lineWidth = this.$proLine.width;
            var eventLeft;
            // 1监听鼠标按下事件
            this.$proLine.mousedown(function() {
                $this.isMove = true;
                // 2监听鼠标移动事件
                $(document).mousemove(function(event) {

                    // 获取点击位置距离窗口的位置
                    eventLeft = event.pageX;
                    var offset = eventLeft - normalLeft;
                    if (offset >= 0 && offset <= lineWidth) {
                        // 设置前景的宽度
                        $this.$proBar.css("width", offset);
                        $this.$proCur.css("left", offset);
                    }

                });
            });

            // 3监听鼠标抬起事件
            $(document).mouseup(function() {
                $(document).off("mousemove");
                $this.isMove = false;
                // 计算进度条的比例
                var value = (eventLeft - normalLeft) / lineWidth;
                callBack(value);
            });
        },
        setProgress: function(value) {
            if (this.isMove) return;
            if (value < 0 || value > 100) return;
            this.$proBar.css({ width: value + '%' });
            this.$proCur.css({ left: value + '%' });
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
}(window));