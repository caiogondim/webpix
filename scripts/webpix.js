var webpix = ( function(){

	var webpix = {

		effects: [
			'normal',
			'grayscale',
			'sepia',
			'blur'
		],
		currentEffect: 0,
		canvas: null,
		ctx: null,

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

		efeitoNext: function(){

			if( this.currentEffect == (this.effects.length - 1) )
				this.currentEffect = 0
			else
				this.currentEffect = this.currentEffect + 1

			this.aplicaEfeito()
		},

		efeitoPrev: function(){

			if( this.currentEffect == 0 )
				this.currentEffect = this.effects.length - 1
			else
				this.currentEffect = this.currentEffect - 1

			this.aplicaEfeito()
		},

		aplicaEfeito: function(){

			this.ctx.drawImage( $( '.fotoOriginal' )[0], 0, 0 )
			newBlob = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height )

			switch( this.currentEffect ){
				// normal
				case 0: break
				// grayscale
				case 1:
					newBlob.data = this.grayscale( newBlob.data )
					break
				// sepia
				case 2:
					newBlob.data = this.sepia( newBlob.data )
					break
				// blur
				case 3:
					newBlob.data = this.blur( newBlob.data )
					break
				// sharpen
				case 4:
					newBlob.data = this.sharpen( newBlob.data )
					break

				case 5:
					newBlob.data = this.crazy( newBlob.data )
					break

				default: break
			}

			this.ctx.putImageData( newBlob, 0, 0 )
			this.atualizaFoto()
		},

		tirarFoto: function() {

			this.canvas = $( 'canvas' )[0]
			this.canvas.width = $( 'video' )[0].videoWidth
			this.canvas.height = $( 'video' )[0].videoHeight
			this.ctx = this.canvas.getContext( '2d' )
			this.ctx.drawImage( $( 'video' )[0], 0, 0 )
			this.atualizaFoto()

			$( '.fotoOriginal' ).attr( 'src', this.canvas.toDataURL('image/png') )
			$( 'video' ).hide()

			// atualiza controles
			$( '.controle-gatilho' )
				.addClass( 'controle-botao-disabled' )
			$( '.controle-download' )
				.removeClass( 'controle-botao-disabled' )
			$( '.controle-lixeira' )
				.removeClass( 'controle-botao-disabled' )
			$( '.efeito-prev' )
				.removeClass( 'controle-botao-disabled' )
			$( '.efeito-next' )
				.removeClass( 'controle-botao-disabled' )
		},

		atualizaFoto: function(){

			$( '.foto' )
				.attr( 'src', this.canvas.toDataURL('image/png') )
				.show()
			$( '.controle-download' )
				.attr( 'href', this.canvas.toDataURL('image/png') )
		},

		grayscale: function( data ){

			for( i = 0; i < data.length; i += 4 ){
				var r = data[ i ]
				var g = data[ i+1 ]
				var b = data[ i+2 ]
				var v = 0.2126*r + 0.7152*g + 0.0722*b
				data[ i ] = data[ i+1 ] = data[ i+2 ] = v
			}

			return data
		},

		sepia: function( data ){

			for( i = 0; i < data.length; i += 4 ){
				var r = data[ i ]
				var g = data[ i+1 ]
				var b = data[ i+2 ]
				depth = 20

				v = (0.299 * r) + (0.587 * g) + (0.114 * b)
				r = g = b = v

				r += depth*2
				if( r > 255 ) r = 255

				g += depth
				if( g > 255 ) g = 255

				data[ i ]   = r
				data[ i+1 ] = g
				data[ i+2 ] = b
			}

			return data
		},

		blur: function( data ){

			var lvl    = 6
			var n      = lvl * lvl
			var matrix = []

			for( i = 0; i < n; i++ )
				matrix[ i ] = 1/n

			return this.convolute( data, matrix )
		},

		lixeira: function() {
			$( '.foto' )
				.attr( 'src', '' )
				.hide()
			$( 'video' )
				.show()

			// atualiza controles
			$( '.controle-gatilho' )
				.removeClass( 'controle-botao-disabled' )
			$( '.controle-download' )
				.addClass( 'controle-botao-disabled' )
			$( '.controle-lixeira' )
				.addClass( 'controle-botao-disabled' )
			$( '.efeito-prev' )
				.addClass( 'controle-botao-disabled' )
			$( '.efeito-next' )
				.addClass( 'controle-botao-disabled' )
		}

	}

	return webpix.init()
})()