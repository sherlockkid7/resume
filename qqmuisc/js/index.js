$(function() {
    // 歌曲列表显示滚动条
    $(".songlist").mCustomScrollbar();

    var $audio = $("audio");
    var player = new Player($audio);
    var progress;
    var soundprogress;
    var lyric;
    //1. 动态获取音乐数据
    getPlayerList();

    function getPlayerList() {
        $.ajax({
            url: './source/musiclist.json',
            dataType: 'json',
            success: function(data) {
                player.musicList = data;
                $.each(data, function(index, ele) {
                    var item = createMusicItem(index, ele);
                    $(".songlist ul").append(item);
                });
                initMusicInfo(data[0]);
                initMusicLyric(data[0]);
            },
            error: function() {

            }
        });
    }

    //2. 初始化歌曲信息

    function initMusicInfo(music) {
        // 找到对应的元素
        var $musicImg = $(".right-pic img");
        var $musicName = $(".musicName");
        var $musicSinger = $(".musicSinger");
        var $musicAlbum = $(".muiscAublmn");
        var $songTxtName = $(".playerTop .songtxt");
        var $songTxtSinger = $(".playerTop .playname");
        var $songTime = $(".songlen");
        var $musicBg = $(".bg");

        // 元素赋值
        $musicImg.attr("src", music.cover);
        $musicName.text(music.name);
        $musicSinger.text(music.singer);
        $musicAlbum.text(music.album);
        $songTxtName.text(music.name);
        $songTxtSinger.text(music.singer);
        $songTime.text("00:00 / " + music.time);
        $musicBg.css("background", "url('" + music.cover + "')");
    }
    // 3.初始化歌词信息
    function initMusicLyric(music) {
        lyric = new Lyric(music.link_lrc);
        var $lryicContainer = $(".lyrictxt");
        // 清空上一首音乐的歌词
        $lryicContainer.html("");
        lyric.loadLyric(function() {
            // 创建歌词列表
            $.each(lyric.lyrics, function(index, ele) {
                var $item = $("<li>" + ele + "</li>");
                $lryicContainer.append($item);
            });
        });

    }

    //4. 初始化进度条
    initProgress();

    function initProgress() {
        var $proLine = $(".line");
        var $proBar = $(".bar");
        var $proCur = $(".cur");
        progress = Progress($proLine, $proBar, $proCur);
        progress.progressClick(function(value) {
            player.musicSeekTo(value);
        });
        progress.progressMove(function(value) {
            player.musicSeekTo(value);
        });

        var $soundLine = $(".soundline");
        var $soundBar = $(".soundbar");
        var $soundCur = $(".soundcur");
        soundprogress = Progress($soundLine, $soundBar, $soundCur);
        soundprogress.progressClick(function(value) {
            player.musicVoiceSeekTo(value);
        });
        soundprogress.progressMove(function(value) {
            player.musicVoiceSeekTo(value);
        });


    }
    // 5.事件委托[初始化事件监听]
    initEvents();

    function initEvents() {
        // 1.监听歌曲移入移出事件
        $(".songlist").delegate(".list_music", "mouseenter", function() {
            // 显示子菜单
            $(this).find(".songbtn").stop().fadeIn(100);
            // 隐藏时长
            $(this).find(".songtime").stop().fadeOut(100);
        });
        $(".songlist").delegate(".list_music", "mouseleave", function() {
            // 隐藏子菜单
            $(this).find(".songbtn").stop().fadeOut(100);
            // 显示时长
            $(this).find(".songtime").stop().fadeIn(100);
            $(this).find(".songtime").css("opacity", 0.5);

        });
        // 2.监听复选框点击事件
        var flag = true;
        $(".songlist").delegate(".songselect", "click", function() {
            if (flag === true) {
                $(this).find(".iconfont").show();
                $(this).css("opacity", 1);
                flag = false;
            } else {
                $(this).find(".iconfont").hide();
                $(this).css("opacity", 0.5);
                flag = true;
            }
        });
        // 3.监听子菜单播放按钮事件
        $(".songlist").delegate(".playPause", "click", function() {
            var $item = $(this).parents(".list_music");
            // 切换播放按钮
            $(this).toggleClass("playPause2");
            // 复原其它播放按钮
            $item.siblings().find(".playPause").removeClass("playPause2");
            // 同步footer播放按钮,播放状态
            if ($(this).hasClass("playPause2")) {
                $(".player").addClass("pause");
                // 文字高亮显示
                $item.find("div").css("color", "#fff");
                // 当前其它兄弟元素文字不高亮显示
                $item.siblings().find("div").css("color", "rgba(255,255,255,0.5)");
            } else {
                // 禁止播放状态
                $(".player").removeClass("pause");
                // 不高亮显示
                $item.find("div").css("color", "rgba(255,255,255,0.5)");

            }
            // 切换序号状态
            $item.find(".songnumber").toggleClass("songnumber2");
            $item.siblings().find(".songnumber").removeClass("songnumber2");
            //播放音乐
            player.playMusic($item.get(0).index, $item.get(0).music);
            // 切换歌曲信息
            initMusicInfo($item.get(0).music);
            // 3.6切换歌词信息
            initMusicLyric($item.get(0).music);
        });

        // 4.监听底部控制器中间按钮点击事件
        $(".player").click(function() {

            // 判断有没有播放过音乐
            if (player.currentIndex == -1) {
                // 没有播放过音乐
                // 让列表中第一首自动播放
                $(".list_music").eq(0).find(".playPause").trigger("click");
                console.log(1);
            } else {
                // 已经播放过
                $(".list_music").eq(player.currentIndex).find(".playPause").trigger("click");
            }
        });
        // 5.监听底部控制器上一首按钮点击事件
        $(".prev").click(function() {
            $(".list_music").eq(player.prevIndex()).find(".playPause").trigger("click");
        });

        // 6.监听底部控制器下一首按钮点击事件
        $(".next").click(function() {
            $(".list_music").eq(player.nextIndex()).find(".playPause").trigger("click");
        });
        // 7.监听删除按钮的点击
        $(".songlist").delegate(".qingkong", "click", function() {
            // 当前被点击的音乐删除
            var $item = $(this).parents(".list_music");
            // 判断当前删除的是正在播放的
            if ($item.get(0).index == player.currentIndex) {
                $(".next").trigger("click");
            }

            $item.remove();
            player.changeMusic($item.get(0).index);
            // 重新排序
            $(".list_music").each(function(index, ele) {
                ele.index = index;
                $(ele).find(".songnumber").tetx(index + 1);
            });
        });
        // 8.监听播放时间
        player.musicTimeUpdate(function(currentTime, duration, timeStr) {
                // 同步时间
                $(".songlen").text(timeStr);
                // 同步进度条
                // 计算播放比例
                var value = currentTime / duration * 100;
                progress.setProgress(value);
                // 实现歌词同步
                var index = lyric.currentIndex(currentTime);
                var $item = $(".lyrictxt li").eq(index);
                $item.addClass("showcolor");
                $item.siblings().removeClass("showcolor");

                // 实现歌词滚动
                if (index <= 2) return;
                $(".lyrictxt").css({
                    marginTop: (-index + 2) * 30
                });
            })
            // 9.监听音量播放
        $(".volume").click(function() {
            // 图标切换
            $(this).toggleClass("volume2");
            // 声音qiehuan
            if ($(this).hasClass("volume2")) {
                // 没有声音
                player.musicVoiceSeekTo(0);
            } else {
                // 变为有声音
                player.musicVoiceSeekTo(1);
            }
        })

        // 10.点击喜欢按钮切换
        $(".sound-fav").click(function() {
            $(this).toggleClass("sound-fav2");
        });
        // 11.点击播放顺序按钮切换
        $(".sound-list").click(function() {
            $(this).toggleClass("sound-list2", "sound-list3", "sound-list4");
        });
    }

    // 动态创建一行音乐列表
    function createMusicItem(index, music) {
        var tag = $('<li class="list_music">' +
            '<a href="javascript:;" class="songselect">' +
            '<i class="iconfont icon-gou"></i>' +
            '</a>' +
            '<div class="songnumber">' + (index + 1) + '</div>' +
            '<div class="songname">' +
            music.name +
            '<div class="songbtn ">' +
            '<a href="javascript:;" class="playPause" title="播放">' +
            // '<i class="iconfont icon-pause aloneicon"></i>' +
            // '<i class="iconfont hidden icon-bofang- aloneicon"></i>' +
            '</a>' +
            '<a href="javascript:;" title="添加到歌单">' +
            '<i class="iconfont icon-cross aloneicon"></i>' +
            '</a>' +
            '<a href="javascript:;" title="分享">' +
            '<i class="iconfont icon-fenxiang aloneicon"></i>' +
            '</a>' +
            '<a class="qingkong" href="javascript:;" title="删除">' +
            '<i class="iconfont icon-qingkong aloneicon"></i>' +
            '</a>' +
            '</div>' +
            '</div>' +
            ' <div class="singer">' +
            music.singer +
            '</div>' +
            ' <span class="songtime">' + music.time +
            ' </span>' +
            '</li>');
        // 绑定到原生的dom元素
        tag.get(0).index = index;
        tag.get(0).music = music;
        return tag;
    }


});