ENV = 'PRODUCTION';

var parseQueryString = function() {

    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    return objURL;
};

CONFIG_CURRENT_BRAND = [];
var _getBrand = parseQueryString().brand;
var _filtered = CONFIG_BRANDS.filter(function(item) {
	return item.brand == _getBrand;
});

if (_filtered != null && _filtered.length == 1) {
	CONFIG_CURRENT_BRAND = _filtered[0];
}

CONFIG = {
	locale: Device.getValidLanguage(),
	versionSDK: '2.1.292 [17.02.2017]',  // SDK version  (format: X.Y.SDK_SVN_Revision_number)
	version: '1.0.0', // application version
	automaticActivation: true,
	developer: {
		debug: false,
		active: true,
		console: null,
		pin: '99999' // show short info about application
	},
	player: {
		muted: false
	},
	ajax: {
		timeout: 60000
	},
	keyboard: {
		oneLayout: false
	},
	GA: {
		account: '', // account number for Google Analytics
		ssl: true
	},
	mouse: {
        modeArrows: 'auto', // mode of showing arrows: on/off/auto   // auto -> arrows will be showed automatically (after Mouse moving is detected)
        hideArrows: 15000, // how long can be arrows visible, used only for mode='auto' [ms]
        rightIsReturn: false // set mouse right click to press Return/Back key on RC
    },

	//modificar en la linea 63 el nombre de la empresa 
	//Modificar en la linea 64 el nombre de la aplicacion
	//Modificar en la linea 65 el Cv al cual va a apuntar
	//Modificar ne la linea 66 el token que apunta al CV
	app: {
		production: false,
		brand: "bromteck",
		appName: "Bromteck",
		drmURL: "https://cv01.panaccess.com/",
		drmToken: "gQposTlrMIOYQVdYBNYC",
		logoPositionHome: CONFIG_CURRENT_BRAND.logoPositionHome,
		showTime: CONFIG_CURRENT_BRAND.showTime,
		epgLineColorTime: CONFIG_CURRENT_BRAND.epgLineColorTime,
		developedBy: CONFIG_CURRENT_BRAND.developedBy,
		epgApiKey: "724aa4b262071d28844ac2fa85fe7eb198d9cb819c8913f6769b2b48a56a1f61",
        epgApiToken: "OMGRUhcoXKFqnpzZEfrF",
		catchupRecordingHoursLimit: 20,
		imageUrlVodPosterList: "%base_url%/cv_data_pub/images/%image_id%/v/vod_poster_list.jpg",
		imageUrlVodPosterInfo: "%base_url%/cv_data_pub/images/%image_id%/v/vod_poster_info.jpg",
		imageUrlVodOriginalImage: "%base_url%/cv_data_pub/images/%image_id%/v/original.jpg",
	}
};