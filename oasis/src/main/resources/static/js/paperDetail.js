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
                    showPaperDetail(dataList);
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

    function showPaperDetail(data) {
        console.log(data);
    }

});