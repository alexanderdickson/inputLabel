/*
 * inputLabel 2.2
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

;
(function($) {
    $.fn.inputLabel = function(options) {

        var copyStyles = function(styles, target, source) {
            $.each(styles, function(i, style) {
                target.css(style, function() {
                    return source.css(style);
                });
            });
        }

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

        // Support for custom label passed in as string
        if (typeof options == 'string') {
            options = {
                customLabel: options
            };
        }

        options = $.extend(defaults, options);

        return this.each(function() {

            var obj = $(this);

            // Only 'input[type=text]', 'input[type=password]' and 'textarea'
            if (!obj.is(':text, :password, textarea')) {
                return;
            }


            // Get associated label
            // Check if using 'for' attribute
            var id = obj.attr('id'),
                label = $('label[for = "' + id + '"]');

            // If no 'id' attribute, we'll make one
            if (!id) {
                // There should only ever be one name per input,
                // except for PHP style 'field[]'.
                // To combat this, I'll add the index to the 'id',
                // and also prefix with `input-` to stop any invalid 'id'
                // which may start with a number.
                id = 'input-' + obj.attr('name') + '-' + obj.index('*');
                console.log(id);
                obj.attr({
                    'id': id
                });

            }

            // Otherwise, check for ancestor label
            if (label.length == 0) {
                label = obj.closest('label');
                // Rearrange it
                obj.insertAfter(label);
            }

            // Could not find label, so try to make one
            if (label.length == 0) {
                label = $('<label />', {
                    'for': id
                });

                // Maybe there is a placeholder attribute we can get
                var placeholderAttr;

                if (options.customLabel) {
                    label.html(options.customLabel);
                } else if (placeholderAttr = obj.attr('placeholder')) {
                    label.html(placeholderAttr);
                    obj.removeAttr('placeholder');
                } else {
                    // Well, we tried :)
                    return;
                }

                label.insertBefore(obj);
            }

            if (options.addTitleAtt) {
                // Only add title if one does not exist
                if ($.trim(obj.attr('title')) == '') {
                    obj.attr('title', $.trim(label.text()));
                }
            }

            label.addClass(options.labelClass);

            // Wrap element
            var objParent = obj.parent(),
                wrapper = label.add(obj).wrapAll('<div/>').parent();

            wrapper.appendTo(objParent);
            wrapper.addClass(options.wrapperClass);

            // Some neccesary CSS
            obj.add(label).css({
                position: 'absolute',
                zIndex: 0
            });

            // Have to copy certain styles from input to wrapper
            var objToWrapperCopyStyles = [
                'paddingTop',
                'paddingRight',
                'paddingBottom',
                'paddingLeft',
                'marginTop',
                'marginRight',
                'marginBottom',
                'marginLeft'
                ];

            copyStyles(objToWrapperCopyStyles, wrapper, obj);

            obj.css({
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            })

            wrapper.css({
                width: obj.width(),
                height: obj.height(),
                position: 'relative'

            });

            // Have to copy certain styles from object to label
            var objToLabelCopyStyles = [
                'fontSize',
                'fontFamily',
                'lineHeight',
                'textAlign',
                'paddingTop',
                'paddingRight',
                'paddingBottom',
                'paddingLeft'
                ];

            copyStyles(objToLabelCopyStyles, label, obj);

            obj.css({
                top: 0,
                left: 0,
                zIndex: 0
            });

            label.css({
                top: parseInt(obj.css('borderTopWidth')),
                bottom: parseInt(obj.css('borderBottomWidth')),
                left: parseInt(obj.css('borderLeftWidth')),
                right: parseInt(obj.css('borderRightWidth')),
                zIndex: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: 'auto',
                cursor: 'text'
            });

            // Events
            var defaultValue = $.trim(obj[0].defaultValue),
                textIndentOffset = '-9999px';

            if (obj.val() == defaultValue) {
                obj.css('textIndent', textIndentOffset);
            }

            label.click(function() {
                obj.focus();
            });

            obj.focus(function() {
                obj.removeClass(options.labeledClass);

                label.hide();
                if (defaultValue || $.trim(obj.val()) == '') {
                    obj.css('textIndent', 0);
                }
            });

            obj.blur(function() {
                obj.addClass(options.labeledClass);
                var value = $.trim($(this).val());
                if (value == '' || value == defaultValue) {
                    label.show();
                    obj.css('textIndent', textIndentOffset);
                }
            });
        });
    };
})(jQuery);