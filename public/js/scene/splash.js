/**
 * Test scene
 * 
 * @author AuroraTech
 * @class Scene_Splash
 * @extends Scene
 */

Scene_Splash = (function (Scene) {

	var Scene_Splash = function () {
		this.construct.apply(this, arguments);
	};

	$.extend(true, Scene_Splash.prototype, Scene.prototype, {
        /**
         * @inheritdoc Scene#init
         */
        init: function () {
			
		},
		/**
		 * @inheritdoc Scene#create
		 */
		create: function () {
			return $('#scene-splash');
		},
		/**
		 * @inheritdoc Scene#render
		 */

		// Cambiar el CONFIG.app.brand por el brand a donde se quiere apuntar en la linea 36,37,38 "assets/images/" + CONFIG.app.brand + "/
		render: function () {
            console.log('render splash scene');
			$("#alertModalButton").text(__("SettingsOkButton"));
			$(".img-logo").attr("src", "assets/images/bromteck/logo.png");
			$("#viewport").css({'background-image': 'url(../assets/images/bromteck/background.png)'});
			$("#scene-splash").css({'background-image': 'url(../assets/images/bromteck/splash.png)'});
			$("#alertModalConfirmButton").text(__("SettingsOkButton"));
			$("#alertModalConfirmCancelButton").text(__("SettingsCancelButton"));
		},

		destroy: function () {
            Router.history.shift(1);
        },

		/**
		 * @inheritdoc Scene#activate
		 */
		activate: function () {
			
		},
		/**
		 * @inheritdoc Scene#onLangChange
		 */
		onLangChange: function () {
		},
		/**
		 * @inheritdoc Scene#onClick
		 */
		onClick: function ($el, event) {
			this.onEnter.apply(this, arguments);
		},
		/**
		 * @inheritdoc Scene#onEnter
		 */
		onEnter: function ($el, event) {
			
		},
		/**
		 * @inheritdoc Scene#navigate
		 */
		navigate: function (direction) {
			
		},
		/**
		 * @inheritdoc Scene#onReturn
		 */
		onReturn: function ($el) {
			//Router.goBack();
		}

	});

	return Scene_Splash;

})(Scene);