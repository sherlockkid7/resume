(function(window) {
    function Player($audio) {
        return new Player.prototype.init($audio);
    }
    Player.prototype = {
        constructor: Player,
        musicList: [],
        init: function($audio) {
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        currentIndex: -1,
        playMusic: function(index, music) {
            // 判断是否是同一首音乐
            if (this.currentIndex == index) {
                // 同一首音乐
                if (this.audio.paused) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            } else {
                // 不是同一首音乐
                this.$audio.attr("src", music.link_url);
                this.audio.play();
                this.currentIndex = index;
            }
        },
        prevIndex: function() {
            var index = this.currentIndex - 1;
            if (index < 0) {
                index = this.musicList.length - 1;
            }
            return index;
        },
        nextIndex: function() {
            var index = this.currentIndex + 1;
            if (index > this.musicList.length - 1) {
                index = 0;
            }
            return index;
        },
        changeMusic: function(index) {
            // 删除对应的数据
            this.musicList.splice(index, 1);
            // 判断当前删除的是否是正在播放音乐的前面的音乐
            if (index < this.currentIndex) {
                this.currentIndex = this.currentIndex - 1;
            }
        },
        musicTimeUpdate: function(callBack) {
            var $this = this;
            this.$audio.on("timeupdate", function() {
                var duration = $this.audio.duration;
                var currentTime = $this.audio.currentTime;
                var timeStr = $this.formatDate(currentTime, duration);
                callBack(currentTime, duration, timeStr);
            });
        },
        formatDate: function(currentTime, duration) {
            // 定义格式化时间的方法
            var endm = parseInt(duration / 60);
            var ends = parseInt(duration % 60);
            endm = (endm < 10) ? '0' + endm : endm;
            ends = (ends < 10) ? '0' + ends : ends;

            var startm = parseInt(currentTime / 60);
            var starts = parseInt(currentTime % 60);
            startm = (startm < 10) ? '0' + startm : startm;
            starts = (starts < 10) ? '0' + starts : starts;
            return startm + ":" + starts + " / " + endm + ":" + ends;

        },
        musicSeekTo: function(value) {
            if (isNaN(value)) return;
            this.audio.currentTime = this.audio.duration * value;
        },
        musicVoiceSeekTo: function(value) {
            if (isNaN(value)) return;
            if (value < 0 || value > 1) return;
            this.audio.volume = value;
        }
    }
    Player.prototype.init.prototype = Player.prototype;
    window.Player = Player;
}(window));