jQuery(document).ready(function($) {

    function fix_soliloquy_elements() {
        window_width = $window.width();
        $jma_header_image_wrap = $('.jma-header-image-wrap');
        available_height = $('body').data('available_height');
        if (($(".copyright").css("margin-bottom") == "5px") && $.isNumeric(available_height)) {
            $jma_header_image_wrap.find('.soliloquy-caption').css({
                'width': window_width + 'px',
                'height': available_height
            });
            $jma_header_image_wrap.find('.soliloquy-controls-direction').css({
                'width': window_width + 'px'
            });
            $jma_header_image_wrap.find('.soliloquy-pager').css({
                'bottom': (($jma_header_image_wrap.height() - available_height) / 2 + 10) + 'px'
            });
        } else {
            $jma_header_image_wrap.find('.soliloquy-caption').css({
                'width': '',
                'height': ''
            });
            $jma_header_image_wrap.find('.soliloquy-controls-direction').css('width', '');
            $('.soliloquy-caption').css({
                'width': '',
                'height': ''
            });
            $jma_header_image_wrap.find('.soliloquy-pager').css({
                'bottom': ''
            });
        }
    }

    function show_coptions() {
        $('.soliloquy-item').removeClass('jma-dynamic-slide-hidden');
    }

    function handleCanvas() {
        //do stuff here
        fix_soliloquy_elements();
        $.when(fix_soliloquy_elements()).done(function() {
            show_coptions();
        });

    }

    // set up the mutation observer
    var observer = new MutationObserver(function(mutations, bigheaderme) {
        // `mutations` is an array of mutations that occurred
        // `me` is the MutationObserver instance
        var canvas = $('.soliloquy-controls-direction').length;
        if (canvas) {
            handleCanvas();
            bigheaderme.disconnect(); // stop observing
            return;
        }
    });

    // start observing
    observer.observe(document, {
        childList: true,
        subtree: true
    });

    $window.resize(function() {
        fix_soliloquy_elements();
    });

});