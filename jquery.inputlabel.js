/*
 * inputLabel 2.0
 * -----------------
 * An easy cross browser compatible way to have labels contained in their inputs.
 * http://www.alexanderdickson.com/
 *
 *
 * Copyright (c) 2011 Alex Dickson
 * Licensed under the MIT licenses.
 * See website for more info.
 *
 */

;(function($) {
    $.fn.inputLabel = function(options) {
        var defaults = {
            // Custom label
            customLabel: false,
            // Add label text to input title?
            addTitleAtt: true,
            // Custom classes
            labelClass: 'input-label',
            labeledClass: 'input-labeled',
            wrapperClass: 'input-wrapper'
        };
        var options = $.extend(defaults, options);
        return this.each(function() {
            var objs = $(this);

            objs.each(function() {
                var obj = $(this);

                // Only input[type=text], input[type=password] and textareas
                if (!obj.is(':text, :password, textarea')) {
                    return;
                };

                // Get associated label
                // Check if using for attribute
                var id = obj.attr('id'),
                    label = $('label[for = "' + id + '"]');

                // Otherwise, check for ancestor label
                if (label.length == 0) {
                    label = obj.closest('label');
                    // Rearrange it to make it possible below
                    obj.insertAfter(label);
                }

                // Could not find label, so skip this element!
                if (label.length == 0) {
                    return;
                }

                if (options.customLabel) {
                    label.html(options.customLabel);
                }

                if (options.addTitleAtt) {
                    // Only add title if one does not exist
                    if ($.trim(obj.attr('title')) == '') {
                        obj.attr('title', $.trim(label.text()));
                    }
                }

                label.addClass(options.labelClass);

                // Wrap element
                var wrapper = obj.add(label).wrapAll('<div/>').parent();
                wrapper.addClass(options.wrapperClass);

                // Some neccesary CSS
                var inputWidth = obj.outerWidth(),
                    inputHeight = obj.outerHeight();

                wrapper.css({
                    width: inputWidth,
                    height: inputHeight,
                    position: 'relative',

                });

                obj.add(label).css({
                    position: 'absolute',
                    zIndex: 0
                });


                // Have to copy certain styles
                var copyStyles = [
                    'fontSize',
                    'fontFamily',
                    'lineHeight'
                    ];

                $.each(copyStyles, function(i, style) {
                    label.css(style, function() {
                        return obj.css(style);
                    });
                });

                obj.css({
                    top: 0,
                    left: 0,
                    zIndex: 0
                });

                label.css({
                    top: parseInt(obj.css('borderTopWidth')) + parseInt(obj.css('paddingTop')),
                    bottom: parseInt(obj.css('borderBottomWidth')) + parseInt(obj.css('paddingBottom')),
                    left: parseInt(obj.css('borderLeftWidth')) + parseInt(obj.css('paddingLeft')),
                    right: parseInt(obj.css('borderRightWidth')) + parseInt(obj.css('paddingRight')),
                    zIndex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                });

                var defaultValue = $.trim(obj[0].defaultValue);

                if (obj.val() == defaultValue) {
                    obj.css('textIndent', '-9999px');
                }

                label.click(function() {
                    obj.focus();
                });

                obj.focus(function() {
                    obj.removeClass(options.labeledClass);

                    label.hide();
                    if (defaultValue) {
                        obj.css('textIndent', 0);
                    }
                });

                obj.blur(function() {
                    obj.addClass(options.labeledClass);
                    var value = $.trim($(this).val());
                    if (value == '' || value == defaultValue) {
                        label.show();
                        obj.css('textIndent', '-9999px');
                    }
                });
            });
        });
    };
})(jQuery);