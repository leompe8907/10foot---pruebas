Scene_Home = (function(Scene) {

	var Scene_Home = function() {
	this.construct.apply(this, arguments);
	};

	$.extend(true, Scene_Home.prototype, Scene.prototype, {
		/**
		 * @inheritdoc Scene#init
		 */
		init: function(){
			console.log("Scene_Home init");
			this.$firstFocusableItem = this.$el.find(".channels-div .focusable").first();
			this.viewport = $("#viewport");
			this.channelsGrid = $("#channelsGrid");
			this.playbackMetadata = { type: '', id: '' };
			this.requestingData = false;
			this.$videoContainer = $("#divVideoContainer");
			this.$lastFocused = false;
			this.firstLaunch = true;
			this.dontRedraw = false;
			this.aboutString = "";
			this.timeIntervalApp = null; //by minute
			this.currentVodCategoryId = 0;
			this.nbPlayerAttempts = 0;
			this.nbPlayerRetryTimeout = null;
			this.NBPLAYER_RETRY_AFTER_ERROR = true;
			this.verifyingUserSession = false;
			this.lastPlaybackTime = 0;
			this.autoSeek = false;
			this.forcePlayback = false;
		},
		/**
		 * @inheritdoc Scene#render
		 */
		render: function() {
            this.$el.find("#epgAtThisTimeLabel").html(__("EPGAtThisTime"));
            this.$el.find("#epgNextLabel").html(__("EPGNext"));
            this.$el.find("#menuTitleLabel").html(__("MenuTitle"));
            this.$el.find("#menuEPGLabel").html(__("MenuEPG"));
            this.$el.find("#menuAboutLabel").html(__("MenuAbout"));
            this.$el.find("#menuLogoutLabel").html(__("MenuLogout"));
            this.$el.find("#menuUpdateDataLabel").html(__("MenuUpdateData"));
			$(".epg-message").html(__("EPGLoading"));
			EPG.homeObject = this;
			VOD.homeObject = this;
			VODDetail.homeObject = this;

			if (!CONFIG.app.showTime) {
				$("#nbTime").addClass("hide");
			}

			var date = new Date();
			var self = this;
			self.actionMinute();
			setTimeout(function () {
				self.timeIntervalApp = setInterval(self.actionMinute, 60000);
				self.actionMinute();
			}, (60 - date.getSeconds()) * 1000);

			if (CONFIG.app.logoPositionHome == 'right') {
				var percPlayer = $("#divVideoContainer").width()  / $("#divVideoContainer").parent().parent().width() * 100;
				$("#divVideoContainer").parent().css({'width': percPlayer + '%'});
	
				var percLogo = (percPlayer / 3) * 2;
				$("#rightLogoImage").parent().css({'width': percLogo + '%'});
				//$("#rightLogoImage").css({'margin-top': '20%', 'width': '100%', 'padding': '1em'});
	
				var percInfo = 100 - percPlayer - percLogo;
				$(".header-row-info").css({'width': percInfo + '%'});

				//modificar en la linea 75 el nombre de la empresa
				$("#topLogoImage").addClass("hide");
				$("#rightLogoImage").removeClass("hide");
				$("#rightLogoImage").attr("src", "assets/images/bromteck/logo-top.png");

			} else {
				$("#topLogoImage").removeClass("hide");
				$("#rightLogoImage").addClass("hide");
			}
			
			if (CONFIG.app.production) {
				this.$el.find("#menuEPGLabel").parent().addClass("hide");
			}

			if (CONFIG.app.brand == "meganet") {
				$("#menuEPGLabel").parent().hide();
			}
		},

		actionMinute: function() {
			$("#nbTime").html(getDateFormatted(getTodayDate(), true));			
			$(".vjs-control-bar .nb-vjs-vod-time span").html(getDateFormatted(getTodayDate(), true));			
		},

		/**
		 * @inheritdoc Scene#activate
		 */
		activate: function(id, categoryId) {

			if (this.dontRedraw) {
				if (id != null) {
					var $focus = null;
					if (this.currentVodCategoryId != null) {
						$focus = $("#vodContainer").find("[data-id='" + id + "'][data-category-id='" + this.currentVodCategoryId + "']");
					} else { // comes frome VODDetail, then search vod id item
						$focus = $("#vodRow").find("[data-id='" + id + "']");
					}

					if ($focus.length > 0) {
						Focus.to($focus);
					}
				}
				return;
			}

			if (this.requestingData) {
				return;
			}
			
			App.throbber();
			$("#menuRow").addClass("hidden");
			this.firstLaunch = true;
			this.aboutString = "";

			if (User.hasCredentials() && User.isLicenseActivated()) {
				this.aboutString = "<table>"
				+ "<tr>"
				+ "<td style='padding-right: 6em'>" + __("AboutVersion") + ":</td><td>" + CONFIG.version + "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td>" + __("LoginUsername") + ":</td><td>" + User.getUsername() + "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td>" + __("AboutCard") + ":</td><td>" + User.getLicense() + "</td>" 
				+ "</tr>"
				+ "<tr>"
				+ "<td>" + __("AboutDevelopedBy") + ":</td><td>" + CONFIG.app.developedBy + "</td>" 
				+ "</tr>";
				this.clearData();
				this.getHomeData();
			} else if (User.hasCredentials()) {
				//activate license
				App.throbberHide();
				App.notification(__("Scene_Home"));
			} else {
				//login
				App.throbberHide();
				App.notification(__("Scene_Home"));
			}

		},

		clearData: function() {
			AppData.clearData();
			EPG.reset();
			VOD.reset();
			VODDetail.reset();
			$(".div-bouquet").remove();
			$("#tvChannelsRow").empty();
			$("#vodRow").empty()
			$("#catchupsRow").empty();
			$("#favoritesRow").empty();
			$("#catchupRecordingRow").empty();
			$("#catchupRecordingRow").empty();
			this.firstLaunch = true;
		},

		getHomeData: function() {
			var self = this;
			this.requestingData = true;
			AppData.getDataForServicesTV(function(data) {
				self.setBouquetsContent(data);
				self.getDataForCatchups();
			});
		},

		getDataForCatchups: function() {
			var self = this;
			// get catchups with events
			AppData.getCatchupGroups(function(catchups) {
				self.setCatchupsContent(catchups);
				self.getDataForCatchupsRecorded();
			});
			
		},

		getDataForCatchupsRecorded: function() {
			var self = this;
			AppData.getCatchupsRecorded(function(catchupsRecorded) { 
				console.log(catchupsRecorded);
				self.setCatchupsRecordedContent(catchupsRecorded);

				$("#menuRow").removeClass("hidden");
				App.throbberHide();
				if (self.firstLaunch) {
					self.getEPGData();
				}
			});
			
		},

		getEPGData: function() {
			var self = this;

			//$("#menuEPGLabel").closest(".other-option").addClass("hidden");
			AppData.getEPGByBouquet(function(servicesWithEPG) {
				console.log("EPG received: " + servicesWithEPG);
				EPG.draw(servicesWithEPG);
				//$("#menuEPGLabel").closest(".other-option").removeClass("hidden");
				self.getVODData();
			}, 0);
						
			//EPG.draw([]);
			//this.getVODData();
		},

		getVODData: function() {
			var self = this;
			AppData.getVOD(function (categories) {
				console.log("VOD library received: ");
				console.log(categories);
				self.setVODContent(categories);

				self.allDataLoaded();
			});
		},

		allDataLoaded: function() {
			this.requestingData = false;
			this.firstLaunch = false;
			App.throbberHide();
		},

		/**
		 * @inheritdoc Scene#onLangChange
		 */
		onLangChange: function () {
			
		},
		/**
		 * @inheritdoc Scene#onClick
		 */
		onClick: function($el, event) {
			if (this.trigger('click', $el, event) === false) {
                return false;
            }
            return this.onEnter.apply(this, arguments);
		},

		onFocus: function ($el) {

			if (EPG.isShowed() && !nbPlayerIsFullscreen()) {
				EPG.onFocus($el);
				return;
			} else if (VOD.isShowed() && !VODDetail.isShowed() && !nbPlayerIsFullscreen()) {
				VOD.onFocus($el);
				return;
			} else if (VODDetail.isShowed() && !nbPlayerIsFullscreen()) {
				VODDetail.onFocus($el);
				return;
			}

			if (typeof $el.data("type") !== 'undefined' && typeof $el.data("id") !== 'undefined' && $el.data("id") != null) {
				var id = $el.data("id");

				if ($el.data("type") == "service") {
					var serviceTV = AppData.getServiceTV(id);
					if (serviceTV !== false) {
						this.focusServiceTV(serviceTV, false);
					}
				} else if ($el.data("type") == "catchup" || $el.data("type") == "catchup-event") {
					this.setMenuTitle(__("MenuCatchups"));
				} else if ($el.data("type") == "vod") {
					if ($el.data("id") == 0) {
						this.setMenuTitle(__("MoviesSubtitle"));
					} else {
						this.setMenuTitle(__("MenuMovies"));
					}
				}
			} else if (typeof $el.data("other-id") !== 'undefined') {
				this.$lastFocused = Focus.focused;
				var id = $el.data("other-id");
				if (id != null & id >= 0) {
					switch (id) {
						case 0: //reload
							this.setMenuTitle(__("MenuUpdateDataDescription"));
							break;
						case 1: //epg
							this.setMenuTitle(__("MenuEPGDescription"));
							break;
						case 2: //about
							this.setMenuTitle(__("MenuAbout"));
							break;
						case 3: //logout
							this.setMenuTitle(__("MenuLogout"));
							break;
					}
				}
			}
        },
		/**
		 * @inheritdoc Scene#onReturn
		 */
		onReturn: function($el, event) {
			console.log("go back");
			var self = this;
			if (nbPlayerIsFullscreen()) {
				if (nbPlayerAreControslActive()) {
					if (this.playbackMetadata.type == "vod") { 
						if (nbPlayer.vodPlayerGetControlType($el) == nbPlayer.vodControlsEnum.trackItem) {
							nbPlayer.closeTracks();
							Focus.to(nbPlayer.$vodTracksButton);
						} else {
							nbPlayer.hideControls();
						}
					} else if ($nbPlayerTextTracksButton.find(".vjs-menu").is(":visible")) {
						$nbPlayerTextTracksButton.find(".vjs-menu").displayNone();
						Focus.to($nbPlayerTextTracksButton);
					} else if ($nbPlayerAudioTracksButton.find(".vjs-menu").is(":visible")) {
						$nbPlayerAudioTracksButton.find(".vjs-menu").displayNone();
						Focus.to($nbPlayerAudioTracksButton);
					} else {
						nbPlayer.hideControls();
					}
				} else {
					this.exitPlayerFullscreen();
				}
				return;
			} else if (EPG.isShowed()) {
				EPG.onReturn(function() {
					$("#channelsGrid").show();
				});
				Focus.to($(".other-option[data-other-id='1']"));
			} else if (VOD.isShowed() && !VODDetail.isShowed()) {
				VOD.onReturn(function() {
					$("#channelsGrid").show();
					Focus.to($("#vodRow .focusable:first"));
				});
			} else if (VODDetail.isShowed()) {
				VODDetail.onReturn(function() {
					Focus.to(self.$lastFocused);
				});
			} else if ($el.isInAlertConfirm()) {
				$el.closeAlert();
				Focus.to(this.$lastFocused);
			} else {
				this.$lastFocused = Focus.focused;
				this.$el.showAlertConfirm(__("AppCloseApp"), 'close_app', null, null, 'cancel');
			}
        },

		/**
		 * @inheritdoc Scene#onEnter
		 */
		onEnter: function($el, event) {

			var self = this;
			if (nbPlayerIsFullscreen()) {
				this.managePlayerEnter($el);
				return;
			} else if (EPG.isShowed() && !$el.hasClass('video-container')) {
				EPG.onEnter($el, function(type, id, url, object) {
					self.playContent(type, id, url, object);
				});
				return;
			} else if (VOD.isShowed() && !VODDetail.isShowed() && !$el.hasClass('video-container') && !$el.isInAlertConfirm()) {
				VOD.onEnter($el, function(type, id, url, object) {
					self.playContent(type, id, url, object);
				});
				return;
			} else if (VODDetail.isShowed() && !$el.hasClass('video-container') && !$el.isInAlertConfirm()) {
				VODDetail.onEnter($el);
				return;
			}

			if (typeof $el.data("id") !== 'undefined') {
				var id = $el.data("id");
				var type = $el.data("type");


				if (type == this.playbackMetadata.type && id == this.playbackMetadata.id && !this.firstLaunch) {
					try {
						nbPlayer.requestFullscreen();
					} catch(e){}
					return;
				}

				if (type == "service") {
					var serviceTV = AppData.getServiceTV(id);
					if (serviceTV !== false && serviceTV.url != null && serviceTV.url.length > 0) {
						this.playContent(type, id, serviceTV.url, serviceTV);
					}
				} else if (type == "catchup") {
					if ($el.data("back") == true) {
						$("#catchupsRow").find(".row-catchup-dates:first").addClass("hidden");
						$("#catchupsRow").find(".row-catchup-events:first").addClass("hidden");
						$("#catchupsRow").find(".row-catchups:first").removeClass("hidden");

						var $focusTo = $("#catchupsRow").find(".row-catchups .focusable[data-id='" + id + "']:first");
						Focus.to($focusTo);
						$focusTo.focus();
					} else {
						var catchup = AppData.getCatchup(id);
						if (catchup !== false) {
							this.openCatchupCell(catchup);
						}
					}

				} else if (type == "catchup-date") {
					if ($el.data("back") == true) {
						$("#catchupsRow").find(".row-catchups:first").addClass("hidden");
						$("#catchupsRow").find(".row-catchup-events:first").addClass("hidden");
						$("#catchupsRow").find(".row-catchup-dates:first").removeClass("hidden");

						var $focusTo = $("#catchupsRow").find(".row-catchup-dates .focusable[data-id='" + id + "']:first");
						Focus.to($focusTo);
						$focusTo.focus();
					} else {
						var catchup = AppData.getCatchup(id);
						var dateString = $el.data("date");
						if (catchup !== false) {
							this.openCatchupDate(catchup, dateString);
						}
					}
				} else if (type == "catchup-event") {
					var eventId = $el.data("event-id");
					var catchup = null;
					if (eventId != null && typeof eventId != 'undefined' && eventId > 0) {
						catchup = AppData.getCatchupByEventId(eventId);
						id = eventId;
					} else {
						var group = $el.data("group");
						catchup = AppData.getCatchupEvent(group, id);
					}

					if (catchup == null) {
						return;
					}

					console.log(catchup);
					console.log("Play catchup event id " + id);

					AppData.getTopLevelCatchupM3u8Url(catchup.id, function(url) {
						console.log("Play CATCHUP with URL: " + url);
						if (url != null && url.length > 0) {
							self.playContent(type, id, url, catchup);
						}
					});

				} else if (type == "vod") {
					if (id > 0) { 
						this.currentVodCategoryId = null;
						//Router.go('voddetail', id, this.currentVodCategoryId, this);
						this.$lastFocused = Focus.focused;
						VODDetail.show(id, this.currentVodCategoryId, this);
					} else {
						// open all vod window
						VOD.show();
					}
				}

			} else if (typeof $el.data("other-id") !== 'undefined') {
				var id = $el.data("other-id");
				if (id != null & id >= 0) {
					console.log("other option ", id);
					switch (id) {
						case 0: //reload
							this.activate();  
							break;
						case 1: //epg
							EPG.show();
							break;
						case 2: //about
							this.$el.showAlertMessage(this.aboutString, "menuabout", __("SettingsCloseButton").toUpperCase());
							break;
						case 3: //logout
							this.$lastFocused = Focus.focused;
							this.$el.showAlertConfirm(__("LoginLogoutConfirm"), 'LoginLogoutConfirm', __("LoginLogoutButton"), __("LoginLogoutCancelButton"), 'cancel');
							break;
					}
				}
			} else if ($el.hasClass('video-container')) {
				try {
					nbPlayer.requestFullscreen();
				} catch(e){}

				Focus.to($(".exitFullscreenBtn"));
				$(".exitFullscreenBtn").focus();
			} else if ($el.isInAlertMessage()) {
				$el.closeAlert();
                Focus.to(this.$lastFocused);
			} else if ($el.isInAlertConfirm()) {
				var tag = $el.data("tag");
				if (typeof tag != 'undefined' && tag != null && tag.length > 0) {
					if (tag == "license_already_in_use") {
						this.activateLicense($el.is(this.$nbAlertConfirmOkButton));
						$el.closeAlert();
						Focus.to(this.$videoContainer);
						return;
					} else if (tag == "MoviesContinuePlayback") {
						if ($el.is(this.$nbAlertConfirmOkButton)) {
							var timeResume = User.getVideoHistoryFor(this.playbackMetadata.type, this.playbackMetadata.id);
							$nbPlayer.currentTime(timeResume);
						}
						$nbPlayer.play();
						$el.closeAlert();
						try {
							nbPlayer.requestFullscreen();
						} catch(e){}
						return;
					} else if (tag == "LoginLogoutConfirm") {
						if ($el.is(this.$nbAlertConfirmOkButton)) {	
							$nbPlayer.pause();
							this.clearData();
							cv.logout(function () {
								Router.go('login');
							});
						} else {
							$el.closeAlert();
							Focus.to(this.$lastFocused);
						}
					}
				}

                if ($el.is(this.$nbAlertConfirmOkButton)) {
                    $el.closeAlert();
					closeApp();
                } else {
                    $el.closeAlert();
                    Focus.to(this.$lastFocused);
                }
			}
		},

		/**
		 * @inheritdoc Scene#onBeforeGoBack
		 */
		onBeforeGoBack: function (fromScene) {
			this.dontRedraw = true;
		},

		/**
		 * @inheritdoc Scene#navigate
		 */
		navigate: function (direction) {
			var $el = Focus.focused;

			if (nbPlayerIsFullscreen()) {
				this.managePlayerNavigation(direction);
				return;
			} else if ($el.isInAlertMessage() || $el.isInAlertConfirm()) { // navigate on dialog
                this.manageFocusOnAlert(direction, $el.data("parent-type"));
				return;
			}

			if (EPG.isShowed() && !nbPlayerIsFullscreen()) {
				EPG.navigate(direction);
				return;
			} else if (VOD.isShowed() && !VODDetail.isShowed() && !nbPlayerIsFullscreen()) {
				VOD.navigate(direction);
				return;
			} else if (VODDetail.isShowed() && !nbPlayerIsFullscreen()) {
				VODDetail.navigate(direction);
				return;
			}

			var $focused = Focus.focused;
			var $focusTo = [];
		
			if (direction == "up") {
				$focusTo = this.getNextFocusable(direction);
			} else if (direction == "down") {
				$focusTo = this.getNextFocusable(direction);
			} else if (direction == "left") {
				$focusTo = $focused.prevAll(".focusable:visible:first");
			} else if (direction == "right") {
				$focusTo = $focused.nextAll(".focusable:visible:first");
			}
		
			if ($focusTo.length > 0) {
				Focus.to($focusTo);
				
				var $parent = $focusTo.parent();
		
				if ($focusTo.position().left < 0) {
					$parent.scrollLeft($parent.scrollLeft() - $focusTo.innerWidth() - 20);
				} else if (($focusTo.position().left + $focusTo.innerWidth()) > $parent.innerWidth()) {
					$parent.scrollLeft($parent.scrollLeft() + $focusTo.innerWidth() + 20);
				}

			}

            return false;
		},

		getNextFocusable: function(direction) {

			var $itemAtPoint = [];
			var $focused = Focus.focused;
			var jumpTopTo = 0;

			var $currentRow = $focused.closest(".row");
			var $nextRow = $currentRow;
			var currentLeftPos = $focused.position().left;

			if (direction == 'up') {
				if ($focused.is(this.$videoContainer)) {
					return $focused;
				}

				$nextRow = $currentRow.prevAll(".row:visible:first");

				if ($nextRow == null || $nextRow.length == 0) {
					return this.$videoContainer;
				}
				
			} else if (direction == 'down') {
				if ($focused.is(this.$videoContainer)) {
					currentLeftPos = $focused.offset().left + $focused.width() / 2;
					var $nearItem = this.channelsGrid.getHomeFocusableItemAt($focused.offset().top + 20, currentLeftPos);
					if ($nearItem.length > 0) {
						return $nearItem;
					} else {
						$nextRow = this.channelsGrid.getHomeRowAt($focused.offset().top + 20, currentLeftPos);
						currentLeftPos = $focused.offset().left;
					}

				} else {
					$nextRow = $currentRow.nextAll(".row:visible:first");
				}

				if ($nextRow == null || $nextRow.length == 0) {
					return $focused;
				}
			}

			left = currentLeftPos + ($focused.width() / 2);
			
			// scroll if needed
			if ($nextRow != null && $nextRow.length > 0) {
				jumpTopTo = $nextRow.position().top + $nextRow.find(".focusable:visible:first").position().top + 20;
				var jump = 0;
				if ($nextRow.position().top < 0) {
					jump = $nextRow.position().top;
					jumpTopTo -= jump;
				} else if ($nextRow.position().top + $nextRow.height() > this.channelsGrid.height() - 20) {
					jump = ($nextRow.position().top + $nextRow.height() ) - (this.channelsGrid.height() - 50);
					jumpTopTo -= jump;
				}
				this.channelsGrid.scrollTop(this.channelsGrid.scrollTop() + jump);
			}
		
			//get a focusable item at point
			$itemAtPoint = this.channelsGrid.getHomeFocusableItemAt(jumpTopTo, left);
		
			if ($itemAtPoint.length > 0) {
				return $itemAtPoint;
			}
		
			// search up to left
			var jumpX = 100;
			var x = 1;
			for (var i = (left - jumpX); i > 0; i -= jumpX) {
				console.log("Search up to left " + (x++) + " (x=" + i + ",y=" + jumpTopTo + ")");
				$itemAtPoint = this.channelsGrid.getHomeFocusableItemAt(jumpTopTo, i);
		
				if ($itemAtPoint.length > 0) {
					return $itemAtPoint;
				}
			}

			return $focused;
		},

		channelUp: function() {
			if (this.playbackMetadata.type == "service") {
				this.playNextPrevServiceTV(1);
			}
		},

		channelDown: function() {
			if (this.playbackMetadata.type == "service") {
				this.playNextPrevServiceTV(-1);
			}
		},

		play: function() {
			if (this.playbackMetadata.type == "vod") {
				if (nbPlayer.isPaused()) {
					$nbPlayer.play();
				}
			}
		}, 

		pause: function() {
			if (this.playbackMetadata.type == "vod") {
				if (!nbPlayer.isPaused()) {
					$nbPlayer.pause();
				}
			}
		}, 

		playPause: function() {
			if (this.playbackMetadata.type == "vod") {
				if (nbPlayer.isPaused()) {
					$nbPlayer.play();
				} else {
					$nbPlayer.pause();
				}
			}
		},

		/**
		 * @inheritdoc Scene#create
		 */
		create: function() {
			return $('#scene-home');
		}, 

		setBouquetsContent: function(data) {
			var self = this;
			var htmlRow = "";
			
			$("#tvChannelsRow").addClass("hidden");
			$("#tvChannelsRow").empty();
			if (data.length >= 1) {
				var tvChannels = data[0];
				
				if (tvChannels.items.length > 0) {
					htmlRow = this.getHTMLRowChannel(tvChannels, tvChannels.name, false);
					$("#tvChannelsRow").html(htmlRow);
					$("#tvChannelsRow").removeClass("hidden");
				}
			}
			
			// set favorites if needed
			this.setFavoritesRow();
			
			//$("#channelCategoryGroup").addClass("hidden");
			//$("#channelCategoryGroup").empty();
			if (data.length > 1) {
				//$("#channelCategoryGroup").removeClass("hidden");
				htmlRow = "";
				data.forEach(function(bouquet, index, array) {
					if (index > 0 && bouquet.items.length > 0) {
						htmlRow += self.getHTMLRowChannel(bouquet, bouquet.name, true);
					}
				});

				//$("#channelCategoryGroup").append(htmlRow);
				$(htmlRow).insertAfter("#favoritesRow");
			}

			// set first focusable item
			this.$firstFocusableItem = this.channelsGrid.find(".channels-div .focusable").first();
			
			App.notification(__("Scene_Home"));
			Focus.to(this.$firstFocusableItem); 

			if (this.firstLaunch) { // play first item when app data is loaded
				this.onEnter(Focus.focused, []);
			}
		},

		setCatchupsContent: function(data) {
			console.log(data);
			if (data.length > 0) {

				var cells = "";

				data.forEach(function(catchup, index, array) {
					if (catchup.events != null && catchup.events.length > 0) {
						cells += '<div class="channel-video focusable" data-id="' + catchup.epgStreamId + '" data-type="catchup">'
							+ '<img src="' + catchup.img + '" alt="">'
							+ '</div>';
					}
				});

				var htmlRow = '<div class="col-sm-12 channels-div">'
				+ '<h4 class="heading">' + __("MenuCatchups") + '</h4>'
				+ '<div class="horizontal-slide row-catchups">'
				+ cells
				+ '</div>'
				+ '<div class="horizontal-slide row-catchup-dates hidden"></div>'
				+ '<div class="horizontal-slide row-catchup-events hidden"></div>'
				'</div>';

				$("#catchupsRow").html(htmlRow);
				$("#catchupsRow").removeClass("hidden");
			} else {
				$("#catchupsRow").addClass("hidden");
			}
		},

		setCatchupsRecordedContent: function(data) {
			if (data.length > 0) {

				var cells = "";

				data.forEach(function(catchup, index, array) {
					cells += '<div class="channel-video catchup-recorded focusable" data-id="' + catchup.event.id + '" data-event-id="' + catchup.event.id + '" data-type="catchup-event">'
						+ '<div class="catchup-recorded-container">'
						+ '<div class="no-padding"><img src="' + catchup.event.imageUrl + '" data-placeholder="' + catchup.image + '" alt=""></div>'
						+ '<span>' + catchup.event.name + '</span>'
						+ '<span>' + getDateFormatted(catchup.event.startDate, false) + ' ' + getDateFormatted(catchup.event.startDate, true) + ' - ' + getDateFormatted(catchup.event.endDate, true)  + '</span></div>'
						+ '</div>';
				});

				var minutesUsed = AppData.getCatchupRecordingsMinutesUsed();
				var minutesLimit = CONFIG.app.catchupRecordingHoursLimit * 60;
				var percentage = (minutesUsed / (minutesLimit)) * 100;
				percentage = percentage < 0 ? 0 : (percentage > 100 ? 100 : percentage);
				var availableText = __("CatchupTimeAvailable")
				.replaceAll("%s", minutesToTimeString(minutesLimit - minutesUsed))
				.replaceAll("%dhs", minutesToTimeString(minutesLimit));
				
				var htmlRow = '<div class="col-sm-12 channels-div">'
				+ '<h4 class="heading">' + __("CatchupRecordingTitle") + '</h4>'
				
				+ '<div class="catchup-record-info">'
				+ '<div class="catchup-record-available">'
				+ '<div class="catchup-record-used" style="width: ' + percentage + '%"></div>'
				+ '</div>'
				+ '<h3>' + availableText + '</h3></div>'

				+ '<div class="horizontal-slide row-catchups">'
				+ cells
				+ '</div>'
				'</div>';

				$("#catchupRecordingRow").html(htmlRow);
				$("#catchupRecordingRow").removeClass("hidden");

				addImgPlaceholder($("#catchupRecordingRow").find("img"));
				//addImgErrorEvent($("#catchupRecordingRow").find("img"));
			} else {
				$("#catchupRecordingRow").addClass("hidden");
			}
		},

		openCatchupCell: function(catchup) {
			// prepare dates
			var dates = [];
			var justDate = "";
			catchup.events.forEach(function(event, index, array) { 
				justDate = event.startDate.local().format('YYYY-MM-DD');
				if (dates.indexOf(justDate) < 0) {
					dates.push(justDate);
				}
			});

			dates.sort(function (a, b) {
				a = moment(a.startDate).utc(true);
				b = moment(b.startDate).utc(true);
                return a.startDate != null ? ((a.startDate > b.startDate) ? 1 : ((a.startDate < b.startDate) ? -1 : 0)) : 0;
            });

			var cells = '<div class="channel-video focusable" data-id="' + catchup.epgStreamId + '" data-type="catchup" data-back="true">'
					+ '<img src="' + catchup.img + '" alt="">'
					+ '</div>';

			dates.forEach(function(dateItem, index, array){
				cells += '<div class="channel-video focusable" data-id="' + catchup.epgStreamId + '" data-date="' + dateItem + '" data-type="catchup-date">'
					+ '<div><span>' + getDateFormatted(moment(dateItem)) + '</span></div>'
					+ '</div>';
			});

			$("#catchupsRow").find(".row-catchups:first").addClass("hidden");
			var $rowCatchupDates = $("#catchupsRow").find(".row-catchup-dates:first");
			$rowCatchupDates.removeClass("hidden");
			$rowCatchupDates.html(cells);

			// focus
			var $focusTo = $rowCatchupDates.find(".focusable:first");
			Focus.to($focusTo);
			$focusTo.focus();
		},

		openCatchupDate: function(catchup, dateString) {
			var events = catchup.events.filter(function(event) {
				return event.startDate.local().format("YYYY-MM-DD") == dateString;
			});

			var cells = '<div class="channel-video focusable" data-id="' + catchup.epgStreamId + '" data-type="catchup" data-back="true">'
					+ '<img src="' + catchup.img + '" alt="">'
					+ '</div>'
					+ '<div class="channel-video focusable" data-id="' + catchup.epgStreamId + '" data-date="' + dateString + '" data-type="catchup-date" data-back="true">'
					+ '<div><span>' + getDateFormatted(moment(dateString)) + '</span></div>'
					+ '</div>';

			events.forEach(function(event, index, array) {
				cells += '<div class="channel-video focusable" data-id="' + event.eventId + '" data-group="' + catchup.epgStreamId + '" data-type="catchup-event">'
					+ '<div><span>' + event.name + '</span><span>' + getDateFormatted(event.startDate, true) + ' - ' + getDateFormatted(event.endDate, true)  + '</span></div>'
					+ '</div>';
			});

			$("#catchupsRow").find(".row-catchup-dates:first").addClass("hidden");
			var $rowCatchupEvents = $("#catchupsRow").find(".row-catchup-events:first");
			$rowCatchupEvents.removeClass("hidden");
			$rowCatchupEvents.html(cells);

			// focus
			var $focusTo = $rowCatchupEvents.find(".focusable[data-date='" + dateString + "']:first");
			Focus.to($focusTo);
			$focusTo.focus();
		},

		setVODContent: function(categories) {
			var vods = AppData.getVodRecommended();

			if (vods.length > 0) {
				var htmlRow = this.getHTMLRowVOD(vods, __("MenuMovies"), -1, (CONFIG.app.production ? false : true));
				$("#vodRow").html(htmlRow);
				$("#vodRow").removeClass("hidden");
			} else {
				$("#vodRow").addClass("hidden");
			}
			VOD.draw(categories);
		},

		getHTMLRowChannel: function(row, title, isBouquet) {
			var html = '<div class="col-sm-12 channels-div" data-description="' + row.description + '">'
			+ '<h4 class="heading">' + title + '</h4>'
			+ '<div class="horizontal-slide">';
			
			var style = "";
			row.items.forEach(function(channel){
				style = "";
				if (channel.backgroundColor != null && typeof channel.backgroundColor != 'undefined') {
					style = " background-color: #" + channel.backgroundColor;
				}
				html += '<div class="channel-video focusable" data-id="' + channel.id + '" data-type="service" style="' + style + '">'
					+ '<img src="' + channel.img + '" onerror="imgOnError(this)" alt="">'
					+ '</div>';
			});
			html += '</div>'
				+ '</div>';

			if (isBouquet) {
				html = "<div class='row div-bouquet'>" + html + "</div>";
			}

			return html;
		},

		getHTMLRowVOD: function(vods, title, idCategory, allOption) {
			if (vods.length == 0) {
				return "";
			}
			
			var html = '<div class="col-sm-12 channels-div">'
			+ '<h4 class="heading">' + title + '</h4>'
			+ '<div class="horizontal-slide">';

			//all movies item
			if (allOption) {
				html += '<div class="channel-video vod-list vod-video focusable" data-id="0" data-type="vod">'
				+ '<div class="vod-all-item"><i class="fa fa-film" aria-hidden="true"></i><span>' + __("MoviesAllVod") + '</span></div>'
				+ '</div>';
			}

			vods.forEach(function(vod){
				html += '<div class="channel-video vod-list focusable" data-id="' + vod.id + '" data-category-id="' + idCategory + '" data-type="vod">'
					+ '<img src="' + vod.posterListURL + '" onerror="imgOnError(this)" alt="">'
					+ '</div>';
			});
			html += '</div>'
				+ '</div>';

			return html;
		},

		playContent: function(type, id, url, item, reset) {
			if (type == this.playbackMetadata.type && id == this.playbackMetadata.id && !this.firstLaunch && !this.forcePlayback
				|| ((this.playbackMetadata.item && item.isSeries && this.playbackMetadata.item.isSeries && this.playbackMetadata.item.currentEpisodeId == item.currentEpisodeId))) {
				try {
					nbPlayer.requestFullscreen();
				} catch(e){}
				return;
			}

			this.forcePlayback = false;
			this.NBPLAYER_RETRY_AFTER_ERROR = true;
			this.resetNbPlayerRetryTimeout(typeof reset != 'undefined' && reset == true);

			if (!nbPlayer.isPaused() && this.playbackMetadata.type == 'vod') {
				var currentTime = parseInt($nbPlayer.currentTime());
				User.setVideoHistoryFor({type: this.playbackMetadata.type, id: this.playbackMetadata.id, time: currentTime});
			}

			nbPlayer.playContent(type, url);
			
			if (!nbPlayerIsFullscreen()) {
				$nbPlayer.userActive(false);
			}
			
			this.playbackMetadata = { type: type, id: id, url: url, item: item };

			var channelNameText = "";
			var playerTitle1Text = "";
			var playerTime1Text = "";
			var playerTitle2Text = "";
			var playerTime2Text = "";
			var srcItemImage = "";
			var srcPlaceholder = "";
			var $playerImage = $nbPlayerItemImage.find("img:first");

			if (type == "service") {
				$(".vjs-play-control ").hide();

				channelNameText = item.lcn + " | " + item.name;
				srcItemImage = item.img;
				srcPlaceholder = item.img;
				var liveEvent = AppData.getLiveEvent(item);
				if (liveEvent != null) {
					var nextEvent = AppData.getNextEvent(item, liveEvent);
					$("#nowEventLabel").html(getStringDate(liveEvent.startDate, "HH:mm") + ": " + (liveEvent.languages.length > 0 ? liveEvent.languages[0].title : ""));
					$("#nextEventLabel").html(getStringDate(nextEvent.startDate, "HH:mm") + ": " + (nextEvent.languages.length > 0 ? nextEvent.languages[0].title : ""));
					
					playerTitle1Text = (__("EPGAtThisTime") + ": ") + (liveEvent.languages.length > 0 ? liveEvent.languages[0].title : "");
					playerTime1Text = getStringDate(liveEvent.startDate, "HH:mm") + " - " + getStringDate(liveEvent.endDate, "HH:mm");
					playerTitle2Text = (__("EPGNext") + ": ") + (nextEvent.languages.length > 0 ? nextEvent.languages[0].title : "");
					playerTime2Text = getStringDate(nextEvent.startDate, "HH:mm") + " - " + getStringDate(nextEvent.endDate, "HH:mm");
					srcItemImage = liveEvent.imageUrl;
				} 
			} else if (type == "catchup-event") {
				var group = AppData.getCatchupGroup(item.catchupGroupId);
				channelNameText = group.lcn + " | " + group.name;
				
				playerTitle1Text = item.name;
				playerTime1Text = getStringDate(item.startDate, "HH:mm") + " - " + getStringDate(item.endDate, "HH:mm");
				srcItemImage = item.imageUrl;
				srcPlaceholder = group.img;
			} else if (type == "vod") {
				var showNext = false;
				playerTitle1Text = item.name;

				if (item.isSeries) {
					var season = item.seasons.filter(function(season) { return season.id == item.currentSeasonId });
					if (season.length > 0) {
						season = season[0];
						var episode = season.episodes.filter(function(episode) { return episode.id == item.currentEpisodeId });
						if (episode.length > 0) {
							playerTitle1Text += " - " + episode[0].name;
						}
					}

					showNext = AppData.getNextEpisode(item, item.currentSeasonId, item.currentEpisodeId) != null;
				}
				srcItemImage = item.extraImageURL;
				srcPlaceholder = null;
				$nbPlayerItemImage.attr("style", "visibility: hidden");

				nbPlayer.setVODData(playerTitle1Text, showNext);
			}

			$nbPlayerChannel.html(channelNameText);
			$nbPlayerTitle1.html(playerTitle1Text);
			$nbPlayerTime1.html(playerTime1Text);
			$nbPlayerTitle2.html(playerTitle2Text);
			$nbPlayerTime2.html(playerTime2Text);

			if (type != "vod") {
				$playerImage.loadImage(srcItemImage, srcPlaceholder);
				$nbPlayerItemImage.attr("style", "visibility: visible");
			}

			if (nbPlayerAreControslActive()) {
				Focus.to($nbPlayerFullscreenButton);
			}

			var autoplay = true;
			if (this.autoSeek && this.lastPlaybackTime > 0) {
				$nbPlayer.currentTime(this.lastPlaybackTime);
				this.autoSeek = false;
				this.lastPlaybackTime = 0;
			} else if (type == 'vod') {
				var timeResume = User.getVideoHistoryFor(type, id);
				if (timeResume > 0) {
					if (nbPlayerIsFullscreen()) {
						this.exitPlayerFullscreen();
					}
					this.$el.showAlertConfirm(__("MoviesContinuePlayback"), "MoviesContinuePlayback", __("MoviesContinuePlaybackYes"), __("MoviesContinuePlaybackNo"), "ok");
					autoplay = false;
				} else {
					try {
						nbPlayer.requestFullscreen();
					} catch(e){}
				}
			}

			if (autoplay) {
				$nbPlayer.play();
			} else {
				$nbPlayer.pause();
			}

			// handle errors
			var self = this;
			$nbPlayer.on('error', function(e) {
				console.log("NBPlayer error: ");
				console.log(e);

				if (self.NBPLAYER_RETRY_AFTER_ERROR) {
					self.retryPlayCurrentContent(e);
				}
			});

			$nbPlayer.on('timeupdate', function(event){
				var currentTime = parseInt($nbPlayer.currentTime());

				if (!nbPlayer.isPaused() && parseInt(self.lastPlaybackTime) == currentTime) {
					return;
				}
				
				//console.log("video is playing (timeupdate) " + currentTime);
				self.lastPlaybackTime = $nbPlayer.currentTime();

				if (currentTime % 15 == 0) {
					if (self.playbackMetadata.type == "vod") {
						User.setVideoHistoryFor({type: self.playbackMetadata.type, id: self.playbackMetadata.id, time: currentTime});
					}
				}
			});

			$nbPlayer.on('ended', function() {
				console.log("NBPlayer playback ended");
				User.setVideoHistoryFor({type: self.playbackMetadata.type, id: self.playbackMetadata.id, time: 0});
				nbPlayerResetContent(true);
				Focus.to($("#divVideoContainer"));
			});
		},

		playNextPrevServiceTV: function(next) {
			var currentService = AppData.getServiceTV(this.playbackMetadata.id);

			var newChannel = AppData.getNextPrevServiceTV(currentService, next);

			if (typeof newChannel !== 'undefined' && newChannel != null) {
				console.log("Play channel: " + newChannel.lcn);
				this.playContent("service", newChannel.id, newChannel.url, newChannel);

				this.focusServiceTV(newChannel, !nbPlayerIsFullscreen());

				if (nbPlayerIsFullscreen()) {
					$nbPlayer.userActive(true);
				}
			}
		},

		focusServiceTV: function(serviceTV, updateFocus) {

			if (updateFocus) {
				var $newFocus = $("#tvChannelsRow").find("[data-id='" + serviceTV.id + "']");
				if ($newFocus.length > 0) {
					Focus.to($newFocus);
					$newFocus.parent().focus();
				}
			}

			$(".info-epg").addClass("hidden");
			$(".info-services").removeClass("hidden");
			$("#menuTitle").addClass("hidden");
			$("#channelInfoDiv").removeClass("hidden");
			
			$("#channelLcnLabel").html(serviceTV.lcn);
			$("#channelNameLabel").html(serviceTV.name);
			$("#nowEventLabel").html(__("EPGNoInformation"));
			$("#nextEventLabel").html(__("EPGNoInformation"));

			var liveEvent = AppData.getLiveEvent(serviceTV);

			if (liveEvent != null) {
				var nextEvent = AppData.getNextEvent(serviceTV, liveEvent);
				$("#nowEventLabel").html(getStringDate(liveEvent.startDate, "HH:mm") + ": " + (liveEvent.languages.length > 0 ? liveEvent.languages[0].title : ""));
				$("#nextEventLabel").html(getStringDate(nextEvent.startDate, "HH:mm") + ": " + (nextEvent.languages.length > 0 ? nextEvent.languages[0].title : ""));
			}
		},

		playPrevServiceTV: function() {

		},

		getNearBottomItem: function(near) {
			if (near > 100) {
				return this.$videoContainer;
			}
			var itemByPoint = document.elementFromPoint(40, (this.channelsGrid.offset().top + 40) + near);

			var $newFocus = $(itemByPoint).find(".focusable:first");
			if ($newFocus.length == 0) {
				$newFocus = $(itemByPoint).closest(".focusable");

				if ($newFocus.length == 0) {
					return this.getNearBottomItem(near + 20);
				}
			}
			return $newFocus;
		},

		managePlayerEnter: function($el) {
			if (!nbPlayerAreControslActive()) {
				nbPlayer.showControls();
				$nbPlayerFullscreenButton.addClass("focusable");

				if (this.playbackMetadata.type == "vod") {
					Focus.to($(".vjs-control-bar .nb-vjs-play-pause-button"));
				} else {
					Focus.to($nbPlayerFullscreenButton);
				}
			} else {

				if (this.playbackMetadata.type == "vod") {

					if (nbPlayer.vodPlayerGetControlType($el) != nbPlayer.vodControlsEnum.trackItem) {
						nbPlayer.closeTracks();
					}
					
					switch (nbPlayer.vodPlayerGetControlType($el)) {
						case nbPlayer.vodControlsEnum.seekbar:
							nbPlayerConfirmSeekTimeIndicator();
							break;
						case nbPlayer.vodControlsEnum.play:
							if (nbPlayer.isPaused()) {
								$nbPlayer.play();
							} else {
								$nbPlayer.pause();
							}
							break;
						case nbPlayer.vodControlsEnum.next:
							
							var next = AppData.getNextEpisode(this.playbackMetadata.item, this.playbackMetadata.item.currentSeasonId, this.playbackMetadata.item.currentEpisodeId);
							if (next != null) {
								this.playEpisode(this.playbackMetadata.item.currentVodObjectId, next);
							}

							break;
						case nbPlayer.vodControlsEnum.tracks:
							var $first = nbPlayer.openTracks();
							if ($first.length > 0) {
								Focus.to($first);
							}
							break;
						case nbPlayer.vodControlsEnum.back:
							this.exitPlayerFullscreen();
							break;
						case nbPlayer.vodControlsEnum.trackItem:
							nbPlayer.selectTrack($el);
							break;
					}

					if (nbPlayerGetControlType($el) == nbControlsEnum.seekbar) {
						nbPlayerConfirmSeekTimeIndicator();
					}
				} else {
					switch (nbPlayerGetControlType($el)) {
						case nbControlsEnum.fullscreen:
							this.exitPlayerFullscreen();
							break;
						case nbControlsEnum.seekbar:
							nbPlayerConfirmSeekTimeIndicator();
							break;
						case nbControlsEnum.audio:
							nbPlayerShowAudioTracks();
							break;
						case nbControlsEnum.text:
							nbPlayerShowTextTracks();
							break;
						case nbControlsEnum.trackItem:
							if ($el.closest(".vjs-audio-button").length > 0) {
								nbPlayerSetAudioTrack($el.index());
							} else {
								nbPlayerSetTextTrack($el.index());
							}
							break;
					}
				}

			
			}
		},

		managePlayerNavigation: function(direction) {
			var $current = Focus.focused;

			var $nbPlayerControlsBar = $(".vjs-control-bar");
			var $focusContainer = Focus.focused.closest("div[class^='nb-vjs']");

			if ($focusContainer.length > 0) {
				var $focusTo = [];

				var $nbVjsList = [];

				if ($current.hasClass("vjs-play-progress")) {
					if (direction == "left") {
						nbPlayerSeekTimeIndicator(-1);
					} else if (direction == "right") {
						nbPlayerSeekTimeIndicator(1);
					} else if (direction == "up") {
						nbPlayerCancelSeekTimeIndicator();
						var $nbPlayButton = $nbPlayerControlsBar.find(".nb-vjs-play-pause-button");

						if ($nbPlayButton.is(":visible")) {
							$focusTo = $nbPlayButton;
						} else {
							$focusTo = $nbPlayerControlsBar.find(".nb-vjs-back-button");
						}
					}
				} else if ($current.hasClass("nb-vjs-track-item")) {
					$focusTo = nbPlayer.navigateTracks($current, direction);
				} else if ($current.hasClass("nb-vjs-play-pause-button")) {
					if (direction == "right" || direction == "down") {
						$focusTo = $nbPlayerControlsBar.find(".nb-vjs-vod-seek .focusable");
					} else if (direction == "up") {
						$focusTo = $nbPlayerControlsBar.find(".nb-vjs-back-button");
					}
				} else if ($current.closest("tr").index() == 0 && (direction == "down")) {
					var $nbPlayButton = $nbPlayerControlsBar.find(".nb-vjs-play-pause-button");

					if ($nbPlayButton.is(":visible")) {
						$focusTo = $nbPlayButton;
					} else {
						$focusTo = $nbPlayerControlsBar.find(".nb-vjs-vod-seek .focusable");
					}
				} else {
					if (direction == "left") {
						$nbVjsList = $current.closest("td").prevAll("td:visible");
					} else if (direction == "right") {
						$nbVjsList = $current.closest("td").nextAll("td:visible");
					} else if (direction == "up") {
						$current.closest("td").parent().prevAll("tr:visible");
					}
	
					if ($nbVjsList != null && $nbVjsList.length > 0) {
						$nbVjsList.each(function(idx, item) { 
							var focusable = $(item).find(".focusable:first:visible");
							if (focusable.length > 0) {
								$focusTo = focusable;
								return false;
							}
						});
					}
				} 

				if ($focusTo.length > 0) {

					$(".nb-vjs-tooltip").hide();
					if ($focusTo.find(".nb-vjs-tooltip").length > 0) {
						$focusTo.find(".nb-vjs-tooltip").show();
					}
					Focus.to($focusTo);
				}
				nbPlayer.resetAutoHideControls();
				return;
			}


			switch(nbPlayerGetControlType($current)) {
				case nbControlsEnum.fullscreen: 
					
					if (direction == "up" && $nbPlayerSeekbar.is(":visible")) {
						Focus.to($nbPlayerSeekbar);
					} else if (direction == "left") {
						if ($nbPlayerAudioTracksButton.is(":visible")) {
							Focus.to($nbPlayerAudioTracksButton);
						} else if ($nbPlayerTextTracksButton.is(":visible")) {
							Focus.to($nbPlayerTextTracksButton);
						}
					}

					break;
				case nbControlsEnum.seekbar:
					if (direction == "down" && $nbPlayerFullscreenButton.is(":visible")) {
						nbPlayerCancelSeekTimeIndicator();
						Focus.to($nbPlayerFullscreenButton);
					} else if (direction == "left") {
						nbPlayerSeekTimeIndicator(-1);
					} else if (direction == "right") {
						nbPlayerSeekTimeIndicator(1);
					}
					break;
				case nbControlsEnum.audio:
					if (direction == "up") {
						nbPlayerShowAudioTracks();
					} else if (direction == "right") {
						Focus.to($nbPlayerFullscreenButton);
					} else if (direction == "left") {
						if ($nbPlayerTextTracksButton.is(":visible")) {
							Focus.to($nbPlayerTextTracksButton);
						}
					}
					break;
				case nbControlsEnum.text:
					if (direction == "up") {
						nbPlayerShowTextTracks();
					} else if (direction == "right") {
						if ($nbPlayerAudioTracksButton.is(":visible")) {
							Focus.to($nbPlayerAudioTracksButton);
						} else {
							Focus.to($nbPlayerFullscreenButton);
						}
					}
					break;
				case nbControlsEnum.trackItem:
					if (direction == "down") {
						if ($current.next("li").length > 0) {
							Focus.to($current.next("li"));
						} else {
							if ($current.closest(".vjs-audio-button").length > 0) {
								$nbPlayerAudioTracksButton.find(".vjs-menu").displayNone();
								Focus.to($nbPlayerAudioTracksButton);
							} else {
								$nbPlayerTextTracksButton.find(".vjs-menu").displayNone();
								Focus.to($nbPlayerTextTracksButton);
							}
						}
					} else if (direction == "up" && $current.prev("li").length > 0) {
						Focus.to($current.prev("li"));
					} else if (direction == "left") {
						nbPlayerSeekTimeIndicator(-1);
					} else if (direction == "right") {
						nbPlayerSeekTimeIndicator(1);
					}
					break;
			}
			nbPlayer.resetAutoHideControls();
		},

		exitPlayerFullscreen: function() {
			nbPlayerExitFullscreen();
			nbPlayerCancelSeekTimeIndicator();

			if (VODDetail.isShowed()) {
				VODDetail.setFocus();
			} else {
				Focus.to(this.$videoContainer);
			}
		},

		setMenuTitle: function(title) {
			$("#channelInfoDiv").addClass("hidden");
			$("#menuTitle").removeClass("hidden");
			$("#menuSelectedLabel").text(title);
		}, 

		setFavoritesRow: function() {
			var $favoritesRow = $("#favoritesRow");
			var favorites = AppData.getServicesTVFavoritedAsChannels();
			var $html = "";

			if (favorites != null) {
				$html = this.getHTMLRowChannel(favorites, favorites.name);
				$favoritesRow.html($html);
				$favoritesRow.removeClass("hidden");
			} else if ($favoritesRow.length > 0) {
				$favoritesRow.empty();
				$favoritesRow.addClass("hidden");
			}
		},

		retryPlayCurrentContent: function(error) {
			if (!this.NBPLAYER_RETRY_AFTER_ERROR) { return; }

			var self = this;
			var delay = 0;
			if (this.nbPlayerAttempts <= 6 ) {
				delay = 1;
			} else if (this.nbPlayerAttempts > 6 && this.nbPlayerAttempts <= 10) {
				delay = 10;
			} else {
				delay = 20;
			}

			if (this.nbPlayerRetryTimeout == null && !this.verifyingUserSession) {
				var lastTime = this.lastPlaybackTime;
				nbPlayerResetContent();
				$("#mainVideo").addClass("vjs-waiting");
				if (this.nbPlayerAttempts % 3 == 0) {
					this.verifyUserSession(false, function(success) {
						if (success) {
							self.lastPlaybackTime = lastTime;
							self.retryPlayCurrentContentWithDelay(delay);
						} else {
							self.licenseEnded();
						}
					});
				} else {
					self.lastPlaybackTime = lastTime;
					this.retryPlayCurrentContentWithDelay(delay);
				}
			}

		},

		licenseEnded: function() {
			if (nbPlayerIsFullscreen()) {
				this.exitPlayerFullscreen();
			}
			this.NBPLAYER_RETRY_AFTER_ERROR = false;
			this.$el.showAlertConfirm(__("SettingsLicenseUsedContinueHere"), "license_already_in_use", null, null, null);
		}, 

		activateLicense: function(activate) {
			var self = this;
			if (activate) {
				this.verifyUserSession(true, function(success) {
					if (success && self.playbackMetadata != null) {
						self.playContent(self.playbackMetadata.type,self.playbackMetadata.item.id,self.playbackMetadata.item.url, self.playbackMetadata.item);
					} else {
						nbPlayerResetContent();
					}
				});
			}
		},

		retryPlayCurrentContentWithDelay: function(delay) {
			var self = this;
			
			$("#mainVideo").addClass("vjs-waiting");
			var lastTime = self.lastPlaybackTime;
			this.nbPlayerRetryTimeout = setTimeout(function(){
		
				//self.resetNbPlayerRetryTimeout(false);

				if (self.playbackMetadata.type == "service") {
					console.log("NBPlayer retry playback (after " + delay + " seconds) attempt " + self.nbPlayerAttempts);
					/*$nbPlayer.src({
						type: 'application/x-mpegURL',
						src: self.playbackMetadata.url
					});
					*/
					self.forcePlayback = true;
					self.playContent(self.playbackMetadata.type, self.playbackMetadata.id, self.playbackMetadata.url, self.playbackMetadata.item, true);
					//$nbPlayer.play();
				} else if (self.playbackMetadata.type == "vod") {

					self.autoSeek = true;
					/*console.log("NBPlayer retry playback (after " + delay + " seconds) attempt " + self.nbPlayerAttempts);
					$nbPlayer.src({
						type: 'application/x-mpegURL',
						src: self.playbackMetadata.url
					});*/
					self.forcePlayback = true;
					self.lastPlaybackTime = lastTime;
					self.playContent(self.playbackMetadata.type, self.playbackMetadata.id, self.playbackMetadata.url, self.playbackMetadata.item, true);
					/*if (self.autoSeek && self.lastPlaybackTime > 0) {
						$nbPlayer.currentTime(self.lastPlaybackTime);
						self.autoSeek = false;
						self.lastPlaybackTime = 0;
					}*/
					//$nbPlayer.play();
				}
				self.nbPlayerAttempts++;
			}, delay * 1000);
		},

		resetNbPlayerRetryTimeout: function(resetAttempts) {
			if (!this.NBPLAYER_RETRY_AFTER_ERROR) { return; }

			if (resetAttempts) {
				this.nbPlayerAttempts = 0;
			}
			if (this.nbPlayerRetryTimeout != null) {
				clearTimeout(this.nbPlayerRetryTimeout);
				this.nbPlayerRetryTimeout = null;
			}
		},

		verifyUserSession: function(forceActivate, callback) {
			if (User.hasCredentialsLicense()) {
				var self = this;
				var license = User.getLicense();
				var pin = User.getLicensePin();
				this.verifyingUserSession = true;
				cv.activateStreamingLicense(license, pin, !forceActivate, function() { 
					self.verifyingUserSession = false;
					callback(true);
				}, function() {
					self.verifyingUserSession = false;
					callback(false);
				});
			}
		},

		playEpisode: function(vodId, episodeObject) {
			var vodObject = AppData.getVodObject(vodId);

			if (vodObject != null) {
				var item = JSON.parse(JSON.stringify(vodObject));
				var self = this;
	
				AppData.getTopLevelVodM3u8Url(episodeObject.id, function(url) {
					console.log("Play vod with URL: " + url);
					if (url != null && url.length > 0) {
						item.currentVodObjectId = vodId;
						item.currentSeasonId = episodeObject.seasonId;
						item.currentEpisodeId = episodeObject.id;
						self.playContent("vod", episodeObject.id, url, item);
					}
				});
			}
		}
		
	});

	return Scene_Home;

})(Scene);