$(document).ready(function(){
//    $('#search-text').on('keyup', function(){
//        var qStr = $(this).val();
//        $.ajax({
//            url : 'server.php?q=' + qStr,
//            type: 'GET',
//            success: function(r){
//                console.log(r);
//            }
//        });
//    });

    $('#search-text').searchEngine();
});


(function($){
    $.fn.searchEngine = function(opt) {
        var this_ = this;
        var timer = false;
        var delay = 700;
        var xhr = false;
        var url = 'server.php';
        
        this_.on('keyup', function() {
            if (timer) {
                clearTimeout(timer);
            }
            
            timer = setTimeout(function(){
                console.log(this_.val()); 
            }, delay);
            
        });
        
        
        
        function send() {
            xhr = $.ajax({
                url : url,
                success: function () {
                    
                }
            });
        }
        
        return this_;
    }
}(jQuery));
