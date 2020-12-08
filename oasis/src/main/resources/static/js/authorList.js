$(document).ready(function (){
    authorName = window.location.href.split('?')[1].split('=')[1];
    currentPage = 0;
    totalPage = 0;
    searchAuthor(authorName);
    let dataList = []

    function searchAuthor(authorName){
        //涛涛是真的骚，用ES6
        let URL = "/Portrait/Author/name/"+authorName;
        getRequest(
            URL,
            (res) => {
                let data = res.content;
                console.log(data)
                if(data){
                    dataList = data
                    $("#errorContent").hide();
                    $("#tableContent").show();
                    $(".c-pages").show();
                    totalPage = data.length%10===0 ? data.length/10 : Math.floor(data.length/10)+1;
                    currentPage =1;
                    $("#cp-count").text(dataList.length);
                    $("#total-page").text(totalPage);
                    showAuthorList(dataList.slice((currentPage-1)*10,currentPage*10))
                    sessionStorage.setItem('authorItem',authorName);
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

    function showAuthorList(list){
        $('.author').empty() //翻页清空
        $("#curr-page").text(currentPage)
        for(let i=0;i<list.length;i++){
            const temp = document.createElement( 'tr' )
            let row = $( temp )
            const name = $('<td><a href=\''+"/authorDetail?authorId="+list[i].author_id+'\' id=\''+list[i].author_id+'\'>'+list[i].author_name+'</a></td>')
            const affiliation = $('<td><a href=\'/affiliationDetail?affiliationId='+list[i].affiliation_id+'\'>'+list[i].affiliation+'</a></td>')
            const publicationCount = $('<td>'+list[i].publication_count +'</td>')
            const heat = $('<td>'+list[i].heat +'</td>')
            row.append(name).append(affiliation).append(publicationCount).append(heat)
            $('tbody.author').append(row)
        }
    }

    $("#home").click(function () {
        currentPage = 1;
        showAuthorList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#prev").click(function () {
        let next = currentPage;
        if (next <= 1)
            return;
        currentPage -= 1;
        showAuthorList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#next").click(function () {
        var last = currentPage;
        if (last == totalPage)
            return;
        currentPage += 1;
        showAuthorList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#last").click(function () {
        //console.log(totalPage);
        currentPage = totalPage;

        showAuthorList(dataList.slice((currentPage-1)*10,currentPage*10));
    });

    $("#goTo").click(function () {
        let target = $("#goToPage").val();
        if (target == undefined)
            target = currentPage;
        target = Math.max(1, Math.min(totalPage, target));
        currentPage = target;
        showAuthorList(dataList.slice((currentPage-1)*10,currentPage*10));
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
            showAuthorList(dataList.slice((currentPage-1)*10,currentPage*10));
            $("#goToPage").val("");
        }
    });



})