webpix.pedePermissaoParaUsoCamera()

// próximo efeito
$( '.efeito-next' ).click( function( event ) {
	event.preventDefault()

	webpix.efeitoNext()
})

// efeito anterior
$( '.efeito-prev' ).click( function( event ) {
	event.preventDefault()

	webpix.efeitoPrev()
})

//
$( '.controle-gatilho' ).click( function( event ) {
	event.preventDefault()

	webpix.tirarFoto()
} )

//
$( '.controle-download' ).click( function( event ) {
	// event.preventDefault()

	return webpix.download()
} )

//
$( '.controles' ).on(
	'click',
	'.controle-download.controle-botao-disabled',
	function( event ) {
		event.preventDefault()
} )

//
$( '.controle-lixeira' ).click( function( event ) {
	event.preventDefault()

	webpix.lixeira()
} )