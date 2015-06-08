$(document).ready(function () {
    $('#search-text').searchEngine();
});


(function ($) {
    $.fn.searchEngine = function (opt) {
        var this_ = this;
        var timer = false;
        var nav_timer = false;
        var delay = 500;
        var xhr = false;
        var url = 'server.php';
        var itemCont = 'items-cont';
        var itemDetCont = 'item-det-cont';


        this_.on('keyup', function (e) {
            if (e.keyCode == 38 || e.keyCode == 40) {
                navigate(e.keyCode);
                return;
            }

            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(function () {
                send(this_.val());
            }, delay);

        });



        function send(q) {
            if (q == '' || q == 'undefined') {
                return;
            }

            if (xhr) {
                xhr.abort();
            }
            $('#' + itemCont).html('');
            xhr = $.ajax({
                url: url + '?q=' + q,
                success: function (r) {
                    var json = $.parseJSON(r);
                    var item_str = '';
                    $.each(json, function (index, item) {
                        if (index == 0) {
                            item_str += '<li class="src-item current-item"><a href="javascript:void(0)"  data-id="' + item.id + '">' + item.name + '</li>';
                        } else {
                            item_str += '<li class="src-item"><a href="javascript:void(0)" data-id="' + item.id + '">' + item.name + '</li>';
                        }
                    });

                    $('#' + itemCont).html('<ul>' + item_str + '</ul>');
                }
            });
        }

        function navigate(keyCode) {
            var cr = $('li.current-item');
            var nw = '';
            if (keyCode == 40) {
                if (cr.is(':last-child')) {
                    nw = cr.parent().children(':first-child');
                } else {
                    nw = cr.next();
                }
            } else if (keyCode == 38) {
                if (cr.is(':first-child')) {
                    nw = cr.parent().children(':last-child');
                } else {
                    nw = cr.prev();
                }
            }
            cr.removeClass('current-item');
            nw.addClass('current-item');
            
            if (nav_timer) {
                clearTimeout(nav_timer);
            }
            
            nav_timer = setTimeout(function(){
                loadDetails(nw.find('a').data('id'));
            }, delay);
        }

        function loadDetails(id) {
            $('#' + itemDetCont).html('').removeClass('fadeInRight');
            
            if (typeof($('#' + itemDetCont).data('id' + id)) == 'object') {
                setTimeout(function(){
                    processData($('#' + itemDetCont).data('id' + id));
                }, 100);
                
                return;
            }
            
            $.ajax({
                url: url + '?mode=det&id=' + id,
                success: function (r) {
                    var json = $.parseJSON(r);
                    $('#' + itemDetCont).data('id' + id, json);
                    processData(json);
                }
            });
        }

        function processData(json) {
            var html = '';
            html += '<strong>ID:</strong>' + json[0].id;
            html += '<br/><strong>Name:</strong>' + json[0].name;
            html += '<br/><strong>Price:</strong>' + json[0].price;

            $('#' + itemDetCont).html(html).addClass('fadeInRight');
        }

        return this_;
    }
}(jQuery));
