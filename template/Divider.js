/**
 * Created by oli on 2017-1-16.
 */
$(document).ready(function(){
    $('#lenthLimitClick').change(function() {
        if ($(this).is(':checked')) {
            $(this).parent().siblings('.add-box').css('display','block');
        } else {
            $(this).parent().siblings('.add-box').css('display','none');
        }
    })
    $('#requiredClick').change(function() {
        var _attr = $(this).attr('id') + 'Box';
        var obj = $('div[data-attr|="'+_attr+'"');
        if ($(this).is(':checked')) {
            obj.css('display','block');
        } else {
            obj.find('input[type=text]').val('');
            obj.css('display','none');
        }
    })

});