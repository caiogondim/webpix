var webpix = ( function(){

	var webpix = {

		effects: [
			'video-normal',
			'video-sepia',
			'video-blur'
		],
		currentEffect: 0,

		init: function() {

			return this
		},

		pedePermissaoParaUsoCamera: function() {
			navigator.webkitGetUserMedia(
				{ video: true },
				webpix.iniciaStream,
				webpix.permissaoNegada
			)
		},

		iniciaStream: function( stream ) {
			//
			$( '.dialogo' ).animate( { top: '-190px' }, 400 )
			$( '.juarez' ).animate( { bottom: '-290px' }, 400 )

			// mostra o vídeo após um determinado tempo para que a
			// transição dos controles ocorra suave
			setTimeout( function() {
				$( 'video' )
					.show()
					.attr(
						'src',
						window.webkitURL.createObjectURL( stream ) )
			}, 400)

		},

		permissaoNegada: function() {
			alert(
				'É necessário que você habilite o acesso a câmera' +
			 	'para que o experimento funcione')
		},

		efeitoNext: function() {
			if (this.currentEffect == ( this.effects.length - 1) ) {
				this.currentEffect = 0
			} else {
				this.currentEffect = this.currentEffect + 1
			}

			// adiciona a classe css
			$( 'video' )
				.removeClass()
				.addClass( this.effects[this.currentEffect] )
		},

		efeitoPrev: function() {
			if (this.currentEffect == 0 ) {
				this.currentEffect = this.effects.length - 1
			} else {
				this.currentEffect = this.currentEffect - 1
			}

			// adiciona a classe css
			$( 'video' )
				.removeClass()
				.addClass( this.effects[this.currentEffect] )
		},

		tirarFoto: function() {
			var canvas = $( 'canvas' )[0]
			canvas.width = $( 'video' )[0].videoWidth
			canvas.height = $( 'video' )[0].videoHeight
			var ctx = canvas.getContext( '2d' )
			ctx.drawImage( $( 'video' )[0], 0, 0 )

			$( '<img />' )
				.appendTo( 'body' )
				.attr( 'src', canvas.toDataURL('image/webp') )
		}

	}

	return webpix.init()
})()