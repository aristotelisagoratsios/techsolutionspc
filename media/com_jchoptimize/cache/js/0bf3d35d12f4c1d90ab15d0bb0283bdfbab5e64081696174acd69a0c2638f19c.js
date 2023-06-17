try {
    /*!
     * Bootstrap.js by @fat & @mdo
     * Copyright 2012 Twitter, Inc.
     * http://www.apache.org/licenses/LICENSE-2.0.txt
     *
     * Custom version for Joomla!
     */
    ! function(t) {
        "use strict";
        t(function() {
            t.support.transition = function() {
                var t = function() {
                    var t, e = document.createElement("bootstrap"),
                        i = {
                            WebkitTransition: "webkitTransitionEnd",
                            MozTransition: "transitionend",
                            OTransition: "oTransitionEnd otransitionend",
                            transition: "transitionend"
                        };
                    for (t in i)
                        if (void 0 !== e.style[t]) return i[t]
                }();
                return t && {
                    end: t
                }
            }()
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = '[data-dismiss="alert"]',
            i = function(i) {
                t(i).on("click", e, this.close)
            };
        i.prototype.close = function(e) {
            function i() {
                n.trigger("closed").remove()
            }
            var n, o = t(this),
                s = o.attr("data-target");
            s || (s = "#" === (s = (s = o.attr("href")) && s.replace(/.*(?=#[^\s]*$)/, "")) ? "" : s), n = t(document).find(s), e && e.preventDefault(), n.length || (n = o.hasClass("alert") ? o : o.parent()), n.trigger(e = t.Event("close")), e.isDefaultPrevented() || (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.on(t.support.transition.end, i) : i())
        };
        var n = t.fn.alert;
        t.fn.alert = function(e) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("alert");
                o || n.data("alert", o = new i(this)), "string" == typeof e && o[e].call(n)
            })
        }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
            return t.fn.alert = n, this
        }, t(document).on("click.alert.data-api", e, i.prototype.close)
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e, i) {
            this.$element = t(e), this.options = t.extend({}, t.fn.button.defaults, i)
        };
        e.prototype.setState = function(t) {
            var e = "disabled",
                i = this.$element,
                n = i.data(),
                o = i.is("input") ? "val" : "html";
            t += "Text", n.resetText || i.data("resetText", i[o]()), i[o](n[t] || this.options[t]), setTimeout(function() {
                "loadingText" == t ? i.addClass(e).attr(e, e) : i.removeClass(e).removeAttr(e)
            }, 0)
        }, e.prototype.toggle = function() {
            var t = this.$element.closest('[data-toggle="buttons-radio"]');
            t && t.find(".active").removeClass("active"), this.$element.toggleClass("active")
        };
        var i = t.fn.button;
        t.fn.button = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("button"),
                    s = "object" == typeof i && i;
                o || n.data("button", o = new e(this, s)), "toggle" == i ? o.toggle() : i && o.setState(i)
            })
        }, t.fn.button.defaults = {
            loadingText: "loading..."
        }, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
            return t.fn.button = i, this
        }, t(document).on("click.button.data-api", "[data-toggle^=button]", function(e) {
            var i = t(e.target);
            i.hasClass("btn") || (i = i.closest(".btn")), i.button("toggle")
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e, i) {
            this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
        };
        e.prototype = {
            cycle: function(e) {
                return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
            },
            getActiveIndex: function() {
                return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
            },
            to: function(e) {
                var i = this.getActiveIndex(),
                    n = this;
                if (!(e > this.$items.length - 1 || e < 0)) return this.sliding ? this.$element.one("slid", function() {
                    n.to(e)
                }) : i == e ? this.pause().cycle() : this.slide(e > i ? "next" : "prev", t(this.$items[e]))
            },
            pause: function(e) {
                return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
            },
            next: function() {
                if (!this.sliding) return this.slide("next")
            },
            prev: function() {
                if (!this.sliding) return this.slide("prev")
            },
            slide: function(e, i) {
                var n, o = this.$element.find(".item.active"),
                    s = i || o[e](),
                    a = this.interval,
                    r = "next" == e ? "left" : "right",
                    h = "next" == e ? "first" : "last",
                    l = this;
                if (this.sliding = !0, a && this.pause(), s = s.length ? s : this.$element.find(".item")[h](), n = t.Event("slide", {
                        relatedTarget: s[0],
                        direction: r
                    }), !s.hasClass("active")) {
                    if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                            var e = t(l.$indicators.children()[l.getActiveIndex()]);
                            e && e.addClass("active")
                        })), t.support.transition && this.$element.hasClass("slide")) {
                        if (this.$element.trigger(n), n.isDefaultPrevented()) return;
                        s.addClass(e), s[0].offsetWidth, o.addClass(r), s.addClass(r), this.$element.one(t.support.transition.end, function() {
                            s.removeClass([e, r].join(" ")).addClass("active"), o.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function() {
                                l.$element.trigger("slid")
                            }, 0)
                        })
                    } else {
                        if (this.$element.trigger(n), n.isDefaultPrevented()) return;
                        o.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                    }
                    return a && this.cycle(), this
                }
            }
        };
        var i = t.fn.carousel;
        t.fn.carousel = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("carousel"),
                    s = t.extend({}, t.fn.carousel.defaults, "object" == typeof i && i),
                    a = "string" == typeof i ? i : s.slide;
                o || n.data("carousel", o = new e(this, s)), "number" == typeof i ? o.to(i) : a ? o[a]() : s.interval && o.pause().cycle()
            })
        }, t.fn.carousel.defaults = {
            interval: 5e3,
            pause: "hover"
        }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
            return t.fn.carousel = i, this
        }, t(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
            var i, n, o, s = t(this),
                a = s.attr("data-target");
            a || (a = "#" === (a = (a = s.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, "")) ? "" : a), i = t(document).find(a), n = t.extend({}, i.data(), s.data()), i.carousel(n), (o = s.attr("data-slide-to")) && i.data("carousel").pause().to(o).cycle(), e.preventDefault()
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e, i) {
            this.$element = t(e), this.options = t.extend({}, t.fn.collapse.defaults, i), this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
        };
        e.prototype = {
            constructor: e,
            dimension: function() {
                return this.$element.hasClass("width") ? "width" : "height"
            },
            show: function() {
                var e, i, n, o;
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    if (e = this.dimension(), i = t.camelCase(["scroll", e].join("-")), (n = this.$parent && this.$parent.find("> .accordion-group > .in")) && n.length) {
                        if ((o = n.data("collapse")) && o.transitioning) return;
                        n.collapse("hide"), o || n.data("collapse", null)
                    }
                    this.$element[e](0), this.transition("addClass", t.Event("show"), "shown"), t.support.transition && this.$element[e](this.$element[0][i])
                }
            },
            hide: function() {
                var e;
                !this.transitioning && this.$element.hasClass("in") && (e = this.dimension(), this.reset(this.$element[e]()), this.transition("removeClass", t.Event("hideme"), "hidden"), this.$element[e](0))
            },
            reset: function(t) {
                var e = this.dimension();
                return this.$element.removeClass("collapse")[e](t || "auto")[0].offsetWidth, this.$element[null !== t ? "addClass" : "removeClass"]("collapse"), this
            },
            transition: function(e, i, n) {
                var o = this,
                    s = function() {
                        "show" == i.type && o.reset(), o.transitioning = 0, o.$element.trigger(n)
                    };
                this.$element.trigger(i), i.isDefaultPrevented() || (this.transitioning = 1, this.$element[e]("in"), t.support.transition && this.$element.hasClass("collapse") ? this.$element.one(t.support.transition.end, s) : s())
            },
            toggle: function() {
                this[this.$element.hasClass("in") ? "hide" : "show"]()
            }
        };
        var i = t.fn.collapse;
        t.fn.collapse = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("collapse"),
                    s = t.extend({}, t.fn.collapse.defaults, n.data(), "object" == typeof i && i);
                o || n.data("collapse", o = new e(this, s)), "string" == typeof i && o[i]()
            })
        }, t.fn.collapse.defaults = {
            toggle: !0
        }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function() {
            return t.fn.collapse = i, this
        }, t(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(e) {
            var i, n, o = t(this),
                s = o.attr("data-target");
            s || (e.preventDefault(), s = "#" === (s = (s = o.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "")) ? "" : s), i = (n = t(document).find(s)).data("collapse") ? "toggle" : o.data(), o[n.hasClass("in") ? "addClass" : "removeClass"]("collapsed"), n.collapse(i)
        })
    }(window.jQuery),
    function(t) {
        "use strict";

        function e() {
            t(n).parent().parent().removeClass("nav-hover"), t(".dropdown-backdrop").remove(), t(n).each(function() {
                i(t(this)).removeClass("open")
            })
        }

        function i(e) {
            var i, n = e.attr("data-target");
            return n || (n = (n = e.attr("href")) && /#/.test(n) && n.replace(/.*(?=#[^\s]+$)/, "")), n = "#" === n ? [] : n, (i = n && t(document).find(n)) && i.length || (i = e.parent()), i
        }
        var n = "[data-toggle=dropdown]",
            o = function(e) {
                var i = t(e).on("click.dropdown.data-api", this.toggle).on("mouseover.dropdown.data-api", this.toggle);
                t("html").on("click.dropdown.data-api", function() {
                    i.parent().parent().removeClass("nav-hover"), i.parent().removeClass("open")
                })
            };
        o.prototype = {
            constructor: o,
            toggle: function(n) {
                var o, s, a, r, h = t(this);
                if (!h.is(".disabled, :disabled") && (o = i(h), s = o.hasClass("open"), (r = o.parent().hasClass("nav-hover")) || "mouseover" != n.type)) {
                    if (a = h.attr("href"), "click" != n.type || !a || "#" === a) return e(), (!s && "mouseover" != n.type || r && "mouseover" == n.type) && ("ontouchstart" in document.documentElement && (t('<div class="dropdown-backdrop"/>').insertBefore(t(this)).on("click", e), h.on("hover", function() {
                        t(".dropdown-backdrop").remove()
                    })), o.parent().toggleClass("nav-hover"), o.toggleClass("open")), h.focus(), !1;
                    window.location = a
                }
            },
            keydown: function(e) {
                var o, s, a, r, h;
                if (/(38|40|27)/.test(e.keyCode) && (o = t(this), e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled"))) {
                    if (a = i(o), !(r = a.hasClass("open")) || r && 27 == e.keyCode) return 27 == e.which && a.find(n).focus(), o.click();
                    (s = t("[role=menu] li:not(.divider):visible a", a)).length && (h = s.index(s.filter(":focus")), 38 == e.keyCode && h > 0 && h--, 40 == e.keyCode && h < s.length - 1 && h++, ~h || (h = 0), s.eq(h).focus())
                }
            }
        };
        var s = t.fn.dropdown;
        t.fn.dropdown = function(e) {
            return this.each(function() {
                var i = t(this),
                    n = i.data("dropdown");
                n || i.data("dropdown", n = new o(this)), "string" == typeof e && n[e].call(i)
            })
        }, t.fn.dropdown.Constructor = o, t.fn.dropdown.noConflict = function() {
            return t.fn.dropdown = s, this
        }, t(document).on("click.dropdown.data-api", e).on("click.dropdown.data-api", ".dropdown form", function(t) {
            t.stopPropagation()
        }).on("click.dropdown.data-api", n, o.prototype.toggle).on("keydown.dropdown.data-api", n + ", [role=menu]", o.prototype.keydown).on("mouseover.dropdown.data-api", n, o.prototype.toggle)
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e, i) {
            this.options = i, this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
        };
        e.prototype = {
            constructor: e,
            toggle: function() {
                return this[this.isShown ? "hide" : "show"]()
            },
            show: function() {
                var e = this,
                    i = t.Event("show");
                this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
                    var i = t.support.transition && e.$element.hasClass("fade");
                    e.$element.parent().length || e.$element.appendTo(document.body), e.$element.show(), i && e.$element[0].offsetWidth, e.$element.addClass("in").attr("aria-hidden", !1), e.enforceFocus(), i ? e.$element.one(t.support.transition.end, function() {
                        e.$element.focus().trigger("shown")
                    }) : e.$element.focus().trigger("shown")
                }))
            },
            hide: function(e) {
                e && e.preventDefault();
                e = t.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), t.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
            },
            enforceFocus: function() {
                var e = this;
                t(document).on("focusin.modal", function(t) {
                    e.$element[0] === t.target || e.$element.has(t.target).length || e.$element.focus()
                })
            },
            escape: function() {
                var t = this;
                this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(e) {
                    27 == e.which && t.hide()
                }) : this.isShown || this.$element.off("keyup.dismiss.modal")
            },
            hideWithTransition: function() {
                var e = this,
                    i = setTimeout(function() {
                        e.$element.off(t.support.transition.end), e.hideModal()
                    }, 500);
                this.$element.one(t.support.transition.end, function() {
                    clearTimeout(i), e.hideModal()
                })
            },
            hideModal: function() {
                var t = this;
                this.$element.hide(), this.backdrop(function() {
                    t.removeBackdrop(), t.$element.trigger("hidden")
                })
            },
            removeBackdrop: function() {
                this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
            },
            backdrop: function(e) {
                var i = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var n = t.support.transition && i;
                    if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? t.proxy(this.$element[0].focus, this.$element[0]) : t.proxy(this.hide, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
                    n ? this.$backdrop.one(t.support.transition.end, e) : e()
                } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e) : e()) : e && e()
            }
        };
        var i = t.fn.modal;
        t.fn.modal = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("modal"),
                    s = t.extend({}, t.fn.modal.defaults, n.data(), "object" == typeof i && i);
                o || n.data("modal", o = new e(this, s)), "string" == typeof i ? o[i]() : s.show && o.show()
            })
        }, t.fn.modal.defaults = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
            return t.fn.modal = i, this
        }, t(document).on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
            var i, n, o = t(this),
                s = o.attr("href"),
                a = o.attr("data-target");
            e.preventDefault(), a || (a = "#" === (a = (a = s) && a.replace(/.*(?=#[^\s]+$)/, "")) ? "" : a), n = (i = t(document).find(a)).data("modal") ? "toggle" : t.extend({
                remote: !/#/.test(s) && s
            }, i.data(), o.data()), i.modal(n).one("hide", function() {
                o.focus()
            })
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(t, e) {
            this.init("tooltip", t, e)
        };
        e.prototype = {
            constructor: e,
            init: function(e, i, n) {
                var o, s, a, r, h;
                for (this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.enabled = !0, h = (a = this.options.trigger.split(" ")).length; h--;) "click" == (r = a[h]) ? this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)) : "manual" != r && (o = "hover" == r ? "mouseenter" : "focus", s = "hover" == r ? "mouseleave" : "blur", this.$element.on(o + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.leave, this)));
                this.options.selector ? this._options = t.extend({}, this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
            },
            getOptions: function(e) {
                return (e = t.extend({}, t.fn[this.type].defaults, this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
                    show: e.delay,
                    hide: e.delay
                }), e
            },
            enter: function(e) {
                var i, n = t.fn[this.type].defaults,
                    o = {};
                if (this._options && t.each(this._options, function(t, e) {
                        n[t] != e && (o[t] = e)
                    }, this), !(i = t(e.currentTarget)[this.type](o).data(this.type)).options.delay || !i.options.delay.show) return i.show();
                clearTimeout(this.timeout), i.hoverState = "in", this.timeout = setTimeout(function() {
                    "in" == i.hoverState && i.show()
                }, i.options.delay.show)
            },
            leave: function(e) {
                var i = t(e.currentTarget)[this.type](this._options).data(this.type);
                if (this.timeout && clearTimeout(this.timeout), !i.options.delay || !i.options.delay.hide) return i.hide();
                i.hoverState = "out", this.timeout = setTimeout(function() {
                    "out" == i.hoverState && i.hide()
                }, i.options.delay.hide)
            },
            show: function() {
                var e, i, n, o, s, a, r = t.Event("show");
                if (this.hasContent() && this.enabled) {
                    if (this.$element.trigger(r), r.isDefaultPrevented()) return;
                    switch (e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, e.detach().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element), i = this.getPosition(), n = e[0].offsetWidth, o = e[0].offsetHeight, s) {
                        case "bottom":
                            a = {
                                top: i.top + i.height,
                                left: i.left + i.width / 2 - n / 2
                            };
                            break;
                        case "top":
                            a = {
                                top: i.top - o,
                                left: i.left + i.width / 2 - n / 2
                            };
                            break;
                        case "left":
                            a = {
                                top: i.top + i.height / 2 - o / 2,
                                left: i.left - n
                            };
                            break;
                        case "right":
                            a = {
                                top: i.top + i.height / 2 - o / 2,
                                left: i.left + i.width
                            }
                    }
                    this.applyPlacement(a, s), this.$element.trigger("shown")
                }
            },
            applyPlacement: function(t, e) {
                var i, n, o, s, a = this.tip(),
                    r = a[0].offsetWidth,
                    h = a[0].offsetHeight;
                a.offset(t).addClass(e).addClass("in"), i = a[0].offsetWidth, n = a[0].offsetHeight, "top" == e && n != h && (t.top = t.top + h - n, s = !0), "bottom" == e || "top" == e ? (o = 0, t.left < 0 && (o = -2 * t.left, t.left = 0, a.offset(t), i = a[0].offsetWidth, n = a[0].offsetHeight), this.replaceArrow(o - r + i, i, "left")) : this.replaceArrow(n - h, n, "top"), s && a.offset(t)
            },
            replaceArrow: function(t, e, i) {
                this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
            },
            setContent: function() {
                var t = this.tip(),
                    e = this.getTitle();
                t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
            },
            hide: function() {
                var e = this.tip(),
                    i = t.Event("hideme");
                if (this.$element.trigger(i), !i.isDefaultPrevented()) return e.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? function() {
                    var i = setTimeout(function() {
                        e.off(t.support.transition.end).detach()
                    }, 500);
                    e.one(t.support.transition.end, function() {
                        clearTimeout(i), e.detach()
                    })
                }() : e.detach(), this.$element.trigger("hidden"), this
            },
            fixTitle: function() {
                var t = this.$element;
                (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
            },
            hasContent: function() {
                return this.getTitle()
            },
            getPosition: function() {
                var e = this.$element[0];
                return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                    width: e.offsetWidth,
                    height: e.offsetHeight
                }, this.$element.offset())
            },
            getTitle: function() {
                var t = this.$element,
                    e = this.options;
                return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
            },
            tip: function() {
                return this.$tip = this.$tip || t(this.options.template)
            },
            arrow: function() {
                return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
            },
            validate: function() {
                this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
            },
            enable: function() {
                this.enabled = !0
            },
            disable: function() {
                this.enabled = !1
            },
            toggleEnabled: function() {
                this.enabled = !this.enabled
            },
            toggle: function(e) {
                var i = e ? t(e.currentTarget)[this.type](this._options).data(this.type) : this;
                i.tip().hasClass("in") ? i.hide() : i.show()
            },
            destroy: function() {
                this.hide().$element.off("." + this.type).removeData(this.type)
            }
        };
        var i = t.fn.tooltip;
        t.fn.tooltip = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("tooltip"),
                    s = "object" == typeof i && i;
                o || n.data("tooltip", o = new e(this, s)), "string" == typeof i && o[i]()
            })
        }, t.fn.tooltip.Constructor = e, t.fn.tooltip.defaults = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !0,
            container: !1
        }, t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = i, this
        }
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(t, e) {
            this.init("popover", t, e)
        };
        e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype, {
            constructor: e,
            setContent: function() {
                var t = this.tip(),
                    e = this.getTitle(),
                    i = this.getContent();
                t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content")[this.options.html ? "html" : "text"](i), t.removeClass("fade top bottom left right in")
            },
            hasContent: function() {
                return this.getTitle() || this.getContent()
            },
            getContent: function() {
                var t = this.$element,
                    e = this.options;
                return ("function" == typeof e.content ? e.content.call(t[0]) : e.content) || t.attr("data-content")
            },
            tip: function() {
                return this.$tip || (this.$tip = t(this.options.template)), this.$tip
            },
            destroy: function() {
                this.hide().$element.off("." + this.type).removeData(this.type)
            }
        });
        var i = t.fn.popover;
        t.fn.popover = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("popover"),
                    s = "object" == typeof i && i;
                o || n.data("popover", o = new e(this, s)), "string" == typeof i && o[i]()
            })
        }, t.fn.popover.Constructor = e, t.fn.popover.defaults = t.extend({}, t.fn.tooltip.defaults, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }), t.fn.popover.noConflict = function() {
            return t.fn.popover = i, this
        }
    }(window.jQuery),
    function(t) {
        "use strict";

        function e(e, i) {
            var n, o = t.proxy(this.process, this),
                s = t(t(e).is("body") ? window : e);
            this.options = t.extend({}, t.fn.scrollspy.defaults, i), this.$scrollElement = s.on("scroll.scroll-spy.data-api", o), this.selector = (this.options.target || (n = t(e).attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = t("body"), this.refresh(), this.process()
        }
        e.prototype = {
            constructor: e,
            refresh: function() {
                var e = this;
                this.offsets = t([]), this.targets = t([]), this.$body.find(this.selector).map(function() {
                    var i = t(this),
                        n = i.data("target") || i.attr("href"),
                        o = /^#\w/.test(n) && t(n);
                    return o && o.length && [
                        [o.position().top + (!t.isWindow(e.$scrollElement.get(0)) && e.$scrollElement.scrollTop()), n]
                    ] || null
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).each(function() {
                    e.offsets.push(this[0]), e.targets.push(this[1])
                })
            },
            process: function() {
                var t, e = this.$scrollElement.scrollTop() + this.options.offset,
                    i = (this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight) - this.$scrollElement.height(),
                    n = this.offsets,
                    o = this.targets,
                    s = this.activeTarget;
                if (e >= i) return s != (t = o.last()[0]) && this.activate(t);
                for (t = n.length; t--;) s != o[t] && e >= n[t] && (!n[t + 1] || e <= n[t + 1]) && this.activate(o[t])
            },
            activate: function(e) {
                var i, n;
                this.activeTarget = e, t(this.selector).parent(".active").removeClass("active"), n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', (i = t(document).find(n).parent("li").addClass("active")).parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate")
            }
        };
        var i = t.fn.scrollspy;
        t.fn.scrollspy = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("scrollspy"),
                    s = "object" == typeof i && i;
                o || n.data("scrollspy", o = new e(this, s)), "string" == typeof i && o[i]()
            })
        }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.defaults = {
            offset: 10
        }, t.fn.scrollspy.noConflict = function() {
            return t.fn.scrollspy = i, this
        }, t(window).on("load", function() {
            t('[data-spy="scroll"]').each(function() {
                var e = t(this);
                e.scrollspy(e.data())
            })
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e) {
            this.element = t(e)
        };
        e.prototype = {
            constructor: e,
            show: function() {
                var e, i, n, o = this.element,
                    s = o.closest("ul:not(.dropdown-menu)"),
                    a = o.attr("data-target");
                a || (a = (a = o.attr("href")) && a.replace(/.*(?=#[^\s]*$)/, "")), o.parent("li").hasClass("active") || (e = s.find(".active:last a")[0], n = t.Event("show", {
                    relatedTarget: e
                }), o.trigger(n), n.isDefaultPrevented() || (i = t(document).find(a), this.activate(o.parent("li"), s), this.activate(i, i.parent(), function() {
                    o.trigger({
                        type: "shown",
                        relatedTarget: e
                    })
                })))
            },
            activate: function(e, i, n) {
                function o() {
                    s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
                }
                var s = i.find("> .active"),
                    a = n && t.support.transition && s.hasClass("fade");
                a ? s.one(t.support.transition.end, o) : o(), s.removeClass("in")
            }
        };
        var i = t.fn.tab;
        t.fn.tab = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("tab");
                o || n.data("tab", o = new e(this)), "string" == typeof i && o[i]()
            })
        }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
            return t.fn.tab = i, this
        }, t(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
            e.preventDefault(), t(this).tab("show")
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e, i) {
            this.$element = t(e), this.options = t.extend({}, t.fn.typeahead.defaults, i), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = t(this.options.menu), this.shown = !1, this.listen()
        };
        e.prototype = {
            constructor: e,
            select: function() {
                var t = this.$menu.find(".active").attr("data-value");
                return this.$element.val(this.updater(t)).change(), this.hide()
            },
            updater: function(t) {
                return t
            },
            show: function() {
                var e = t.extend({}, this.$element.position(), {
                    height: this.$element[0].offsetHeight
                });
                return this.$menu.insertAfter(this.$element).css({
                    top: e.top + e.height,
                    left: e.left
                }).show(), this.shown = !0, this
            },
            hide: function() {
                return this.$menu.hide(), this.shown = !1, this
            },
            lookup: function(e) {
                var i;
                return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (i = t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source, i ? this.process(i) : this)
            },
            process: function(e) {
                var i = this;
                return e = t.grep(e, function(t) {
                    return i.matcher(t)
                }), e = this.sorter(e), e.length ? this.render(e.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
            },
            matcher: function(t) {
                return ~t.toLowerCase().indexOf(this.query.toLowerCase())
            },
            sorter: function(t) {
                for (var e, i = [], n = [], o = []; e = t.shift();) e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? n.push(e) : o.push(e) : i.push(e);
                return i.concat(n, o)
            },
            highlighter: function(t) {
                var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                return t.replace(new RegExp("(" + e + ")", "ig"), function(t, e) {
                    return "<strong>" + e + "</strong>"
                })
            },
            render: function(e) {
                var i = this;
                return (e = t(e).map(function(e, n) {
                    return (e = t(i.options.item).attr("data-value", n)).find("a").html(i.highlighter(n)), e[0]
                })).first().addClass("active"), this.$menu.html(e), this
            },
            next: function(e) {
                var i = this.$menu.find(".active").removeClass("active").next();
                i.length || (i = t(this.$menu.find("li")[0])), i.addClass("active")
            },
            prev: function(t) {
                var e = this.$menu.find(".active").removeClass("active").prev();
                e.length || (e = this.$menu.find("li").last()), e.addClass("active")
            },
            listen: function() {
                this.$element.on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("keyup", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", "li", t.proxy(this.mouseenter, this)).on("mouseleave", "li", t.proxy(this.mouseleave, this))
            },
            eventSupported: function(t) {
                var e = t in this.$element;
                return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
            },
            move: function(t) {
                if (this.shown) {
                    switch (t.keyCode) {
                        case 9:
                        case 13:
                        case 27:
                            t.preventDefault();
                            break;
                        case 38:
                            t.preventDefault(), this.prev();
                            break;
                        case 40:
                            t.preventDefault(), this.next()
                    }
                    t.stopPropagation()
                }
            },
            keydown: function(e) {
                this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
            },
            keypress: function(t) {
                this.suppressKeyPressRepeat || this.move(t)
            },
            keyup: function(t) {
                switch (t.keyCode) {
                    case 40:
                    case 38:
                    case 16:
                    case 17:
                    case 18:
                        break;
                    case 9:
                    case 13:
                        if (!this.shown) return;
                        this.select();
                        break;
                    case 27:
                        if (!this.shown) return;
                        this.hide();
                        break;
                    default:
                        this.lookup()
                }
                t.stopPropagation(), t.preventDefault()
            },
            focus: function(t) {
                this.focused = !0
            },
            blur: function(t) {
                this.focused = !1, !this.mousedover && this.shown && this.hide()
            },
            click: function(t) {
                t.stopPropagation(), t.preventDefault(), this.select(), this.$element.focus()
            },
            mouseenter: function(e) {
                this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active")
            },
            mouseleave: function(t) {
                this.mousedover = !1, !this.focused && this.shown && this.hide()
            }
        };
        var i = t.fn.typeahead;
        t.fn.typeahead = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("typeahead"),
                    s = "object" == typeof i && i;
                o || n.data("typeahead", o = new e(this, s)), "string" == typeof i && o[i]()
            })
        }, t.fn.typeahead.defaults = {
            source: [],
            items: 8,
            menu: '<ul class="typeahead dropdown-menu"></ul>',
            item: '<li><a href="#"></a></li>',
            minLength: 1
        }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function() {
            return t.fn.typeahead = i, this
        }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
            var i = t(this);
            i.data("typeahead") || i.typeahead(i.data())
        })
    }(window.jQuery),
    function(t) {
        "use strict";
        var e = function(e, i) {
            this.options = t.extend({}, t.fn.affix.defaults, i), this.$window = t(window).on("scroll.affix.data-api", t.proxy(this.checkPosition, this)).on("click.affix.data-api", t.proxy(function() {
                setTimeout(t.proxy(this.checkPosition, this), 1)
            }, this)), this.$element = t(e), this.checkPosition()
        };
        e.prototype.checkPosition = function() {
            if (this.$element.is(":visible")) {
                var e, i = t(document).height(),
                    n = this.$window.scrollTop(),
                    o = this.$element.offset(),
                    s = this.options.offset,
                    a = s.bottom,
                    r = s.top;
                "object" != typeof s && (a = r = s), "function" == typeof r && (r = s.top()), "function" == typeof a && (a = s.bottom()), e = !(null != this.unpin && n + this.unpin <= o.top) && (null != a && o.top + this.$element.height() >= i - a ? "bottom" : null != r && n <= r && "top"), this.affixed !== e && (this.affixed = e, this.unpin = "bottom" == e ? o.top - n : null, this.$element.removeClass("affix affix-top affix-bottom").addClass("affix" + (e ? "-" + e : "")))
            }
        };
        var i = t.fn.affix;
        t.fn.affix = function(i) {
            return this.each(function() {
                var n = t(this),
                    o = n.data("affix"),
                    s = "object" == typeof i && i;
                o || n.data("affix", o = new e(this, s)), "string" == typeof i && o[i]()
            })
        }, t.fn.affix.Constructor = e, t.fn.affix.defaults = {
            offset: 0
        }, t.fn.affix.noConflict = function() {
            return t.fn.affix = i, this
        }, t(window).on("load", function() {
            t('[data-spy="affix"]').each(function() {
                var e = t(this),
                    i = e.data();
                i.offset = i.offset || {}, i.offsetBottom && (i.offset.bottom = i.offsetBottom), i.offsetTop && (i.offset.top = i.offsetTop), e.affix(i)
            })
        })
    }(window.jQuery);
} catch (e) {
    console.error('Error in file:/media/jui/js/bootstrap.min.js?b265018fd976bb7e3a9a98feb480c4c5; Error:' + e.message);
};
try {
    (function($) {
        $(document).ready(function() {
            $('*[rel=tooltip]').tooltip()

            // Turn radios into btn-group
            $('.radio.btn-group label').addClass('btn');
            $(".btn-group label:not(.active)").click(function() {
                var label = $(this);
                var input = $('#' + label.attr('for'));

                if (!input.prop('checked')) {
                    label.closest('.btn-group').find("label").removeClass('active btn-success btn-danger btn-primary');
                    if (input.val() == '') {
                        label.addClass('active btn-primary');
                    } else if (input.val() == 0) {
                        label.addClass('active btn-danger');
                    } else {
                        label.addClass('active btn-success');
                    }
                    input.prop('checked', true);
                }
            });
            $(".btn-group input[checked=checked]").each(function() {
                if ($(this).val() == '') {
                    $("label[for=" + $(this).attr('id') + "]").addClass('active btn-primary');
                } else if ($(this).val() == 0) {
                    $("label[for=" + $(this).attr('id') + "]").addClass('active btn-danger');
                } else {
                    $("label[for=" + $(this).attr('id') + "]").addClass('active btn-success');
                }
            });
        })
    })(jQuery);
} catch (e) {
    console.error('Error in file:/templates/rsjuno/js/template.js; Error:' + e.message);
};
try {
    jQuery(document).ready(function($) {
        var $windowHeight = $(window).height();
        var $documentHeight = $(document).height();
        var $arrow = $('#rstpl-up-arrow');

        if ($windowHeight < $documentHeight) {
            $arrow.show();
        }

        $arrow.click(function() {
            $('html, body').animate({
                scrollTop: $('#rstpl-before-header').offset().top
            }, 1000);
        });

        window.setInterval(function() {
            var $windowHeight = $(window).height();
            var $documentHeight = $(document).height();
            $windowHeight < $documentHeight ? $arrow.fadeIn(200) : $arrow.fadeOut(200);
        }, 100);
    });
} catch (e) {
    console.error('Error in file:/templates/rsjuno/js/scrolltotop.js; Error:' + e.message);
};
try {
    jQuery(document).ready(function($) {
        var window_w = $(window).width();
        if (window_w >= 960) {
            $('.dropdown').hover(function() {
                var width_parent = $(this).width();
                $(this).find('.dropdown-menu').first().css('min-width', width_parent);
            });
        }
        $(window).resize(function() {
            window_w = $(window).width();
            if (window_w >= 960) {
                $('.dropdown').hover(function() {
                    var width_parent = $(this).width();
                    $(this).find('.dropdown-menu').first().css('min-width', width_parent);
                });
            }
        });
    });
} catch (e) {
    console.error('Error in file:/templates/rsjuno/js/menuwidth.js; Error:' + e.message);
};
try {
    /*
     * jQuery Mobile v1.4.3
     * http://jquerymobile.com
     *
     * Copyright 2010, 2014 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     */

    (function(root, doc, factory) {
        if (typeof define === "function" && define.amd) {
            // AMD. Register as an anonymous module.
            define(["jquery"], function($) {
                factory($, root, doc);
                return $.mobile;
            });
        } else {
            // Browser globals
            factory(root.jQuery, root, doc);
        }
    }(this, document, function(jQuery, window, document, undefined) { // This plugin is an experiment for abstracting away the touch and mouse
        // events so that developers don't have to worry about which method of input
        // the device their document is loaded on supports.
        //
        // The idea here is to allow the developer to register listeners for the
        // basic mouse events, such as mousedown, mousemove, mouseup, and click,
        // and the plugin will take care of registering the correct listeners
        // behind the scenes to invoke the listener at the fastest possible time
        // for that device, while still retaining the order of event firing in
        // the traditional mouse environment, should multiple handlers be registered
        // on the same element for different events.
        //
        // The current version exposes the following virtual events to jQuery bind methods:
        // "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

        (function($, window, document, undefined) {

            var dataPropertyName = "virtualMouseBindings",
                touchTargetPropertyName = "virtualTouchID",
                virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
                touchEventProps = "clientX clientY pageX pageY screenX screenY".split(" "),
                mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
                mouseEventProps = $.event.props.concat(mouseHookProps),
                activeDocHandlers = {},
                resetTimerID = 0,
                startX = 0,
                startY = 0,
                didScroll = false,
                clickBlockList = [],
                blockMouseTriggers = false,
                blockTouchTriggers = false,
                eventCaptureSupported = "addEventListener" in document,
                $document = $(document),
                nextTouchID = 1,
                lastTouchID = 0,
                threshold,
                i;

            $.vmouse = {
                moveDistanceThreshold: 10,
                clickDistanceThreshold: 10,
                resetTimerDuration: 1500
            };

            function getNativeEvent(event) {

                while (event && typeof event.originalEvent !== "undefined") {
                    event = event.originalEvent;
                }
                return event;
            }

            function createVirtualEvent(event, eventType) {

                var t = event.type,
                    oe, props, ne, prop, ct, touch, i, j, len;

                event = $.Event(event);
                event.type = eventType;

                oe = event.originalEvent;
                props = $.event.props;

                // addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
                // https://github.com/jquery/jquery-mobile/issues/3280
                if (t.search(/^(mouse|click)/) > -1) {
                    props = mouseEventProps;
                }

                // copy original event properties over to the new event
                // this would happen if we could call $.event.fix instead of $.Event
                // but we don't have a way to force an event to be fixed multiple times
                if (oe) {
                    for (i = props.length, prop; i;) {
                        prop = props[--i];
                        event[prop] = oe[prop];
                    }
                }

                // make sure that if the mouse and click virtual events are generated
                // without a .which one is defined
                if (t.search(/mouse(down|up)|click/) > -1 && !event.which) {
                    event.which = 1;
                }

                if (t.search(/^touch/) !== -1) {
                    ne = getNativeEvent(oe);
                    t = ne.touches;
                    ct = ne.changedTouches;
                    touch = (t && t.length) ? t[0] : ((ct && ct.length) ? ct[0] : undefined);

                    if (touch) {
                        for (j = 0, len = touchEventProps.length; j < len; j++) {
                            prop = touchEventProps[j];
                            event[prop] = touch[prop];
                        }
                    }
                }

                return event;
            }

            function getVirtualBindingFlags(element) {

                var flags = {},
                    b, k;

                while (element) {

                    b = $.data(element, dataPropertyName);

                    for (k in b) {
                        if (b[k]) {
                            flags[k] = flags.hasVirtualBinding = true;
                        }
                    }
                    element = element.parentNode;
                }
                return flags;
            }

            function getClosestElementWithVirtualBinding(element, eventType) {
                var b;
                while (element) {

                    b = $.data(element, dataPropertyName);

                    if (b && (!eventType || b[eventType])) {
                        return element;
                    }
                    element = element.parentNode;
                }
                return null;
            }

            function enableTouchBindings() {
                blockTouchTriggers = false;
            }

            function disableTouchBindings() {
                blockTouchTriggers = true;
            }

            function enableMouseBindings() {
                lastTouchID = 0;
                clickBlockList.length = 0;
                blockMouseTriggers = false;

                // When mouse bindings are enabled, our
                // touch bindings are disabled.
                disableTouchBindings();
            }

            function disableMouseBindings() {
                // When mouse bindings are disabled, our
                // touch bindings are enabled.
                enableTouchBindings();
            }

            function startResetTimer() {
                clearResetTimer();
                resetTimerID = setTimeout(function() {
                    resetTimerID = 0;
                    enableMouseBindings();
                }, $.vmouse.resetTimerDuration);
            }

            function clearResetTimer() {
                if (resetTimerID) {
                    clearTimeout(resetTimerID);
                    resetTimerID = 0;
                }
            }

            function triggerVirtualEvent(eventType, event, flags) {
                var ve;

                if ((flags && flags[eventType]) ||
                    (!flags && getClosestElementWithVirtualBinding(event.target, eventType))) {

                    ve = createVirtualEvent(event, eventType);

                    $(event.target).trigger(ve);
                }

                return ve;
            }

            function mouseEventCallback(event) {
                var touchID = $.data(event.target, touchTargetPropertyName),
                    ve;

                if (!blockMouseTriggers && (!lastTouchID || lastTouchID !== touchID)) {
                    ve = triggerVirtualEvent("v" + event.type, event);
                    if (ve) {
                        if (ve.isDefaultPrevented()) {
                            event.preventDefault();
                        }
                        if (ve.isPropagationStopped()) {
                            event.stopPropagation();
                        }
                        if (ve.isImmediatePropagationStopped()) {
                            event.stopImmediatePropagation();
                        }
                    }
                }
            }

            function handleTouchStart(event) {

                var touches = getNativeEvent(event).touches,
                    target, flags, t;

                if (touches && touches.length === 1) {

                    target = event.target;
                    flags = getVirtualBindingFlags(target);

                    if (flags.hasVirtualBinding) {

                        lastTouchID = nextTouchID++;
                        $.data(target, touchTargetPropertyName, lastTouchID);

                        clearResetTimer();

                        disableMouseBindings();
                        didScroll = false;

                        t = getNativeEvent(event).touches[0];
                        startX = t.pageX;
                        startY = t.pageY;

                        triggerVirtualEvent("vmouseover", event, flags);
                        triggerVirtualEvent("vmousedown", event, flags);
                    }
                }
            }

            function handleScroll(event) {
                if (blockTouchTriggers) {
                    return;
                }

                if (!didScroll) {
                    triggerVirtualEvent("vmousecancel", event, getVirtualBindingFlags(event.target));
                }

                didScroll = true;
                startResetTimer();
            }

            function handleTouchMove(event) {
                if (blockTouchTriggers) {
                    return;
                }

                var t = getNativeEvent(event).touches[0],
                    didCancel = didScroll,
                    moveThreshold = $.vmouse.moveDistanceThreshold,
                    flags = getVirtualBindingFlags(event.target);

                didScroll = didScroll ||
                    (Math.abs(t.pageX - startX) > moveThreshold ||
                        Math.abs(t.pageY - startY) > moveThreshold);

                if (didScroll && !didCancel) {
                    triggerVirtualEvent("vmousecancel", event, flags);
                }

                triggerVirtualEvent("vmousemove", event, flags);
                startResetTimer();
            }

            function handleTouchEnd(event) {
                if (blockTouchTriggers) {
                    return;
                }

                disableTouchBindings();

                var flags = getVirtualBindingFlags(event.target),
                    ve, t;
                triggerVirtualEvent("vmouseup", event, flags);

                if (!didScroll) {
                    ve = triggerVirtualEvent("vclick", event, flags);
                    if (ve && ve.isDefaultPrevented()) {
                        // The target of the mouse events that follow the touchend
                        // event don't necessarily match the target used during the
                        // touch. This means we need to rely on coordinates for blocking
                        // any click that is generated.
                        t = getNativeEvent(event).changedTouches[0];
                        clickBlockList.push({
                            touchID: lastTouchID,
                            x: t.clientX,
                            y: t.clientY
                        });

                        // Prevent any mouse events that follow from triggering
                        // virtual event notifications.
                        blockMouseTriggers = true;
                    }
                }
                triggerVirtualEvent("vmouseout", event, flags);
                didScroll = false;

                startResetTimer();
            }

            function hasVirtualBindings(ele) {
                var bindings = $.data(ele, dataPropertyName),
                    k;

                if (bindings) {
                    for (k in bindings) {
                        if (bindings[k]) {
                            return true;
                        }
                    }
                }
                return false;
            }

            function dummyMouseHandler() {}

            function getSpecialEventObject(eventType) {
                var realType = eventType.substr(1);

                return {
                    setup: function( /* data, namespace */ ) {
                        // If this is the first virtual mouse binding for this element,
                        // add a bindings object to its data.

                        if (!hasVirtualBindings(this)) {
                            $.data(this, dataPropertyName, {});
                        }

                        // If setup is called, we know it is the first binding for this
                        // eventType, so initialize the count for the eventType to zero.
                        var bindings = $.data(this, dataPropertyName);
                        bindings[eventType] = true;

                        // If this is the first virtual mouse event for this type,
                        // register a global handler on the document.

                        activeDocHandlers[eventType] = (activeDocHandlers[eventType] || 0) + 1;

                        if (activeDocHandlers[eventType] === 1) {
                            $document.bind(realType, mouseEventCallback);
                        }

                        // Some browsers, like Opera Mini, won't dispatch mouse/click events
                        // for elements unless they actually have handlers registered on them.
                        // To get around this, we register dummy handlers on the elements.

                        $(this).bind(realType, dummyMouseHandler);

                        // For now, if event capture is not supported, we rely on mouse handlers.
                        if (eventCaptureSupported) {
                            // If this is the first virtual mouse binding for the document,
                            // register our touchstart handler on the document.

                            activeDocHandlers["touchstart"] = (activeDocHandlers["touchstart"] || 0) + 1;

                            if (activeDocHandlers["touchstart"] === 1) {
                                $document.bind("touchstart", handleTouchStart)
                                    .bind("touchend", handleTouchEnd)

                                    // On touch platforms, touching the screen and then dragging your finger
                                    // causes the window content to scroll after some distance threshold is
                                    // exceeded. On these platforms, a scroll prevents a click event from being
                                    // dispatched, and on some platforms, even the touchend is suppressed. To
                                    // mimic the suppression of the click event, we need to watch for a scroll
                                    // event. Unfortunately, some platforms like iOS don't dispatch scroll
                                    // events until *AFTER* the user lifts their finger (touchend). This means
                                    // we need to watch both scroll and touchmove events to figure out whether
                                    // or not a scroll happenens before the touchend event is fired.

                                    .bind("touchmove", handleTouchMove)
                                    .bind("scroll", handleScroll);
                            }
                        }
                    },

                    teardown: function( /* data, namespace */ ) {
                        // If this is the last virtual binding for this eventType,
                        // remove its global handler from the document.

                        --activeDocHandlers[eventType];

                        if (!activeDocHandlers[eventType]) {
                            $document.unbind(realType, mouseEventCallback);
                        }

                        if (eventCaptureSupported) {
                            // If this is the last virtual mouse binding in existence,
                            // remove our document touchstart listener.

                            --activeDocHandlers["touchstart"];

                            if (!activeDocHandlers["touchstart"]) {
                                $document.unbind("touchstart", handleTouchStart)
                                    .unbind("touchmove", handleTouchMove)
                                    .unbind("touchend", handleTouchEnd)
                                    .unbind("scroll", handleScroll);
                            }
                        }

                        var $this = $(this),
                            bindings = $.data(this, dataPropertyName);

                        // teardown may be called when an element was
                        // removed from the DOM. If this is the case,
                        // jQuery core may have already stripped the element
                        // of any data bindings so we need to check it before
                        // using it.
                        if (bindings) {
                            bindings[eventType] = false;
                        }

                        // Unregister the dummy event handler.

                        $this.unbind(realType, dummyMouseHandler);

                        // If this is the last virtual mouse binding on the
                        // element, remove the binding data from the element.

                        if (!hasVirtualBindings(this)) {
                            $this.removeData(dataPropertyName);
                        }
                    }
                };
            }

            // Expose our custom events to the jQuery bind/unbind mechanism.

            for (i = 0; i < virtualEventNames.length; i++) {
                $.event.special[virtualEventNames[i]] = getSpecialEventObject(virtualEventNames[i]);
            }

            // Add a capture click handler to block clicks.
            // Note that we require event capture support for this so if the device
            // doesn't support it, we punt for now and rely solely on mouse events.
            if (eventCaptureSupported) {
                document.addEventListener("click", function(e) {
                    var cnt = clickBlockList.length,
                        target = e.target,
                        x, y, ele, i, o, touchID;

                    if (cnt) {
                        x = e.clientX;
                        y = e.clientY;
                        threshold = $.vmouse.clickDistanceThreshold;

                        // The idea here is to run through the clickBlockList to see if
                        // the current click event is in the proximity of one of our
                        // vclick events that had preventDefault() called on it. If we find
                        // one, then we block the click.
                        //
                        // Why do we have to rely on proximity?
                        //
                        // Because the target of the touch event that triggered the vclick
                        // can be different from the target of the click event synthesized
                        // by the browser. The target of a mouse/click event that is synthesized
                        // from a touch event seems to be implementation specific. For example,
                        // some browsers will fire mouse/click events for a link that is near
                        // a touch event, even though the target of the touchstart/touchend event
                        // says the user touched outside the link. Also, it seems that with most
                        // browsers, the target of the mouse/click event is not calculated until the
                        // time it is dispatched, so if you replace an element that you touched
                        // with another element, the target of the mouse/click will be the new
                        // element underneath that point.
                        //
                        // Aside from proximity, we also check to see if the target and any
                        // of its ancestors were the ones that blocked a click. This is necessary
                        // because of the strange mouse/click target calculation done in the
                        // Android 2.1 browser, where if you click on an element, and there is a
                        // mouse/click handler on one of its ancestors, the target will be the
                        // innermost child of the touched element, even if that child is no where
                        // near the point of touch.

                        ele = target;

                        while (ele) {
                            for (i = 0; i < cnt; i++) {
                                o = clickBlockList[i];
                                touchID = 0;

                                if ((ele === target && Math.abs(o.x - x) < threshold && Math.abs(o.y - y) < threshold) ||
                                    $.data(ele, touchTargetPropertyName) === o.touchID) {
                                    // XXX: We may want to consider removing matches from the block list
                                    //      instead of waiting for the reset timer to fire.
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return;
                                }
                            }
                            ele = ele.parentNode;
                        }
                    }
                }, true);
            }
        })(jQuery, window, document);

        (function($) {
            $.mobile = {};
        }(jQuery));

        (function($, undefined) {
            var support = {
                touch: "ontouchend" in document
            };

            $.mobile.support = $.mobile.support || {};
            $.extend($.support, support);
            $.extend($.mobile.support, support);
        }(jQuery));


        (function($, window, undefined) {
            var $document = $(document),
                supportTouch = $.mobile.support.touch,
                scrollEvent = "touchmove scroll",
                touchStartEvent = supportTouch ? "touchstart" : "mousedown",
                touchStopEvent = supportTouch ? "touchend" : "mouseup",
                touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

            // setup new event shortcuts
            $.each(("touchstart touchmove touchend " +
                "tap taphold " +
                "swipe swipeleft swiperight " +
                "scrollstart scrollstop").split(" "), function(i, name) {

                $.fn[name] = function(fn) {
                    return fn ? this.bind(name, fn) : this.trigger(name);
                };

                // jQuery < 1.8
                if ($.attrFn) {
                    $.attrFn[name] = true;
                }
            });

            function triggerCustomEvent(obj, eventType, event, bubble) {
                var originalType = event.type;
                event.type = eventType;
                if (bubble) {
                    $.event.trigger(event, undefined, obj);
                } else {
                    $.event.dispatch.call(obj, event);
                }
                event.type = originalType;
            }

            // also handles scrollstop
            $.event.special.scrollstart = {

                enabled: true,
                setup: function() {

                    var thisObject = this,
                        $this = $(thisObject),
                        scrolling,
                        timer;

                    function trigger(event, state) {
                        scrolling = state;
                        triggerCustomEvent(thisObject, scrolling ? "scrollstart" : "scrollstop", event);
                    }

                    // iPhone triggers scroll after a small delay; use touchmove instead
                    $this.bind(scrollEvent, function(event) {

                        if (!$.event.special.scrollstart.enabled) {
                            return;
                        }

                        if (!scrolling) {
                            trigger(event, true);
                        }

                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            trigger(event, false);
                        }, 50);
                    });
                },
                teardown: function() {
                    $(this).unbind(scrollEvent);
                }
            };

            // also handles taphold
            $.event.special.tap = {
                tapholdThreshold: 750,
                emitTapOnTaphold: true,
                setup: function() {
                    var thisObject = this,
                        $this = $(thisObject),
                        isTaphold = false;

                    $this.bind("vmousedown", function(event) {
                        isTaphold = false;
                        if (event.which && event.which !== 1) {
                            return false;
                        }

                        var origTarget = event.target,
                            timer;

                        function clearTapTimer() {
                            clearTimeout(timer);
                        }

                        function clearTapHandlers() {
                            clearTapTimer();

                            $this.unbind("vclick", clickHandler)
                                .unbind("vmouseup", clearTapTimer);
                            $document.unbind("vmousecancel", clearTapHandlers);
                        }

                        function clickHandler(event) {
                            clearTapHandlers();

                            // ONLY trigger a 'tap' event if the start target is
                            // the same as the stop target.
                            if (!isTaphold && origTarget === event.target) {
                                triggerCustomEvent(thisObject, "tap", event);
                            } else if (isTaphold) {
                                event.preventDefault();
                            }
                        }

                        $this.bind("vmouseup", clearTapTimer)
                            .bind("vclick", clickHandler);
                        $document.bind("vmousecancel", clearTapHandlers);

                        timer = setTimeout(function() {
                            if (!$.event.special.tap.emitTapOnTaphold) {
                                isTaphold = true;
                            }
                            triggerCustomEvent(thisObject, "taphold", $.Event("taphold", {
                                target: origTarget
                            }));
                        }, $.event.special.tap.tapholdThreshold);
                    });
                },
                teardown: function() {
                    $(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup");
                    $document.unbind("vmousecancel");
                }
            };

            // Also handles swipeleft, swiperight
            $.event.special.swipe = {

                // More than this horizontal displacement, and we will suppress scrolling.
                scrollSupressionThreshold: 30,

                // More time than this, and it isn't a swipe.
                durationThreshold: 1000,

                // Swipe horizontal displacement must be more than this.
                horizontalDistanceThreshold: 30,

                // Swipe vertical displacement must be less than this.
                verticalDistanceThreshold: 30,

                getLocation: function(event) {
                    var winPageX = window.pageXOffset,
                        winPageY = window.pageYOffset,
                        x = event.clientX,
                        y = event.clientY;

                    if (event.pageY === 0 && Math.floor(y) > Math.floor(event.pageY) ||
                        event.pageX === 0 && Math.floor(x) > Math.floor(event.pageX)) {

                        // iOS4 clientX/clientY have the value that should have been
                        // in pageX/pageY. While pageX/page/ have the value 0
                        x = x - winPageX;
                        y = y - winPageY;
                    } else if (y < (event.pageY - winPageY) || x < (event.pageX - winPageX)) {

                        // Some Android browsers have totally bogus values for clientX/Y
                        // when scrolling/zooming a page. Detectable since clientX/clientY
                        // should never be smaller than pageX/pageY minus page scroll
                        x = event.pageX - winPageX;
                        y = event.pageY - winPageY;
                    }

                    return {
                        x: x,
                        y: y
                    };
                },

                start: function(event) {
                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] : event,
                        location = $.event.special.swipe.getLocation(data);
                    return {
                        time: (new Date()).getTime(),
                        coords: [location.x, location.y],
                        origin: $(event.target)
                    };
                },

                stop: function(event) {
                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] : event,
                        location = $.event.special.swipe.getLocation(data);
                    return {
                        time: (new Date()).getTime(),
                        coords: [location.x, location.y]
                    };
                },

                handleSwipe: function(start, stop, thisObject, origTarget) {
                    if (stop.time - start.time < $.event.special.swipe.durationThreshold &&
                        Math.abs(start.coords[0] - stop.coords[0]) > $.event.special.swipe.horizontalDistanceThreshold &&
                        Math.abs(start.coords[1] - stop.coords[1]) < $.event.special.swipe.verticalDistanceThreshold) {
                        var direction = start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight";

                        triggerCustomEvent(thisObject, "swipe", $.Event("swipe", {
                            target: origTarget,
                            swipestart: start,
                            swipestop: stop
                        }), true);
                        triggerCustomEvent(thisObject, direction, $.Event(direction, {
                            target: origTarget,
                            swipestart: start,
                            swipestop: stop
                        }), true);
                        return true;
                    }
                    return false;

                },

                // This serves as a flag to ensure that at most one swipe event event is
                // in work at any given time
                eventInProgress: false,

                setup: function() {
                    var events,
                        thisObject = this,
                        $this = $(thisObject),
                        context = {};

                    // Retrieve the events data for this element and add the swipe context
                    events = $.data(this, "mobile-events");
                    if (!events) {
                        events = {
                            length: 0
                        };
                        $.data(this, "mobile-events", events);
                    }
                    events.length++;
                    events.swipe = context;

                    context.start = function(event) {

                        // Bail if we're already working on a swipe event
                        if ($.event.special.swipe.eventInProgress) {
                            return;
                        }
                        $.event.special.swipe.eventInProgress = true;

                        var stop,
                            start = $.event.special.swipe.start(event),
                            origTarget = event.target,
                            emitted = false;

                        context.move = function(event) {
                            if (!start) {
                                return;
                            }

                            stop = $.event.special.swipe.stop(event);
                            if (!emitted) {
                                emitted = $.event.special.swipe.handleSwipe(start, stop, thisObject, origTarget);
                                if (emitted) {

                                    // Reset the context to make way for the next swipe event
                                    $.event.special.swipe.eventInProgress = false;
                                }
                            }
                            // prevent scrolling
                            if (Math.abs(start.coords[0] - stop.coords[0]) > $.event.special.swipe.scrollSupressionThreshold) {
                                event.preventDefault();
                            }
                        };

                        context.stop = function() {
                            emitted = true;

                            // Reset the context to make way for the next swipe event
                            $.event.special.swipe.eventInProgress = false;
                            $document.off(touchMoveEvent, context.move);
                            context.move = null;
                        };

                        $document.on(touchMoveEvent, context.move)
                            .one(touchStopEvent, context.stop);
                    };
                    $this.on(touchStartEvent, context.start);
                },

                teardown: function() {
                    var events, context;

                    events = $.data(this, "mobile-events");
                    if (events) {
                        context = events.swipe;
                        delete events.swipe;
                        events.length--;
                        if (events.length === 0) {
                            $.removeData(this, "mobile-events");
                        }
                    }

                    if (context) {
                        if (context.start) {
                            $(this).off(touchStartEvent, context.start);
                        }
                        if (context.move) {
                            $document.off(touchMoveEvent, context.move);
                        }
                        if (context.stop) {
                            $document.off(touchStopEvent, context.stop);
                        }
                    }
                }
            };
            $.each({
                scrollstop: "scrollstart",
                taphold: "tap",
                swipeleft: "swipe.left",
                swiperight: "swipe.right"
            }, function(event, sourceEvent) {

                $.event.special[event] = {
                    setup: function() {
                        $(this).bind(sourceEvent, $.noop);
                    },
                    teardown: function() {
                        $(this).unbind(sourceEvent);
                    }
                };
            });

        })(jQuery, this);


    }));

} catch (e) {
    console.error('Error in file:/templates/rsjuno/js/jquery/jquery.mobile.custom.js; Error:' + e.message);
};
try {
    jQuery(document).ready(function($) {
        var window_w = $(window).width();
        // enable the tapHolder for the dropdowns
        var device = detectMobileBrowser();

        if (window_w >= 960 && device) {
            // first level
            $('.dropdown > a').bind("click", detectClick);

            // deeper levels
            $('.dropdown-submenu > a').bind("click", detectClick);

            //slide up the dropdown menu when something else is clicked
            $("body").bind("tap", checkTarget);
        }


        $(window).resize(function() {
            window_w = $(window).width();
            if (window_w >= 960 && device) {
                // first level
                $('.dropdown > a').bind("click", detectClick);

                // deeper levels
                $('.dropdown-submenu > a').bind("click", detectClick);

                //slide up the dropdown menu when something else is clicked
                $("body").bind("tap", checkTarget);
            } else {
                // first level
                $('.dropdown > a').unbind("click", detectClick);

                // deeper levels
                $('.dropdown-submenu > a').unbind("click", detectClick);

                $("body").unbind("tap", checkTarget);
            }
        });
    });

    function detectMobileBrowser() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        } else return false;
    }

    function detectClick(event) {

        var clickedElement = jQuery(event.target);
        var parentElement = clickedElement.parent();

        if (parentElement.hasClass('dropdown') || parentElement.hasClass('dropdown-submenu')) {
            parentElement.find('.dropdown-menu').first().slideDown();
        }
        return false;

    }

    function checkTarget(event) {
        var clickedElement = jQuery(event.target);
        var parentElement = clickedElement.parent();

        var isLink = clickedElement.attr('href');
        if (!isLink) {
            if (!parentElement.hasClass('dropdown') && !parentElement.hasClass('dropdown-submenu')) {
                jQuery('.dropdown').each(function() {
                    var dropdown = jQuery(this).find('.dropdown-menu').first();
                    if (dropdown.is(':visible')) {
                        dropdown.slideUp();
                    }
                });
            }
        }
    }
} catch (e) {
    console.error('Error in file:/templates/rsjuno/js/device-dropdown.js; Error:' + e.message);
};
try {
    jQuery(document).ready(function($) {
        var window_w = $(window).width();
        var ie_version = false;
        if ($.browser.msie && ($.browser.version == '8.0' || $.browser.version == '7.0')) {
            ie_version = true;
        }
        if (window_w >= 960 || ie_version) {
            $('.dropdown').hover(function() {
                $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
            }, function() {
                $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp()
            });
            $('.dropdown-submenu').hover(function() {
                $(this).find('.dropdown-menu').first().stop(true, true).delay(200).fadeIn();
            }, function() {
                $(this).find('.dropdown-menu').first().stop(true, true).delay(100).fadeOut()
            });
        }
        $(window).resize(function() {
            window_w = $(window).width();
            if (window_w < 960 && !ie_version) {
                $('.dropdown').unbind('hover');
                $('.dropdown').find('.dropdown-menu').first().show();
                $('.dropdown-submenu').unbind('hover');
                $('.dropdown-submenu').find('.dropdown-menu').first().show();
            } else {
                $('.dropdown').find('.dropdown-menu').first().hide();
                $('.dropdown-submenu').find('.dropdown-menu').first().hide();
                $('.dropdown').hover(function() {
                    $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
                }, function() {
                    $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp()
                });
                $('.dropdown-submenu').hover(function() {
                    $(this).find('.dropdown-menu').first().stop(true, true).delay(200).fadeIn();
                }, function() {
                    $(this).find('.dropdown-menu').first().stop(true, true).delay(100).fadeOut()
                });
            }
        });

    });
} catch (e) {
    console.error('Error in file:/templates/rsjuno/js/menu.js; Error:' + e.message);
};
try {
    jQuery(document).ready(function($) {
        var $navbar = $('#main-menu .navbar');
        if ($navbar.length > 0) {
            $navbarTop = $navbar.offset().top;
            $(window).scroll(function() {
                var $top = $(window).scrollTop();
                if ($top > $navbarTop) {
                    $navbar.addClass('navbar-fixed-top');
                } else {
                    $navbar.removeClass('navbar-fixed-top');
                }
            });
        }
    });

} catch (e) {
    console.error('Error in file:/templates/rsjuno/js/sticky-menu.js; Error:' + e.message);
};