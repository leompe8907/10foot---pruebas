var $nbPlayer;
var nbPlayerCurrentTimeIndicator = 0;

var nbControlsEnum = {
    fullscreen: "vjs-fullscreen-control",
    seekbar: "vjs-play-progress",
    audio: "vjs-audio-button",
    text: "vjs-subs-caps-button",
    trackItem: "vjs-menu-item"
}

$(function () {

    $nbPlayer = videojs('mainVideo');

    // set initial player dimensions based on screen height
    var height = $(window).height() * 0.3;
    var width = (16/9 - 1) * height + height;
    $("#divVideoContainer").width(width);
    $("#divVideoContainer").height(height);
    $("#divVideoContainer").parent().height(height + 5);
    $("#divVideoContainer").parent().parent().height(height + 5);
    $("#mainVideo").css({"width": "100%", "height": "100%"});

    $nbPlayer.options_.inactivityTimeout = 0;
    
    $nbControlBar = $($nbPlayer.el_).find(".vjs-control-bar");
    $nbControlBar.prepend("<div class='vjs-control vjs-nb-item-image radius-5'><div style='width: 8em; height: 6em' class='radius-5'><img src='' class='radius-5' /></div></div><div class='vjs-control vjs-nb-title vjs-nb-channel'></div>");
    $nbControlBar.append("<div class='uicontrols-break'></div>");
    $nbControlBar.append('<div class="vjs-control vjs-nb-title vjs-nb-title-1"></div>');
    $nbControlBar.append('<div class="vjs-control vjs-nb-time vjs-nb-time-1"></div>');
    $nbControlBar.append("<div class='uicontrols-break'></div>");
    $nbControlBar.append('<div class="vjs-control vjs-nb-title vjs-nb-title-2"></div>');
    $nbControlBar.append('<div class="vjs-control vjs-nb-time vjs-nb-time-2"></div>');

    $nbPlayerFullscreenButton = $($nbPlayer.el_).find(".vjs-fullscreen-control");
    $nbPlayerSeekbar = $($nbPlayer.el_).find(".vjs-play-progress");
    $nbPlayerItemImage = $($nbPlayer.el_).find(".vjs-nb-item-image");
    $nbPlayerChannel = $($nbPlayer.el_).find(".vjs-nb-channel");
    $nbPlayerTitle1 = $($nbPlayer.el_).find(".vjs-nb-title-1");
    $nbPlayerTime1 = $($nbPlayer.el_).find(".vjs-nb-time-1");
    $nbPlayerTitle2 = $($nbPlayer.el_).find(".vjs-nb-title-2");
    $nbPlayerTime2 = $($nbPlayer.el_).find(".vjs-nb-time-2");
    $nbPlayerSeekingButton = $($nbPlayer.el_).find(".vjs-mouse-display");
    $nbPlayerSeekingTooltip = $($nbPlayer.el_).find(".vjs-mouse-display .vjs-time-tooltip");
    $nbPlayerTextTracksButton = $($nbPlayer.el_).find(".vjs-subs-caps-button");
    $nbPlayerAudioTracksButton = $($nbPlayer.el_).find(".vjs-audio-button");
    $nbPlayerAudioList = $nbPlayerAudioTracksButton.find(".vjs-menu");

    $(".vjs-menu-item").addClass("focusable");
    $nbPlayerFullscreenButton.addClass("focusable");
    $nbPlayerTextTracksButton.addClass("focusable");
    $nbPlayerAudioTracksButton.addClass("focusable");
    $nbPlayerSeekbar.addClass("focusable");
    $nbControlBar.addClass(".hide-controls");

    $nbPlayer.on('fullscreenchange', function() {
        setTimeout(function() {
            if (nbPlayerIsFullscreen()) {
                $($nbPlayer.el_).find(".video-cover").hide();
            } else {
                $($nbPlayer.el_).find(".video-cover").show();
                nbPlayer.hideControls();
            }
        }, 800);
    });

    $($nbPlayer.el_).parent().prepend('<div class="video-cover"></div>');

    nbPlayer.init();
});

jQuery.fn.extend({

    displayBlock: function() {
      this.css({'display': 'block'});
    },

    displayNone: function() {
      this.css({'display': 'none'});
    }
  
});

function nbShowHomeIfNeeded(force) {
    if (!Router.isSceneActive("home")) {
        if (force || $nbPlayer.isFullscreen_) {
            Router.getScene("home").$el.show();
            Router.getScene("home").$el.focus();
        } else {
            Router.getScene("home").$el.hide();
        }
    }
}

