$( document ).ready(
  function() {
    authorId = window.location.href.split( '?' )[ 1 ].split( '=' )[ 1 ]
    currentPage = 0
    totalPage = 0
    dataList = []
    let URL = "/Portrait/Author/id/" + authorId
    getRequest(
      URL,
      function( res ) {
        showDetail( res.content[ 0 ] )
      }
    )
  
    getRequest(
      '/Portrait/Author/showNewRelationById/'+authorId,
      function (res) {
        drawRelationChart(res,authorId)
      }
    )

    function showDetail ( data ) {
      $( '#author_name' ).text( data.author_name )
      //涛涛说以后不允许我写注释了，我好伤心
      $( '#heat' ).text( data.heat )
      //我不要他了
      $( '#affiliation_name' ).text( data.affiliation )
      $( '#affiliation_name' ).attr( 'href', '/affiliationDetail?affiliationId=' + data.affiliation_id )
      $( '#publication_count' ).text( data.publication_count )
      drawAutherChart( data.keywords )
      drawAutherYearCharts( data.publicationYearCount )
      dataList = data.paperTitles
      totalPage = data.paperTitles.length % 6 === 0 ? data.paperTitles.length / 6 : Math.floor( data.paperTitles.length / 6 ) + 1
      currentPage = 1
      $( "#cp-count" ).text( dataList.length )
      $( "#total-page" ).text( totalPage )
      showPapers( data.paperTitles.slice( (currentPage - 1) * 10, currentPage * 10 ) )
    }
    
    function drawAutherChart ( data ) {
      var mychart = echarts.init( document.getElementById( 'charts1' ) )
      var keyWords = data
      var wordData = new Array()
      for ( var i in keyWords ) {
        var tmpObj = { name:i, value:keyWords[ i ] }
        wordData.push( tmpObj )
      }
      var option = {
        backgroundColor:'#fff',
        tooltip:{
          show:false
        },
        series:[{
          type:'wordCloud',
          gridSize:1,
          sizeRange:[12, 55],
          rotationRange:[-45, 0, 45, 90],
          textStyle:{
            normal:{
              color:function() {
                return 'rgb(' +
                  Math.round( Math.random() * 255 ) +
                  ', ' + Math.round( Math.random() * 255 ) +
                  ', ' + Math.round( Math.random() * 255 ) + ')'
              }
            }
          },
          left:'center',
          top:'center',
          // width: '96%',
          // height: '100%',
          right:null,
          bottom:null,
          width:300,
          height:200,
          draggable:true,
          // top: 20,
          data:wordData
        }]
      }
      mychart.setOption( option )
    }
    
    function showPapers ( titles ) {
      $( '.papers' ).empty()
      $( "#curr-page" ).text( currentPage )
      for ( let i = 0; i < titles.length; i++ ) {
        const paperObj = getPaperObj(titles[i])
        const temp = document.createElement( 'tr' )
        let row = $( temp )
        const paper = $( '<td><a href="/paperDetail?doi=' + paperObj.doi + '"</a>' + paperObj.title + '</td>' )
        const year = $( '<td>' + paperObj.publicationYear + '</td>' )
        const authors = $( '<td>' + paperObj.authors.replace( /[?]/g, "" ) + '</td>' )
        row.append( paper ).append( year ).append( authors )
        $( '.papers' ).append( row )
      }
    }
    
    function getPaperObj ( preTitle ) {
      var tempLink = ""
      let title = preTitle.replace( /\s+/g, "%20" )
      doi = getDOI( title )
      $.ajax(
        "/document/DOI?doi=" + doi,
        {
          async:false,
          success:function( res ) {
            tempLink = res.content[ 0 ]
          }
        }
      )
      return tempLink
    }
    
    function getDOI ( title ) {
      var tempDOI = ""
      $.ajax(
        "/document/Title/" + title,
        {
          async:false,
          success:function( res ) {
            tempDOI = res.content[ 0 ].doi
          }
        }
      )
      return tempDOI
    }
    
    function drawAutherYearCharts ( data ) {
      var yearDataTmp = data
      var yearData = new Array()
      for ( var i in yearDataTmp ) {
        var tmpObj = { name:i, value:yearDataTmp[ i ] }
        yearData.push( tmpObj )
      }
      var option = {
        title:{
          text:""
        },
        series:[
          {
            name:'访问来源',
            type:'pie',
            radius:'55%',
            data:yearData,
            itemStyle:{
              normal:{
                label:{
                  show:true,
                  formatter:'{b} ({d}%)'
                },
                labelLine:{ show:true }
              }
            }
          }
        ]
      }
      var mychart = echarts.init( document.getElementById( 'charts2' ) )
      mychart.setOption( option )
    }
  
    function drawRelationChart(data,author_id) {
      var nameNodes = new Array();
      var nodes = new Array();
      var links = new Array();
      var index = 0;
    
      for (var i in data.content) {
        var obj = data.content[index];
        if (!exists(nameNodes,obj.a_name)) {
          nameNodes.push({name:obj.a_name,weight:obj.relation,id:obj.a_id,coworkpapers:obj.coworkpapers})
        }
        if (!exists(nameNodes,obj.b_name)) {
          nameNodes.push({name:obj.b_name,weight:obj.relation,id:obj.b_id,coworkpapers:obj.coworkpapers})
        }
        var tmpLink = {source: obj.a_name, target: obj.b_name ,weight:obj.relation};
        links.push(tmpLink);
        index++;
      }
      index = 0;
      for (var i in nameNodes) {
        var sb = 30;
        var wg = nameNodes[i].weight;
        if(index === 0){
          sb = 90;
        }
      
        else if(wg < 25){
          sb = 15 + wg*3
        }
        else{
          sb = 90;
        }
        var tmpObj = {name: nameNodes[index].name,value:wg ,symbolSize:sb,id:nameNodes[index].id,coworkpapers:nameNodes[index].coworkpapers};
        nodes.push(tmpObj);
        index++;
      }
    
      var option = {
        backgroundColor: '#fff',
      
        tooltip: {
          show: true
        },
      
        series: [{
          type: 'graph',
          name: "相关学者",
          layout: 'force',
          roam:true,
          //symbol: 'pin',
          ribbonType: false,
        
        
          itemStyle: {
            normal: {
              color: function () {
                return 'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) + ')'
              }
            
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top',//设置label显示的位置
              formatter: '{b}',//设置label读取的值为value
              textStyle: {
                fontSize: '6rem'
              },
            }
          },
          draggable: true,
          force: {
            edgeLength: 15,//30
            repulsion: 35,//50
            gravity:0.02
          },
        
          nodes: nodes,//同data,关系图的节点数据列表。
          links: links,
        }]
      };
      var mychart = echarts.init(document.getElementById('charts3'));
      mychart.setOption(option);
    }

      function exists(array,val) {
          for (var i = 0; i < array.length; i++) {
              if (array[i].name == val) {
                  return true;
              }
          }
          return false;
      }


    $( "#home" ).click( function() {
      currentPage = 1
      showPapers( dataList.slice( (currentPage - 1) * 6, currentPage * 6 ) )
    } )
    $( "#prev" ).click( function() {
      let next = currentPage
      if ( next <= 1 )
        return
      currentPage -= 1
      showPapers( dataList.slice( (currentPage - 1) * 6, currentPage * 6 ) )
    } )
    $( "#next" ).click( function() {
      var last = currentPage
      if ( last == totalPage )
        return
      currentPage += 1
      showPapers( dataList.slice( (currentPage - 1) * 6, currentPage * 6 ) )
    } )
    $( "#last" ).click( function() {
      currentPage = totalPage
      showPapers( dataList.slice( (currentPage - 1) * 6, currentPage * 6 ) )
    } )
    $( "#goTo" ).click( function() {
      let target = $( "#goToPage" ).val()
      if ( target == undefined )
        target = currentPage
      target = Math.max( 1, Math.min( totalPage, target ) )
      currentPage = target
      showPapers( dataList.slice( (currentPage - 1) * 6, currentPage * 6 ) )
      $( "#goToPage" ).val( "" )
    } )
    $( '#goToPage' ).bind( 'keypress', function( event ) {
      if ( event.keyCode == "13" ) {
        let target = $( "#goToPage" ).val()
        if ( target == undefined )
          target = currentPage
        target = Math.max( 1, Math.min( totalPage, target ) )
        currentPage = target
        showPapers( dataList.slice( (currentPage - 1) * 6, currentPage * 6 ) )
        $( "#goToPage" ).val( "" )
      }
    } )
  }
)