jQuery.fn.extend({

    isInAlertMessage: function() {
		return this.data("parent-type") == "message";
    },

    isInAlertConfirm: function() {
      	return this.data("parent-type") == "confirm";
    },

	/**
	 * 
	 * @param {Text message (mandatory)} message 
	 * @param {Tag to identify operation (mandatory)} tag 
	 * @param {Text of ok button (to default text send null or empty string) } okText 
	 * @param {Text of cancel button (to default text send null or empty string)} cancelText 
	 * @param {ok or cancel string to focus default button (to default send null or empty string)} defaultButton 
	 */
	showAlertConfirm: function(message, tag, okText, cancelText, defaultButton) {
		var $modal = this.find(".nb-alert-confirm");
		$modal.find(".nb-alert-confirm-label").text(message);
		
		var $okButton = $modal.find(".nb-alert-confirm-ok-button");
		var $cancelButton = $modal.find(".nb-alert-confirm-cancel-button");
		var $defaultButton = (defaultButton == null || defaultButton == "" || defaultButton == "ok") ? $okButton : $cancelButton;

		okText = (okText == "" || okText == null) ? __("SettingsOkButton") : okText;
		cancelText = (cancelText == "" || cancelText == null) ? __("SettingsCancelButton") : cancelText;

		$okButton.text(okText);
		$cancelButton.text(cancelText);

		$okButton.data("tag", tag);
		$cancelButton.data("tag", tag);

		$modal.modal("show");

		$modal.on('shown.bs.modal', function(){
			Focus.to($defaultButton);
			$defaultButton.focus();
		});
	},

	/**
	 * 
	 * @param {Text message (mandatory)} message 
	 * @param {Tag to identify operation (mandatory)} tag 
	 * @param {Text of ok button (to default text send null or empty string) } okText 
	 */
	showAlertMessage: function(message, tag, okText) {
		var $modal = this.find(".nb-alert-message");
		$modal.find(".nb-alert-message-label").html(message);
		
		var $okButton = $modal.find(".nb-alert-message-ok-button");
		okText = (okText == "" || okText == null) ? __("SettingsOkButton") : okText;
		$okButton.html(okText);
		$okButton.data("tag", tag);

		$modal.modal("show");

		$modal.on('shown.bs.modal', function(){
			Focus.to($okButton);
			$okButton.focus();
		});
	},

	closeAlert: function() {
		var $modal = this.closest(".nb-alert");

		if ($modal.length > 0) {
			$modal.modal('hide');
		}
	},

	closeAlertThen: function(callback) {
		var $modal = this.closest(".nb-alert");

		if ($modal.length > 0) {
			$modal.modal('hide');
			setTimeout(function(){ callback() }, 250);
		}
	},

	loadImage: function(src, placeholder){
		var defaultPlaceholder = "assets/images/" + CONFIG.app.brand + "/placeholder_220x160.png";
		placeholder = placeholder == null || placeholder.length == 0 ?  defaultPlaceholder : placeholder;
		this.attr("src", placeholder);

		if (src != null && src.length > 0) {
			this.error(function (e) {
				imgOnError($(this));
			});
	
			var self = this;
			setTimeout(function() {
				self.attr("src", src);
			}, 50);
		}
	},
	
	getHomeFocusableItemAt(top, left) {
        top = this.offset().top + top;
        left = this.offset().left + left;
        var itemAtPoint = document.elementFromPoint(left, top);

        if (CONFIG.developer.debug) {
            if ($("#debugFocusPosition").length == 0) {
                $("body").prepend("<div id='debugFocusPosition'></div>")
            }
            $("#debugFocusPosition").css({"top": top + "px", "left": left + "px", "display": "block"});
        }

        if (typeof itemAtPoint != 'undefined' && itemAtPoint != null) {
			if ($(itemAtPoint).hasClass("focusable")) {
				return $(itemAtPoint);
			} else if ($(itemAtPoint).closest(".focusable").length > 0) {
				return $(itemAtPoint).closest(".focusable");
			}
        }

        return [];
    },

	getHomeRowAt(top, left) {
        top = this.offset().top + top;
        left = this.offset().left + left;
        var itemAtPoint = document.elementFromPoint(left, top);

        if (CONFIG.developer.debug) {
            if ($("#debugFocusPosition").length == 0) {
                $("body").prepend("<div id='debugFocusPosition'></div>")
            }
            $("#debugFocusPosition").css({"top": top + "px", "left": left + "px", "display": "block"});
        }

        if (typeof itemAtPoint != 'undefined' && itemAtPoint != null) {
			if ($(itemAtPoint).closest(".row").length > 0) {
				return $(itemAtPoint).closest(".row");
			}
        }

        return [];
    }
  
});

function getDateFormatted(inDate, justTime) {

	if (justTime) {
		return inDate.local().format("HH:mm");
	}
	
    return inDate.local().calendar( null, {
		lastDay:  '[Yesterday]',
        sameDay:  '[Today]',
        nextDay:  '[Tomorrow]',
		lastWeek: 'ddd DD MMM',
		nextWeek: 'ddd DD MMM',
        sameElse: function () {
            return "ddd DD MMM";
        }
    });
}

function imgOnError(event) {
	event.onerror = null; 
	var $img = $(event);
	$img.unbind('error');
	$img.attr("src", "assets/images/" + CONFIG.app.brand + "/placeholder_220x160.png");
	$img.addClass("img-placeholder");
}

function getTimeDifference(fromDate, toDate, unit) {
	return Math.abs(fromDate.diff(toDate, unit));
}

function getStringDate(date, format) {
	return date.local().format(format);
}

function getTodayDate() {
	return moment.utc();
}

function closeApp() {
	if (Device.isTIZEN || Device.isSAMSUNG) {
		Device.tizenObject.exit();
	} else {
		window.open('', '_self').close();
	}
}

// function addImgErrorEvent($images) {
// 	$images.error(function (e) {
//         var $img = $(this);

        // if (typeof $img.data("placeholder") !== 'undefined' && $img.data("placeholder").length > 0 && $img.data("placeholder") != $img.attr("src")) {
        //     $img.attr("src", $img.data("placeholder"));
        // } else {
        //     $img.attr("src", "assets/images/" + CONFIG.app.brand + "/placeholder_220x160.png");
        //     //$img.addClass("img-placeholder");
        // }
    // });
// }

function addImgPlaceholder($images) {
	$images.each(function() {
		var placeholder = $(this).data("placeholder");
		if (typeof placeholder != 'undefined' && placeholder.length > 0) {
			$(this).parent().css("background", "url(" +placeholder +") no-repeat center center / cover");
		} else {
			$(this).parent().css("background", "url(assets/images/" + CONFIG.app.brand + "/placeholder_220x160.png) no-repeat center center / cover");
		}
	});
}

function minutesToTimeString(timeInMinutes) {
	var hours = Math.floor(timeInMinutes / 60);
	var minutes = Math.floor(timeInMinutes % 60);
	var response = ""
	
	if (hours >= 1) {
		response = hours + "hs ";
	}

	if (minutes > 0) {
		response += minutes + " min"
	}
	
	return response
}

$(function() {

	//addImgErrorEvent($("img"));

});