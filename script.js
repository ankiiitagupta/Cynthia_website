var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
});

function firstpage(){
    var tl= gsap.timeline();

    tl.from("#nav",{
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })
    .to(".boundelem",{
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,     
    })
    .from("#homefooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
    });
}

function mousepress(){
    var xscale=1;
    var yscale=1;
    var xprev=0;
    var yprev=0;

    window.addEventListener("mousemove",function(details){
          clearTimeout(timeout);
          var xdiff= details.clientX - xprev;
          var ydiff= details.clientY - yprev;

          xscale = gsap.utils.clamp(.8,1.2, xdiff);
          yscale=gsap.utils.clamp(.8,1.2, ydiff);
      
          xprev= details.clientX;
          yprev= details.clientY;

          circlemousefollow(xscale, yscale);

          timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform =`translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
          },100);
        });      
}

function circlemousefollow(xscale, yscale){
    window.addEventListener("mousemove",function(details){
        document.querySelector("#minicircle").style.transform =`translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;

    })
}

circlemousefollow();
firstpage();
mousepress();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate=0;
    var diffrot=0;

    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            
        });
    });

    elem.addEventListener("mousemove", function(details){
        var diff =details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate ;
        rotate= details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate : gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});