
$(document).ready(function () {
    $('#test-form').bootstrapValidator({
        //submitButtons: '#postForm',
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstName: {
                message: 'The first name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The first name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 30,
                        message: 'The first name must be more than 1 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[A-z]+$/,
                        message: 'The first name can only accept alphabetical input'
                    },
                }
            },
            age: {
                message: 'Age is not valid',
                validators: {
                    notEmpty: {
                        message: 'Age is required and cannot be empty'
                    },
                    // stringLength: {
                    //     min: 1,
                    //     max: 30,
                    //     message: 'Last Name must be more than 1 and less than 30 characters long'
                    // },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'Age has to be a number'
                    },
                }
            },
            notes: {
                message: 'Sentence number is not valid',
                validators: {
                    notEmpty: {
                        message: 'Sentence number is required and cannot be empty'
                    },
                    // stringLength: {
                    //     min: 1,
                    //     max: 30,
                    //     message: 'Last Name must be more than 1 and less than 30 characters long'
                    // },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: 'Sentence number has to be a number'
                    },
                }
            },
            HindiEnglish: {
                message: 'The id is not valid',
                validators: {
                    notEmpty: {
                        message: 'This field is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 1,
                        message: 'Enter number between 0-9'
                    },
                    regexp: {
                        regexp: /^[0-9]/,
                        message: 'Only numbers are allowed'
                    },
                }
            },
            BengaliEnglish: {
                message: 'The id is not valid',
                validators: {
                    notEmpty: {
                        message: 'This field is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 1,
                        message: 'Enter number between 0-9'
                    },
                    regexp: {
                        regexp: /^[0-9]/,
                        message: 'Only numbers are allowed'
                    },
                }
            },
            TamilEnglish: {
                message: 'The id is not valid',
                validators: {
                    notEmpty: {
                        message: 'This field is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 1,
                        message: 'Enter number between 0-9'
                    },
                    regexp: {
                        regexp: /^[0-9]/,
                        message: 'Only numbers are allowed'
                    },
                }
            },
            TeleguEnglish: {
                message: 'The id is not valid',
                validators: {
                    notEmpty: {
                        message: 'This field is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 1,
                        message: 'Enter number between 0-9'
                    },
                    regexp: {
                        regexp: /^[0-9]/,
                        message: 'Only numbers are allowed'
                    },
                }
            },
            TamilMalayalam: {
                message: 'The id is not valid',
                validators: {
                    notEmpty: {
                        message: 'This field is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 1,
                        message: 'Enter number between 0-9'
                    },
                    regexp: {
                        regexp: /^[0-9]/,
                        message: 'Only numbers are allowed'
                    },
                }
            },
            BengaliAsamese: {
                message: 'The id is not valid',
                validators: {
                    notEmpty: {
                        message: 'This field is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 1,
                        message: 'Enter number between 0-9'
                    },
                    regexp: {
                        regexp: /^[0-9]/,
                        message: 'Only numbers are allowed'
                    },
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    }
                }
            },
            address: {
                message: 'Address is not valid',
                validators: {
                    notEmpty: {
                        message: 'Address is required and cannot be empty'
                    }
                }
            },

        }
    })
        .on('success.form.bv', function (e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');
            // reading sentence number

            var redirectUrl = '';
            var selectedChangeType = document.getElementById('changeType').value;

            if (selectedChangeType === "1") {
                redirectUrl = 'recorder_language_change.html';
            } else {
                redirectUrl = 'recorder_speaker_change.html';
            }

            var number = document.getElementById('sentence').value
            redirectUrl = redirectUrl + '?sentence=' + number;
            // show the loading 
            $('#postForm').prepend($('<span></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));

            var registrationExcelUrl = 'https://script.google.com/macros/s/AKfycby8zM2nZWe-ElV2ebOsWPcltMZEIVifY7bz6mElL6uwOKmllAWxv2L_eiC3BO1vHdbauQ/exec';

            var registrationObj = $form.serialize();

            var formObjArray = $form.serializeArray();

            var formObjDict = {};
            formObjArray.forEach((value, key) => formObjDict[value['name']] = value['value']);
            var firstName = formObjDict['firstName'].toString().toUpperCase();
            var age = formObjDict['age'].toString();

            var regId = firstName.substring(0, 2) + age;


            registrationObj = registrationObj + "&rid=" + regId;
            
            var jqxhr = $.post(registrationExcelUrl, registrationObj, function (data) {
                alert("Data uploaded.");
            })
                .fail(function (data) {
                    console.warn("Error! Data: " + data.statusText);
                    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                    }
                });

            sessionStorage.setItem("rid", regId);
            $(location).attr('href', redirectUrl);
        });
});


