$(document).ready(function () {

    doi = window.location.href.split('?')[1].split('=')[1];
    searchPaperDetail();
    let dataList = [];


    function searchPaperDetail() {
        let URL = "/document/DOI?doi="+doi;
        getRequest(
            URL,
            function (res) {
                data = res.content;
                if(data){
                    dataList = data;
                    showPaperDetail(dataList[0]);
                }
                else{
                    alert("Sorry, some errors might happen!");
                }
            },
            function () {
                alert("Sorry, some errors might happen");
            }
        )
    }

    function showPaperDetail(paper) {
        $('.info').empty();
        let paperTitle = '';
        paperTitle+="<a href="+paper.pdflink+" target='_blank'>"+paper.title+"</a>";
        $('.title').append(paperTitle);
        $('#abstract_content').text(paper.abstract);
        let paperDomStr = '';
        paperDomStr +=
            "<li style='list-style-type:none'>"+"<div class='info_left'>DOI :  "+"</div>"+"<div class='info_right'>"+paper.doi+"</div>"+"</li>"
            +"<li style='list-style-type:none'>"+"<div class='info_left'>Author :  "+"</div>"+"<div class='info_right'>";
        paperDomStr += paper.author.replace(/;/g," ,");
        paperDomStr +=
            "</div>"+"</li>"
            +"<li style='list-style-type:none'>"+"<div class='info_left'>Affiliation :  "+"</div>"+"<div class='info_right'>";
        paperDomStr += paper.affiliation.replace(/;/g," ;\n");
        paper.keyWord = (paper.keyWord === null) ? 'None' : paper.keyWord.replace(/;/g," ; ");
        paper.ieeeterm = (paper.ieeeterm === null) ? 'None' : paper.ieeeterm.replace(/;/g," ; ");
        paperDomStr +=
            "</div>"+"</li>"
            +"<li style='list-style-type:none'>"+"<div class='info_left'>Publication title :  "+"</div>"+"<div class='info_right'>"+paper.publicationTitle+"</div>"+"</li>"
            +"<li style='list-style-type:none'>"+"<div class='info_left'>Keyword :  "+"</div>"+"<div class='info_right'>"+paper.keyWord+"</div>"+"</li>"
            +"<li style='list-style-type:none'>"+"<div class='info_left'>IEEETerm :  "+"</div>"+"<div class='info_right'>"+paper.ieeeterm;
        paperDomStr +=
            "</div>"+"</li>"
            +"<li style='list-style-type:none'>"+"<div class='info_left'>Publication year :  "+"</div>"+"<div class='info_right'>"+paper.publicationYear+"</div>"+"</li>"
            +"<li style='list-style-type:none'>"+"<div class='info_left'>Page number :  "+"</div>"+"<div class='info_right'>"+paper.startPage+" - "+paper.endPage+"</div>"+"</li>"
            +"<li style='list-style-type:none'>"+"<div class='info_left'>Reference count :  "+"</div>"+"<div class='info_right'>"+paper.referenceCount+"</div>"+"</li>";
        $('.info').append(paperDomStr);
    }

});