function nbPlayerExitFullscreen() {
    $nbPlayer.exitFullscreen();
    nbPlayer.hideControls();
}

function nbPlayerAreControslActive() {
    return $nbPlayer.userActive();
}

function nbPlayerIsFullscreen() {
    return $nbPlayer.isFullscreen_;
}

function nbPlayerGetControlType($object) {
    if ($object.hasClass(nbControlsEnum.fullscreen)) {
        return nbControlsEnum.fullscreen;
    } else if ($object.hasClass(nbControlsEnum.seekbar)) {
        return nbControlsEnum.seekbar;
    } else if ($object.hasClass(nbControlsEnum.audio)) {
        return nbControlsEnum.audio;
    } else if ($object.hasClass(nbControlsEnum.text)) {
        return nbControlsEnum.text;
    } else if ($object.hasClass(nbControlsEnum.trackItem)) {
        return nbControlsEnum.trackItem;
    }

    return false;
}

function nbPlayerConfirmSeekTimeIndicator() {
    var gotoTime = $nbPlayer.duration() * ((Number($nbPlayerSeekingButton[0].style.left.replace("%", "")) || 0) / 100);
    $nbPlayer.currentTime(gotoTime);
    $nbPlayerSeekingButton.css({"display": "none"});
    nbPlayerCurrentTimeIndicator = 0;
}

function nbPlayerSeekTimeIndicator(percent) {
    if (nbPlayerCurrentTimeIndicator == 0) {
        nbPlayerCurrentTimeIndicator= ($nbPlayer.currentTime() / $nbPlayer.duration()) * 100;
        $nbPlayerSeekingButton.css({'left': nbPlayerCurrentTimeIndicator + "%"});
    }
    
    $nbPlayerSeekingButton.css({"display": "block"})
    var skipPercent = (Number($(".vjs-mouse-display")[0].style.left.replace("%", "")) || 0) + percent;

    if (skipPercent >= 0 && skipPercent <= 100) {
        $nbPlayerSeekingButton.css({'left': skipPercent + "%"});
    }
}

function nbPlayerCancelSeekTimeIndicator() {
    $nbPlayerSeekingButton.css({"display": "none"});
    nbPlayerCurrentTimeIndicator = 0;
}

function nbPlayerSetAudioTrack(index) {
    if (index < $nbPlayer.audioTracks().length) {
        $nbPlayer.audioTracks()[index].enabled = true;
    }
}

function nbPlayerSetTextTrack(index) {
    
    var tracks = $nbPlayer.textTracks();

    for (var i = 0; i < tracks.length; i++) {
        tracks[i].mode = 'hidden';
    }

    if (index > 1) {
        $nbPlayer.textTracks()[index - 2].mode = "showing";
    }
}

function nbPlayerShowAudioTracks() {
    $nbPlayerTextTracksButton.find(".vjs-menu").displayNone();
    $nbPlayerAudioTracksButton.find(".vjs-menu").displayBlock();
    $(".vjs-menu-item").addClass("focusable");
    Focus.to($nbPlayerAudioTracksButton.find("li.focusable:last"));
}

function nbPlayerShowTextTracks() {
    $nbPlayerAudioTracksButton.find(".vjs-menu").displayNone();
    $nbPlayerTextTracksButton.find(".vjs-menu").displayBlock();
    $(".vjs-menu-item").addClass("focusable");
    Focus.to($nbPlayerTextTracksButton.find("li.focusable:last"));
}

function nbPlayerResetContent(exitFullscreen) {
    nbPlayer.hideControls();

    if (exitFullscreen && nbPlayerIsFullscreen()) {
        nbPlayerExitFullscreen();
    }

    $nbPlayer.errorDisplay.close(); 
    $nbPlayer.reset();
    $nbPlayer.hasStarted(false);
    $nbPlayer.currentTime(0);   
}

