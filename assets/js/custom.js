document.addEventListener("DOMContentLoaded", function(event) {

    var mainHeader = document.getElementsByClassName("hide-header");
    headerHeight = mainHeader.clientHeight;

    //set scrolling variables
    var scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;

    window.addEventListener('scroll', function() {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame) ?
            setTimeout(autoHideHeader, 250): requestAnimationFrame(autoHideHeader);
        }
    });

    window.onresize = function(event) {
        headerHeight = mainHeader.innerHTML = window.innerHeight;
    };

    function addClass(selector, myClass) {

        // get all elements that match our selector
        elements = document.querySelectorAll(selector);

        // add class to all chosen elements
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add(myClass);
        }
    }

    function removeClass(selector, myClass) {

        // get all elements that match our selector
        elements = document.querySelectorAll(selector);

        // remove class from all chosen elements
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove(myClass);
        }
    }

    function autoHideHeader() {

        var currentTop = window.scrollY;

        if (currentTop > 0) {
            addClass('.hide-header', 'visible-bg');
        } else {
            removeClass('.hide-header', 'visible-bg');
        }

        checkSimpleNavigation(currentTop);

        previousTop = currentTop;
        scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
        //there's no secondary nav or secondary nav is below primary nav
        if (previousTop - currentTop > scrollDelta) {
            //if scrolling up...
            removeClass('.hide-header', 'is-hidden');

        } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            //if scrolling down...

            addClass('.hide-header', 'is-hidden');
        }
    }



});

(function() {

    var backTop = document.getElementsByClassName('js-cd-top')[0],

        offset = 300,
        offsetOpacity = 1200,
        scrollDuration = 700
    scrolling = false;
    if (backTop) {
        //update back to top visibility on scrolling
        window.addEventListener("scroll", function(event) {
            if (!scrolling) {
                scrolling = true;
                (!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250): window.requestAnimationFrame(checkBackToTop);
            }
        });
        //smooth scroll to top
        backTop.addEventListener('click', function(event) {
            event.preventDefault();
            (!window.requestAnimationFrame) ? window.scrollTo(0, 0): scrollTop(scrollDuration);
        });
    }

    function checkBackToTop() {
        var windowTop = window.scrollY || document.documentElement.scrollTop;
        (windowTop > offset) ? addClass(backTop, 'cd-top--show'): removeClass(backTop, 'cd-top--show', 'cd-top--fade-out');
        (windowTop > offsetOpacity) && addClass(backTop, 'cd-top--fade-out');
        scrolling = false;
    }

    function scrollTop(duration) {
        var start = window.scrollY || document.documentElement.scrollTop,
            currentTime = null;

        var animateScroll = function(timestamp) {
            if (!currentTime) currentTime = timestamp;
            var progress = timestamp - currentTime;
            var val = Math.max(Math.easeInOutQuad(progress, start, -start, duration), 0);
            window.scrollTo(0, val);
            if (progress < duration) {
                window.requestAnimationFrame(animateScroll);
            }
        };

        window.requestAnimationFrame(animateScroll);
    }

    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    //class manipulations - needed if classList is not supported
    function hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);
        else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }

    function addClass(el, className) {
        var classList = className.split(' ');
        if (el.classList) el.classList.add(classList[0]);
        else if (!hasClass(el, classList[0])) el.className += " " + classList[0];
        if (classList.length > 1) addClass(el, classList.slice(1).join(' '));
    }

    function removeClass(el, className) {
        var classList = className.split(' ');
        if (el.classList) el.classList.remove(classList[0]);
        else if (hasClass(el, classList[0])) {
            var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
        if (classList.length > 1) removeClass(el, classList.slice(1).join(' '));
    }

})();

$(function() {

    var $container = $('.gym-range'),
        $articles = $container.children('.uk-width-1-1'),
        timeout;

    $articles.on('mouseenter', function(event) {

        var $article = $(this);
        clearTimeout(timeout);
        timeout = setTimeout(function() {

            if ($article.hasClass('active-effect')) return false;

            $articles.not($article.removeClass('blur-effect').addClass('active-effect'))
                .removeClass('active-effect')
                .addClass('blur-effect');

        }, 65);

    });

    $container.on('mouseleave', function(event) {

        clearTimeout(timeout);
        $articles.removeClass('active-effect blur-effect');

    });

});