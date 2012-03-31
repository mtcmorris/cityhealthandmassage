class Slider
  constructor: (@target, @options) ->
    self = this
    this.target = @target
    this.options = @options
    this.loader = new Loader(this)
    this.timer = new Timer(this)
    this.timer.start()

  show: (@index) ->
    this.loader.load(index)

  setTitle: (text) ->
    self = this
    $(this.options.title_target).fadeOut 250, ->
      $(this).html(text)
      $(self.options.title_target).fadeIn(250)


class Timer
  constructor: (@parent) ->
    this.parent = @parent
    this.tick = null

  start: ->
    self = this;
    this.tick = setInterval((-> self.parent.loader.next()), 8000)

  stop: ->
    self = this;
    if this.tick != null
      clearInterval(self.tick)


class Loader
  constructor: (@parent) ->
    this.parent = @parent
    this.slides = $('figure', this.parent.target)

  next: ->
    self = this;
    currentSlide = $('figure:visible', $(self.parent.target))
    if currentSlide.next().length == 1
      next = currentSlide.next()
    else
      next = this.slides.first()
    self.transition(currentSlide, next)

  transition: (current, target) ->
    self = this;
    self.parent.isAnimating = true
    if current.length > 0
      $(target).show()
      $(this.parent.target).css('height', $(target).height())
      $(target).css({'zIndex':'1'})
      $(current).fadeOut 1500, ->
        self.parent.isAnimating = false
        $(target).css({'zIndex':'2'})
        $(this).parent().css({'zIndex':'1'})
    else
      $(target).fadeIn 1500, ->
        self.parent.isAnimating = false
      $(target).css({'zIndex':'2'})

$ ->
  $.fn.slider = (options) ->
    SliderOptions = {
        'pagination_target':null,
        'title_target':null,
        'indicatorFadeInSpeed':400,
        'indicatorFadeOutSpeed':200
    }
    options = $.extend({}, SliderOptions, options)
    return this.each ->
        new Slider(this, options)

  if $('#gallery').length != 0
    $('#gallery').slider()
  if $('#tagline').length != 0
    $('#tagline').slider()