$(document).ready(function () {


    mode = sessionStorage.getItem('mode');
//    if(window.location.href.indexOf('&')===-1){
//        mode = 'single'
//    } else {
//        mode = 'multiple'
//    }
    currentPage = 0;
    totalPage = 0;
    let dataList = [];
    searchPaper();


    function searchPaper() {
        console.log(mode);
        let URL = "";
        if(mode === 'single'){
            let searchType = window.location.href.split('?')[1].split('=')[0];
            let searchVal = window.location.href.split('?')[1].split('=')[1];
            URL = "/document/"+searchType+"/"+searchVal;
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
                    $("#paperContent").show();
                    $(".c-pages").show();
                    totalPage = data.length%10===0 ? data.length/10 : Math.floor(data.length/10)+1;
                    currentPage =1;
                    $("#cp-count").text(dataList.length);
                    $("#total-page").text(totalPage);
                    showPaperList(dataList.slice((currentPage-1)*10,currentPage*10));
                }
                else{
                    $("#errorContent").show();
                }
            },
            function () {
                alert("Sorry, some errors might happen");
            }
        )
    }

    function showPaperList(list) {
        $('.paper-list').empty();
        $("#curr-page").text(currentPage);
        let paperDomStr = '';
        let paper_item_index = (currentPage - 1) * 10 + 1;
        list.forEach( (paper) => {
            //paper.keywords = paper.keywords.replace(/;/g," ; ");
            paperDomStr +=
                "<li class='paperLine'>" +
                "<div class='paper'>"+
                    "<div class='title'>"+
                        "<span class='paper_item_index'>"+paper_item_index+". </span>"+
                        "<a href='/paperDetail?doi="+paper.doi+"'>"+
                            paper.title+"</a>"+
                    "</div>"+
                "</div>"+
                "<div class='paperInfo'>"+
                    "<div class = 'affiliations'>Affiliation:  ";
            let affiliationList = paper.affiliation.split(';');
            let affiliationIdList = paper.affiliation_id.split(',');
            affiliationList.forEach( (item,index)=>{
                if(item === 'NA')
                    item = 'unknown';
                if(index!=0)
                    paperDomStr += "<span>Affiliation:  </span>"+item+"</br>";
                else
                    paperDomStr += item+"</br>";
            })
            paperDomStr +=
                    "</div>"+
                    "<div class = 'authors'>Author:  "+paper.author.replace(/,/g," , ");
            if(paper.keyWord === null)
                paper.keyWord = 'None';
            else
                paper.keyWord = paper.keyWord.replace(/,/g," , ");
            paperDomStr +=
                    "</div>"+
                "</div>"+
                "<div class='doi'>DOI:  "+
                    paper.doi+
                "</div>"+
                "<div class='keywords'>Keyword:  "+
                    paper.keyWord+
                "</div>"+
                "<div class='publicationYear'>PublicationYear:  "+paper.publicationYear;
            paperDomStr +=
                "</div>"+
                "</li>";
            paper_item_index += 1;
        });
        $('.paper-list').append(paperDomStr);
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