var nbPlayer = {
	name: 'nb-vjs',
    currentType: null,
    vodControlsEnum: null,
    type: {
        vod: "vod",
        service: "service"
    },
    $player: null,
    $controlBar: null,
    $playIcon: null,
    $pauseIcon: null,
    $vodControls: null,
    $vodTracksDiv: null,
    $vodTracksButton: null,
    $nextEpisodeButton: null,
    $nextEpisodeButtonTooltip: null,
    resetDelay: null,
    inactivityTimeout: null,
	init: function(successCallback) {
        this.$player = $nbPlayer;
        this.$controlBar = $(".vjs-control-bar");

        this.vodControlsEnum = {
            seekbar: "vjs-play-progress",
            play: "nb-vjs-play-pause-button",
            next: "nb-vjs-next-button",
            tracks: "nb-vjs-tracks-button",
            back: "nb-vjs-back-button",
            trackItem: "nb-vjs-track-item"
        }

        //init VOD controls
        this.$controlBar.append($("#nbVjsControlsTemplate").html());
        $("#nbVjsControlsTemplate").remove();
        this.$controlBar.find(".vjs-remaining-time").hide();
        this.$vodControls = this.$controlBar.find(".nb-vjs-vod-controls");
        this.$playIcon = this.$vodControls.find(".nb-vjs-play-pause-button svg[data-type='play']");
        this.$pauseIcon = this.$vodControls.find(".nb-vjs-play-pause-button svg[data-type='pause']");
        this.$vodTracksDiv = this.$vodControls.find(".nb-vjs-tracks-div");
        this.$vodTracksButton = this.$vodControls.find(".nb-vjs-tracks-button");
        this.$nextEpisodeButton = this.$vodControls.find(".nb-vjs-next-button");
        this.$nextEpisodeButtonTooltip = this.$vodControls.find(".nb-vjs-next-button-tooltip");

        var self = this;
        this.$player.on("pause", function() {
            self.$pauseIcon.hide();
            self.$playIcon.show();
        })
        
        this.$player.on("play", function() {
            self.$playIcon.hide();
            self.$pauseIcon.show();
        });

        this.$vodControls.find(".nb-vjs-tracks-audio-title").html(__("PlayerTracksAudioTitle"));
        this.$vodControls.find(".nb-vjs-tracks-subtitles-title").html(__("PlayerTracksSubtitlesTitle"));
        this.$nextEpisodeButtonTooltip.html(__("PlayerNextEpisodeTooltip"));
        // general events
        // this.$player.on('loadeddata', function(){
        //     self.playerLoadedData();
        // });
        
        if (successCallback != null && typeof successCallback != 'undefined') {
            successCallback();
        }
	},

    requestFullscreen: function() {
        this.$player.requestFullscreen();
    },

    isPaused: function() {
        return this.$player.paused();
    },

    playContent: function(type, url) {
        var self = this;
        this.currentType = type;
        this.$player.pause();
        this.$player.reset();
        this.$player.src({
            src: url,
            type: 'application/x-mpegURL',
            //src: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            //src: "http://190.171.101.36/AXN/index.m3u8"
            //src: "https://news.cgtn.com/resource/live/english/cgtn-news.m3u8"
            //src: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        });

        this.$player.on('loadeddata', function() {
            self.playerLoadedData();
        });
    },

    playerLoadedData: function() {
        if (this.currentType == this.type.vod) {
            this.showVODControls();
        } else {
            this.showLiveControls();
        }

        //check if has tracks (audio or subtitle) to show button
        if (this.$player.audioTracks().length > 0 || this.$player.textTracks().length > 0) {
            this.$vodTracksButton.show();
        } else {
            this.$vodTracksButton.hide();
        }
    },
    
    showLiveControls: function() {
        //let $bar = $(".vjs-control-bar");
        //this.$controlBar.css({'width': '100%', 'height': '100%', 'background': 'transparent'});
        //this.$controlBar.removeClass("nb-vjs-hide-default-controls-div");
        //$(".vjs-control-bar>div,.vjs-control-bar>button").show();
        
        // this.$controlBar.find(".nb-vjs-vod-seek").append($(".vjs-progress-control"));
        // this.$controlBar.find(".nb-vjs-vod-current-time").html($(".vjs-current-time"));
        // this.$controlBar.find(".nb-vjs-vod-duration").html($(".vjs-duration"));
        this.$controlBar.removeClass("nb-vjs-custom-controls-div");
        this.$controlBar.append($(".vjs-progress-control"));
        this.$controlBar.append($(".vjs-current-time"));
        this.$controlBar.append($(".vjs-duration"));

        this.$controlBar.find(".vjs-fullscreen-control").css({"visibility": "visible"});
        this.$controlBar.find(".vjs-nb-item-image").css({"visibility": "visible"});
        this.$controlBar.find(".vjs-nb-title").css({"visibility": "visible"});
        this.$controlBar.find(".vjs-subs-caps-button").css({"visibility": "visible"});
        this.$controlBar.find(".vjs-audio-button").css({"visibility": "visible"});
        this.$controlBar.find(".vjs-nb-time").css({"visibility": "visible"});
        this.$controlBar.find(".vjs-progress-control").css({"visibility": "hidden"});
        //this.$controlBar.find(".").show();
        
        this.$vodControls.hide();
    },

    showVODControls: function() {
        this.$vodControls.find(".nb-vjs-tracks-audio-title").html(__("PlayerTracksAudioTitle"));
        this.$vodControls.find(".nb-vjs-tracks-subtitles-title").html(__("PlayerTracksSubtitlesTitle"));
        //let $bar = $(".vjs-control-bar");
        //this.$controlBar.css({'width': '100%', 'height': '100%', 'background': 'transparent'});
        this.$controlBar.addClass("nb-vjs-custom-controls-div");
        $(".vjs-control-bar>div,.vjs-control-bar>button").css({"visibility": "hidden"});
        this.$controlBar.find(".vjs-subs-caps-button").css({"visibility": "hidden"});
        this.$controlBar.find(".vjs-audio-button").css({"visibility": "hidden"});
        this.$controlBar.find(".vjs-current-time").css({"visibility": "visible"});
        this.$controlBar.find(".vjs-duration").css({"visibility": "visible"});
        
        this.$controlBar.find(".vjs-progress-control").css({"visibility": "visible"});
        this.$controlBar.find(".nb-vjs-vod-seek").append($(".vjs-progress-control"));
        this.$controlBar.find(".nb-vjs-vod-current-time").html($(".vjs-current-time"));
        this.$controlBar.find(".nb-vjs-vod-duration").html($(".vjs-duration"));
        this.$vodControls.css({"visibility": "visible"});
        this.$vodControls.show();

        this.$vodControls.css({"background": "red"});
    },

    setVODData: function(title, showNext) {
        this.$vodControls.find(".nb-vjs-vod-title").html(title);

        if (showNext) {
            this.$nextEpisodeButton.show();
        } else {
            this.$nextEpisodeButton.hide();
        }
    },

    vodPlayerGetControlType: function($object) {
        if ($object.hasClass(this.vodControlsEnum.seekbar)) {
            return this.vodControlsEnum.seekbar;
        } else if ($object.hasClass(this.vodControlsEnum.play)) {
            return this.vodControlsEnum.play;
        } else if ($object.hasClass(this.vodControlsEnum.next)) {
            return this.vodControlsEnum.next;
        } else if ($object.hasClass(this.vodControlsEnum.tracks)) {
            return this.vodControlsEnum.tracks;
        } else if ($object.hasClass(this.vodControlsEnum.back)) {
            return this.vodControlsEnum.back;
        } else if ($object.hasClass(this.vodControlsEnum.trackItem)) {
            return this.vodControlsEnum.trackItem;
        }
    
        return false;
    },

	openTracks: function() {

        var tracks = "";
        if (this.$player.textTracks().length > 0 || this.$player.audioTracks().length > 0) {
            var maxIndex = this.$player.audioTracks().length > (this.$player.textTracks().length + 1) ? this.$player.audioTracks().length : (this.$player.textTracks().length + 1);
            var subitlesDeactivated = this.$player.textTracks().tracks_.filter(function(track) { return track.mode == "showing" }).length == 0;
            var activated = "";
            var label = "";
    
            for (var i = 0; i < maxIndex ; i++) {
                tracks += "<tr>";

                // audio
                if (i < this.$player.audioTracks().length) {
                    activated = this.$player.audioTracks().tracks_[i].enabled ? "" : "hidden";
                    label = this.$player.audioTracks().tracks_[i].label != null ? this.$player.audioTracks().tracks_[i].label : "";
                    label = label == "" ? __("PlayerTracksUnknown") : label;
                    tracks += "<td class='nb-vjs-track-audio'><span class='focusable nb-vjs-track-item' data-index='" + i + "'> <i class='fa fa-check " + activated + "'></i>" + label + "</span></td>";
                } else {
                    tracks += "<td></td>";
                }

                // subtitles
                if (i == 0 && this.$player.textTracks().length > 0) {
                    activated = subitlesDeactivated ? "" : "hidden";
                    tracks += "<td class='nb-vjs-track-subtitle'><span class='focusable nb-vjs-track-item' data-index='-1'> <i class='fa fa-check " + activated + "'></i>" + __("PlayerSubtitlesDeactivated") + "</span></td>";
                } else if ((i - 1) < this.$player.textTracks().length && this.$player.textTracks().tracks_[i-1] != null) {
                    label = this.$player.textTracks().tracks_[i-1].label != null ? this.$player.textTracks().tracks_[i-1].label : "";
                    label = label == "" ? __("PlayerTracksUnknown") : label;
                    
                    activated = (this.$player.textTracks().tracks_[i-1].mode == "showing") ? "" : "hidden";
                    tracks += "<td class='nb-vjs-track-subtitle'><span class='focusable nb-vjs-track-item' data-index='" + (i-1) + "'> <i class='fa fa-check " + activated + "'></i>" + label + "</span></td>";
                } else {
                    tracks += "<td></td>";
                }

                tracks += "</tr>";
            }
        }

        if (tracks.length > 0) {
            this.$vodTracksDiv.find("table tbody").html(tracks);

            var subtitles = this.$vodTracksDiv.find("table tbody .nb-vjs-track-subtitle");
            if (subtitles.length > 0) {
                this.$vodTracksDiv.find("table .nb-vjs-track-subtitle").show();
                this.$vodTracksDiv.find("table tbody tr").find("td:eq(1)").show();
            } else {
                this.$vodTracksDiv.find("table .nb-vjs-track-subtitle").hide();
                this.$vodTracksDiv.find("table tbody tr").find("td:eq(1)").hide();
            }

            var audios = this.$vodTracksDiv.find("table tbody .nb-vjs-track-audio");
            if (audios.length > 0) {
                this.$vodTracksDiv.find("table .nb-vjs-track-audio").show();
                this.$vodTracksDiv.find("table tbody tr").find("td:eq(0)").show();
            } else {
                this.$vodTracksDiv.find("table .nb-vjs-track-audio").hide();
                this.$vodTracksDiv.find("table tbody tr").find("td:eq(0)").hide();
            }

            this.$vodTracksDiv.show();
            return this.$vodTracksDiv.find("table tbody tr td .focusable:first");
        } else {
            this.$vodTracksDiv.find("table tbody").html("");
            this.$vodTracksDiv.hide();
            this.$vodTracksButton.hide();
            return [];
        }
	},

    closeTracks: function() {
        this.$vodTracksDiv.hide();
    },

    navigateTracks: function($focused, direction) {
        var $focusTo = [];
        switch (direction) {
            case 'right':
                $focusTo = $focused.closest("td").next("td").find(".focusable");
                break;
            case 'left':
                $focusTo = $focused.closest("td").prev("td").find(".focusable");
                break;
            case 'up':
                $focusTo = $focused.closest("tr").prev("tr").find("td").eq($focused.closest("td").index()).find(".focusable");
                break;
            case 'down':
                $focusTo = $focused.closest("tr").next("tr").find("td").eq($focused.closest("td").index()).find(".focusable");
                break;
            default:
                break;
        }

        return $focusTo;
    },

    selectTrack: function($focused) {
        var index = $focused.data("index");

        if ($focused.closest("td").hasClass("nb-vjs-track-subtitle")) {
            this.$player.textTracks().tracks_.forEach(function(track,index) { if(track.mode == "showing") {track.mode = "hidden";} })
            if (index >= 0) {
                this.$player.textTracks().tracks_[index].mode = "showing";
            }

            this.$vodTracksDiv.find(".nb-vjs-track-subtitle .focusable i").addClass("hidden");
        } else {
            this.$player.audioTracks().tracks_.forEach(function(track,index) { if(track.enabled == true) {track.mode = false;} })
            this.$player.audioTracks().tracks_[index].enabled = true;
            this.$vodTracksDiv.find(".nb-vjs-track-audio .focusable i").addClass("hidden");
        }

        $focused.closest("span").find("i").removeClass("hidden");
    },

    resetAutoHideControls: function() {
        var self = this;
        clearTimeout(this.inactivityTimeout);
        this.inactivityTimeout = setTimeout(function(){
            self.hideControls();
        }, 6000);
    },

    showControls: function() {
        this.$player.userActive(true);
        this.resetAutoHideControls();
    },

    hideControls: function() {
        var self = this;
        this.closeTracks();
        $(".vjs-menu").hide();
        nbPlayerCancelSeekTimeIndicator(); // temporal while remove global modifications
        setTimeout(function() { 
            self.$player.userActive(false); 
        }, 100);
    }
}