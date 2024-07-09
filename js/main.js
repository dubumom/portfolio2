//header nav
const header = document.querySelector('header');
const headerOst = header.offsetTop;

window.addEventListener('scroll',()=>{
  
  let scrollAmt = window.scrollY;
  // console.log(scrollAmt);

  if(scrollAmt > 80){
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');  
  }

});
const colors = ["deepskyblue", "orange", "firebrick", "gold", "magenta", "black", "darkblue"];
const target = $('.nav-target');
const links = $('header > nav ul li a');
// console.log(links);

links.on('mouseenter', mouseEnterFunc);

// links.each(item=>{
//   item.on('mouseenter', mouseEnterFunc);
// })

function mouseEnterFunc(){
  links.on('mouseenter', function() {
    if (!$(this).parent().hasClass('active')) {
      links.parent().removeClass('active');
      $(this).parent().addClass('active');
      // $(this).css('opacity', 1);
  
      const width = $(this).outerWidth();
      const height = $(this).outerHeight();
      const offset = $(this).offset();
      const color = colors[Math.floor(Math.random() * colors.length)];
  
      // console.log(width, height, offset.left, offset.top);
      target.css({
        'width': `${width}px`,
        'height': `${height}px`,
        'left': `${offset.left}px`,
        'top': `${offset.top}px`,
        'border-color': color,
        'transform': 'none'
      });
    }
  });
}

// chart 에니메이션
let chart = $('.chart');
// let excuted = false;

$(window).scroll(function(){
  let sct = $(this).scrollTop();

  // console.log(sct);
  if(sct >= 0){
      startAnimation();
  }
});

function startAnimation(){

  chart.each(function(){
    let h2 = $(this).find('h2');
    let circle = $(this).find('circle');
    let targetNum = h2.attr('data-num');

    console.log(targetNum);
    $({rate:0}).animate({rate:targetNum},{
      duration:1500, 
      progress:function(){
        let now = Math.floor(this.rate);
        let offset = 360 - (360*now/100);
        console.log(offset);
        h2.text(now);
        //circle의 stroke-dashoffset의 값을 css 메서드 변경
        circle.css({strokeDashoffset:offset});
      }
    });
  });
}


//wheel 에니메이션
imageProgress();

function imageProgress(){
    let $container = $('.progress'),
        $bar = $container.find('.bar'),
        $text = $container.find('.rate'),
        $imgload = imagesLoaded('body'),
        $imgTotal = $imgload.images.length,
        $imgLoaded = 0,
        $current = 0,
        $progressTimer = setInterval(updateProgress, 1000/60);

    // 이미지 로드 될 때마다 할 일 (진행 중 할 일)
    $imgload.on('progress', () => {
        $imgLoaded++;
    });

    function updateProgress(){
        // 로드 완료한 이미지의 비율
        let $target = ($imgLoaded / $imgTotal) * 100;
        $current += ($target - $current) * 0.1;

        $bar.css({width: $current + '%'});
        $text.text(Math.ceil($current) + '%');

        if ($current > 99.9) {
            $current = 100;
        }

        if ($current >= 100){
            clearInterval($progressTimer);
            $container.addClass('complete');
            $container.animate({top: '-100%'}, 1000,);
        }
    }
}
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
  // console.log($velocity);
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
    // $(this).css('opacity', 0);s
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
