$(document).ready(function () {
    $('#login-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            regId: {
                message: 'Registration ID is not valid',
                validators: {
                    notEmpty: {
                        message: 'Registration ID is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 5,
                        message: 'Invalid Registration ID'
                    },
                    regexp: {
                        regexp: "^[a-zA-Z0-9_]*$",
                        message: 'Registration ID can only accept alpha numeric entries'
                    }
                }
            },
            sentenceLogin: {
                message: 'Sentence number is not valid',
                validators: {
                    notEmpty: {
                        message: 'Sentence number is required and cannot be empty'
                    },
                    stringLength: {
                        min: 1,
                        max: 3,
                        message: 'Number must be between 1 and 240'
                    },
                    // regexp: {
                    //     regexp: /^[0-240]+$/,
                    //     message: 'Sentence number has to be a number'
                    // },
                }
            }
        }
        
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');
        var redirectUrl = '';
        var selectedChangeType = document.getElementById('changeTypeLogin').value;

        if (selectedChangeType === "1") {
            redirectUrl = 'recorder_language_change.html';
        } else {
            redirectUrl = 'recorder_speaker_change.html';
        }
        var number = document.getElementById('sentenceLogin').value
        redirectUrl = redirectUrl + '?sentence=' + number;

        var regId = document.getElementById('regId').value.toString();
        sessionStorage.setItem("rid", regId);
        $(location).attr('href', redirectUrl);
    });
});