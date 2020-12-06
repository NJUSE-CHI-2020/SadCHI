/* PageLoader */
$( window ).on( 'load', () => {
  $( '#preloader' ).fadeOut( 'slow' )
} )
/* Nice Select */
$( document ).ready( () => {
  $( '.nc-select' ).niceSelect()
} )
/* Scroll Ball */
$( window ).on( 'scroll', () => {
  if ( $( window ).scrollTop() > 20 ) {
    $( '.scroll-ball' ).css( 'display', 'flex' )
  } else {
    $( '.scroll-ball' ).hide()
  }
} )
