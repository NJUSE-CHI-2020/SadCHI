$(document).ready(function () {

    fieldName = window.location.href.split('?')[1].split('=')[1];
    currentPage = 0;
    totalPage = 0;
    searchField(fieldName);
    let dataList = [];


    function searchField(FieldName) {
        let URL = "/Portrait/Direction/name/"+FieldName;
        getRequest(
            URL,
            function (res) {
                data = res.content;
                if(data){
                    dataList = data;
                    $("#errorContent").hide();
                    $("#tableContent").show();
                    $(".c-pages").show();
                    totalPage = data.length%10===0 ? data.length/10 : Math.floor(data.length/10)+1;
                    currentPage =1;
                    $("#cp-count").text(dataList.length);
                    $("#total-page").text(totalPage);
                    showFieldList(dataList.slice((currentPage-1)*10,currentPage*10));
                    sessionStorage.setItem('fieldItem',fieldName);
                }
                else{
                    $("#tableContent").hide();
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

    function showFieldList(list,page) {
        //console.log(list);
        //initPagination(list.length);
        $(".field").empty();
        $("#curr-page").text(currentPage)
        for ( let i = 0; i < list.length; i++ ) {
          const temp = document.createElement( 'tr' )
          let row = $( temp )
          const name = $( '<td><a href=\''+"/fieldDetail?fieldId="+list[i].id+'\' id=\'' + list[ i ].id + '\'>' + list[ i ].name + '</a></td>' )
          const affCount = $( '<td>' + ('0' + list[ i ].affCount).slice( -2 ) + '</td>' )
          const authorCount = $( '<td>' + ('0' + list[ i ].authorCount).slice( -2 ) + '</td>' )
          const docCount = $( '<td>' + ('0' + list[ i ].docCount).slice( -2 ) + '</td>' )
          const heat = $( '<td>' + list[ i ].heat + '</td>' )
          row.append( name ).append( authorCount ).append( affCount ).append( docCount ).append( heat )
          $( 'tbody.field' ).append( row )
        }
    }

    $("#home").click(function () {
        currentPage = 1;
        showFieldList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#prev").click(function () {
        let next = currentPage;
        if (next <= 1)
            return;
        currentPage -= 1;
        showFieldList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#next").click(function () {
        var last = currentPage;
        if (last == totalPage)
            return;
        currentPage += 1;
        showFieldList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#last").click(function () {
        //console.log(totalPage);
        currentPage = totalPage;

        showFieldList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#goTo").click(function () {
        var target = $("#goToPage").val();
        if (target == undefined)
            target = currentPage;
        target = Math.max(1, Math.min(totalPage, target));
        currentPage = target;
        showFieldList(dataList.slice((currentPage-1)*10,currentPage*10));
        $("#goToPage").val("");
    });

});