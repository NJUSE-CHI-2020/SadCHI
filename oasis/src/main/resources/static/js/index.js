$( () => {
  $( '#option select' ).change( () => {
    const choice = $( '#option select' ).val()
    if ( choice === 'Year' || choice === 'Title' ) {
      $( "#visual-search" ).hide()
    } else {
      $( "#visual-search" ).show()
    }
  } )
  $( '#normal-input' ).bind( 'keypress', ( event ) => {
    if ( event.keyCode === 13 ) {
      const content = $( '#normal-input' ).val()
      if ( content.trim() === '' ) {
        warning( 'Input field cannot be blank.' )
      } else {
        warning( 'Click on one of both buttons.' )
      }
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
  if ( choice === 'Keywords' && content.trim() !== '' ) {
    window.location.href = '/fieldList?field=' + content
  } else {
    warning( 'Input field cannot be blank.' )
  }
}
paper_search = () => {
  warning( 'Input field cannot be blank.' )
}
advanced_search = () => {
  warning( 'Input field cannot be blank.' )
}
warning = ( message ) => {
  UIkit.notification( {
    message:'<span uk-icon="icon:warning"></span> ' + message,
    pos:'bottom-right',
    status:'danger'
  } )
}
