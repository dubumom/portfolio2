

// chart 에니메이션
let chart = $('.chart');
let excuted = false;

$(window).scroll(function(){
  let sct = $(this).scrollTop();
  if(sct >= chart.offset().top - $(window).height()/2){
    if(!excuted){
      startAnimation();
      excuted = true;
    }
  }
});

function startAnimation(){

  chart.each(function(){
    let h2 = $(this).find('h2');
    let circle = $(this).find('circle');
    let targetNum = h2.attr('data-num');

    $({rate:0}).animate({rate:targetNum},{
      duration:1500, 
      progress:function(){
        let now = Math.floor(this.rate);
        let offset = 628 - (628*now/100);
        h2.text(now);
        //circle의 stroke-dashoffset의 값을 css 메서드 변경
        circle.css({strokeDashoffset:offset});
      }
    });
  });
}

//wheel 에니메이션
  //휠 애니메이션
  $imageSequence = $('.image-sequence');
  $images = $imageSequence.find('img');
  $frameLength = $images.length;
  $velocity = 0;
  $counter = 0;
  timer = null;
  $currentFrame = 0;

  $imageSequence.on('mousewheel', function(event, delta) {
      //아래 -1, 위 1
      if(delta > 0){
        //휠을 위로        
        $velocity -= 1.5;
      }else{
        //휠을 아래로
        $velocity += 1.5;
      }
      startAnimation();
  });

  function startAnimation(){
    if(!timer){
      timer = setInterval(animateSequence, 1000/30);
    }
  }
  function stopAnimation(){
    clearInterval(timer);
    timer = null;
  }

  function animateSequence(){
    let $nextFrame ;
    $velocity *= 0.9;
    console.log($velocity);
    if($velocity > -0.00001 && $velocity<0.00001){
      stopAnimation();
    } else{
      $counter = ($counter + $velocity) % $frameLength;      
    }
    $nextFrame = Math.floor($counter);
    

    if($currentFrame !== $nextFrame){
      //console.log($currentFrame);
      $images.eq($nextFrame).show();
      $images.eq($currentFrame).hide();
      $currentFrame = $nextFrame;
      //console.log($currentFrame, $nextFrame);
    }
    
  }

  // project 슬라이드
  const slider = $('.slider');

$(document).on('click', activate);

function activate(e){
  const items = slider.find('.item');

  e.target.matches('.next') && slider.append(items.eq(0));
  e.target.matches('.prev') && slider.prepend(items.eq(items.length -1)); 
}

// notice-swiperslide
var swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  direction: getDirection(),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    resize: function () {
      swiper.changeDirection(getDirection());
    },
  },
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

  return direction;
}