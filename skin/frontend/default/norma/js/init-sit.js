jQuery.extend(jQuery.fn, {
    toplinkwidth: function () {
        var c = jQuery(".wrap").outerWidth();
        var b = jQuery(this).children("a").outerWidth(true);
        var a = jQuery(window).width() / 2 - c / 2 - b;
        if (a < 0) {
            jQuery(this).hide();
            return false
        } else {
            if (jQuery(window).scrollTop() >= 1) {
                jQuery(this).show()
            }
            jQuery(this).css({
                "padding-right": a + "px"
            });
            return true
        }
    }
});

function animateCSS(a, b) {
    jQuery(a).addClass(b);
    var c = window.setTimeout(function () {
        jQuery(a).removeClass(b)
    }, 1300)
}
jQuery(function () {
    var c = jQuery(window).height(),
        g = jQuery(window).width();
    if (jQuery("input, select").length) {
        jQuery("input, select").styler({
            selectSearch: true,
            singleSelectzIndex: 10,
            selectSmartPositioning: false
        })
    }

    jQuery("#modal").load("/tpl/modal.tpl", function () {
        if (jQuery(".modalLink").length) {
            jQuery(".modalLink").modal({
                trigger: ".modalLink",
                olay: ".overlay",
                modals: ".modal",
                animationEffect: "fadeIn",
                animationSpeed: 400,
                moveModalSpeed: "slow",
                background: "2E2F2F",
                opacity: 0.7,
                openOnLoad: false,
                docClose: true,
                closeByEscape: true,
                moveOnScroll: true,
                resizeWindow: false,
                close: ".close-modal, button.grey,.bt-cloze"
            })
        }
        if (jQuery("#modal input, #modal select").length) {
            jQuery("#modal input, #modal select").styler({
                selectSearch: false,
                singleSelectzIndex: 10
            })
        }
        var j = getParameterByName("forgotPassword");
        if (j != "") {
            jQuery("#mpassword .modalLink").click()
        }
        if (jQuery(".restaurant-review").length) {
            if (jQuery(".user-panel").length) {
                if (jQuery(".promo-org-links").attr("data-vote") == 1) {
                    var i = getParameterByName("vote");
                    if (i != "") {
                        jQuery.get("/ajax?action=setVote&vote=" + i + "&id=" + jQuery(".promo-org-links").attr("data-id") + "&r=" + Math.random());
                        var h = getParameterByName("review");
                        if (h == "") {
                            jQuery("#mvote a").click()
                        }
                    } else {
                        jQuery(".restaurant-review .stars").addClass("active");
                        jQuery(".restaurant-review .rating").addClass("h-tooltip");
                        jQuery(".restaurant-review .stars i").on("click", function (l) {
                            var k = jQuery(this).index() + 1;
                            if (k > 0) {
                                jQuery("#mvote a").click();
                                jQuery(".restaurant-review .stars i").off("click");
                                jQuery(".restaurant-review .stars").removeClass("active");
                                jQuery(".restaurant-review .rating").removeClass("h-tooltip");
                                jQuery.get("/ajax?action=setVote&vote=" + k + "&id=" + jQuery(".promo-org-links").attr("data-id") + "&r=" + Math.random())
                            }
                        })
                    }
                }
                if (jQuery(".org-link-write").length) {
                    var h = getParameterByName("review");
                    if (h != "") {
                        jQuery("#mreview a").click()
                    }
                }
            }
        }
        setImputMask()
    });
    jQuery(".js-dd-trig").on("click", function () {
        var h = jQuery(this).next(".js-dd");
        if (h.hasClass("open")) {
            h.hide().removeClass("open")
        } else {
            jQuery(".js-dd").hide().removeClass("open");
            h.show().addClass("open")
        }
        return false
    });
    jQuery(document).on("click", function (h) {
        if (jQuery(h.target).closest(".user-panel .open").length) {
            return
        }
        jQuery(".user-panel .open").hide().removeClass("open");
        h.stopPropagation();
        if (jQuery(h.target).closest(".place .open").length) {
            return
        }
        jQuery(".place .open").hide().removeClass("open");
        h.stopPropagation();
        if (jQuery(h.target).closest(".cart-panel .open").length) {
            return
        }
        jQuery(".cart-panel .open").hide().removeClass("open");
        jQuery(".cart-bkm a").removeClass("active");
        h.stopPropagation()
    });
    jQuery(".js-dd-pnt").find(".dropdown-list > li input").on("change", function () {
        var h = jQuery(this).closest("li"),
            i = jQuery(this).attr("name");
        h.parents(".js-dd-pnt").find(".js-dd-trig").find("i").text(h.text());
        jQuery(".js-dd").hide().removeClass("open");
        if (i != "") {
            dropdownSelect(i, jQuery(this).val())
        }
    });
    if (jQuery(".user-panel").length) {
        if (jQuery(".user-bkm .count").length && jQuery("#cart-panel").length) {
            var e = parseInt(jQuery(".user-bkm .count").text());
            if (e > 0) {
                jQuery("#cart-panel .cart-bkm .count").text(e);
                jQuery("#cart-panel .dd-bkm").html(jQuery(".user-bkm .dd-bkm").html());
                jQuery("#cart-panel .js-dd-pnt").show()
            }
        }
        jQuery(".js-dd .empty, .js-dd .show-more").hide();
        jQuery(".dd-bkm .dropdown-list, .dd-msg .dropdown-list").each(function () {
            var h = jQuery(this).find("li").length;
            if (h > 3) {
                jQuery(this).closest(".tab,.js-dd").find(".show-more").show()
            }
            if (h == 0) {
                jQuery(this).closest(".tab,.js-dd").find(".empty").show()
            }
        });
        jQuery(".dd-bkm, .dd-msg").find(".show-more").on("click", function () {
            jQuery(this).hide();
            jQuery(this).closest(".js-dd").find(".dropdown-list").css("max-height", (jQuery(this).closest(".js-dd").find(".dropdown-list").find("li:visible").length * 86) + "px");
            return false
        });
        jQuery(".dd-bkm .dropdown-list").find(".item").on("click", function () {
            var h = jQuery(this).attr("data-url");
            if (h != "") {
                window.location = h
            }
        });
        jQuery(".dropdown-list").find(".remove").on("click", function () {
            jQuery(this).parent().slideUp(400);
            var i = jQuery(this).parents(".dropdown-list").find("li:visible").length - 1;
            if (i == 0) {
                jQuery(this).closest(".tab, .js-dd").find(".empty").slideDown(400)
            }
            if (i <= 3) {
                jQuery(this).closest(".tab, .js-dd").find(".show-more").slideUp(400)
            }
            var h = jQuery(this).attr("data-type"),
                k = jQuery(this).attr("data-id"),
                j = "";
            if (k == "") {
                return false
            }
            if (h == "org") {
                return setFavorite(k, 0)
            } else {
                if (h == "msg") {
                    j = "noticeRemove";
                    var i = parseInt(jQuery(".user-msg .count").text());
                    if (i > 1) {
                        jQuery(".user-msg .count").text(i - 1)
                    } else {
                        jQuery(".user-msg .count").remove()
                    }
                }
            }
            if (j != "") {
                jQuery.get("/ajax?action=" + j + "&id=" + k + "&r=" + Math.random())
            }
            return false
        })
    }
    jQuery(".btn-tab").on("click", function (h) {
        h.preventDefault();
        jQuery(this).closest(".btn-tabs").find(".btn-tab").removeClass("active");
        jQuery(this).addClass("active").siblings().removeClass("active").parents().next(".tabs").find(".tab").removeClass("visible").eq(jQuery(this).index()).addClass("visible").siblings(".tab")
    });
    if (jQuery(".promo-index").length) {
        jQuery(".example a").click(function (h) {
            h.preventDefault();
            jQuery('.kitchens select [value="' + jQuery(this).attr("data-value") + '"]').attr("selected", "selected");
            jQuery(".kitchens select").trigger("change").trigger("refresh")
        });
        jQuery(".kitchens select").change(function () {
            var i = "/restaurants",
                h = jQuery(this).val();
            if (h != "") {
                i += "/" + h
            }
            jQuery(this).closest("form").attr("action", i)
        });
        if (jQuery(".carousel-stock").length) {
            var b = jQuery(".all-stock").bxSlider({
                mode: "horizontal",
                pagerSelector: ".cpager-1",
                pager: !jQuery(".location-stock").length,
                useCSS: false,
                moveSlides: 1,
                minSlides: 4,
                maxSlides: 4,
                infiniteLoop: false,
                slideWidth: 220,
                slideMargin: 11,
                hideControlOnEnd: true,
                speed: 400
            });
            if (jQuery(".location-stock").length) {
                jQuery(".carousel-stock").find(".btn-tab").on("click", function () {
                    b.reloadSlider()
                });
                jQuery(".location-stock").bxSlider({
                    mode: "horizontal",
                    pager: false,
                    useCSS: false,
                    moveSlides: 1,
                    minSlides: 4,
                    maxSlides: 4,
                    infiniteLoop: false,
                    slideWidth: 220,
                    slideMargin: 11,
                    hideControlOnEnd: true,
                    speed: 400
                })
            }
        }
        jQuery(".carousel-stock .item button").click(function (h) {
            h.preventDefault();
            addToCart(jQuery(this).closest(".item"), "promo")
        })
    }

    jQuery(".nav-items a.icon").on("click", function (i) {
        i.preventDefault();
        var h = !jQuery(this).parent().hasClass("selected");
        jQuery(this).closest(".nav-items").find("li.selected").each(function () {
            jQuery(this).removeClass("selected");
            jQuery(this).find("ul").slideUp(200)
        });
        if (h) {
            jQuery(this).parent().addClass("selected");
            jQuery(this).next().stop(true, true).slideToggle(200)
        }
    });

    if (jQuery(".restaurant-review").length) {
        jQuery.get("/objects?action=getOrgComment&id=" + jQuery(".restaurant-review").attr("data-id"), function (h) {
            if (h != "false") {
                jQuery(".slider-review").html(h);
                jQuery("#js-reviews-mini").bxSlider({
                    pager: false,
                    nextSelector: ".reviews-next",
                    prevSelector: ".reviews-prev",
                    randomStart: true,
                    prevText: "",
                    nextText: ""
                })
            }
        });

        if (jQuery(".restaurant-menu").length) {
            jQuery(".nav-left .search").submit(function (j) {
                j.preventDefault();
                var h = jQuery(".nav-left .search input").val(),
                    i = jQuery(".nav-left .search").attr("action");
                if (h == "" || i == "") {
                    return
                }
                jQuery(".nav-items, nav-sub-items").find("li.selected").each(function () {
                    jQuery(this).removeClass("selected")
                });
                jQuery(".nav-sub-items:visible").each(function () {
                    jQuery(this).slideUp(200)
                });
                getUrl(i + "?s=" + h, false)
            });
            jQuery(".nav-items a:not(.icon)").on("click", function (i) {
                i.preventDefault();
                jQuery(this).closest(".nav-items").find("li.selected").each(function () {
                    jQuery(this).removeClass("selected")
                });
                jQuery(this).parent().addClass("selected");
                if (jQuery(this).closest("ul").hasClass("nav-sub-items")) {
                    jQuery(this).closest("ul").closest("li").addClass("selected")
                } else {
                    jQuery(".nav-sub-items:visible").each(function () {
                        jQuery(this).slideUp(200)
                    })
                }
                jQuery(".nav-left .search input").val("");
                var h = jQuery(this).attr("href");
                getUrl(h, false)
            })
        }
        if (jQuery(".user-panel").length) {
            canOrderBonus()
        }
        if (jQuery(".restaurant-about").length) {
            jQuery("#scroll-to-map").on("click", function (h) {
                jQuery("body,html").animate({
                    scrollTop: jQuery("#map").offset().top
                }, 1000)
            })
        }
        itemButton()
    }
    if (jQuery(".slider-video").length) {
        jQuery(".slider-video").bxSlider({
            auto: true,
            pause: 7000,
            video: true,
            controls: false,
            useCSS: false
        })
    }
    if (jQuery(".bg-animate").length) {
        jQuery(window).scroll(function () {
            var h = jQuery(".bg-animate").offset().top - c + 275;
            if (jQuery(window).scrollTop() > h) {
                jQuery(".zakaman").addClass("animated bounceInDown");
                jQuery(".zakaman-message").addClass("animated tada")
            }
        })
    }
    if (jQuery(".s-search").length) {
        jQuery(".b-popular-food .item button").click(function (h) {
            h.preventDefault();
            addToCart(jQuery(this).closest(".item"), "item")
        })
    }
    if (jQuery("#reasonForm").length) {
        function a() {
            if (jQuery("#reasonForm input:checked").val() == "0" && jQuery('#reasonForm input[name="other"]').val() == "") {
                jQuery("#reasonForm button").attr("disabled", "disabled")
            } else {
                jQuery("#reasonForm button").removeAttr("disabled")
            }
        }

        jQuery("#reasonForm input").change(a).keypress(a)
    }
    if (jQuery("#top-link").length) {
        var d = jQuery("#top-link");
        d.css({
            "padding-bottom": c
        });
        d.toplinkwidth();
        jQuery(window).resize(function () {
            d.toplinkwidth()
        });
        jQuery(window).scroll(function () {
            var h = 300;
            if (jQuery(window).scrollTop() >= h && d.toplinkwidth()) {
                d.fadeIn(300).css("top", "0")
            } else {
                d.fadeOut(300).css("top", "-200px")
            }
        });
        d.on("click", function (h) {
            jQuery("html, body").animate({
                scrollTop: 0
            }, 300);
            return false
        })
    }
    jQuery("#upload-styler").hide();
    if (jQuery(".b-history-order").length) {
        jQuery(".nav-items a.icon").on("click", function (h) {
            h.preventDefault();
            jQuery(this).parent().toggleClass("selected");
            jQuery(this).next().find("li").removeClass("selected");
            jQuery(this).next().stop(true, true).slideToggle(200)
        });
        jQuery(".nav-sub-items a").on("click", function (i) {
            i.preventDefault();
            jQuery(this).closest(".nav-sub-items").find("li").removeClass("selected");
            jQuery(this).parent().addClass("selected");
            var h = jQuery(this).attr("href");
            jQuery("html, body").animate({
                scrollTop: jQuery(h).offset().top - 30
            }, 600)
        })
    }
    if (jQuery(".s-gifts").length && jQuery(".user-panel").length) {
        jQuery(".s-gifts div.button").removeClass("h-tooltip");
        jQuery(".s-gifts a.btn").removeClass("disabled");
        var f = parseInt(jQuery(".user-score").attr("data-score"));
        jQuery(".catalog-gifts .item").each(function () {
            var h = parseInt(jQuery(this).attr("data-cost"));
            if (f > h) {
                jQuery(this).find("div.button").removeClass("h-tooltip");
                jQuery(this).find("a.btn").removeClass("disabled")
            } else {
                jQuery(this).find(".b-tooltip").html("У вас не достатньо балів для замовлення")
            }
        })
    }
    if (jQuery(".reviews-list").length && jQuery(".user-panel").length) {
        jQuery(".reviews-list a.like-vote").click(function () {
            var h = parseInt(jQuery(this).text()) + 1,
                i = jQuery(this).attr("data-id");
            jQuery(this).replaceWith('<span class="yes-vote icon"><span>' + h + "</span></span>");
            jQuery.get("/ajax?action=reviewVote&id=" + i + "&r=" + Math.random(), function (j) {
                return
            });
            return false
        })
    }
    if (jQuery("#morder").length) {
        jQuery(".autocomplete").each(function () {
            var i = jQuery(this).find("input"),
                h = jQuery(this).find("select"),
                j = jQuery(this),
                k = jQuery(this).find("option").length;
            if (k < 2) {
                jQuery(i).css("width", "303px");
                if (k > 0) {
                    orderAutocomplete(jQuery(h).val())
                }
                return
            }
            orderAutocomplete(jQuery(h).val());
            jQuery(h).change(function () {
                orderAutocomplete(jQuery(h).val())
            })
        })
    }
    if (jQuery.cookie("zakaCityDetect") == undefined && jQuery("#selectCity .city").text() == "Москва") {
        jQuery.getScript("http://api-maps.yandex.ru/2.1/?lang=ru_RU", function () {
            ymaps.ready(function () {
                ymaps.geolocation.get({
                    autoGeocode: true,
                    provider: "yandex"
                }).then(function (h) {
                    var j = {},
                        k;
                    jQuery("#selectCity .dropdown-list li").each(function () {
                        if (jQuery(this).find("input:checked").length) {
                            return
                        }
                        j[jQuery(this).text()] = jQuery(this).find("input").val()
                    });
                    k = h.geoObjects.get(0).properties.get("metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName");
                    for (var i in j) {
                        if (k.indexOf(i) != -1) {
                            showCityDialog(i, j[i]);
                            return
                        }
                    }
                    k = h.geoObjects.get(0).properties.get("metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.SubAdministrativeAreaName");
                    for (var i in j) {
                        if (k.indexOf(i) != -1) {
                            showCityDialog(i, j[i]);
                            return
                        }
                    }
                    k = h.geoObjects.get(0).properties.get("metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName");
                    for (var i in j) {
                        if (k.indexOf(i) != -1) {
                            showCityDialog(i, j[i]);
                            return
                        }
                    }
                })
            })
        })
    }
    jQuery(window).bind("load", function () {
        setTimeout(function () {
            jQuery(window).bind("popstate", function () {
                getUrl(window.location, true)
            })
        }, 0)
    })
});

