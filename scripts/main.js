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