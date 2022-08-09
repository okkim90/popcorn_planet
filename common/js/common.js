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
        $('#tab_bar').css({'display':'block'});
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
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		return true;
	}else{
		return false;
	}
}





