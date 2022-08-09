function SetNum(obj){
    val=obj.value;
    re=/[^0-9]/gi;
    obj.value=val.replace(re,"");
}

function zeroPad(src) {
    var args = arguments;
    var size = 2;
    if(args.length > 1) {
        size = args[1];
    }
    var strLen = (isNaN(src) ? src.length : src.toString().length);
    size -= strLen;
    var zero = "";
    for(var i=0; i < size; i++) {
        zero += "0";
    }
    return zero + src;
}

function dateFormat(date) {
    var args = arguments;
    var sep = "-";
    if(args.length > 1) {
        sep = args[1];
    }
    return date.getFullYear() + sep + zeroPad(date.getMonth() + 1) + sep + zeroPad(date.getDate());
}

$(function(){
    var $footer_policy = $('.footer_policy');
    $('.btn_policy').on('click',function(){
        if($footer_policy.hasClass('on')){
            $footer_policy.removeClass('on');
            $footer_policy.find('.txt_box').slideUp(200);
        }else{
            $footer_policy.addClass('on');
            $footer_policy.find('.txt_box').slideDown(200);
        }
    });

    if($('.mv').length > 0){
        var mv = new Swiper('.mv',{
            speed:600,
            slidesPerView:3,
            loop:true,
            autoplay: {
                delay: 4500,
                disableOnInteraction:false
            },
            navigation: {
                nextEl: '.mv_next',
                prevEl: '.mv_prev'
            },
            pagination: {
                clickable:true,
                el: '.mv_pagination'
            },
            breakpoints: {
                1024: {
                    slidesPerView:1
                }
            }

        });

    }




    winH();
    $(window).on('load resize scroll',function(){
        winH();
    });


    resizeCont();
    $(window).on('load resize',function(){
        resizeCont();
    });



    $('.toggle_tab').on('click',function(){
        var $tabs = $(this).parents('.select_sticker').find('.tabs');
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $tabs.removeClass('on');
        }else{
            $(this).addClass('on');
            $tabs.addClass('on');
        }
    });

    $('.tab_btn').on('click',function(){
        var $idx = $(this).index();
        //console.log($idx);
        $(this)
            .addClass('on')
            .siblings('.tab_btn')
            .removeClass('on');
        $(this)
            .parents('.tabs')
            .find('.sticker_set')
            .eq($idx)
            .addClass('on')
            .siblings('.sticker_set')
            .removeClass('on');
    });

    $('.btn_reply').on('click',function(){
        var $reply_set = $(this).parents('.comment_set').find('.comment_reply');
        if($reply_set.hasClass('on')){
            $reply_set.removeClass('on')
        }else{
            $reply_set.addClass('on')
        }

    });



    //dep2메뉴 스크롤
    dep2Scroll();
    $(window).on('load resize',function(){
        dep2Scroll();
    });



    $('.btn_nav').on('click',function(){
        $(this).toggleClass('on');
        $('.nav_all').toggleClass('on');
    });
    $('.close_nav_all').on('click',function(){
        $('.btn_nav').removeClass('on');
        $('.nav_all').removeClass('on');
    });


    $('.nav_all .btn_dep2').on('click',function(){
        var $dep2 = $(this).parents('.nav_all_item');
        //$('.nav_all_item').removeClass('on');
        if($dep2.hasClass('on')){
            $dep2.removeClass('on');
        }else{
            $dep2.addClass('on');
        }

    });

    if(isMobile()){
        $('#tab_bar').css({'display':'block'});
        $('.footer').addClass('mobile');
    }else{
        $('#tab_bar').css({'display':'none'});
        $('.footer').removeClass('mobile');
    }

});


function height_resize(target){
    var $this = $(target);
    var heights = $this.map(function (){
        return $(this).outerHeight();
    }).get();
    maxHeight = Math.max.apply(null, heights);
    $this.each(function(){
        $(this).outerHeight(maxHeight);
    });
}



function closeToolTip(target){
    $(target).parents('.pp_tooltip').removeClass('on');
}


function dep2Scroll(){
    if($('.menu_dep2_list').length > 0){
        var li_item = $('.menu_dep2_link.on').parents('.menu_dep2_item');
        var li_pos = li_item.position().left;
        //console.log(li_pos);
        $('.menu_dep2_list').animate({'scrollLeft':li_pos},0);
    }

}


function resizeCont(){
    let ovH = $('.oc_vid_area').outerHeight();
    $('.oc_list_area_inner').outerHeight(ovH);


    let mtvH = $('.main_tv_vid_area').outerHeight();
    $('.main_tv_list_area_inner').outerHeight(mtvH);
}


function winH(){
    $('.wihH').outerHeight($(window).height());
    $('.minWihH').css({'min-height':$(window).height() - 130});
}






//레이어 팝업 닫기
function close_popup(target){
    var $this = $(target);
    $this.parents('.layer_popup').removeClass('on');
}

//레이어 팝업 열기
function open_popup(target){
    let popupName = $(target).data('popup');
    $('.layer_popup.'+popupName).addClass('on');
}


//글자수 체크
function countChar(val,limit) {
    var len = val.value.length;
    if (len >= limit) {
        val.value = val.value.substring(0, limit);
        $(val).siblings('.limit_info').find('.current').html(limit);
    } else {
        $(val).siblings('.limit_info').find('.current').html(len);
    }
};


// 베스트 댓글 컨텐츠 토글버튼
function toggle_comment_cont(target){
    var $this = $(target);
    $this.parents('.comment_area_cont').toggleClass('on');
}

//콤마
function addComma(value){
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return value;
}

// Hide Header on on scroll down
let didScroll = false;
let lastScrollTop;
let delta = 5;
let navbarHeight = $('.header').outerHeight();




$(window).scroll(function(event){
    //$('#header').addClass('scrolled');
    didScroll = true;
});


setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 0);

function hasScrolled() {
    var st = $(this).scrollTop();
    var tab_bar = $('#tab_bar');
    var tab_bar_h = tab_bar.outerHeight();
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    if (st > lastScrollTop && st > navbarHeight){

        $('#header, .tab_bar').removeClass('nav-up').addClass('nav-down');
        /*
        if((st + vh) > ($('#footer').offset().top + $('.tab_bar ').outerHeight())){
            $('.tab_bar').addClass('nav-up').removeClass('nav-down');
        }else{
            $('.tab_bar').removeClass('nav-up').addClass('nav-down');
        }
        */

        if($('#tab_bar').length > 0){
            if($('#tab_bar').offset().top > ($('#footer').offset().top + tab_bar_h) ){
                $('#tab_bar').addClass('visible');
            }else{

               //tab_bar.removeClass('visible');
            }
        }

    } else {
        if(st + $(window).height() < $(document).height()) {
            $('#header, .tab_bar').removeClass('nav-down').addClass('nav-up');
            $('#tab_bar').removeClass('visible');

        }
    }
    lastScrollTop = st;
}



function isMobile(){
	var UserAgent = navigator.userAgent;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        return true;
    }else{
        return false;
    }
}





