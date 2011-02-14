#inputLabel 2.1#

Copyright (c) 2011 Alex Dickson

Licensed under the MIT licenses.

[http://www.alexanderdickson.com](http://www.alexanderdickson.com)

##Overview##

An easy cross browser compatible way to have labels contained in their inputs.

##Usage##

    $('form input#email').inputLabel();

##Options##

###Custom label###

You may change the label to be different to the label's text. If no label is present, one is created.

    $('input').inputLabel({
       customLabel: 'Email'
    });

As of 1.2, you can also pass in the custom label as the first argument to the plugin.

    $('input').inputLabel('Email');

###Set title attribute to label###

If true, then the input's title attribute will be set to the label's text. It will not overwrite existing attributes. Defaults to true.

    $('input').inputLabel({
       addTitleAtt: false
    });

###Custom classes###

Allows you control of the classes added to the elements required. The defaults are listed below in the example code.

    $('input').inputLabel({
            // Added to all labels processed
            labelClass: 'input-label',
            // Added to input elements that have been processed
            labeledClass: 'input-labeled',
            // Added to the wrapper element that contains the input and label
            wrapperClass: 'input-wrapper'
    });