// window.onload=function () {
//     let song=document.querySelector(".song");
//     let singer=document.querySelector(".singer");
//     let current=document.querySelector(".current");
//     let duration=document.querySelector(".duration");
//     let list=document.querySelector(".list");
//     let pause=document.querySelector(".pause");
//     let audio=document.querySelector("audio");
//     console.log(song, singer, current, duration,pause);
//     let i=0;
//     let data=database[i];
//     xuan(data);
//     function xuan(data) {
//         song.innerHTML=data.songs;
//         singer.innerHTML=data.name;
//         current.innerHTML="00:00";
//         duration.innerHTML=data.alltime;
//         data.lyrics.forEach((e,i)=>{
//             list.innerHTML+=`<li>${e.lyric}</li>`;
//         })
//     }
//     audio.src=data.src;
//     pause.onclick=function () {
//         pause.innerHTML="播放";
//
//     }
//
//     //
// }
window.onload=function () {
    let song=document.querySelector(".song");
    let singer=document.querySelector(".singer");
    let list=document.querySelector(".list");
    let pause=document.querySelector(".pause");
    let audio=document.querySelector("audio");
    console.log(audio);
    let i=0;
    let  data=database[i];
    xuanran(data);
    function xuanran(data){
        song.innerHTML=data.songs;
        singer.innerHTML=data.name;
        list.innerHTML="";
        data.lyrics.forEach((e,i)=>{
            list.innerHTML+=`<li>${e.lyric}</li>`;
        })
        audio.src=data.src;
        $(".duration").text(data.alltime);
    }
    $(".next").click(function () {
        i++;
        if(i>=database.length){
            i=0;
        }
        data=database[i];
        xuanran(data);
        $(".progressBar").css("width",`0`);
    })
    $(".prev").click(function () {
        i--;
        if(i<0){
            i=database.length-1;
        }
        data=database[i];
        xuanran(data);
        $(".progressBar").css("width",`0`);
    })
    pause.onclick=function () {
        if(audio.paused){
            audio.play();
            $(".pause i").removeClass("icon-zanting1");
            $(".pause i").addClass("icon-zanting");
        }else{
            audio.pause();
            $(".pause i").removeClass("icon-zanting");
            $(".pause i").addClass("icon-zanting1");
        }
    }
    audio.ontimeupdate=function () {
        let time=parseInt(audio.currentTime);
        let times=audio.duration;
        let bai=time/times*100;
        let time1=Math.floor(time/60);
        let time2=Math.round(time%60);
        if(time1<=9 && time2<=9){
            $(".current").text(`0${time1}:0${time2}`);
        }else if(time1<=9 && time2>9){
            $(".current").text(`0${time1}:${time2}`);
        }else if(time1>9 && time2>9){
            $(".current").text(`${time1}:${time2}`);
        }
        let timez=$(".current").text();
        $(".progressBar").css("width",`${bai}%`);
        for(let q=0;q<data.lyrics.length;q++){
            if(data.lyrics[q].time==timez){
                list.innerHTML="";
                for (let w=q;w<data.lyrics.length;w++){
                    list.innerHTML+=`<li>${data.lyrics[w].lyric}</li>`;
                    $(".list li").eq(0).css("color","blue");
                }
            }
        }
    }
    $(".progress").click(function (e) {
        let wid=e.offsetX;
        let width=parseInt($(".progress").css("width"));
        let bain=wid/width;
        console.log(audio.currentTime);
        console.log(audio.duration*bain);
        audio.currentTime=audio.duration*bain;
        console.log(audio.currentTime);
        console.log(audio.duration*bain);
    })
}