$(document).ready(function () {
    affiliationName = window.location.href.split('?')[1].split('=')[1];
    currentPage = 0;
    totalPage = 0;
    searchAffiliation(affiliationName);
    let dataList = [];

    function searchAffiliation(affiliationName) {
        let URL = "/Portrait/Affiliations/name/"+affiliationName;
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
                    showAffiliationList(dataList.slice((currentPage-1)*10,currentPage*10));
                    sessionStorage.setItem('affiliationItem',affiliationName);
                }
                else{
                    $("#tableContent").hide();
                    $("#errorContent").show();
                    $(".c-pages").hide();
                }
            },
            function () {
                alert("Sorry, some errors might happen");
            }
        )
    }

    function showAffiliationList(list,page) {
        $(".affiliation").empty();
        $("#curr-page").text(currentPage)
        for ( let i = 0; i < list.length; i++ ) {
          const temp = document.createElement( 'tr' )
          let row = $( temp )
          const name = $( '<td><a href=\''+"/affiliationDetail?affiliationId="+list[i].id+'\' id=\'' + list[ i ].id + '\'>' + list[ i ].name + '</a></td>' )
          const authorCount = $( '<td>' + list[ i ].authorCount + '</td>' )
          const paperCount = $( '<td>' + list[ i ].docuCount + '</td>' )
          const heat = $( '<td>' + list[ i ].heat + '</td>' )
          row.append( name ).append( authorCount ).append( paperCount ).append( heat )
          $( 'tbody.affiliation' ).append( row )
        }
    }

    $("#home").click(function () {
        currentPage = 1;
        showAffiliationList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#prev").click(function () {
        let next = currentPage;
        if (next <= 1)
            return;
        currentPage -= 1;
        showAffiliationList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#next").click(function () {
        var last = currentPage;
        if (last == totalPage)
            return;
        currentPage += 1;
        showAffiliationList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#last").click(function () {
        //console.log(totalPage);
        currentPage = totalPage;

        showAffiliationList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#goTo").click(function () {
        let target = $("#goToPage").val();
        if (target == undefined)
            target = currentPage;
        target = Math.max(1, Math.min(totalPage, target));
        currentPage = target;
        showAffiliationList(dataList.slice((currentPage-1)*10,currentPage*10));
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
            showAffiliationList(dataList.slice((currentPage-1)*10,currentPage*10));
            $("#goToPage").val("");
        }
    });
});