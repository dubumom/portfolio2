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
    // $(this).css('opacity', 0);s
  }
  
}

//   let $imageSequence = $('.image-sequence');
//   let $images = $imageSequence.find('img');
//   let $frameLength = $images.length;
//   let $currentFrame = 0;
//   let $isSticky = false; // 스티키 상태 여부를 나타내는 변수

//   // 초기 설정: 첫 번째 이미지 보이기
//   $images.hide();
//   $images.eq($currentFrame).show();

//   $(window).on('scroll', function() {
//     let windowTop = $(window).scrollTop();
//     let sequenceTop = $imageSequence.offset().top;
//     let sequenceHeight = $imageSequence.outerHeight();
//     let windowHeight = $(window).height();

//     // 현재 섹션이 화면의 상단에 닿았을 때 스티키로 설정
//     if (windowTop >= sequenceTop && windowTop <= sequenceTop + sequenceHeight - windowHeight) {
//       if (!$isSticky) {
//         $isSticky = true;
//         $imageSequence.css({
//           'position': 'fixed',
//           'top': 0,
//           'left': 0,
//           'width': '100%',
//           'z-index': 100
//         });
//       }
//     } else {
//       if ($isSticky) {
//         $isSticky = false;
//         $imageSequence.css({
//           'position': 'static'
//         });
//       }
//     }
//   });

//   $(window).on('mousewheel', function(event) {
//     if (event.originalEvent.deltaY > 0) {
//       // 휠을 아래로
//       nextSection();
//     } else {
//       // 휠을 위로
//       prevSection();
//     }
//   });

//   function nextSection() {
//     if ($currentFrame < $frameLength - 1) {
//       $currentFrame++;
//       showFrame($currentFrame);
//     } else {
//       // 이미지가 모두 보일 경우 스티키 상태 해제
//       if ($isSticky) {
//         $isSticky = false;
//         $imageSequence.css({
//           'position': 'static'
//         });
//       }
//     }
//   }

//   function prevSection() {
//     if ($currentFrame > 0) {
//       $currentFrame--;
//       showFrame($currentFrame);
//     }
//   }

//   function showFrame(index) {
//     $images.hide();
//     $images.eq(index).show();
//   }


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
