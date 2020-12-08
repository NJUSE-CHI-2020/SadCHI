$(document).ready(
    function (){
        authorId = window.location.href.split('?')[1].split('=')[1];
        currentPage = 0;
        totalPage = 0;
        dataList = []
        let URL = "/Portrait/Author/id/"+authorId
        getRequest(
            URL,
            function (res){
                showDetail(res.content[0])
            }
        )

        function showDetail(data){
            $('#author_name').text(data.author_name)
            //涛涛说以后不允许我写注释了，我好伤心
            $('#heat').text(data.heat)
            //我不要他了
            $('#affiliation_name').text(data.affiliation)
            $('#publication_count').text(data.publication_count)
            drawAutherChart(data.keywords)
            drawAutherYearCharts(data.publicationYearCount)
            dataList = data.paperTitles
            totalPage = data.paperTitles.length%6===0 ? data.paperTitles.length/6 : Math.floor(data.paperTitles.length/6)+1;
            currentPage =1;
            $("#cp-count").text(dataList.length);
            $("#total-page").text(totalPage);
            showPapers(data.paperTitles.slice((currentPage-1)*10,currentPage*10))
        }

        function drawAutherChart(data) {
            var mychart = echarts.init(document.getElementById('charts1'));
            var keyWords = data;
            var wordData = new Array();
            for (var i in keyWords) {
                var tmpObj = {name: i, value: keyWords[i]};
                wordData.push(tmpObj);
            }

            var option = {
                backgroundColor: '#fff',

                tooltip: {
                    show: false
                },

                series: [{
                    type: 'wordCloud',
                    gridSize: 1,
                    sizeRange: [12, 55],
                    rotationRange: [-45, 0, 45, 90],
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' +
                                    Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) + ')'
                            }
                        }
                    },
                    left: 'center',
                    top: 'center',
                    // width: '96%',
                    // height: '100%',
                    right: null,
                    bottom: null,
                    width: 300,
                    height: 200,
                    draggable: true,
                    // top: 20,
                    data: wordData
                }]
            };
            mychart.setOption(option);
        }

        function showPapers(titles){
            $('.papers').empty()
            $("#curr-page").text(currentPage)
            for(let i=0;i<titles.length;i++){
                paperObj = getPaperObj(titles[i])
                var item = document.createElement("div"); item.className="item";
                var h3 = document.createElement("h3");
                var link = document.createElement("a"); link.href=paperObj.pdflink; link.innerText=paperObj.title;
                h3.appendChild(link);
                var para1 = document.createElement("p");
                var span = document.createElement("span"); span.id="year"; span.innerText=paperObj.publicationYear;
                para1.appendChild(span);
                var para2 = document.createElement("p"); para2.className="text-info";para2.innerText=paperObj.authors.replace(/[?]/g,"");
                item.appendChild(h3);item.appendChild(para1);item.appendChild(para2);
                $('.papers').append(item);
            }

        }

        function getPaperObj(preTitle){
            var tempLink = ""
            let title = preTitle.replace(/\s+/g,"%20")
            doi = getDOI(title)
            $.ajax(
                "/document/DOI?doi="+doi,
                {
                    async: false,
                    success: function (res){
                        tempLink = res.content[0]
                    }

                }
            )
            return tempLink
        }

        function getDOI(title){
            var tempDOI = ""
            $.ajax(
                "/document/Title/"+title,
                {
                    async:false,
                    success:function (res){
                        tempDOI = res.content[0].doi
                    }
                }
            )
            return tempDOI
        }

        function drawAutherYearCharts(data) {
            var yearDataTmp = data;
            var yearData = new Array();
            for (var i in yearDataTmp) {
                var tmpObj = {name: i, value: yearDataTmp[i]};
                yearData.push(tmpObj);
            }
            var option = {
                title: {
                    text: ""
                },

                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data: yearData,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    formatter: '{b} ({d}%)'
                                },
                                labelLine: {show: true}
                            }
                        }
                    }
                ]
            };

            var mychart = echarts.init(document.getElementById('charts2'));
            mychart.setOption(option);
        }

        $("#home").click(function () {
            currentPage = 1;
            showPapers(dataList.slice((currentPage-1)*6,currentPage*6));
        });

        $("#prev").click(function () {
            let next = currentPage;
            if (next <= 1)
                return;
            currentPage -= 1;
            showPapers(dataList.slice((currentPage-1)*6,currentPage*6));
        });

        $("#next").click(function () {
            var last = currentPage;
            if (last == totalPage)
                return;
            currentPage += 1;
            showPapers(dataList.slice((currentPage-1)*6,currentPage*6));
        });

        $("#last").click(function () {
            currentPage = totalPage;

            showPapers(dataList.slice((currentPage-1)*6,currentPage*6));
        });

        $("#goTo").click(function () {
            let target = $("#goToPage").val();
            if (target == undefined)
                target = currentPage;
            target = Math.max(1, Math.min(totalPage, target));
            currentPage = target;
            showPapers(dataList.slice((currentPage-1)*6,currentPage*6));
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
                showPapers(dataList.slice((currentPage-1)*6,currentPage*6));
                $("#goToPage").val("");
            }
        });

    }

)