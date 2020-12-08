$( () => {
  $( '#option select' ).change( () => {
    const choice = $( '#option select' ).val()
    if ( choice === 'Year' || choice === 'Title' ) {
      $( '#visual-search' ).hide()
    } else {
      $( '#visual-search' ).show()
    }
  } )
  $( '#normal-input' ).bind( 'keypress', ( event ) => {
    if ( event.keyCode === 13 ) {
      const content = $( '#normal-input' ).val()
      if ( content.trim() === '' ) {
        warning( 'Input cannot be blank.' )
      } else {
        warning( 'Click on one of both buttons.' )
      }
    }
  } )
} )
click_scroll = () => {
  $( 'body,html' ).animate( {
    scrollTop:$( '#search' ).offset().top
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
  } else if ( choice === 'Institution' && content.trim() !== '' ) {
    window.location.href = '/affiliationList?affiliation=' + content
  } else if ( choice === 'Author' && content.trim() !== '' ) {
    window.location.href = '/authorList?author=' + content
  } else {
    warning( 'Input cannot be blank.' )
  }
}
paper_search = () => {
  const choice = $( '#option select' ).val()
  const content = $( '.uk-input' ).val()
  if ( content.trim() !== '' ) {
    sessionStorage.setItem( 'mode' , 'single' )
    window.location.href = '/paperList?' + choice + '=' + content
  } else {
    warning( 'Input cannot be blank.' )
  }
}
advanced_search = () => {
  const author = $( '#authorInput' ).val()
  const affiliation = $( '#affiliationInput' ).val()
  const year = $( '#yearInput' ).val()
  const keywords = $( '#keywordsInput' ).val()
  if ( author.trim() === '' && affiliation.trim() === '' && year.trim() === '' && keywords.trim() === '' ) {
    warning( 'Input cannot be blank.' )
  } else {
    sessionStorage.setItem( 'mode' , 'multiple' )
    window.location.href = '/paperList?authorname=' + author + '&affiliation=' + affiliation + '&year=' + year + '&keywords=' + keywords
  }
}
warning = ( message ) => {
  UIkit.notification( {
    message:'<span uk-icon="icon:warning"></span> ' + message,
    pos:'bottom-right',
    status:'danger'
  } )
}
