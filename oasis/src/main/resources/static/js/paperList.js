$(document).ready(function () {

//    author = window.location.href.split('?')[1].split('&')[0].split('=')[1];
//    affiliation = window.location.href.split('?')[1].split('&')[1].split('=')[1];
//    year = window.location.href.split('?')[1].split('&')[2].split('=')[1];
//    keywords = window.location.href.split('?')[1].split('&')[3].split('=')[1];

    if(window.location.href.indexOf('&')===-1){
        mode = 'single'
    } else {
        mode = 'multiple'
    }
    currentPage = 0;
    totalPage = 0;
    searchPaper();
    let dataList = [];


    function searchPaper() {
        console.log(mode);
        let URL = "";
        if(mode === 'single'){
            let searchType = window.location.href.split('?')[1].split('=')[0];
            let searchVal = window.location.href.split('?')[1].split('=')[1];
            URL = "/document/"+searchType+"/"+searchVal;
            console.log(URL);
        } else {
            let params = window.location.href.split('?')[1];
            URL = "/document/complex?"+params;
        }
        getRequest(
            URL,
            function (res) {
                data = res.content;
                if(data){
                    dataList = data;
                    console.log(dataList);
                    $("#errorContent").hide();
                    $("#paperContent").show();
                    $(".c-pages").show();
                    totalPage = data.length%10===0 ? data.length/10 : Math.floor(data.length/10)+1;
                    currentPage =1;
                    $("#cp-count").text(dataList.length);
                    $("#total-page").text(totalPage);
                    showPaperList(dataList.slice((currentPage-1)*10,currentPage*10));
                }
                else{
                    $("#paperContent").hide();
                    $("#errorContent").show();
                    $(".c-pages").hide();
                    //alert("Sorry, we found nothing relevant!");
                }
            },
            function () {
                alert("Sorry, some errors might happen");
            }
        )
    }

    function showPaperList(list,page) {
        //console.log(list);
        //$(".field").empty();
        $("#curr-page").text(currentPage);
//        for ( let i = 0; i < list.length; i++ ) {
//          const temp = document.createElement( 'tr' )
//          let row = $( temp )
//          const name = $( '<td><a href=\''+"/fieldDetail?fieldId="+list[i].id+'\' id=\'' + list[ i ].id + '\'>' + list[ i ].name + '</a></td>' )
//          const affCount = $( '<td>' + ('0' + list[ i ].affCount).slice( -2 ) + '</td>' )
//          const authorCount = $( '<td>' + ('0' + list[ i ].authorCount).slice( -2 ) + '</td>' )
//          const docCount = $( '<td>' + ('0' + list[ i ].docCount).slice( -2 ) + '</td>' )
//          const heat = $( '<td>' + list[ i ].heat + '</td>' )
//          row.append( name ).append( authorCount ).append( affCount ).append( docCount ).append( heat )
//          $( 'tbody.field' ).append( row )
//        }
    }

    $("#home").click(function () {
        currentPage = 1;
        showPaperList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#prev").click(function () {
        let next = currentPage;
        if (next <= 1)
            return;
        currentPage -= 1;
        showPaperList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#next").click(function () {
        var last = currentPage;
        if (last == totalPage)
            return;
        currentPage += 1;
        showPaperList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#last").click(function () {
        //console.log(totalPage);
        currentPage = totalPage;

        showPaperList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#goTo").click(function () {
        let target = $("#goToPage").val();
        if (target == undefined)
            target = currentPage;
        target = Math.max(1, Math.min(totalPage, target));
        currentPage = target;
        showPaperList(dataList.slice((currentPage-1)*10,currentPage*10));
        $("#goToPage").val("");
    });


    $('#goToPage').bind('keypress',function(event){
        if(event.keyCode == "13")
        {
            let target = $("#goToPage").val();
            if (target == undefined)
                target = currentPage;
            target = Math.max(1, Math.min(totalPage, target));
            currentPage = target;
            showFieldList(dataList.slice((currentPage-1)*10,currentPage*10));
            $("#goToPage").val("");
        }
    });

});