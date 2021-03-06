const PortUi = (function() {

    const _load_init = function(){
        _addEvent();
    }

    const _addEvent = function(){
        window.addEventListener('DOMContentLoaded',_setIeError);
        window.addEventListener('scroll', _setMainScrollMotion);
        window.addEventListener('scroll',_setSubScrollMotion);
        _setMenuToggle();
        _setTxtMotion();
        _setPageTransMotion();
        _setCursor();
        _setIndicator();
    }

    const mainPage = document.querySelector('.main-wrap');
    const subPage = document.querySelector('.work-page');
    function _setIeError(){
        const agent = navigator.userAgent.toLowerCase();
        if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)){
            document.querySelector('body').style.display = 'none';
            alert('IE는 지원하지 않습니다'); 
        }
    }

    function _setMainScrollMotion(){
        let scrollVal = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const work = document.querySelector('.work');
        const workEl = document.querySelectorAll('.work > div');
        const contact = document.querySelector('.contact');
        const contactBg = document.querySelector('.trans-bg');

        if(!mainPage)return;
        function mainWork(){
            workEl.forEach(function(el) {
                if(scrollVal >=  el.offsetTop + windowHeight / 1.8) {
                    el.classList.add('view');
                }
            });
        }
        function mainTxt(){
            const aniText = document.querySelectorAll('.h-text, .bot-text');
            const scrollWrap = document.querySelector('.scroll-wrap');
            aniText.forEach(function(el){            
                el.setAttribute('style','transform:translate3d(0, '+(-scrollVal/500)+'%,0) skew(0deg, '+(scrollVal/100)+'deg); opacity:'+(1-scrollVal/550)+';');
            });
            scrollWrap.setAttribute('style','opacity:'+(1-scrollVal/550)+';');
            if(scrollVal>= work.offsetTop) {     
                document.querySelector('.h-text').setAttribute('style','transform:translate3d(0px, -2%, 0px) skew(0deg, 6deg); opacity:0;');
            }
        }
        function mainContact(){
            if(scrollVal >= contact.offsetTop - windowHeight / 1.8){
                contactBg.classList.add('up');
            }
            else {
                contactBg.classList.remove('up');
            }
        }

        mainWork();
        mainTxt();
        mainContact();
    }

    function _setSubScrollMotion(){
        let scrollVal = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const subImgEl = document.querySelectorAll('.transform');
        const paging = document.querySelector('.paging');
        const pagingBg = document.querySelector('.trans-bg');
            
        if(!subPage) return;
        function subConImg(){        
            subImgEl.forEach(function(el) {
                if(scrollVal >=  el.offsetTop  - windowHeight / 1.8) {
                    el.classList.add('active');
                }
            });
        }
        function subTxt(){
            document.querySelector('.head-img h2').style.transform = 
                'translate3d(0, '+scrollVal/35+'vh,0)';
        }
        function subPaging(){
            if(scrollVal >= paging.offsetTop - windowHeight / 1){
                pagingBg.classList.add('up');
            }
            else {
                pagingBg.classList.remove('up');
            }
        }

        subConImg();
        subTxt();
        subPaging();
    }

    function _setMenuToggle(){
        const body = document.querySelector('body');
        const nav = document.querySelector('.work-list');
        const navList = document.querySelectorAll('.list-con > div');
        const openBtn = document.querySelector('.work-btn');
        const closeBtn = document.querySelector('.close');
        
        if(!nav) return;
        openBtn.addEventListener('click',function(){
            if(!nav.classList.contains('active')){
                body.style.overflow  = 'hidden';
                nav.classList.add('active');
                closeBtn.style.pointerEvents = 'none';
                navList.forEach(function(el, index){
                    el.style.transition = 'transform 1.5s '+'0.'+index+'s ease-in-out';
                });
                setTimeout(function() {
                    closeBtn.style.pointerEvents = '';
                }, 1500);
            }
        });
        closeBtn.addEventListener('click',function(){
            body.style.overflow  = '';
            nav.classList.remove('active');
            openBtn.style.pointerEvents = 'none';
            nav.style.transition = '0.5s 2s';
            setTimeout(function() {
                openBtn.style.pointerEvents = '';
                nav.style.transition = '';
            }, 2300);
        });
    }

    function _setTxtMotion(){
        tl = new TimelineMax();
        tl.add([
            TweenMax.staggerTo('header h1, header .work-btn',1.4,{opacity:1, x:0,ease: Power3.easeOut},0.2),
            TweenMax.to('.intro .trans-text',0.7,{x:0,y:0,delay: 0.4,ease: Power3.easeOut})
        ])
        .staggerTo('.h-text p, .bot-text p',1.3,{opacity:1,y:0,rotation:0,ease: Power3.easeOut},0.2,"-=0.7")
        .to('.scroll-wrap span',1.3,{width:'100%',ease: Power3.easeOut},"-=0.7")
        .to('.scroll-wrap svg',0.8,{opacity:1},"-=0.5");

        t2 = new TimelineMax();
        t2.to('.head-img img, .back a',0.8,{opacity:1,delay: 1})
        .to('.head-img h2',1,{opacity:1,y:0,rotation:0,ease: Power3.easeOut},"-=0.5");
    }

    function _setPageTransMotion(){
        if(subPage){
            document.querySelector('body').insertAdjacentHTML('beforeEnd', "<div class='page-loader'><div class='pl1'></div><div class='pl2'></div><div class='pl3'></div></div>");
            document.querySelector('.page-loader').classList.add('visible');
            setTimeout(function() {
                document.querySelector('.page-loader').remove();
            }, 1800);
        }
    }

    function _setCursor(){
        document.querySelector('body').insertAdjacentHTML('afterBegin', "<div class='cursor'></div>");
        window.addEventListener('mousemove',function(e){
            const cursor = document.querySelector('.cursor');
            cursor.style.left = e.pageX-15 + "px";
            cursor.style.top = e.pageY-15 + "px";
        });
    }

    function _setIndicator(){
        const indicator = document.querySelector('.indicator');
        function debounce(func, wait, immediate) {
            let timeout;
            return function() {
                let context = this,
                args = arguments;
                const later = function() {
                timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                let callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
        window.addEventListener('scroll',function(){
            const moveIndicator = debounce(function() {
                let viewportHeight = window.innerHeight;
                let documentHeight = document.body.clientHeight;
                let scrollVal = window.pageYOffset;
                let percent = (scrollVal / (documentHeight - viewportHeight)) * 100;
            
                    indicator.style.top = percent + '%';
                
            }, 5);
            moveIndicator();
        });
    }

    return{
        load_init : _load_init
    }
})();
PortUi.load_init();