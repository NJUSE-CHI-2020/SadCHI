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
  const scroll_offset = $( '#search' ).offset()
  $( 'body,html' ).animate( {
    scrollTop:scroll_offset.top
  }, 500 )
}
advance = () => {
  $( '#normal-search' ).toggle()
  $( '#advanced-search' ).toggle()
}
visual_search = () => {
  const choice = $( '#option select' ).val()
  const content = $( '.uk-input' ).val()
  if ( choice === 'Keywords' && content.trim() !== '' )
    window.location.href = '/fieldList?field=' + content
  else
    warning( 'Visual Search...' )
}
paper_search = () => {
  warning( 'Paper Search...' )
}
advanced_search = () => {
  warning( 'Advanced Search...' )
}
warning = ( message ) => {
  UIkit.notification( {
    message:'<span uk-icon="icon:warning"></span> ' + message,
    pos:'bottom-right',
    status:'warning'
  } )
}
