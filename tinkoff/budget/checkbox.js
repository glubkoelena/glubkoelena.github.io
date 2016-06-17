(function (d) {
    var h = ["click", "change", "mouseup", "mousedown", "mousemove"];
    d.fn.checkBox = function () {
        var k = d(this).filter(":checkbox, :radio"),
            j = {};
        k.each(function () {
            var g = this,
                k = jQuery(g);
            if (!k.data("styled")) {
                k.data("styled", !0);
                0 === g.id.length && (g.id = "uniq" + Math.floor(1E7 * Math.random()));
                for (var l = 0; l < h.length; l++) "function" === typeof g["on" + h[l]] && (k.bind(h[l], g["on" + h[l]]), g["on" + h[l]] = null);
                var r = jQuery('<label for="' + g.id + '" class="ui-' + g.type + (g.checked ? " ui-" + g.type + "-state-checked" : "") + (g.className ?
                    " " + g.className : "") + '"></label>');
                "radio" === g.type && (j[g.name] ? j[g.name].push(r) : j[g.name] = Array(r));
                k.addClass("ui-input");
                k.before(r);
                k.change(function () {
                    k.blur();
                    if (g.checked) {
                        g.type === "radio" && d.each(j[g.name], function (d, h) {
                            h.removeClass("ui-" + g.type + "-state-checked")
                        });
                        r.addClass("ui-" + g.type + "-state-checked")
                    } else r.removeClass("ui-" + g.type + "-state-checked")
                })
            }
        });
        return k
    }
})(jQuery);