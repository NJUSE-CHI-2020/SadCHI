function click_scroll () {
  const scroll_offset = $( "#search" ).offset()
  $( "body,html" ).animate( {
    scrollTop:scroll_offset.top
  }, 500 )
}

function advance () {
  $( "#normal-search" ).toggle()
  $( "#advanced-search" ).toggle()
}
