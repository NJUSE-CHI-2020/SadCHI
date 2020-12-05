/* PageLoader */
$( window ).on( 'load', () => {
  $( '#preloader' ).fadeOut( 'slow' )
} )
/* Nice Select */
$( document ).ready( () => {
  $( '.nc-select' ).niceSelect()
} )
/* Scroll Ball */
window.onscroll = (() => {
  scrollFunction()
})
scrollFunction = () => {
  if ( document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
    $( '#to-top' ).css( 'display', 'flex' )
  } else {
    $( '#to-top' ).hide()
  }
}
