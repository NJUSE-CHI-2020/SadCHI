$( () => {
  showRank()
  showRegionRank()
  showByCountry()
} )
showRank = () => {
  $.get( '/Portrait/Author/showByHeat', ( data ) => {
    const list = data.content
    for ( let i = 0; i < list.length && i < 15; i++ ) {
      const temp = document.createElement( 'tr' )
      let row = $( temp )
      const rank = $( '<td>' + ('0' + (i + 1)).slice( -2 ) + '</td>' )
      const name = $( '<td><a href="#" id=\'' + list[ i ].author_id + '\'>' + list[ i ].author_name + '</a></td>' )
      const affiliation = $( '<td class="uk-text-truncate">' + list[ i ].affiliation + '</td>' )
      const count = $( '<td>' + ('0' + list[ i ].publication_count).slice( -2 ) + '</td>' )
      const heat = $( '<td>' + list[ i ].heat + '</td>' )
      row.append( rank ).append( name ).append( affiliation ).append( count ).append( heat )
      $( 'tbody.author' ).append( row )
    }
  } )
}
showRegionRank = () => {
  $.get( '/Portrait/Affiliation/showByCountry', ( data ) => {
    const list = data.content.split( ';' )
    for ( let i = 1; i <= 15 && i < list.length; i++ ) {
      const pair = list[ i ].split( ',' )
      const rank = $( '<td>' + ('0' + i).slice( -2 ) + '</td>' )
      const region = $( '<td>' + pair[ 0 ] + '</td>' )
      const heat = $( '<td>' + pair[ 1 ] + '</td>' )
      const temp = document.createElement( 'tr' )
      const row = $( temp )
      row.append( rank ).append( region ).append( heat )
      $( 'tbody.region' ).append( row )
    }
  } )
}
showByCountry = () => {
  $.get( '/Portrait/Affiliation/showByCountry', ( data ) => {
    const tmp = data.content.slice( 1, -2 ).split( ';' )
    let areaData = []
    tmp.forEach( function( value ) {
      let tmp = value.split( ',' )
      if ( tmp[ 0 ] != null && tmp[ 0 ] !== 'null' ) {
        if ( tmp[ 0 ] === 'USA' ) {
          tmp[ 0 ] = 'United States'
        }
        const tmpOb = { name:tmp[ 0 ], value:parseInt( tmp[ 1 ] ) }
        if ( tmpOb.value > 100 ) {
          tmpOb.itemStyle = { color:'rgb(255,0,23)' }
        } else if ( tmpOb.value > 50 ) {
          tmpOb.itemStyle = { color:'rgb(255,242,43)' }
        } else if ( tmpOb.value > 10 ) {
          tmpOb.itemStyle = { color:'rgb(187,255,123)' }
        } else if ( tmpOb.value > 5 ) {
          tmpOb.itemStyle = { color:'rgb(143,255,173)' }
        } else {
          tmpOb.itemStyle = { color:'rgb(189,243,255)' }
        }
        areaData.push( tmpOb )
      }
    } )
    const option = {
      backgroundColor:'#FFF',
      tooltip:{
        trigger:'item',
        formatter:function( params ) {
          if ( params.value ) {
            return params.name + '<br/>' + 'hotRate' + ':' + params.value
          } else {
            return params.name + '<br/>' + 'hotRate' + ':' + '0'
          }
        }
      },
      series:[
        {
          name:'areaMap',
          type:'map',
          mapType:'world',
          roam:true,
          itemStyle:{
            emphasis:{ label:{ show:true } }
          },
          data:areaData
        }]
    }
    const chart = echarts.init( document.getElementById( 'world-map' ) )
    chart.setOption( option )
  } )
}
