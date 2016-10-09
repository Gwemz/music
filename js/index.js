$(function () {
    var audio = $('audio').get(0);
    var musics = [
        {
            path: 'musics/爱的代价.mp3',
            name: '爱的代价',
            album: ' 老炮儿 电影原声带',
            author: '冯小刚',
            duration: '03:41',
            imgsrc: './imgs/爱的代价.jpg',
            bgcolor: 'rgba(64, 32, 32,.35)'
        },
        {
            path: 'musics/大好时光.mp3',
            name: '大好时光',
            album: ' 大好时光 电视剧原声带',
            author: '赵可',
            duration: '03:30',
            imgsrc: './imgs/大好时光.jpg',
            bgcolor: 'rgba(224, 32, 96,.35)'
        },
        {
            path: 'musics/时光.mp3',
            name: '时光',
            album: '时光·漫步',
            author: '许巍',
            duration: '05:50',
            imgsrc: './imgs/时光.jpg',
            bgcolor: 'rgba(32, 32, 64,.35)'
        },
        {
            path: 'musics/一次就好.mp3',
            name: '一次就好',
            album: '夏洛特烦恼 电影原声带',
            author: '杨宗纬',
            duration: '04:26',
            imgsrc: './imgs/一次就好.jpg',
            bgcolor: 'rgba(224, 160, 0,.35)'
        },
        {
            path: 'musics/无衣.aac',
            name: '无衣',
            album: '我是特种兵之霹雳火 电视原声带',
            author: '阚立文',
            duration: '02:40',
            imgsrc: './imgs/无衣.jpg',
            bgcolor: 'rgba(32, 32, 64,.35)'
        },
        {
            path: 'musics/你最珍贵.mp3',
            name: '你最珍贵',
            album: '不后悔',
            author: '张学友;高慧君 -',
            duration: '04:47',
            imgsrc: './imgs/你最珍贵.jpg',
            bgcolor: 'rgba(32, 32, 64,.35)'
        }
    ]

    // console.log(musics[0].duration);
    //当歌曲下载完之后调用函数
    /*audio.oncanplay=function(){
     duration=audio.duration;
     }*/
    var play = $('.controler .play');
    var progress = $('.controler .progress');
    var move_cir = $('.circle', progress);
    var progressed = $('.progressed', progress);
    play.on('click', function () {
        $(this).toggleClass('pause');
        //判断播放器的播放状态,当暂停时点击执行播放语句,当播放时点击执行暂停语句
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    //声明音量
    var shengying;
    //  设置音量
    var voice = $('.controler .voice');
    voice.on('click', function () {
        $(this).toggleClass('voice_0');
        if (audio.volume) {
            audio.volume = 0;
            voice_cir
                .animate({'margin-left': +voice_progress.width() * shengying - 10 + 'px'}, 500);
            progressed2
                .animate({'width': +voice_progress.width() * shengying + 'px'}, 500)
        } else {
            audio.volume = shengying;
            voice_cir
                .animate({'margin-left': +voice_progress.width() * audio.volume - 10 + 'px'}, 500)
            progressed2
                .animate({'width': +voice_progress.width() * audio.volume + 'px'}, 500);
        }
    })

    //点击音量进度条
    var voice_progress = $('.voice_progress');
    var voice_cir = $('.circle', voice_progress);
    voice_cir.css({'margin-left': '' + (voice_progress.width() - 10) + 'px'});
    var progressed2 = $('.progressed', voice_progress);
    progressed2.css({'width': '' + voice_progress.width() + 'px'});
    voice_progress.on('click', function (e) {
        voice_cir.on('click', function () {
            return false;
        })
        voice_cir
            .animate({'margin-left': '' + (e.offsetX - 10) + 'px'}, 500);
        progressed2
            .animate({'width': '' + (e.offsetX) + 'px'}, 500);
        audio.volume = e.offsetX / voice_progress.width();
        shengying = audio.volume;
    })
    //拖拽音量进度条
    /*voice_cir.on('mousedown',function(){
     $(this).on('mousemove',function(e){
     // console.log(e.offsetX);
     audio.volume=e.offsetX/voice_progress.width();
     shengying=audio.volume;
     })
     })*/

    var index = 0;
    //获取总时长
    var duration;
    //点击切换下一首
    var next = $('.controler .next');
    var header_name = $('.line_con .header_name');
    next.on('click', function () {
        index++;
        if (index >= musics.length) {
            index = 0;
        }
        duration = musics[index].duration;
        $('#zong').text(duration);
        play.addClass('pause');
        audio.src = musics[index].path;
        uls.find('li a').removeClass('active');
        $(uls[index]).find('li a').addClass('active');
        tupian.src = musics[index].imgsrc;
        mask.css({'background-color': '' + musics[index].bgcolor + ''});
        music_name.innerHTML = musics[index].name;
        music_singer.innerHTML = musics[index].author;
        music_album.innerHTML = musics[index].album;
        $(header_name).find('span').removeClass('active');
        audio.play();
        $(header_name[index]).find('span').addClass('active');
    })
    //点击切换到上一首
    var prev = $('.controler .prev');
    prev.on('click', function () {
        index--;
        if (index < 0) {
            index = musics.length - 1;
        }
        duration = musics[index].duration;
        $('#zong').text(duration);
        play.addClass('pause');
        audio.src = musics[index].path;
        uls.find('li a').removeClass('active');
        $(uls[index]).find('li a').addClass('active');
        tupian.src = musics[index].imgsrc;
        mask.css({'background-color': '' + musics[index].bgcolor + ''});
        music_name.innerHTML = musics[index].name;
        music_singer.innerHTML = musics[index].author;
        music_album.innerHTML = musics[index].album;
        $(header_name).find('span').removeClass('active');
        audio.play();
        $(header_name[index]).find('span').addClass('active');
    })

    //当歌曲声音变化的时候调用的函数
    audio.onvolumechange = function () {

    }
    //歌曲开始播放时调用的函数
    audio.onplay = function () {
        $(this).triggerHandler('timeupdate');
    }
    //当歌曲暂停的时候调用的函数
    audio.onpause = function () {

    }
    //获取时间
    //获取总时间
    /*var getZong=function(time){
     var min=Math.floor(time/60);
     var sec=parseInt(time%60);
     if(sec<10){
     sec='0'+sec;
     }
     if(min<10){
     min='0'+min;
     }
     return min+':'+sec;
     }*/
    //获取当前时间
    var getCurrent = function (time) {
        var min = Math.floor(time / 60);
        var sec = parseInt(time % 60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (min < 10) {
            min = '0' + min;
        }
        return min + ':' + sec;
    }
    //歌曲在播放过程中一直调用的函数
    // var currentTime;
    audio.ontimeupdate = function () {
        // currentTime = audio.currentTime;
        $('#dangqian').text(getCurrent(audio.currentTime));
        $('#zong').text(duration);
        var step = progress.width() * (audio.currentTime / audio.duration);
        move_cir.css({'margin-left': '' + step + 'px'});
        progressed.css({'width': '' + (step + 15) + 'px'});
    }
    // 点击进度条
    $('.progress').on('click', function (e) {
        move_cir.on('click', function () {
            return false;
        })
        audio.currentTime = parseInt(audio.duration * (e.offsetX / progress.width()));
        audio.ontimeupdate = function () {
            $('#dangqian').text(getCurrent(audio.currentTime));
            var step = progress.width() * (audio.currentTime / audio.duration);
            move_cir.css({'margin-left': '' + step + 'px'});
            progressed.css({'width': '' + (step + 15) + 'px'});
        }
    })

    //点击播放对应歌曲
    var con_left = $('.con_left');
    var uls = $('.line_con', con_left);
    var lis = $('li', uls);
    var tupian = $('.tupian img')[0];
    var mask = $('.bg_player_mask');
    var music_name = $('.music_name')[0];
    var music_singer = $('.music_singer')[0];
    var music_album = $('.music_album')[0];
    uls.on('click', function (e) {
        index = ($(this).index() - 1) / 2 - 1;
        audio.src = musics[index].path;
        play.addClass('pause');
        uls.find('li a').removeClass('active');
        $(this).find('li a').addClass('active');
        /*$(this).css({'background-color':'rgba(214, 214, 214, 0.5)','font-weight':'bold','box-shadow':'0 5px 20px rgba(214, 214, 214, 0.79)'});*/
        tupian.src = musics[index].imgsrc;
        mask.css({'background-color': '' + musics[index].bgcolor + ''});
        music_name.innerHTML = musics[index].name;
        music_singer.innerHTML = musics[index].author;
        music_album.innerHTML = musics[index].album;
        duration = musics[index].duration;
        $('#zong').text(duration);
        $(header_name).find('span').removeClass('active');
        audio.play();
        $(header_name[index]).find('span').addClass('active');
    })

    //一首歌曲播放完之后调用的函数
    audio.onended = function () {
        index++;
        if (index >= musics.length) {
            index = 0;
        }
        audio.src = musics[index].path;
        uls.find('li a').removeClass('active');
        $(uls[index]).find('li a').addClass('active');
        tupian.src = musics[index].imgsrc;
        mask.css({'background-color': '' + musics[index].bgcolor + ''});
        music_name.innerHTML = musics[index].name;
        music_singer.innerHTML = musics[index].author;
        music_album.innerHTML = musics[index].album;
        $(header_name).find('span').removeClass('active');
        duration = musics[index].duration;
        $('#zong').text(duration);
        audio.play();
    }
})