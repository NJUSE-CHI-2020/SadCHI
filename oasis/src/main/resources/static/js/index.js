$( () => {
  $( '#option select' ).change( () => {
    const choice = $( '#option select' ).val()
    if ( choice === 'Year' || choice === 'Title' ) {
      $( "#visual-search" ).hide()
    } else {
      $( "#visual-search" ).show()
    }
  } )
} )
click_scroll = () => {
  const scroll_offset = $( "#search" ).offset()
  $( "body,html" ).animate( {
    scrollTop:scroll_offset.top
  }, 500 )
}
advance = () => {
  $( "#normal-search" ).toggle()
  $( "#advanced-search" ).toggle()
  console.log( $( ".selected" ) )
}