function showCityDialog(b, a) {
    jQuery("#location-notify strong").text(b + "?");
    jQuery("#location-notify").css("display", "block").animate({
        opacity: "1"
    }, 600);
    jQuery("#location-notify .green").click(function (c) {
        window.location = a
    });
    jQuery("#location-notify .grey").click(function (c) {
        jQuery("#location-notify").hide()
    });
    jQuery.cookie("zakaCityDetect", true, {
        expires: 5,
        path: "/"
    })
}

function sendPartnerForm() {
    var a = {};
    jQuery("#mpartners input, #mpartners textarea").each(function () {
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    if (a.title == "" || a.city == "" || a.name == "" || a.phone == "") {
        return false
    }
    jQuery("#mfeedback textarea").val("");
    jQuery.post("/ajax?action=sendPartnerForm", a, function (b) {
        jQuery("#mconfirm .modalLink").click()
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function sendFeedback() {
    var a = {};
    jQuery("#mfeedback input, #mfeedback textarea").each(function () {
        if (jQuery(this).val() == "") {
            return false
        }
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    jQuery("#mfeedback textarea").val("");
    jQuery.post("/ajax?action=sendFeedback", a, function (b) {
        jQuery("#mconfirm .modalLink").click()
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function dropdownSelect(c, e) {
    switch (c) {
        case "city":
            window.location = e;
            break;
        case "district":
            var a = "/" + jQuery('#selectDistr input[value="' + jQuery.cookie("zakaDistrict") + '"]').attr("data-code");
            var d = "/" + jQuery('#selectDistr input[value="' + e + '"]').attr("data-code");
            var b = window.location.href;
            if (a !== undefined && d !== undefined) {
                b = b.replace(new RegExp(a, "g"), d)
            }
            jQuery.cookie("zakaDistrict", e, {
                expires: 365,
                path: "/"
            });
            window.location = b;
            break
    }
}

function userReg() {
    var a = {};
    jQuery("#mreg input").each(function () {
        if (jQuery(this).val() == "") {
            return false
        }
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    jQuery.post("/ajax?action=userReg", a, function (b) {
        if (b == "true") {
            location.reload();
            dataLayer.push({
                event: "registration"
            })
        } else {
            if (b == "false") {
                b = "Виникла помилка, <br> спробуйте повторити запит."
            }
            jQuery(".authoriz a.reg").click();
            jQuery("#mreg .error").html(b);
            jQuery("#mreg .error").slideDown()
        }
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function afterOrderReg() {
    dataLayer.push({
        event: "registration_after_order"
    });
    jQuery(".authoriz a.reg").click();
    return false
}

function freeFoodReg() {
    dataLayer.push({
        event: "registration_freedom"
    });
    jQuery(".authoriz a.reg").click();
    return false
}

function freeFoodLink() {
    dataLayer.push({
        event: "get_food_baner"
    });
    return true
}

function userExit() {
    jQuery.get("/ajax?action=userExit&r=" + Math.random(), function (a) {
        location.reload()
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function userLogin() {
    var a = {};
    jQuery("#msignin input").each(function () {
        if (jQuery(this).val() == "") {
            return false
        }
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    jQuery.post("/ajax?action=userLogin", a, function (b) {
        if (b == "true") {
            location.reload()
        } else {
            if (b == "false") {
                b = "Виникла помилка, <br> спробуйте повторити запит."
            }
            jQuery(".authoriz a.signin").click();
            jQuery("#msignin .registration").hide();
            jQuery("#msignin .error").html(b);
            jQuery("#msignin .error").slideDown()
        }
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function userCartLogin() {
    var a = {};
    jQuery("#morder .form-signin input").each(function () {
        if (jQuery(this).val() == "") {
            return false
        }
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    jQuery.post("/ajax?action=userLogin", a, function (b) {
        if (b == "true") {
            location.reload()
        } else {
            if (b == "false") {
                b = "Виникла помилка, <br> спробуйте повторити запит."
            }
            jQuery("#order").click();
            jQuery("#morder .registration").hide();
            jQuery("#morder .form-signin .error").html(b);
            jQuery("#morder .form-signin .error").slideDown()
        }
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function getParameterByName(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var c = new RegExp("[\\?&]" + a + "=([^&#]*)"),
        b = c.exec(location.search);
    return b == null ? "" : decodeURIComponent(b[1].replace(/\+/g, " "))
}

function forgotPassword() {
    var a = {};
    jQuery("#mrecover input").each(function () {
        if (jQuery(this).val() == "") {
            return false
        }
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    jQuery.post("/ajax?action=forgotPassword", a, function (b) {
        if (b == "true") {
            jQuery("#mconfirm .modalLink").click()
        } else {
            if (b == "false") {
                b = "Виникла помилка, <br> спробуйте повторити запит."
            }
            jQuery("#mrecover .info").html('<div class="field error">' + b + "</div>");
            jQuery("#mrecover .modalLink").click()
        }
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function changePassword() {
    var a = {};
    a.token = getParameterByName("forgotPassword");
    jQuery("#mpassword input").each(function () {
        if (jQuery(this).val() == "") {
            return false
        }
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    jQuery.post("/ajax?action=changePassword", a, function (b) {
        if (b == "true") {
            window.location = "/"
        } else {
            if (b == "false") {
                b = "Виникла помилка, <br> спробуйте повторити запит."
            }
            jQuery("#mpassword .info").html('<div class="field error">' + b + "</div>");
            jQuery("#mpassword .modalLink").click()
        }
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function giftOrder(c) {
    var a = jQuery("#gift" + c + " .gifts-name").text(),
        b = jQuery("#gift" + c + " .gifts-points").text();
    jQuery("#mgiftorder .info").html('Ви впевнені що хочете підтвердити замовлення<br>на "' + a + '"<br>за ' + b + "?");
    jQuery("#mgiftorder button.green").attr("onclick", "return giftOrderConfirm(" + c + ");");
    jQuery("#mgiftorder .modalLink").click();
    return false
}

function giftOrderConfirm(a) {
    jQuery("#mloader .modalLink").click();
    jQuery.get("/ajax?action=giftOrder&id=" + a + "&r=" + Math.random(), function (b) {
        jQuery("#mgiftthanks .modalLink").click()
    })
}

function inviteFriend() {
    var a = {};
    jQuery("#minvite input").each(function () {
        if (jQuery(this).val() == "") {
            return false
        }
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    jQuery.post("/ajax?action=inviteFriend", a, function (b) {
        jQuery("#minvitethanks .modalLink").click()
    });
    jQuery("#mloader .modalLink").click();
    jQuery("#minvite input").val("");
    return false
}

function showPassword(a) {
    if (jQuery(".change-pass").is(":visible")) {
        jQuery(a).text("������ ������");
        jQuery(".change-pass").slideUp();
        jQuery(".change-pass input").val("")
    } else {
        jQuery(a).text("³������ ����");
        jQuery(".change-pass").slideDown()
    }
    return false
}
var photoCss = {};

function previewPhoto(b) {
    if (photoCss.background == undefined) {
        photoCss.background = jQuery(".b-upload-photo .img").css("background");
        photoCss["background-size"] = jQuery(".b-upload-photo .img").css("background-size")
    }
    if (b.files && b.files[0]) {
        var a = new FileReader();
        a.onload = function (c) {
            jQuery(".b-upload-photo .img").css("background", "url(" + c.target.result + ") no-repeat center").css("background-size", "cover");
            jQuery("#removePhoto").val("false")
        };
        a.readAsDataURL(b.files[0])
    } else {
        jQuery(".b-upload-photo .img").css("background", photoCss.background).css("background-size", photoCss["background-size"])
    }
}

function removePhoto() {
    jQuery(".b-upload-photo .img").css("background", "url(/img/upload-photo-bg.png) no-repeat center center/50% auto").css("background-size", "");
    jQuery("#upload").val("");
    jQuery("#removePhoto").val("true");
    return false
}

function loadPhoto() {
    jQuery("#upload").click();
    return false
}

function addPhone() {
    jQuery(".add-phone-link").before('<div class="field hide"><span class="label">�������</span> <input class="styler" type="tel" name="phones[]" /><span title="�������� �����" onclick="removePhone(this);" class="remove icon"></span></div>');
    jQuery(".form-add-phone").find(".field:last").slideDown(function () {
        setImputMask()
    });
    return false
}

function removePhone(a) {
    jQuery(a).closest("div").slideUp(function () {
        jQuery(a).closest("div").remove()
    })
}

function setImputMask() {
    jQuery('form input[type="tel"]').focus(function () {
        if (this.value.length == 0) {
            this.value = "+3 (";
            if (this.setSelectionRange) {
                this.setSelectionRange(this.value.length, this.value.length)
            }
        }
    }).blur(function () {
        if (this.value == "+3 (") {
            this.value = ""
        }
    }).mask("+3 (000) 000-00-00")
}

function saveSettings() {
    var e = jQuery('.change-pass input[name="password"]').val(),
        d = jQuery('.change-pass input[name="password2"]').val(),
        c = jQuery('.form-settings input[name="name"]').val(),
        a = jQuery('.form-add-phone input[name="phone"]').val(),
        b = "";
    if (e.length > 0 && e.length < 3) {
        b = "Потрібен пароль від 3-х символів"
    }
    if (e.length > 0 && e != d) {
        b = "Паролі не співпадають"
    }
    if (c.length < 2) {
        b = "Вкажіть імя"
    }
    if (a.length < 18) {
        b = "Перевірте номер телефону"
    }
    if (b != "") {
        jQuery("html, body").animate({
            scrollTop: jQuery(".b-settings").offset().top
        }, 400);
        jQuery(".b-settings .error").html('<br><br><span class="label"></span>' + b).slideDown();
        return false
    }
    return true
}

function removeAddress(a) {
    jQuery("#maddress button.green").attr("onclick", "return removeAddressConfirm(" + a + ");");
    jQuery("#maddress .modalLink").click();
    return false
}

function removeAddressConfirm(a) {
    jQuery("#maddress button.grey").click();
    jQuery("#addr" + a).slideUp();
    jQuery.get("/ajax?action=removeAddress&id=" + a + "&r=" + Math.random())
}

function restSearchForm(a) {
    return makeSearch("/restaurants", a)
}

function foodSearchForm(a) {
    return makeSearch("/food", a)
}

/*
 function makeSearch(c, f) {
 var d = jQuery('#searchForm select[name="cuisine"]').val();
 if (d != "") {
 c += "/" + d
 }
 var g = jQuery("#selectDistr input:checked").attr("data-code");
 if (g !== undefined) {
 c += (d == "" ? "/all/" : "/") + g
 }
 var e = [];
 jQuery("#searchForm select, #searchForm input:checked").each(function() {
 if (jQuery(this).attr("name") == "cuisine" || jQuery(this).attr("name") == "work") {
 return
 }
 if (jQuery(this).val() == "") {
 return
 }
 e.push(jQuery(this).attr("name") + "=" + jQuery(this).val())
 });
 var b = jQuery('#searchForm input[name="work"]');
 if (jQuery(b).length && !jQuery(b).is(":checked")) {
 e.push("work=all")
 }
 if (e.length > 0) {
 c += "?" + e.join("&")
 }
 if (jQuery("#cuisineName").length) {
 var a = jQuery('#searchForm select[name="cuisine"] option:selected').text();
 if (a == "-----") {
 jQuery("#cuisineName").hide();
 jQuery("#cuisineName").prev().hide()
 } else {
 jQuery("#cuisineName").show();
 jQuery("#cuisineName").prev().show();
 jQuery("#cuisineName").text(a)
 }
 }
 if (f) {
 getUrl(c, false)
 } else {
 window.location = c
 }
 return false
 }
 */

function addReview(b) {
    var a = jQuery("#mreview textarea").val();
    if (a != "") {
        jQuery("#mloader a").click();
        jQuery.post("/ajax?action=addReview", {
            id: b,
            text: a
        }, function (e) {
            var c = jQuery("#mreview").attr("data-link");
            if (c != "") {
                window.location = c
            } else {
                location.reload()
            }
        })
    }
    return false
}

function setFavorite(e, d) {
    var b = 1;
    if (d == 1) {
        jQuery.get("/ajax?action=favoriteAdd&id=" + e + "&r=" + Math.random());
        if (jQuery(".promo-org-links").length) {
            var c = parseInt(jQuery(".promo-org-links").attr("data-id"));
            if (e == c) {
                jQuery(".org-link-bookmark").addClass("active").text("В обраному").attr("onclick", "return setFavorite(" + e + ", 0);")
            }
        }
    } else {
        jQuery.get("/ajax?action=favoriteRemove&id=" + e + "&r=" + Math.random());
        if (jQuery(".promo-org-links").length) {
            var c = parseInt(jQuery(".promo-org-links").attr("data-id"));
            if (e == c) {
                jQuery(".org-link-bookmark").removeClass("active").text("В обране").attr("onclick", "return setFavorite(" + e + ", 1);")
            }
        }
        b = -1
    }
    if (jQuery(".user-bkm .count").length) {
        var a = parseInt(jQuery(".user-bkm .count").text()) + b;
        if (a > 0) {
            jQuery(".user-bkm .count").text(a);
            jQuery(".cart-bkm .count").text(a)
        } else {
            jQuery(".user-bkm .count").hide();
            jQuery(".cart-bkm .count").hide()
        }
    } else {
        if (b == 1) {
            jQuery(".user-bkm .js-dd-trig").html('<span class="count">1</span>');
            jQuery(".cart-bkm .js-dd-trig").html('<span class="count">1</span>')
        }
    }
    return false
}

function randomSearch() {
    var a = {};
    jQuery("#searchForm select, #searchForm input:checked").each(function () {
        if (jQuery(this).val() == "") {
            return
        }
        a[jQuery(this).attr("name")] = jQuery(this).val()
    });
    jQuery.post("/ajax?action=getRandom", a, function (b) {
        if (b == "false") {
            window.location = "/restaurants"
        } else {
            window.location = "/restaurants/menu/" + b
        }
    });
    return false
}

function canOrderBonus() {
    if (jQuery(".b-food-balls").length && jQuery(".user-panel").length) {
        if (jQuery("#cart-panel").attr("data-score") == "1") {
            jQuery(".b-food-balls").hide();
            return
        }
        var a = parseInt(jQuery(".user-score").attr("data-score"));
        jQuery(".b-food-balls .info").html("Ви можете потратити ваші бали на безплатне замовлення товару.");
        jQuery(".b-food-balls .item").each(function () {
            var b = parseInt(jQuery(this).attr("data-work"));
            if (b) {
                var c = parseInt(jQuery(this).attr("data-cost"));
                if (a > c) {
                    jQuery(this).find("div.button").removeClass("h-tooltip");
                    jQuery(this).find("button").removeAttr("disabled")
                } else {
                    jQuery(this).find(".b-tooltip").html("У вас не вистачає балів")
                }
            }
        });
        jQuery(".b-food-balls .item button").click(function (b) {
            b.preventDefault();
            addToCart(jQuery(this).closest(".item"), "bonus")
        })
    }
}

function addToCart(d, b) {
    if (checkDistrict()) {
        var f = jQuery(d).attr("data-id");
        jQuery.get("/ajax?action=addToCart&id=" + f + "&type=" + b + "&r=" + Math.random(), function (g) {
            if (g != "false") {
                data = g.split(":");
                if (data.length > 1) {
                    jQuery("#cart-panel .cart-food span").text(data[0]);
                    jQuery("#cart-panel .cart-price span").text(data[1])
                }
            }
        });
        jQuery("#cart-panel").slideDown();
        var a = jQuery(d).find("img").clone().addClass("move-img");
        jQuery("body").append(a);
        var c = jQuery(d).find("img").offset(),
            e = jQuery("#cart-panel").find(".cart-link").offset();
        a.css({
            position: "absolute",
            top: c.top,
            left: c.left,
            opacity: 0.8,
            "border-radius": "0",
            "z-index": 1000
        });
        a.animate({
            left: e.left,
            top: e.top,
            opacity: 0,
            width: 50,
            height: 50,
            borderRadius: "50%"
        }, 500, function () {
            jQuery(".move-img").remove()
        });
        if (b == "bonus") {
            jQuery(".b-food-balls").slideUp();
            jQuery("#cart-panel").attr("data-score", "1")
        }
    }
}

function checkDistrict() {
    if (jQuery.cookie("zakaDistrict") == undefined || jQuery.cookie("zakaDistrict") == 0) {
        jQuery("#mdistrict a").click();
        return false
    }
    return true
}

function selectDistrict() {
    var a = parseInt(jQuery("#mdistrict select").val());
    jQuery.cookie("zakaDistrict", a, {
        expires: 365,
        path: "/"
    });
    jQuery("#mloader a").click();
    location.reload()
}

function itemButton() {
    if (jQuery(".restaurant-menu").length) {
        jQuery(".b-popular-food .item button").click(function (a) {
            a.preventDefault();
            addToCart(jQuery(this).closest(".item"), "item")
        });
        jQuery(".b-stock .b-stock-item button").click(function (a) {
            a.preventDefault();
            addToCart(jQuery(this).closest(".b-stock-item"), "promo")
        })
    }
}

function removeItem(b, a) {
    jQuery.get("/ajax?action=removeCartItem&id=" + b + "&org_id=" + a + "&r=" + Math.random(), function (c) {
        if (c != "false") {
            jQuery("#org" + a).replaceWith(c);
            if (jQuery(".checkout-items").children(".visible").length == 0) {
                jQuery(".b-empty").slideDown(400)
            }
        }
    });
    jQuery("#item" + b).slideUp(400);
    return false
}

function incrementItem(d, b, c) {
    var a = parseInt(jQuery("#count" + d).val());
    if (c == -1 && a == 1) {
        return false
    }
    jQuery.get("/ajax?action=incrementCartItem&id=" + d + "&org_id=" + b + "&value=" + c + "&r=" + Math.random(), function (e) {
        if (e != "false") {
            jQuery("#org" + b).replaceWith(e)
        }
    });
    jQuery("#count" + d).val(a + c);
    return false
}

function removeOrg(a) {
    jQuery.get("/ajax?action=removeCartOrg&id=" + a + "&r=" + Math.random());
    jQuery("#org" + a).removeClass("visible").slideUp(400);
    if (jQuery(".checkout-item.visible").length == 0) {
        jQuery(".b-empty").slideDown(400)
    }
    return false
}

function removeBonus(b, a) {
    jQuery.get("/ajax?action=removeCartBonus&org_id=" + a + "&r=" + Math.random(), function (c) {
        if (c != "false") {
            jQuery("#org" + a).replaceWith(c);
            if (jQuery(".checkout-items").children(".visible").length == 0) {
                jQuery(".b-empty").slideDown(400)
            }
        }
    });
    jQuery("#bonus" + b).slideUp(400);
    return false
}

function removeFromCombo(c, b, a) {
    jQuery.get("/ajax?action=removeFromCombo&id=" + b + "&org_id=" + a + "&combo_id=" + c + "&r=" + Math.random(), function (e) {
        if (e != "false") {
            jQuery("#org" + a).replaceWith(e);
            if (jQuery(".checkout-items").children(".visible").length == 0) {
                jQuery(".b-empty").slideDown(400)
            }
        }
    });
    jQuery("#combo" + b).slideUp(400);
    return false
}

function orderForm() {
    /*    if (checkDistrict()) {
     if (b == 1) {
     jQuery("#morder .briefly").hide();
     jQuery("#morder .extended").show();
     jQuery('#morder input[name="street"]').prop("required", true);
     jQuery('#morder input[name="home"]').prop("required", true);
     jQuery('#morder input[name="address"]').prop("required", false)
     } else {
     jQuery("#morder .briefly").show();
     jQuery("#morder .extended").hide();
     jQuery('#morder input[name="street"]').prop("required", false);
     jQuery('#morder input[name="home"]').prop("required", false);
     jQuery('#morder input[name="address"]').prop("required", true)
     }
     var a = parseInt(jQuery("#org" + d + " .total-price span").text());
     var c = Math.floor(a / 10);
     jQuery("#form-summa").text(a + " " + decOfNum(a, ["гривня", "гривні", "гривень"]));
     jQuery("#form-bonus").text(c + " " + decOfNum(c, ["бал", "бала", "балів"]));
     jQuery('#morder input[name="org"]').val(d);
     dataLayer.push({
     event: "ordering"
     });

     }
     */
    jQuery("#order").click()
}

function editCart() {
    jQuery("#cart_click").click();
}

function orderAutocomplete(a) {
    var b = a.split("::");
    if (b.length == 6) {
        jQuery('#morder input[name="street"]').val(b[0]);
        jQuery('#morder input[name="home"]').val(b[1]);
        jQuery('#morder input[name="building"]').val(b[2]);
        jQuery('#morder input[name="flat"]').val(b[3]);
        jQuery('#morder input[name="address"]').val(b[4]);
        jQuery("#morder textarea").val(b[5])
    } else {
        jQuery('#morder input[name="phone"]').val(b[0])
    }
}

function makeOrder(a) {
    var b = {};
    jQuery("#morder input, #morder textarea").each(function () {
        b[jQuery(this).attr("name")] = jQuery(this).val()
    });
    if (jQuery('#morder input[name="address"]').is(":visible") && b.address == "") {
        return false
    }
    if (jQuery('#morder input[name="street"]').is(":visible") && (b.street == "" || b.home == "")) {
        return false
    }
    jQuery.post("/ajax?action=makeOrder", b, function (e) {
        if (e == "false") {
            location.reload()
        } else {
            var c = parseInt(jQuery("#form-summa").text());
            if (a) {
                dataLayer.push({
                    event: "fast_order",
                    value: c
                })
            } else {
                dataLayer.push({
                    event: "confirmation_order",
                    value: c
                })
            }
            window.location = "/accept?order=" + e
        }
    });
    jQuery("#mloader .modalLink").click();
    return false
}

function orderReason() {
    var b = jQuery("#reasonForm input:checked").val();
    var c = "";
    if (b == "0") {
        c = jQuery('#reasonForm input[name="other"]').val()
    } else {
        c = jQuery("#reasonForm input:checked").closest("label").text()
    }
    if (c == "") {
        jQuery("#reasonForm button").attr("disabled", "disabled");
        return false
    }
    var a = {};
    a.reason = b;
    a.text = c;
    a.token = jQuery("#reasonForm").attr("data-order");
    jQuery.post("/ajax?action=orderReason", a, function (e) {
        jQuery(".promo-accept .inner").html('<div class="b-order-message">Заказ відмінено</div>')
    });
    return false
}

function showReg() {
    jQuery(".authoriz .reg").click();
    return false
}

function decOfNum(a, b) {
    cases = [2, 0, 1, 1, 1, 2];
    return b[(a % 100 > 4 && a % 100 < 20) ? 2 : cases[(a % 10 < 5) ? a % 10 : 5]]
}

function isHhistoryApiAvailable() {
    return !!(window.history && history.pushState)
}

function getUrl(b, a) {
    if (isHhistoryApiAvailable) {
        if (b != window.location || a) {
            jQuery.get(b, {
                ajax: 1
            }, function (c) {
                if (!a) {
                    window.history.pushState(null, null, b)
                }
                jQuery("#contentBox").html(c);
                if (jQuery("#contentBox input, #contentBox select").length) {
                    jQuery("#contentBox input, #contentBox select").styler({
                        selectSearch: false,
                        singleSelectzIndex: 10
                    })
                }
                canOrderBonus();
                itemButton()
            })
        }
    } else {
        window.location = b
    }
    return false
};

/*Change value on product page*/
function incrementItemAO(d, b, c) {
    var a = parseInt(jQuery("#count" + d).val());
    if (c == -1 && a == 1) {
        return false
    }
    jQuery("#count" + d).val(a + c);
    return false
}

/*Chek category on recipe page*/
function recipeForm() {
    url = jQuery('select[name="recipe"]').val();
    window.location = url;
}

/*clear Cart on cart page*/

function clearCart() {
    jQuery('#empty_cart_button').click();
}
