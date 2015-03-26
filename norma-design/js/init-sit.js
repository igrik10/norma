jQuery.extend(jQuery.fn, {toplinkwidth: function () {
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
        jQuery(this).css({"padding-right": a + "px"});
        return true
    }
}});
function animateCSS(a, b) {
    $(a).addClass(b);
    var c = window.setTimeout(function () {
        $(a).removeClass(b)
    }, 1300)
}
$(function () {
    var c = $(window).height(), g = $(window).width();
    if ($("input, select").length) {
        $("input, select").styler({selectSearch: true, singleSelectzIndex: 10, selectSmartPositioning: false})
    }
    $("#modal").load("/tpl/modal.tpl", function () {
        if ($(".modalLink").length) {
            $(".modalLink").modal({trigger: ".modalLink", olay: ".overlay", modals: ".modal", animationEffect: "fadeIn", animationSpeed: 400, moveModalSpeed: "slow", background: "2E2F2F", opacity: 0.7, openOnLoad: false, docClose: true, closeByEscape: true, moveOnScroll: true, resizeWindow: false, close: ".close-modal, button.grey"})
        }
        if ($("#modal input, #modal select").length) {
            $("#modal input, #modal select").styler({selectSearch: false, singleSelectzIndex: 10})
        }
        var j = getParameterByName("forgotPassword");
        if (j != "") {
            $("#mpassword .modalLink").click()
        }
        if ($(".restaurant-review").length) {
            if ($(".user-panel").length) {
                if ($(".promo-org-links").attr("data-vote") == 1) {
                    var i = getParameterByName("vote");
                    if (i != "") {
                        $.get("/ajax?action=setVote&vote=" + i + "&id=" + $(".promo-org-links").attr("data-id") + "&r=" + Math.random());
                        var h = getParameterByName("review");
                        if (h == "") {
                            $("#mvote a").click()
                        }
                    } else {
                        $(".restaurant-review .stars").addClass("active");
                        $(".restaurant-review .rating").addClass("h-tooltip");
                        $(".restaurant-review .stars i").on("click", function (l) {
                            var k = $(this).index() + 1;
                            if (k > 0) {
                                $("#mvote a").click();
                                $(".restaurant-review .stars i").off("click");
                                $(".restaurant-review .stars").removeClass("active");
                                $(".restaurant-review .rating").removeClass("h-tooltip");
                                $.get("/ajax?action=setVote&vote=" + k + "&id=" + $(".promo-org-links").attr("data-id") + "&r=" + Math.random())
                            }
                        })
                    }
                }
                if ($(".org-link-write").length) {
                    var h = getParameterByName("review");
                    if (h != "") {
                        $("#mreview a").click()
                    }
                }
            }
        }
        setImputMask()
    });
    $(".js-dd-trig").on("click", function () {
        var h = $(this).next(".js-dd");
        if (h.hasClass("open")) {
            h.hide().removeClass("open")
        } else {
            $(".js-dd").hide().removeClass("open");
            h.show().addClass("open")
        }
        return false
    });
    $(document).on("click", function (h) {
        if ($(h.target).closest(".user-panel .open").length) {
            return
        }
        $(".user-panel .open").hide().removeClass("open");
        h.stopPropagation();
        if ($(h.target).closest(".place .open").length) {
            return
        }
        $(".place .open").hide().removeClass("open");
        h.stopPropagation();
        if ($(h.target).closest(".cart-panel .open").length) {
            return
        }
        $(".cart-panel .open").hide().removeClass("open");
        $(".cart-bkm a").removeClass("active");
        h.stopPropagation()
    });
    $(".js-dd-pnt").find(".dropdown-list > li input").on("change", function () {
        var h = $(this).closest("li"), i = $(this).attr("name");
        h.parents(".js-dd-pnt").find(".js-dd-trig").find("i").text(h.text());
        $(".js-dd").hide().removeClass("open");
        if (i != "") {
            dropdownSelect(i, $(this).val())
        }
    });
    if ($(".user-panel").length) {
        if ($(".user-bkm .count").length && $("#cart-panel").length) {
            var e = parseInt($(".user-bkm .count").text());
            if (e > 0) {
                $("#cart-panel .cart-bkm .count").text(e);
                $("#cart-panel .dd-bkm").html($(".user-bkm .dd-bkm").html());
                $("#cart-panel .js-dd-pnt").show()
            }
        }
        $(".js-dd .empty, .js-dd .show-more").hide();
        $(".dd-bkm .dropdown-list, .dd-msg .dropdown-list").each(function () {
            var h = $(this).find("li").length;
            if (h > 3) {
                $(this).closest(".tab,.js-dd").find(".show-more").show()
            }
            if (h == 0) {
                $(this).closest(".tab,.js-dd").find(".empty").show()
            }
        });
        $(".dd-bkm, .dd-msg").find(".show-more").on("click", function () {
            $(this).hide();
            $(this).closest(".js-dd").find(".dropdown-list").css("max-height", ($(this).closest(".js-dd").find(".dropdown-list").find("li:visible").length * 86) + "px");
            return false
        });
        $(".dd-bkm .dropdown-list").find(".item").on("click", function () {
            var h = $(this).attr("data-url");
            if (h != "") {
                window.location = h
            }
        });
        $(".dropdown-list").find(".remove").on("click", function () {
            $(this).parent().slideUp(400);
            var i = $(this).parents(".dropdown-list").find("li:visible").length - 1;
            if (i == 0) {
                $(this).closest(".tab, .js-dd").find(".empty").slideDown(400)
            }
            if (i <= 3) {
                $(this).closest(".tab, .js-dd").find(".show-more").slideUp(400)
            }
            var h = $(this).attr("data-type"), k = $(this).attr("data-id"), j = "";
            if (k == "") {
                return false
            }
            if (h == "org") {
                return setFavorite(k, 0)
            } else {
                if (h == "msg") {
                    j = "noticeRemove";
                    var i = parseInt($(".user-msg .count").text());
                    if (i > 1) {
                        $(".user-msg .count").text(i - 1)
                    } else {
                        $(".user-msg .count").remove()
                    }
                }
            }
            if (j != "") {
                $.get("/ajax?action=" + j + "&id=" + k + "&r=" + Math.random())
            }
            return false
        })
    }
    $(".btn-tab").on("click", function (h) {
        h.preventDefault();
        $(this).closest(".btn-tabs").find(".btn-tab").removeClass("active");
        $(this).addClass("active").siblings().removeClass("active").parents().next(".tabs").find(".tab").removeClass("visible").eq($(this).index()).addClass("visible").siblings(".tab")
    });
    if ($(".promo-index").length) {
        $(".example a").click(function (h) {
            h.preventDefault();
            $('.kitchens select [value="' + $(this).attr("data-value") + '"]').attr("selected", "selected");
            $(".kitchens select").trigger("change").trigger("refresh")
        });
        $(".kitchens select").change(function () {
            var i = "/restaurants", h = $(this).val();
            if (h != "") {
                i += "/" + h
            }
            $(this).closest("form").attr("action", i)
        });
        if ($(".carousel-stock").length) {
            var b = $(".all-stock").bxSlider({mode: "horizontal", pagerSelector: ".cpager-1", pager: !$(".location-stock").length, useCSS: false, moveSlides: 1, minSlides: 4, maxSlides: 4, infiniteLoop: false, slideWidth: 220, slideMargin: 11, hideControlOnEnd: true, speed: 400});
            if ($(".location-stock").length) {
                $(".carousel-stock").find(".btn-tab").on("click", function () {
                    b.reloadSlider()
                });
                $(".location-stock").bxSlider({mode: "horizontal", pager: false, useCSS: false, moveSlides: 1, minSlides: 4, maxSlides: 4, infiniteLoop: false, slideWidth: 220, slideMargin: 11, hideControlOnEnd: true, speed: 400})
            }
        }
        $(".carousel-stock .item button").click(function (h) {
            h.preventDefault();
            addToCart($(this).closest(".item"), "promo")
        })
    }
    if ($(".restaurant-review").length) {
        $.get("/objects?action=getOrgComment&id=" + $(".restaurant-review").attr("data-id"), function (h) {
            if (h != "false") {
                $(".slider-review").html(h);
                $("#js-reviews-mini").bxSlider({pager: false, nextSelector: ".reviews-next", prevSelector: ".reviews-prev", randomStart: true, prevText: "", nextText: ""})
            }
        });
        $(".nav-items a.icon").on("click", function (i) {
            i.preventDefault();
            var h = !$(this).parent().hasClass("selected");
            $(this).closest(".nav-items").find("li.selected").each(function () {
                $(this).removeClass("selected");
                $(this).find("ul").slideUp(200)
            });
            if (h) {
                $(this).parent().addClass("selected");
                $(this).next().stop(true, true).slideToggle(200)
            }
        });
        if ($(".restaurant-menu").length) {
            $(".nav-left .search").submit(function (j) {
                j.preventDefault();
                var h = $(".nav-left .search input").val(), i = $(".nav-left .search").attr("action");
                if (h == "" || i == "") {
                    return
                }
                $(".nav-items, nav-sub-items").find("li.selected").each(function () {
                    $(this).removeClass("selected")
                });
                $(".nav-sub-items:visible").each(function () {
                    $(this).slideUp(200)
                });
                getUrl(i + "?s=" + h, false)
            });
            $(".nav-items a:not(.icon)").on("click", function (i) {
                i.preventDefault();
                $(this).closest(".nav-items").find("li.selected").each(function () {
                    $(this).removeClass("selected")
                });
                $(this).parent().addClass("selected");
                if ($(this).closest("ul").hasClass("nav-sub-items")) {
                    $(this).closest("ul").closest("li").addClass("selected")
                } else {
                    $(".nav-sub-items:visible").each(function () {
                        $(this).slideUp(200)
                    })
                }
                $(".nav-left .search input").val("");
                var h = $(this).attr("href");
                getUrl(h, false)
            })
        }
        if ($(".user-panel").length) {
            canOrderBonus()
        }
        if ($(".restaurant-about").length) {
            $("#scroll-to-map").on("click", function (h) {
                $("body,html").animate({scrollTop: $("#map").offset().top}, 1000)
            })
        }
        itemButton()
    }
    if ($(".slider-video").length) {
        $(".slider-video").bxSlider({auto: true, pause: 7000, video: true, controls: false, useCSS: false})
    }
    if ($(".bg-animate").length) {
        $(window).scroll(function () {
            var h = $(".bg-animate").offset().top - c + 275;
            if ($(window).scrollTop() > h) {
                $(".zakaman").addClass("animated bounceInDown");
                $(".zakaman-message").addClass("animated tada")
            }
        })
    }
    if ($(".s-search").length) {
        $(".b-popular-food .item button").click(function (h) {
            h.preventDefault();
            addToCart($(this).closest(".item"), "item")
        })
    }
    if ($("#reasonForm").length) {
        function a() {
            if ($("#reasonForm input:checked").val() == "0" && $('#reasonForm input[name="other"]').val() == "") {
                $("#reasonForm button").attr("disabled", "disabled")
            } else {
                $("#reasonForm button").removeAttr("disabled")
            }
        }

        $("#reasonForm input").change(a).keypress(a)
    }
    if ($("#top-link").length) {
        var d = $("#top-link");
        d.css({"padding-bottom": c});
        d.toplinkwidth();
        $(window).resize(function () {
            d.toplinkwidth()
        });
        $(window).scroll(function () {
            var h = 300;
            if ($(window).scrollTop() >= h && d.toplinkwidth()) {
                d.fadeIn(300).css("top", "0")
            } else {
                d.fadeOut(300).css("top", "-200px")
            }
        });
        d.on("click", function (h) {
            $("html, body").animate({scrollTop: 0}, 300);
            return false
        })
    }
    $("#upload-styler").hide();
    if ($(".b-history-order").length) {
        $(".nav-items a.icon").on("click", function (h) {
            h.preventDefault();
            $(this).parent().toggleClass("selected");
            $(this).next().find("li").removeClass("selected");
            $(this).next().stop(true, true).slideToggle(200)
        });
        $(".nav-sub-items a").on("click", function (i) {
            i.preventDefault();
            $(this).closest(".nav-sub-items").find("li").removeClass("selected");
            $(this).parent().addClass("selected");
            var h = $(this).attr("href");
            $("html, body").animate({scrollTop: $(h).offset().top - 30}, 600)
        })
    }
    if ($(".s-gifts").length && $(".user-panel").length) {
        $(".s-gifts div.button").removeClass("h-tooltip");
        $(".s-gifts a.btn").removeClass("disabled");
        var f = parseInt($(".user-score").attr("data-score"));
        $(".catalog-gifts .item").each(function () {
            var h = parseInt($(this).attr("data-cost"));
            if (f > h) {
                $(this).find("div.button").removeClass("h-tooltip");
                $(this).find("a.btn").removeClass("disabled")
            } else {
                $(this).find(".b-tooltip").html("У вас недостаточно баллов для заказа этого сувенира")
            }
        })
    }
    if ($(".reviews-list").length && $(".user-panel").length) {
        $(".reviews-list a.like-vote").click(function () {
            var h = parseInt($(this).text()) + 1, i = $(this).attr("data-id");
            $(this).replaceWith('<span class="yes-vote icon"><span>' + h + "</span></span>");
            $.get("/ajax?action=reviewVote&id=" + i + "&r=" + Math.random(), function (j) {
                return
            });
            return false
        })
    }
    if ($("#morder").length) {
        $(".autocomplete").each(function () {
            var i = $(this).find("input"), h = $(this).find("select"), j = $(this), k = $(this).find("option").length;
            if (k < 2) {
                $(i).css("width", "303px");
                if (k > 0) {
                    orderAutocomplete($(h).val())
                }
                return
            }
            orderAutocomplete($(h).val());
            $(h).change(function () {
                orderAutocomplete($(h).val())
            })
        })
    }
    if ($.cookie("zakaCityDetect") == undefined && $("#selectCity .city").text() == "Москва") {
        $.getScript("http://api-maps.yandex.ru/2.1/?lang=ru_RU", function () {
            ymaps.ready(function () {
                ymaps.geolocation.get({autoGeocode: true, provider: "yandex"}).then(function (h) {
                    var j = {}, k;
                    $("#selectCity .dropdown-list li").each(function () {
                        if ($(this).find("input:checked").length) {
                            return
                        }
                        j[$(this).text()] = $(this).find("input").val()
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
    $(window).bind("load", function () {
        setTimeout(function () {
            $(window).bind("popstate", function () {
                getUrl(window.location, true)
            })
        }, 0)
    })
});
function showCityDialog(b, a) {
    $("#location-notify strong").text(b + "?");
    $("#location-notify").css("display", "block").animate({opacity: "1"}, 600);
    $("#location-notify .green").click(function (c) {
        window.location = a
    });
    $("#location-notify .grey").click(function (c) {
        $("#location-notify").hide()
    });
    $.cookie("zakaCityDetect", true, {expires: 5, path: "/"})
}
function sendPartnerForm() {
    var a = {};
    $("#mpartners input, #mpartners textarea").each(function () {
        a[$(this).attr("name")] = $(this).val()
    });
    if (a.title == "" || a.city == "" || a.name == "" || a.phone == "") {
        return false
    }
    $("#mfeedback textarea").val("");
    $.post("/ajax?action=sendPartnerForm", a, function (b) {
        $("#mconfirm .modalLink").click()
    });
    $("#mloader .modalLink").click();
    return false
}
function sendFeedback() {
    var a = {};
    $("#mfeedback input, #mfeedback textarea").each(function () {
        if ($(this).val() == "") {
            return false
        }
        a[$(this).attr("name")] = $(this).val()
    });
    $("#mfeedback textarea").val("");
    $.post("/ajax?action=sendFeedback", a, function (b) {
        $("#mconfirm .modalLink").click()
    });
    $("#mloader .modalLink").click();
    return false
}
function dropdownSelect(c, e) {
    switch (c) {
        case"city":
            window.location = e;
            break;
        case"district":
            var a = "/" + $('#selectDistr input[value="' + $.cookie("zakaDistrict") + '"]').attr("data-code");
            var d = "/" + $('#selectDistr input[value="' + e + '"]').attr("data-code");
            var b = window.location.href;
            if (a !== undefined && d !== undefined) {
                b = b.replace(new RegExp(a, "g"), d)
            }
            $.cookie("zakaDistrict", e, {expires: 365, path: "/"});
            window.location = b;
            break
    }
}
function userReg() {
    var a = {};
    $("#mreg input").each(function () {
        if ($(this).val() == "") {
            return false
        }
        a[$(this).attr("name")] = $(this).val()
    });
    $.post("/ajax?action=userReg", a, function (b) {
        if (b == "true") {
            location.reload();
            dataLayer.push({event: "registration"})
        } else {
            if (b == "false") {
                b = "Произошла ошибка, <br> попробуйте повторить запрос."
            }
            $(".authoriz a.reg").click();
            $("#mreg .error").html(b);
            $("#mreg .error").slideDown()
        }
    });
    $("#mloader .modalLink").click();
    return false
}
function afterOrderReg() {
    dataLayer.push({event: "registration_after_order"});
    $(".authoriz a.reg").click();
    return false
}
function freeFoodReg() {
    dataLayer.push({event: "registration_freedom"});
    $(".authoriz a.reg").click();
    return false
}
function freeFoodLink() {
    dataLayer.push({event: "get_food_baner"});
    return true
}
function userExit() {
    $.get("/ajax?action=userExit&r=" + Math.random(), function (a) {
        location.reload()
    });
    $("#mloader .modalLink").click();
    return false
}
function userLogin() {
    var a = {};
    $("#msignin input").each(function () {
        if ($(this).val() == "") {
            return false
        }
        a[$(this).attr("name")] = $(this).val()
    });
    $.post("/ajax?action=userLogin", a, function (b) {
        if (b == "true") {
            location.reload()
        } else {
            if (b == "false") {
                b = "Произошла ошибка, <br> попробуйте повторить запрос."
            }
            $(".authoriz a.signin").click();
            $("#msignin .registration").hide();
            $("#msignin .error").html(b);
            $("#msignin .error").slideDown()
        }
    });
    $("#mloader .modalLink").click();
    return false
}
function userCartLogin() {
    var a = {};
    $("#morder .form-signin input").each(function () {
        if ($(this).val() == "") {
            return false
        }
        a[$(this).attr("name")] = $(this).val()
    });
    $.post("/ajax?action=userLogin", a, function (b) {
        if (b == "true") {
            location.reload()
        } else {
            if (b == "false") {
                b = "Произошла ошибка, <br> попробуйте повторить запрос."
            }
            $("#order").click();
            $("#morder .registration").hide();
            $("#morder .form-signin .error").html(b);
            $("#morder .form-signin .error").slideDown()
        }
    });
    $("#mloader .modalLink").click();
    return false
}
function getParameterByName(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var c = new RegExp("[\\?&]" + a + "=([^&#]*)"), b = c.exec(location.search);
    return b == null ? "" : decodeURIComponent(b[1].replace(/\+/g, " "))
}
function forgotPassword() {
    var a = {};
    $("#mrecover input").each(function () {
        if ($(this).val() == "") {
            return false
        }
        a[$(this).attr("name")] = $(this).val()
    });
    $.post("/ajax?action=forgotPassword", a, function (b) {
        if (b == "true") {
            $("#mconfirm .modalLink").click()
        } else {
            if (b == "false") {
                b = "Произошла ошибка, <br> попробуйте повторить запрос."
            }
            $("#mrecover .info").html('<div class="field error">' + b + "</div>");
            $("#mrecover .modalLink").click()
        }
    });
    $("#mloader .modalLink").click();
    return false
}
function changePassword() {
    var a = {};
    a.token = getParameterByName("forgotPassword");
    $("#mpassword input").each(function () {
        if ($(this).val() == "") {
            return false
        }
        a[$(this).attr("name")] = $(this).val()
    });
    $.post("/ajax?action=changePassword", a, function (b) {
        if (b == "true") {
            window.location = "/"
        } else {
            if (b == "false") {
                b = "Произошла ошибка, <br> попробуйте повторить запрос."
            }
            $("#mpassword .info").html('<div class="field error">' + b + "</div>");
            $("#mpassword .modalLink").click()
        }
    });
    $("#mloader .modalLink").click();
    return false
}
function giftOrder(c) {
    var a = $("#gift" + c + " .gifts-name").text(), b = $("#gift" + c + " .gifts-points").text();
    $("#mgiftorder .info").html('Вы уверены, что хотите оформить заказ<br>на "' + a + '"<br>за ' + b + "?");
    $("#mgiftorder button.green").attr("onclick", "return giftOrderConfirm(" + c + ");");
    $("#mgiftorder .modalLink").click();
    return false
}
function giftOrderConfirm(a) {
    $("#mloader .modalLink").click();
    $.get("/ajax?action=giftOrder&id=" + a + "&r=" + Math.random(), function (b) {
        $("#mgiftthanks .modalLink").click()
    })
}
function inviteFriend() {
    var a = {};
    $("#minvite input").each(function () {
        if ($(this).val() == "") {
            return false
        }
        a[$(this).attr("name")] = $(this).val()
    });
    $.post("/ajax?action=inviteFriend", a, function (b) {
        $("#minvitethanks .modalLink").click()
    });
    $("#mloader .modalLink").click();
    $("#minvite input").val("");
    return false
}
function showPassword(a) {
    if ($(".change-pass").is(":visible")) {
        $(a).text("Изменить пароль");
        $(".change-pass").slideUp();
        $(".change-pass input").val("")
    } else {
        $(a).text("Отменить изменение");
        $(".change-pass").slideDown()
    }
    return false
}
var photoCss = {};
function previewPhoto(b) {
    if (photoCss.background == undefined) {
        photoCss.background = $(".b-upload-photo .img").css("background");
        photoCss["background-size"] = $(".b-upload-photo .img").css("background-size")
    }
    if (b.files && b.files[0]) {
        var a = new FileReader();
        a.onload = function (c) {
            $(".b-upload-photo .img").css("background", "url(" + c.target.result + ") no-repeat center").css("background-size", "cover");
            $("#removePhoto").val("false")
        };
        a.readAsDataURL(b.files[0])
    } else {
        $(".b-upload-photo .img").css("background", photoCss.background).css("background-size", photoCss["background-size"])
    }
}
function removePhoto() {
    $(".b-upload-photo .img").css("background", "url(/img/upload-photo-bg.png) no-repeat center center/50% auto").css("background-size", "");
    $("#upload").val("");
    $("#removePhoto").val("true");
    return false
}
function loadPhoto() {
    $("#upload").click();
    return false
}
function addPhone() {
    $(".add-phone-link").before('<div class="field hide"><span class="label">Телефон</span> <input class="styler" type="tel" name="phones[]" /><span title="удалить номер" onclick="removePhone(this);" class="remove icon"></span></div>');
    $(".form-add-phone").find(".field:last").slideDown(function () {
        setImputMask()
    });
    return false
}
function removePhone(a) {
    $(a).closest("div").slideUp(function () {
        $(a).closest("div").remove()
    })
}
function setImputMask() {
    $('form input[type="tel"]').focus(function () {
        if (this.value.length == 0) {
            this.value = "+7 (";
            if (this.setSelectionRange) {
                this.setSelectionRange(this.value.length, this.value.length)
            }
        }
    }).blur(function () {
        if (this.value == "+7 (") {
            this.value = ""
        }
    }).mask("+7 (000) 000-00-00")
}
function saveSettings() {
    var e = $('.change-pass input[name="password"]').val(), d = $('.change-pass input[name="confirmation"]').val(), c = $('.form-settings input[name="firstname"]').val(), a = $('.form-add-phone input[name="phone"]').val(), b = "";
    if (e.length > 0 && e.length < 3) {
        b = "Необходим пароль от 3-х символов"
    }
    if (e.length > 0 && e != d) {
        b = "Указанные пароли не совпадают"
    }
    if (c.length < 2) {
        b = "Укажите Ваше имя"
    }
    if (a.length < 18) {
        b = "Проверьте номер телефона"
    }
    if (b != "") {
        $("html, body").animate({scrollTop: $(".b-settings").offset().top}, 400);
        $(".b-settings .error").html('<br><br><span class="label"></span>' + b).slideDown();
        return false
    }
    return true
}
function removeAddress(a) {
    $("#maddress button.green").attr("onclick", "return removeAddressConfirm(" + a + ");");
    $("#maddress .modalLink").click();
    return false
}
function removeAddressConfirm(a) {
    $("#maddress button.grey").click();
    $("#addr" + a).slideUp();
    $.get("/ajax?action=removeAddress&id=" + a + "&r=" + Math.random())
}
function restSearchForm(a) {
    return makeSearch("/restaurants", a)
}
function foodSearchForm(a) {
    return makeSearch("/food", a)
}
function makeSearch(c, f) {
    var d = $('#searchForm select[name="cuisine"]').val();
    if (d != "") {
        c += "/" + d
    }
    var g = $("#selectDistr input:checked").attr("data-code");
    if (g !== undefined) {
        c += (d == "" ? "/all/" : "/") + g
    }
    var e = [];
    $("#searchForm select, #searchForm input:checked").each(function () {
        if ($(this).attr("name") == "cuisine" || $(this).attr("name") == "work") {
            return
        }
        if ($(this).val() == "") {
            return
        }
        e.push($(this).attr("name") + "=" + $(this).val())
    });
    var b = $('#searchForm input[name="work"]');
    if ($(b).length && !$(b).is(":checked")) {
        e.push("work=all")
    }
    if (e.length > 0) {
        c += "?" + e.join("&")
    }
    if ($("#cuisineName").length) {
        var a = $('#searchForm select[name="cuisine"] option:selected').text();
        if (a == "-----") {
            $("#cuisineName").hide();
            $("#cuisineName").prev().hide()
        } else {
            $("#cuisineName").show();
            $("#cuisineName").prev().show();
            $("#cuisineName").text(a)
        }
    }
    if (f) {
        getUrl(c, false)
    } else {
        window.location = c
    }
    return false
}
function addReview(b) {
    var a = $("#mreview textarea").val();
    if (a != "") {
        $("#mloader a").click();
        $.post("/ajax?action=addReview", {id: b, text: a}, function (e) {
            var c = $("#mreview").attr("data-link");
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
        $.get("/ajax?action=favoriteAdd&id=" + e + "&r=" + Math.random());
        if ($(".promo-org-links").length) {
            var c = parseInt($(".promo-org-links").attr("data-id"));
            if (e == c) {
                $(".org-link-bookmark").addClass("active").text("В избранном").attr("onclick", "return setFavorite(" + e + ", 0);")
            }
        }
    } else {
        $.get("/ajax?action=favoriteRemove&id=" + e + "&r=" + Math.random());
        if ($(".promo-org-links").length) {
            var c = parseInt($(".promo-org-links").attr("data-id"));
            if (e == c) {
                $(".org-link-bookmark").removeClass("active").text("В избранное").attr("onclick", "return setFavorite(" + e + ", 1);")
            }
        }
        b = -1
    }
    if ($(".user-bkm .count").length) {
        var a = parseInt($(".user-bkm .count").text()) + b;
        if (a > 0) {
            $(".user-bkm .count").text(a);
            $(".cart-bkm .count").text(a)
        } else {
            $(".user-bkm .count").hide();
            $(".cart-bkm .count").hide()
        }
    } else {
        if (b == 1) {
            $(".user-bkm .js-dd-trig").html('<span class="count">1</span>');
            $(".cart-bkm .js-dd-trig").html('<span class="count">1</span>')
        }
    }
    return false
}
function randomSearch() {
    var a = {};
    $("#searchForm select, #searchForm input:checked").each(function () {
        if ($(this).val() == "") {
            return
        }
        a[$(this).attr("name")] = $(this).val()
    });
    $.post("/ajax?action=getRandom", a, function (b) {
        if (b == "false") {
            window.location = "/restaurants"
        } else {
            window.location = "/restaurants/menu/" + b
        }
    });
    return false
}
function canOrderBonus() {
    if ($(".b-food-balls").length && $(".user-panel").length) {
        if ($("#cart-panel").attr("data-score") == "1") {
            $(".b-food-balls").hide();
            return
        }
        var a = parseInt($(".user-score").attr("data-score"));
        $(".b-food-balls .info").html("В этом заведении Вы можете потратить Ваши бонусные баллы на бесплатное блюдо. Выбрать можно только одно блюдо.");
        $(".b-food-balls .item").each(function () {
            var b = parseInt($(this).attr("data-work"));
            if (b) {
                var c = parseInt($(this).attr("data-cost"));
                if (a > c) {
                    $(this).find("div.button").removeClass("h-tooltip");
                    $(this).find("button").removeAttr("disabled")
                } else {
                    $(this).find(".b-tooltip").html("У вас не хватает баллов")
                }
            }
        });
        $(".b-food-balls .item button").click(function (b) {
            b.preventDefault();
            addToCart($(this).closest(".item"), "bonus")
        })
    }
}
function addToCart(d, b) {
    if (checkDistrict()) {
        var f = $(d).attr("data-id");
        $.get("/ajax?action=addToCart&id=" + f + "&type=" + b + "&r=" + Math.random(), function (g) {
            if (g != "false") {
                data = g.split(":");
                if (data.length > 1) {
                    $("#cart-panel .cart-food span").text(data[0]);
                    $("#cart-panel .cart-price span").text(data[1])
                }
            }
        });
        $("#cart-panel").slideDown();
        var a = $(d).find("img").clone().addClass("move-img");
        $("body").append(a);
        var c = $(d).find("img").offset(), e = $("#cart-panel").find(".cart-link").offset();
        a.css({position: "absolute", top: c.top, left: c.left, opacity: 0.8, "border-radius": "0", "z-index": 1000});
        a.animate({left: e.left, top: e.top, opacity: 0, width: 50, height: 50, borderRadius: "50%"}, 500, function () {
            $(".move-img").remove()
        });
        if (b == "bonus") {
            $(".b-food-balls").slideUp();
            $("#cart-panel").attr("data-score", "1")
        }
    }
}
function checkDistrict() {
    if ($.cookie("zakaDistrict") == undefined || $.cookie("zakaDistrict") == 0) {
        $("#mdistrict a").click();
        return false
    }
    return true
}
function selectDistrict() {
    var a = parseInt($("#mdistrict select").val());
    $.cookie("zakaDistrict", a, {expires: 365, path: "/"});
    $("#mloader a").click();
    location.reload()
}
function itemButton() {
    if ($(".restaurant-menu").length) {
        $(".b-popular-food .item button").click(function (a) {
            a.preventDefault();
            addToCart($(this).closest(".item"), "item")
        });
        $(".b-stock .b-stock-item button").click(function (a) {
            a.preventDefault();
            addToCart($(this).closest(".b-stock-item"), "promo")
        })
    }
}
function removeItem(b, a) {
    $.get("/ajax?action=removeCartItem&id=" + b + "&org_id=" + a + "&r=" + Math.random(), function (c) {
        if (c != "false") {
            $("#org" + a).replaceWith(c);
            if ($(".checkout-items").children(".visible").length == 0) {
                $(".b-empty").slideDown(400)
            }
        }
    });
    $("#item" + b).slideUp(400);
    return false
}
function incrementItem(d, b, c) {
    var a = parseInt($("#count" + d).val());
    if (c == -1 && a == 1) {
        return false
    }
    $.get("/ajax?action=incrementCartItem&id=" + d + "&org_id=" + b + "&value=" + c + "&r=" + Math.random(), function (e) {
        if (e != "false") {
            $("#org" + b).replaceWith(e)
        }
    });
    $("#count" + d).val(a + c);
    return false
}
function removeOrg(a) {
    $.get("/ajax?action=removeCartOrg&id=" + a + "&r=" + Math.random());
    $("#org" + a).removeClass("visible").slideUp(400);
    if ($(".checkout-item.visible").length == 0) {
        $(".b-empty").slideDown(400)
    }
    return false
}
function removeBonus(b, a) {
    $.get("/ajax?action=removeCartBonus&org_id=" + a + "&r=" + Math.random(), function (c) {
        if (c != "false") {
            $("#org" + a).replaceWith(c);
            if ($(".checkout-items").children(".visible").length == 0) {
                $(".b-empty").slideDown(400)
            }
        }
    });
    $("#bonus" + b).slideUp(400);
    return false
}
function removeFromCombo(c, b, a) {
    $.get("/ajax?action=removeFromCombo&id=" + b + "&org_id=" + a + "&combo_id=" + c + "&r=" + Math.random(), function (e) {
        if (e != "false") {
            $("#org" + a).replaceWith(e);
            if ($(".checkout-items").children(".visible").length == 0) {
                $(".b-empty").slideDown(400)
            }
        }
    });
    $("#combo" + b).slideUp(400);
    return false
}
function orderForm(d, b) {
    if (checkDistrict()) {
        if (b == 1) {
            $("#morder .briefly").hide();
            $("#morder .extended").show();
            $('#morder input[name="street"]').prop("required", true);
            $('#morder input[name="home"]').prop("required", true);
            $('#morder input[name="address"]').prop("required", false)
        } else {
            $("#morder .briefly").show();
            $("#morder .extended").hide();
            $('#morder input[name="street"]').prop("required", false);
            $('#morder input[name="home"]').prop("required", false);
            $('#morder input[name="address"]').prop("required", true)
        }
        var a = parseInt($("#org" + d + " .total-price span").text());
        var c = Math.floor(a / 10);
        $("#form-summa").text(a + " " + decOfNum(a, ["рубль", "рубля", "рублей"]));
        $("#form-bonus").text(c + " " + decOfNum(c, ["балл", "балла", "баллов"]));
        $('#morder input[name="org"]').val(d);
        dataLayer.push({event: "ordering"});
        $("#order").click()
    }
}
function orderAutocomplete(a) {
    var b = a.split("::");
    if (b.length == 6) {
        $('#morder input[name="street"]').val(b[0]);
        $('#morder input[name="home"]').val(b[1]);
        $('#morder input[name="building"]').val(b[2]);
        $('#morder input[name="flat"]').val(b[3]);
        $('#morder input[name="address"]').val(b[4]);
        $("#morder textarea").val(b[5])
    } else {
        $('#morder input[name="phone"]').val(b[0])
    }
}
function makeOrder(a) {
    var b = {};
    $("#morder input, #morder textarea").each(function () {
        b[$(this).attr("name")] = $(this).val()
    });
    if ($('#morder input[name="address"]').is(":visible") && b.address == "") {
        return false
    }
    if ($('#morder input[name="street"]').is(":visible") && (b.street == "" || b.home == "")) {
        return false
    }
    $.post("/ajax?action=makeOrder", b, function (e) {
        if (e == "false") {
            location.reload()
        } else {
            var c = parseInt($("#form-summa").text());
            if (a) {
                dataLayer.push({event: "fast_order", value: c})
            } else {
                dataLayer.push({event: "confirmation_order", value: c})
            }
            window.location = "/accept?order=" + e
        }
    });
    $("#mloader .modalLink").click();
    return false
}
function orderReason() {
    var b = $("#reasonForm input:checked").val();
    var c = "";
    if (b == "0") {
        c = $('#reasonForm input[name="other"]').val()
    } else {
        c = $("#reasonForm input:checked").closest("label").text()
    }
    if (c == "") {
        $("#reasonForm button").attr("disabled", "disabled");
        return false
    }
    var a = {};
    a.reason = b;
    a.text = c;
    a.token = $("#reasonForm").attr("data-order");
    $.post("/ajax?action=orderReason", a, function (e) {
        $(".promo-accept .inner").html('<div class="b-order-message">Заказ отменен</div>')
    });
    return false
}
function showReg() {
    $(".authoriz .reg").click();
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
            $.get(b, {ajax: 1}, function (c) {
                if (!a) {
                    window.history.pushState(null, null, b)
                }
                $("#contentBox").html(c);
                if ($("#contentBox input, #contentBox select").length) {
                    $("#contentBox input, #contentBox select").styler({selectSearch: false, singleSelectzIndex: 10})
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