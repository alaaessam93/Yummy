let aboutOffset = $('#about').offset().top;

$(window).scroll(function(){
    let wScroll = $(window).scrollTop();
    if (aboutOffset < wScroll){
        $('#main-nav').css({'backgroundColor': 'rgba(0,0,0,0.7)'});
        $('#btnUp').fadeIn(500)
    }else{
        $('#main-nav').css({'backgroundColor': 'transparent'});
        $('#btnUp').fadeOut(500)

    }
})

$('#btnUp').on('click', function(){
    $('body').animate({scrollTop: '0px'}, 500)
})