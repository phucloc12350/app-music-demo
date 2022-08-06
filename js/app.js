/**
 * 1/ Render Song 
 * 2/ scroll top 
 * 3/ play/pause/seek
 * 4/ CD route
 * 5/ next/prev 
 * 6/ random
 * 7/ next/repeat when ended
 * 8/ active song
 * 9/ scroll active song intro view
 * 10/ play song when click
*/ 
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';
const player = $('.player'); 
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const cdWidth = cd.offsetWidth;
const playBtn = $('.btn-toggle-play');
const progress = $('#progress'); 
const audio = $('#audio');
const nextSongBtn = $('.btn-next');
const prevSongBtn = $('.btn-prev');
const rdSongBtn = $('.btn-random');
const repeatSongbtn = $('.btn-repeat');
const playlist = $('.playlist');
const btnOption = $('.option');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}, 
    songs: [
        {   id:1,
           name: 'Bad Catholics',
            singer: 'Astapor (Original Mix)',
            path: './assets/music/sw2017.mp3',
            image: './assets/images/sw2017.jpg',
        }, {
            id:2,
            name: 'Cháu Lên Bar',
            singer: 'Trường Mầm Non Remix',
            path: './assets/music/chau_len_Ba_remix.mp3',
            image: './assets/images/chau-len-ba-remix.jpg',
        }, {
            id:3,
            name: 'suger tủn tủn',
            singer: 'Marron5',
            path: './assets/music/sw2017.mp3',
            image: './assets/images/sw2017.jpg',
        },
        { id:4,
            name: 'suger bủn bủn 2',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        },
        { id:5,
            name: 'suger bủn bủn 3',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        },
        {
            id:6,
            name: 'suger bủn bủn 3',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        },
        {id:7,
            name: 'suger bủn bủn 4',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        }
        ,
        {id:8,
            name: 'suger bủn bủn 5',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        },
        {id:9,
            name: 'suger bủn bủn 6',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        },
        {id:10,
            name: 'suger bủn bủn 7',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        },
        {id:11,
            name: 'suger bủn bủn 8',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        },
        {id:12,
            name: 'suger bủn bủn 9',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
        }],
    listAdd:[{
        id:1,
        name: 'Bad Catholics',
         singer: 'Astapor (Original Mix)',
         path: './assets/music/sw2017.mp3',
         image: './assets/images/sw2017.jpg',
        },
        {id:12,
            name: 'suger bủn bủn 9',
            singer: 'Marron5',
            path: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg',
            image: 'https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg', 
        }
        ],
    setConfig: function(key,value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    renderSong: function () {
        const render = app.songs.map((song,index) => {
            return `<div class="song item-song-${song.id} ${index===this.currentIndex ? 'active' : ''} " data-item="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i> 
                <div class="option__list">
                    <div class="option__header">
                        <div class="option__thumb" style="background-image: url('${song.image}')"> </div>
                        <div class="option__body">
                            <h3 class="option__title">${song.name}</h3>
                            <p class="option__author">${song.singer}</p>
                        </div>
                    </div>
                    <div class="option__choose">
                        <ul>
                            <li class="option__add"><i class="fa fa-heart-o"></i>Thêm vào Album</li>
                            <li class="option__delete"><i class="fas fa-times"></i>xóa</li>
                        </ul> 
                    </div>
                    <div class="option__close"></div>
                </div>
              
            </div>
        </div> ` 
        })
        playlist.innerHTML = render.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = 'url(' + this.currentSong.image + ')';
        audio.src = this.currentSong.path; 
    },
    loadCongif:function(){
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    }
    ,
    handlerEvent: function () { 
        const _this = this;
        
        // xử lý phóng to/ thu nhỏ ảnh thumb
        document.onscroll = function () {
            const scrollWindow = window.screenY || document.documentElement.scrollTop;
            const cdNewWidth = cdWidth - scrollWindow;
            cd.style.width = cdNewWidth > 0 ? cdNewWidth + 'px' : 0;
            cd.style.opacity = cdNewWidth / cdWidth; 
        }
        // xử lý rotate 
      const cdRotate = cdThumb.animate({
            transform: 'rotate(360deg)',
        },{
            duration: 10000,
            iterations:Infinity,
        })
        cdRotate.pause();
        // xử lý click play/pause
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();    
            } else {  
                audio.play();  
            };    
        }
        // bắt sự kiện nhạc được phát
        audio.onplay = function(){
            player.classList.add('playing');
            _this.isPlaying = true; 
            cdRotate.play(); 
        }
        // bắt sự kiện nhạc bị dừng 
        audio.onpause = function(){
            player.classList.remove('playing'); 
            _this.isPlaying = false; 
            cdRotate.pause();
        } 
        // bắt sự kiện cho nhạc với thanh progress
        audio.ontimeupdate = function(e){ 
            if(audio.duration){
                const propressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = propressPercent; 
            }     
        }
        // bắt sự kiện tua nhạc trên thanh progress
        progress.oninput = function(e){ 
            const seek = audio.duration / 100 * e.target.value;
            audio.currentTime = seek
        }  
        // bắt sự kiện next/prev bài hát
        nextSongBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong();
            }else{
                 _this.nextSong();
            }; 
            _this.SongScrollIntoView();
            _this.highlightSong();
            audio.play();  
        }
        prevSongBtn.onclick=function(){
            if(_this.isRandom){
                _this.playRandomSong();
            }else{
                _this.prevSong();
            } 
            _this.SongScrollIntoView();
           _this.highlightSong();
            audio.play()
        }
        // bắt sự kiện random nhạc
        rdSongBtn.onclick = function(){
            _this.isRandom = !_this.isRandom; 
            _this.setConfig('isRandom',_this.isRandom);
            rdSongBtn.classList.toggle("active", _this.isRandom); 
            
        } 
        // xử lý nút lập lại bài hát
        repeatSongbtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat',_this.isRepeat);
            repeatSongbtn.classList.toggle("active", _this.isRepeat);
            // console.log( _this.isRepeat)
        }
         // next when ended
         audio.onended = function(){ 
            if(_this.isRepeat){
                audio.play(); 
            }else{
                nextSongBtn.click();  
            } 
        }
        // xử lý ấn vào bài hát thì nghe luôn
        playlist.onclick = function(e){
            console.log(e.target)
            const songNode = e.target.closest('.song:not(.active)'); 
            const optionNode = e.target.closest('.song .option');
            if( songNode || optionNode) { 
                if(songNode){
                   _this.currentIndex = Number(songNode.dataset.item); 
                //    console.log(  _this.currentIndex + "|" + songNode.dataset.item );
                   _this.loadCurrentSong();
                    _this.highlightSong();
                   audio.play(); 
                } 
                if(optionNode){
                    optionNode.classList.add('active');
                }
            }       
        }
     
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex =  this.songs.length -1;
        } 
        
        this.loadCurrentSong();
    },
    nextSong:function () {
        this.currentIndex++; 
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }  
        this.loadCurrentSong();
    },
    playRandomSong:function(){
        let rdSong;
        do{
            rdSong= Math.floor(Math.random() * this.songs.length);
        } while( rdSong === this.currentIndex);
        // console.log(rdSong);
        this.currentIndex = rdSong;
        this.loadCurrentSong();
    }, 
    highlightSong:function(){ 
        $('.song.active').classList.remove('active');
        $('.playlist .item-song-'+this.songs[this.currentIndex].id).classList.add('active');
    },
    SongScrollIntoView: function () {
        setTimeout(function(){
            $('.song.active').scrollIntoView({ 
                behavior: "smooth", 
                block: "center",
            })
        },100)
       
    },
    start: function () {
        // gắn cố hình từ config vào ứng dụng
        this.loadCongif()

        // mặc định property 
        this.defineProperties(); 

        // load bài hát hiện tại
        this.loadCurrentSong();
        
        // xử lý sự kiện event DOM
        this.handlerEvent();

        // render playlist
        this.renderSong();

        
        rdSongBtn.classList.toggle("active", this.isRandom); 
        repeatSongbtn.classList.toggle("active", this.isRepeat);
    }
}
app.start();
//  

function toast({
    title ='',
    message ='',
    type ='',
    duration}){
    const toast = $('#toast');
    if(toast){
        const main = document.createElement('div');
        main.classList.add('toast', `toast--${type}`);
        const delay = (duration/1000).toFixed(2);
        main.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`
        const icons ={
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle"
        }
        const icon = icons[type]
        const setTime = setTimeout(function() {
            toast.removeChild(main);
        },duration+1000)
        main.onclick = function(e){
            // const close = ;
            if(e.target.closest('.toast__close')){
                toast.removeChild(main);
                clearTimeout(setTime);
            }
        }   
        main.innerHTML =`
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
        toast.appendChild(main);
       
    }

}
const btnSuccess = $('.btn--success');
const btnError = $('.btn--error');

btnSuccess.onclick = function(){
    toast({
        title:'Thành Công',
        message: 'thêm vào playlist thành công!',
        type:'success',
        duration:1000
    })
}

btnError.onclick = function(){
    toast({
        title:'Thất Bại',
        message: 'thêm vào playlist Thất Bại :(',
        type:'error',
        duration:3000
    })
}
