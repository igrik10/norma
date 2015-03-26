/* jQuery Form Styler v1.5.4 | (c) Dimox | https://github.com/Dimox/jQueryFormStyler */
(function(c) {
    c.fn.styler = function(D) {
        var f = c.extend({
            wrapper: "form",
            idSuffix: "-styler",
            filePlaceholder: "\u0424\u0430\u0439\u043b \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",
            fileBrowse: "\u041e\u0431\u0437\u043e\u0440...",
            selectSearch: !0,
            selectSearchLimit: 10,
            selectSearchNotFound: "\u0421\u043e\u0432\u043f\u0430\u0434\u0435\u043d\u0438\u0439 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e",
            selectSearchPlaceholder: "\u041f\u043e\u0438\u0441\u043a...",
            selectVisibleOptions: 0,
            singleSelectzIndex: "100",
            selectSmartPositioning: !0,
            onSelectOpened: function() {},
            onSelectClosed: function() {},
            onFormStyled: function() {}
        }, D);
        return this.each(function() {
            function w() {
                var c = "",
                    n = "",
                    b = "",
                    v = "";
                void 0 !== a.attr("id") && "" !== a.attr("id") && (c = ' id="' + a.attr("id") + f.idSuffix + '"');
                void 0 !== a.attr("title") && "" !== a.attr("title") && (n = ' title="' + a.attr("title") + '"');
                void 0 !== a.attr("class") && "" !== a.attr("class") && (b = " " + a.attr("class"));
                for (var u = a.data(), e = 0; e < u.length; e++) "" !== u[e] && (v += " data-" + e + '="' + u[e] + '"');
                this.id =
                    c + v;
                this.title = n;
                this.classes = b
            }
            var a = c(this);
            if (a.is(":checkbox")) a.each(function() {
                if (1 > a.parent("div.jq-checkbox").length) {
                    var f = function() {
                        var f = new w,
                            b = c("<div" + f.id + ' class="jq-checkbox' + f.classes + '"' + f.title + '><div class="jq-checkbox__div"></div></div>');
                        a.css({
                            position: "absolute",
                            zIndex: "-1",
                            opacity: 0,
                            margin: 0,
                            padding: 0
                        }).after(b).prependTo(b);
                        b.attr("unselectable", "on").css({
                            "-webkit-user-select": "none",
                            "-moz-user-select": "none",
                            "-ms-user-select": "none",
                            "-o-user-select": "none",
                            "user-select": "none",
                            display: "inline-block",
                            position: "relative",
                            overflow: "hidden"
                        });
                        a.is(":checked") && b.addClass("checked");
                        a.is(":disabled") && b.addClass("disabled");
                        b.on("click.styler", function() {
                            b.is(".disabled") || (a.is(":checked") ? (a.prop("checked", !1), b.removeClass("checked")) : (a.prop("checked", !0), b.addClass("checked")), a.change());
                            return !1
                        });
                        a.closest("label").add('label[for="' + a.attr("id") + '"]').click(function(a) {
                            b.click();
                            a.preventDefault()
                        });
                        a.on("change.styler", function() {
                            a.is(":checked") ? b.addClass("checked") :
                                b.removeClass("checked")
                        }).on("keydown.styler", function(a) {
                            32 == a.which && b.click()
                        }).on("focus.styler", function() {
                            b.is(".disabled") || b.addClass("focused")
                        }).on("blur.styler", function() {
                            b.removeClass("focused")
                        })
                    };
                    f();
                    a.on("refresh", function() {
                        a.off(".styler").parent().before(a).remove();
                        f()
                    })
                }
            });
            else if (a.is(":radio")) a.each(function() {
                if (1 > a.parent("div.jq-radio").length) {
                    var h = function() {
                        var n = new w,
                            b = c("<div" + n.id + ' class="jq-radio' + n.classes + '"' + n.title + '><div class="jq-radio__div"></div></div>');
                        a.css({
                            position: "absolute",
                            zIndex: "-1",
                            opacity: 0,
                            margin: 0,
                            padding: 0
                        }).after(b).prependTo(b);
                        b.attr("unselectable", "on").css({
                            "-webkit-user-select": "none",
                            "-moz-user-select": "none",
                            "-ms-user-select": "none",
                            "-o-user-select": "none",
                            "user-select": "none",
                            display: "inline-block",
                            position: "relative"
                        });
                        a.is(":checked") && b.addClass("checked");
                        a.is(":disabled") && b.addClass("disabled");
                        b.on("click.styler", function() {
                            b.is(".disabled") || (b.closest(f.wrapper).find('input[name="' + a.attr("name") + '"]').prop("checked", !1).parent().removeClass("checked"), a.prop("checked", !0).parent().addClass("checked"), a.change());
                            return !1
                        });
                        a.closest("label").add('label[for="' + a.attr("id") + '"]').click(function(a) {
                            b.click();
                            a.preventDefault()
                        });
                        a.on("change.styler", function() {
                            a.parent().addClass("checked")
                        }).on("focus.styler", function() {
                            b.is(".disabled") || b.addClass("focused")
                        }).on("blur.styler", function() {
                            b.removeClass("focused")
                        })
                    };
                    h();
                    a.on("refresh", function() {
                        a.off(".styler").parent().before(a).remove();
                        h()
                    })
                }
            });
            else if (a.is(":file")) a.css({
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                margin: 0,
                padding: 0
            }).each(function() {
                if (1 > a.parent("div.jq-file").length) {
                    var h = function() {
                        var n = new w,
                            b = c("<div" + n.id + ' class="jq-file' + n.classes + '"' + n.title + ' style="display: inline-block; position: relative; overflow: hidden"></div>'),
                            h = c('<div class="jq-file__name">' + f.filePlaceholder + "</div>").appendTo(b);
                        c('<div class="jq-file__browse">' + f.fileBrowse + "</div>").appendTo(b);
                        a.after(b);
                        b.append(a);
                        a.is(":disabled") && b.addClass("disabled");
                        a.on("change.styler",
                            function() {
                                var c = a.val();
                                if (a.is("[multiple]"))
                                    for (var c = "", e = a[0].files, n = 0; n < e.length; n++) c += (0 < n ? ", " : "") + e[n].name;
                                h.text(c.replace(/.+[\\\/]/, ""));
                                "" === c ? (h.text(f.filePlaceholder), b.removeClass("changed")) : b.addClass("changed")
                            }).on("focus.styler", function() {
                            b.addClass("focused")
                        }).on("blur.styler", function() {
                            b.removeClass("focused")
                        }).on("click.styler", function() {
                            b.removeClass("focused")
                        })
                    };
                    h();
                    a.on("refresh", function() {
                        a.off(".styler").parent().before(a).remove();
                        h()
                    })
                }
            });
            else if (a.is("select")) a.each(function() {
                if (1 >
                    a.parent("div.jqselect").length) {
                    var h = function() {
                        function n(a) {
                            a.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function(a) {
                                var b = null;
                                "mousewheel" == a.type ? b = -1 * a.originalEvent.wheelDelta : "DOMMouseScroll" == a.type && (b = 40 * a.originalEvent.detail);
                                b && (a.stopPropagation(), a.preventDefault(), c(this).scrollTop(b + c(this).scrollTop()))
                            })
                        }

                        function b() {
                            i = 0;
                            for (len = e.length; i < len; i++) {
                                var a = "",
                                    c = "",
                                    b = a = "",
                                    f = "",
                                    n = "";
                                e.eq(i).prop("selected") && (c = "selected sel");
                                e.eq(i).is(":disabled") && (c = "disabled");
                                e.eq(i).is(":selected:disabled") && (c = "selected sel disabled");
                                void 0 !== e.eq(i).attr("class") && (b = " " + e.eq(i).attr("class"), n = ' data-jqfs-class="' + e.eq(i).attr("class") + '"');
                                var g = e.eq(i).data(),
                                    l;
                                for (l in g) "" !== g[l] && (a += " data-" + l + '="' + g[l] + '"');
                                a = "<li" + n + a + ' class="' + c + b + '">' + e.eq(i).text() + "</li>";
                                e.eq(i).parent().is("optgroup") && (void 0 !== e.eq(i).parent().attr("class") && (f = " " + e.eq(i).parent().attr("class")), a = "<li" + n + ' class="' + c + b + " option" + f + '">' + e.eq(i).text() + "</li>", e.eq(i).is(":first-child") &&
                                    (a = '<li class="optgroup' + f + '">' + e.eq(i).parent().attr("label") + "</li>" + a));
                                x += a
                            }
                        }

                        function h() {
                            var q = new w,
                                d = c("<div" + q.id + ' class="jq-selectbox jqselect' + q.classes + '" style="display: inline-block; position: relative; z-index:' + f.singleSelectzIndex + '"><div class="jq-selectbox__select"' + q.title + ' style="position: relative"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>');
                            a.css({
                                margin: 0,
                                padding: 0
                            }).after(d).prependTo(d);
                            var q = c("div.jq-selectbox__select", d),
                                m = c("div.jq-selectbox__select-text", d),
                                s = e.filter(":selected");
                            s.length ? m.html(s.text()) : m.html(e.first().text());
                            b();
                            var p = "";
                            //f.selectSearch && (p = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + f.selectSearchPlaceholder + '"></div><div class="jq-selectbox__not-found">' + f.selectSearchNotFound + "</div>");
                            var g = c('<div class="jq-selectbox__dropdown" style="position: absolute">' + p + '<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">' +
                                x + "</ul></div>");
                            d.append(g);
                            var l = c("ul", g),
                                k = c("li", g),
                                r = c("input", g),
                                y = c("div.jq-selectbox__not-found", g).hide();
                            k.length < f.selectSearchLimit && r.parent().hide();
                            var t = 0,
                                B = 0;
                            k.each(function() {
                                var a = c(this);
                                a.css({
                                    display: "inline-block",
                                    "white-space": "nowrap"
                                });
                                a.innerWidth() > t && (t = a.innerWidth(), B = a.width());
                                a.css({
                                    display: "block"
                                })
                            });
                            var p = d.clone().appendTo("body").width("auto"),
                                u = p.width();
                            p.remove();
                            u == d.width() && (m.width(B), t += d.find("div.jq-selectbox__trigger").width());
                            t > d.width() && g.width(t);
                            a.css({
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: "100%",
                                opacity: 0
                            });
                            var v = d.outerHeight(),
                                z = r.outerHeight(),
                                A = l.css("max-height"),
                                p = k.filter(".selected");
                            1 > p.length && k.first().addClass("selected sel");
                            void 0 === k.data("li-height") && k.data("li-height", k.outerHeight());
                            var C = g.css("top");
                            "auto" == g.css("left") && g.css({
                                left: 0
                            });
                            "auto" == g.css("top") && g.css({
                                top: v
                            });
                            g.hide();
                            p.length && (e.first().text() != s.text() && d.addClass("changed"), d.data("jqfs-class", p.data("jqfs-class")), d.addClass(p.data("jqfs-class")));
                            if (a.is(":disabled")) return d.addClass("disabled"), !1;
                            q.click(function() {
                                c("div.jq-selectbox").filter(".opened").length && f.onSelectClosed.call(c("div.jq-selectbox").filter(".opened"));
                                a.focus();
                                if (!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                                    var b = c(window),
                                        e = k.data("li-height"),
                                        m = d.offset().top,
                                        s = b.height() - v - (m - b.scrollTop()),
                                        h = f.selectVisibleOptions,
                                        q = 5 * e,
                                        p = e * h;
                                    0 < h && 6 > h && (q = p);
                                    0 === h && (p = "auto");
                                    var h = function() {
                                            g.height("auto").css({
                                                bottom: "auto",
                                                top: C
                                            });
                                            var a = function() {
                                                l.css("max-height",
                                                    Math.floor((s - 20 - z) / e) * e)
                                            };
                                            a();
                                            l.css("max-height", p);
                                            "none" != A && l.css("max-height", A);
                                            s < g.outerHeight() + 20 && a()
                                        },
                                        t = function() {
                                            g.height("auto").css({
                                                top: "auto",
                                                bottom: C
                                            });
                                            var a = function() {
                                                l.css("max-height", Math.floor((m - b.scrollTop() - 20 - z) / e) * e)
                                            };
                                            a();
                                            l.css("max-height", p);
                                            "none" != A && l.css("max-height", A);
                                            m - b.scrollTop() - 20 < g.outerHeight() + 20 && a()
                                        };
                                    !0 === f.selectSmartPositioning ? s > q + z + 20 ? h() : t() : !1 === f.selectSmartPositioning && s > q + z + 20 && h();
                                    c("div.jqselect").css({
                                        zIndex: f.singleSelectzIndex - 1
                                    }).removeClass("opened");
                                    d.css({
                                        zIndex: f.singleSelectzIndex
                                    });
                                    g.is(":hidden") ? (c("div.jq-selectbox__dropdown:visible").hide(), g.show(), d.addClass("opened focused"), f.onSelectOpened.call(d)) : (g.hide(), d.removeClass("opened"), c("div.jq-selectbox").filter(".opened").length && f.onSelectClosed.call(d));
                                    k.filter(".selected").length && (0 !== l.innerHeight() / e % 2 && (e /= 2), l.scrollTop(l.scrollTop() + k.filter(".selected").position().top - l.innerHeight() / 2 + e));
                                    r.length && (r.val("").keyup(), y.hide(), r.keyup(function() {
                                        var a = c(this).val();
                                        k.each(function() {
                                            c(this).html().match(RegExp(".*?" +
                                                a + ".*?", "i")) ? c(this).show() : c(this).hide()
                                        });
                                        1 > k.filter(":visible").length ? y.show() : y.hide()
                                    }));
                                    n(l);
                                    return !1
                                }
                            });
                            k.hover(function() {
                                c(this).siblings().removeClass("selected")
                            });
                            k.filter(".selected").text();
                            k.filter(".selected").text();
                            k.filter(":not(.disabled):not(.optgroup)").click(function() {
                                a.focus();
                                var b = c(this),
                                    l = b.text();
                                if (!b.is(".selected")) {
                                    var k = b.index(),
                                        k = k - b.prevAll(".optgroup").length;
                                    b.addClass("selected sel").siblings().removeClass("selected sel");
                                    e.prop("selected", !1).eq(k).prop("selected", !0);
                                    m.html(l);
                                    d.data("jqfs-class") && d.removeClass(d.data("jqfs-class"));
                                    d.data("jqfs-class", b.data("jqfs-class"));
                                    d.addClass(b.data("jqfs-class"));
                                    a.change()
                                }
                                r.length && (r.val("").keyup(), y.hide());
                                g.hide();
                                d.removeClass("opened");
                                f.onSelectClosed.call(d)
                            });
                            g.mouseout(function() {
                                c("li.sel", g).addClass("selected")
                            });
                            a.on("change.styler", function() {
                                m.html(e.filter(":selected").text());
                                k.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");
                                e.first().text() != k.filter(".selected").text() ?
                                    d.addClass("changed") : d.removeClass("changed")
                            }).on("focus.styler", function() {
                                d.addClass("focused");
                                c("div.jqselect").not(".focused").removeClass("opened")
                            }).on("blur.styler", function() {
                                d.removeClass("focused")
                            }).on("keydown.styler keyup.styler", function(c) {
                                var b = k.data("li-height");
                                m.html(e.filter(":selected").text());
                                k.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");
                                38 != c.which && 37 != c.which && 33 != c.which && 36 != c.which || l.scrollTop(l.scrollTop() + k.filter(".selected").position().top);
                                40 != c.which && 39 != c.which && 34 != c.which && 35 != c.which || l.scrollTop(l.scrollTop() + k.filter(".selected").position().top - l.innerHeight() + b);
                                32 == c.which && c.preventDefault();
                                13 == c.which && (c.preventDefault(), g.hide(), d.removeClass("opened"), f.onSelectClosed.call(d))
                            });
                            c(document).on("click", function(a) {
                                c(a.target).parents().hasClass("jq-selectbox") || "OPTION" == a.target.nodeName || (c("div.jq-selectbox").filter(".opened").length && f.onSelectClosed.call(c("div.jq-selectbox").filter(".opened")), r.length && r.val("").keyup(),
                                    g.hide().find("li.sel").addClass("selected"), d.removeClass("focused opened"))
                            })
                        }

                        function u() {
                            var f = new w,
                                d = c("<div" + f.id + ' class="jq-select-multiple jqselect' + f.classes + '"' + f.title + ' style="display: inline-block; position: relative"></div>');
                            a.css({
                                margin: 0,
                                padding: 0
                            }).after(d);
                            b();
                            d.append("<ul>" + x + "</ul>");
                            var m = c("ul", d).css({
                                    position: "relative",
                                    "overflow-x": "hidden",
                                    "-webkit-overflow-scrolling": "touch"
                                }),
                                h = c("li", d).attr("unselectable", "on").css({
                                    "-webkit-user-select": "none",
                                    "-moz-user-select": "none",
                                    "-ms-user-select": "none",
                                    "-o-user-select": "none",
                                    "user-select": "none",
                                    "white-space": "nowrap"
                                }),
                                f = a.attr("size"),
                                p = m.outerHeight(),
                                g = h.outerHeight();
                            void 0 !== f && 0 < f ? m.css({
                                height: g * f
                            }) : m.css({
                                height: 4 * g
                            });
                            p > d.height() && (m.css("overflowY", "scroll"), n(m), h.filter(".selected").length && m.scrollTop(m.scrollTop() + h.filter(".selected").position().top));
                            a.prependTo(d).css({
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: "100%",
                                height: "100%",
                                opacity: 0
                            });
                            if (a.is(":disabled")) d.addClass("disabled"), e.each(function() {
                                c(this).is(":selected") &&
                                    h.eq(c(this).index()).addClass("selected")
                            });
                            else if (h.filter(":not(.disabled):not(.optgroup)").click(function(b) {
                                    a.focus();
                                    var d = c(this);
                                    b.ctrlKey || b.metaKey || d.addClass("selected");
                                    b.shiftKey || d.addClass("first");
                                    b.ctrlKey || (b.metaKey || b.shiftKey) || d.siblings().removeClass("selected first");
                                    if (b.ctrlKey || b.metaKey) d.is(".selected") ? d.removeClass("selected first") : d.addClass("selected first"), d.siblings().removeClass("first");
                                    if (b.shiftKey) {
                                        var f = !1,
                                            g = !1;
                                        d.siblings().removeClass("selected").siblings(".first").addClass("selected");
                                        d.prevAll().each(function() {
                                            c(this).is(".first") && (f = !0)
                                        });
                                        d.nextAll().each(function() {
                                            c(this).is(".first") && (g = !0)
                                        });
                                        f && d.prevAll().each(function() {
                                            if (c(this).is(".selected")) return !1;
                                            c(this).not(".disabled, .optgroup").addClass("selected")
                                        });
                                        g && d.nextAll().each(function() {
                                            if (c(this).is(".selected")) return !1;
                                            c(this).not(".disabled, .optgroup").addClass("selected")
                                        });
                                        1 == h.filter(".selected").length && d.addClass("first")
                                    }
                                    e.prop("selected", !1);
                                    h.filter(".selected").each(function() {
                                        var a = c(this),
                                            b = a.index();
                                        a.is(".option") && (b -= a.prevAll(".optgroup").length);
                                        e.eq(b).prop("selected", !0)
                                    });
                                    a.change()
                                }), e.each(function(a) {
                                    c(this).data("optionIndex", a)
                                }), a.on("change.styler", function() {
                                    h.removeClass("selected");
                                    var a = [];
                                    e.filter(":selected").each(function() {
                                        a.push(c(this).data("optionIndex"))
                                    });
                                    h.not(".optgroup").filter(function(b) {
                                        return -1 < c.inArray(b, a)
                                    }).addClass("selected")
                                }).on("focus.styler", function() {
                                    d.addClass("focused")
                                }).on("blur.styler", function() {
                                    d.removeClass("focused")
                                }), p > d.height()) a.on("keydown.styler",
                                function(a) {
                                    38 != a.which && 37 != a.which && 33 != a.which || m.scrollTop(m.scrollTop() + h.filter(".selected").position().top - g);
                                    40 != a.which && 39 != a.which && 34 != a.which || m.scrollTop(m.scrollTop() + h.filter(".selected:last").position().top - m.innerHeight() + 2 * g)
                                })
                        }
                        var e = c("option", a),
                            x = "";
                        a.is("[multiple]") ? u() : h()
                    };
                    h();
                    a.on("refresh", function() {
                        a.off(".styler").parent().before(a).remove();
                        h()
                    })
                }
            });
            else if (a.is(":reset")) a.on("click", function() {
                setTimeout(function() {
                        a.closest(f.wrapper).find("input, select").trigger("refresh")
                    },
                    1)
            })
        }).promise().done(function() {
            f.onFormStyled.call()
        })
    }
})(jQuery);