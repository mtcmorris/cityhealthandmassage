(function() {
  var Loader, Slider, Timer;

  Slider = (function() {

    function Slider(target, options) {
      var self;
      this.target = target;
      this.options = options;
      self = this;
      this.target = this.target;
      this.options = this.options;
      this.loader = new Loader(this);
      this.timer = new Timer(this);
      this.timer.start();
    }

    Slider.prototype.show = function(index) {
      this.index = index;
      return this.loader.load(index);
    };

    Slider.prototype.setTitle = function(text) {
      var self;
      self = this;
      return $(this.options.title_target).fadeOut(250, function() {
        $(this).html(text);
        return $(self.options.title_target).fadeIn(250);
      });
    };

    return Slider;

  })();

  Timer = (function() {

    function Timer(parent) {
      this.parent = parent;
      this.parent = this.parent;
      this.tick = null;
    }

    Timer.prototype.start = function() {
      var self;
      self = this;
      return this.tick = setInterval((function() {
        return self.parent.loader.next();
      }), 8000);
    };

    Timer.prototype.stop = function() {
      var self;
      self = this;
      if (this.tick !== null) return clearInterval(self.tick);
    };

    return Timer;

  })();

  Loader = (function() {

    function Loader(parent) {
      this.parent = parent;
      this.parent = this.parent;
      this.slides = $('figure', this.parent.target);
    }

    Loader.prototype.next = function() {
      var currentSlide, next, self;
      self = this;
      currentSlide = $('figure:visible', $(self.parent.target));
      if (currentSlide.next().length === 1) {
        next = currentSlide.next();
      } else {
        next = this.slides.first();
      }
      return self.transition(currentSlide, next);
    };

    Loader.prototype.transition = function(current, target) {
      var self;
      self = this;
      self.parent.isAnimating = true;
      if (current.length > 0) {
        $(target).show();
        $(this.parent.target).css('height', $(target).height());
        $(target).css({
          'zIndex': '1'
        });
        return $(current).fadeOut(1500, function() {
          self.parent.isAnimating = false;
          $(target).css({
            'zIndex': '2'
          });
          return $(this).parent().css({
            'zIndex': '1'
          });
        });
      } else {
        $(target).fadeIn(1500, function() {
          return self.parent.isAnimating = false;
        });
        return $(target).css({
          'zIndex': '2'
        });
      }
    };

    return Loader;

  })();

  $(function() {
    $.fn.slider = function(options) {
      var SliderOptions;
      SliderOptions = {
        'pagination_target': null,
        'title_target': null,
        'indicatorFadeInSpeed': 400,
        'indicatorFadeOutSpeed': 200
      };
      options = $.extend({}, SliderOptions, options);
      return this.each(function() {
        return new Slider(this, options);
      });
    };
    if ($('#gallery').length !== 0) $('#gallery').slider();
    if ($('#tagline').length !== 0) return $('#tagline').slider();
  });

}).call(this);
