$(document).ready(
    function (){
        authorId = window.location.href.split('?')[1].split('=')[1];

        let URL = "/Portrait/Author/id/"+authorId
        getRequest(
            URL,
            function (res){
                console.log(res.content)
                showDetail(res.content[0])
            }
        )

        function showDetail(data){
            console.log(data);
            $('#author_name').text(data.author_name)
            //涛涛说以后不允许我写注释了，我好伤心
            $('#heat').text(data.heat)
            //我不要他了
            $('#affiliation_name').text(data.affiliation)
            drawAutherChart(data.keywords)
            drawAutherYearCharts(data.publicationYearCount)
            showPapers(data.paperTitles)
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

            for(let i=0;i<titles.length;i++){
                link = getPaperLink(titles[i])


            }

        }

        function getPaperLink(preTitle){
            var tempLink = ""
            let title = preTitle.replace(/\s+/g,"%20")
            doi = getDOI(title)
            $.ajax(
                "/document/DOI?doi="+doi,
                {
                    async: false,
                    success: function (res){
                        tempLink = res.content[0].pdflink
                    }

                }
            )
            console.log(tempLink)
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


    }

)