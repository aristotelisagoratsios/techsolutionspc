! function($) {

    $(function() {

        "use strict"; // jshint ;_;


        /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
         * ======================================================= */

        $.support.transition = (function() {

            var transitionEnd = (function() {

                var el = document.createElement('bootstrap'),
                    transEndEventNames = {
                        'WebkitTransition': 'webkitTransitionEnd',
                        'MozTransition': 'transitionend',
                        'OTransition': 'oTransitionEnd otransitionend',
                        'transition': 'transitionend'
                    },
                    name

                for (name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name]
                    }
                }

            }())

            return transitionEnd && {
                end: transitionEnd
            }

        })()

    })

}(window.jQuery);


/* ==========================================================
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


! function($) {

    "use strict"; // jshint ;_;


    /* CAROUSEL CLASS DEFINITION
     * ========================= */

    var RSCarousel = function(element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.options.pause == 'hover' && this.$element
            .on('mouseenter, mouseover', $.proxy(this.pause, this))
            .on('mouseleave', $.proxy(this.cycle, this));

        if (this.options.paused == true) $.proxy(this.pause, this)
        if (this.options.doCycle == true && this.options.paused == false) $.proxy(this.cycle, this)

    }

    RSCarousel.prototype = {

        cycle: function(e) {
                this.paused = false
                if (this.interval) clearInterval(this.interval);
                this.options.interval &&
                    !this.paused &&
                    (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
                return this
            }

            ,
        getActiveIndex: function() {
                this.$active = this.$element.find('.item.active')
                this.$items = this.$active.parent().children()
                return this.$items.index(this.$active)
            }

            ,
        to: function(pos) {
                var activeIndex = this.getActiveIndex(),
                    that = this

                if (pos > (this.$items.length - 1) || pos < 0) return

                if (this.sliding) {
                    return this.$element.one('slid', function() {
                        that.to(pos)
                    })
                }

                if (activeIndex == pos) {
                    return this.pause().cycle()
                }

                return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
            }

            ,
        pause: function(e) {
                this.paused = true
                clearInterval(this.interval)
                this.interval = null
                return this
            }

            ,
        next: function() {
                if (this.sliding) return
                return this.slide('next')
            }

            ,
        prev: function() {
                if (this.sliding) return false
                return this.slide('prev')
            }

            ,
        slide: function(type, next) {

            var $active = this.$element.find('.item.active'),
                $next = next || $active[type](),
                isCycling = this.interval,
                direction = type == 'next' ? 'left' : 'right',
                fallback = type == 'next' ? 'first' : 'last',
                that = this,
                e

            this.sliding = true

            isCycling && this.pause()

            $next = $next.length ? $next : this.$element.find('.item')[fallback]()

            e = $.Event('slide', {
                relatedTarget: $next[0],
                direction: direction
            })


            if ($next.hasClass('active')) return

            if (this.$indicators.length) {
                this.$indicators.find('.active').removeClass('active')
                this.$element.one('slid', function() {
                    var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
                    $nextIndicator && $nextIndicator.addClass('active')
                })
            }

            if ($.support.transition && this.$element.hasClass('slide')) {
                this.$element.trigger(e)
                if (e.isDefaultPrevented()) return
                $next.addClass(type)
                $next[0].offsetWidth // force reflow
                $active.addClass(direction)
                $next.addClass(direction)
                this.$element.one($.support.transition.end, function() {
                    $next.removeClass([type, direction].join(' ')).addClass('active')
                    $active.removeClass(['active', direction].join(' '))
                    that.sliding = false
                    setTimeout(function() {
                        that.$element.trigger('slid')
                    }, 0)
                });
            } else if (!$.support.transition && this.$element.hasClass('slide')) {
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) return
                if (this.options.effect == 'slide') {
                    $active.animate({
                        left: (direction == 'right' ? '100%' : '-100%')
                    }, 600, function() {
                        $active.removeClass('active');
                        that.sliding = false;
                        setTimeout(function() {
                            that.$element.trigger('slid')
                        }, 0)
                    });

                    $next.addClass(type).css({
                        left: (direction == 'right' ? '-100%' : '100%')
                    }).animate({
                        left: '0'
                    }, 600, function() {
                        $next.removeClass(type).addClass('active');
                    });
                } else if (this.options.effect == 'fade') {
                    $active.animate({
                        opacity: '0'
                    }, 600, function() {
                        $active.removeClass('active');
                        that.sliding = false;
                        setTimeout(function() {
                            that.$element.trigger('slid')
                        }, 0)
                    });

                    $next.addClass(type).css({
                        opacity: '0'
                    }).animate({
                        opacity: '1'
                    }, 600, function() {
                        $next.removeClass(type).addClass('active');
                    });
                }
            } else {
                this.$element.trigger(e)
                if (e.isDefaultPrevented()) return
                $active.removeClass('active')
                $next.addClass('active')
                this.sliding = false
                this.$element.trigger('slid')
            }

            isCycling && this.cycle()

            return this
        }

    }


    /* CAROUSEL PLUGIN DEFINITION
     * ========================== */

    var old = $.fn.rscarousel

    $.fn.rscarousel = function(option) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('rscarousel'),
                options = $.extend({}, $.fn.rscarousel.defaults, typeof option == 'object' && option),
                action = typeof option == 'string' ? option : options.slide
            if (!data) $this.data('rscarousel', (data = new RSCarousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (action) data[action]()
            else if (options.interval) data.pause().cycle()
        })
    }

    $.fn.rscarousel.defaults = {
        //interval: 5000
    }

    $.fn.rscarousel.Constructor = RSCarousel


    /* CAROUSEL NO CONFLICT
     * ==================== */

    $.fn.rscarousel.noConflict = function() {
        $.fn.rscarousel = old
        return this
    }

    /* CAROUSEL DATA-API
     * ================= */

    $(document).on('click.rscarousel.data-api', '[data-slide], [data-slide-to]', function(e) {
        var $this = $(this),
            href, $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
            ,
            options = $.extend({}, $target.data(), $this.data()),
            slideIndex

        $target.rscarousel(options)

        if (slideIndex = $this.attr('data-slide-to')) {
            $target.data('rscarousel').pause().to(slideIndex).cycle();
        }

        e.preventDefault()
    })

    $(document).ready(function($) {
        $('body').off('click.carousel.data-api', '[data-slide]');
        $(document).off('click.carousel.data-api', '[data-slide], [data-slide-to]');
    });

}(window.jQuery);