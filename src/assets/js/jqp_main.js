(function () {
  var support = { animations: window.Modernizr.cssanimations },
    animEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      OAnimation: 'oAnimationEnd',
      msAnimation: 'MSAnimationEnd',
      animation: 'animationend',
    },
    animEndEventName =
      animEndEventNames[window.Modernizr.prefixed('animation')],
    component = document.getElementById('j-component'),
    items = component.querySelector('ul.itemwrap').children,
    current = 0,
    itemsCount = items.length,
    isAnimating = false;

  function init() {
    window.classie.addClass(component, 'fxSlideBehind');

    window.$('#gooey-h').gooeymenu({
      bgColor: '#68d099',
      contentColor: 'white',
      style: 'horizontal',
      horizontal: {
        menuItemPosition: 'glue',
      },
      vertical: {
        menuItemPosition: 'spaced',
        direction: 'up',
      },
      circle: {
        radius: 90,
      },
      margin: 'small',
      size: 80,
      bounce: true,
      bounceLength: 'small',
      transitionStep: 100,
      hover: '#5dbb89',
    });
    setTimeout(() => {
      document.getElementById('j-menu-open').click();
      setTimeout(() => {
        document.getElementById('j-menu-open').click();
      }, 0);
    }, 0);

    const Shift = 16;
    const Left = 37;
    const Up = 38;
    const Down = 40;

    const opt1 = {
      keys: {
        Shift,
        Up,
      },
      isOrder: true,
      finishFn: () => {
        navigate('prev');
      },
    };
    const opt2 = {
      keys: {
        Shift,
        Down,
      },
      isOrder: true,
      finishFn: () => {
        navigate('next');
      },
    };
    const opt3 = {
      keys: {
        Shift,
        Left,
      },
      isOrder: true,
      finishFn: () => {
        document.getElementById('j-menu-open').click();
      },
    };

    window.Shortcuts.init(opt1);
    window.Shortcuts.init(opt2);
    // window.Shortcuts.init(opt3);
  }

  function navigate(dir) {
    if (isAnimating) return false;
    isAnimating = true;
    var cntAnims = 0;

    var currentItem = items[current];

    if (dir === 'next') {
      current = current < itemsCount - 1 ? current + 1 : 0;
    } else if (dir === 'prev') {
      current = current > 0 ? current - 1 : itemsCount - 1;
    }

    var nextItem = items[current];

    var onEndAnimationCurrentItem = function () {
      this.removeEventListener(animEndEventName, onEndAnimationCurrentItem);
      window.classie.removeClass(this, 'current');
      window.classie.removeClass(
        this,
        dir === 'next' ? 'navOutNext' : 'navOutPrev'
      );
      ++cntAnims;
      if (cntAnims === 2) {
        isAnimating = false;
      }
    };

    var onEndAnimationNextItem = function () {
      this.removeEventListener(animEndEventName, onEndAnimationNextItem);
      window.classie.addClass(this, 'current');
      window.classie.removeClass(
        this,
        dir === 'next' ? 'navInNext' : 'navInPrev'
      );
      ++cntAnims;
      if (cntAnims === 2) {
        isAnimating = false;
      }
    };

    if (support.animations) {
      currentItem.addEventListener(animEndEventName, onEndAnimationCurrentItem);
      nextItem.addEventListener(animEndEventName, onEndAnimationNextItem);
    } else {
      onEndAnimationCurrentItem();
      onEndAnimationNextItem();
    }

    window.classie.addClass(
      currentItem,
      dir === 'next' ? 'navOutNext' : 'navOutPrev'
    );
    window.classie.addClass(
      nextItem,
      dir === 'next' ? 'navInNext' : 'navInPrev'
    );
  }

  init();
})();
