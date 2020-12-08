$(document).ready(function () {
    affiliationId = window.location.href.split('?')[1].split('=')[1];
    currentPage = 0;
    totalPage = 0;
    affiliationPortrait(affiliationId);
    let data;
    $("#tableContent").hide();
    $(".c-pages").hide();

    function affiliationPortrait(affiliationId) {
        let URL = '/Portrait/Affiliation/id/'+affiliationId;
        getRequest(
            URL,
            function (res) {
                data = res.content;
                if(!data.mostRefDocu || data.mostRefDocu.length==0){data.mostRefDocu = undefined;}
                totalPage = data.authorOfAffiliation.length%10===0 ? data.authorOfAffiliation.length/10 : Math.floor(data.authorOfAffiliation.length/10)+1;
                currentPage =1;
                $("#cp-count").text(data.authorOfAffiliation.length);
                $("#total-page").text(totalPage);
                $("#affiliation_name").text(data.name)
                $("#author_count").text(data.authorCount);
                $("#document_count").text(data.docuCount);
                $("#reference_count").text(data.refCount);
                $("#country").text(data.country);
                $("#heat").text(data.heat);
                affCharts(data);
                showAuthorList(data.authorOfAffiliation.slice((currentPage-1)*10,currentPage*10));
                $("#tableContent").show();
                $(".c-pages").show();
                addModal(data.mostRefDocu);
                sessionStorage.setItem('affiliationId',affiliationId);
            },
            function () {
                alert("Sorry, some errors might happen");
            }
        )
    }

    function addModal(objList) {
        var modal = document.createElement('div'); modal.className="reference-body";
        var ul = document.createElement('ul'); ul.className="reference-group";
        if(!objList){
            var li = document.createElement('li'); li.className="reference-group-item";
            li.innerText = "No Most Referenced Paper!";
        }
        else {
            for (var k = 0; k < objList.length; k++) {
                var li = document.createElement('li');
                li.className = "reference-group-item";
                var link = document.createElement('a');link.className="reference_link";
                $.ajax({
                    url:"/document/DOI?doi="+objList[k].doi,
                    async:false,
                    success: function (res) {
                        link.href = "/paperDetail?doi="+res.content[0].doi;
                    },
                    error:function(err) {
                        alert("link has been deprecated.");
                        link.href = "#";
                    }
                });
                link.innerText = objList[k].title;
                li.appendChild(link);
                ul.appendChild(li);
            }
        }
        modal.appendChild(ul).appendChild(li);
        $('#reference-container').append(modal);
    }

    function affCharts(data) {
        drawWordCloud(data);
        drawBarChart(data);
    }

    function drawWordCloud(data) {
        var mychart = echarts.init(document.getElementById('charts1'));
        var clouddata = data.keyWord.slice(1, -2).split(";");
        var wordData = new Array();
        if (clouddata.length<2) {
            $("#charts1").text("关键词不足，词云图无法制作");
            $("#charts1").css('padding-top','25%');
            $("#charts1").css('padding-bottom','25%');
            return;
        }
        clouddata.forEach(function (value) {
            var tmp = value.split(",");
            if (tmp[0] != null && tmp[0] != "null" && tmp[0] != "nullnull") {
                var tmpOb = {name: tmp[0], value: parseInt(tmp[1])}
                wordData.push(tmpOb);
            }
        });
        if (isNaN(wordData[0].value)) {
            wordData[0] = {name: "No data", value: 100};
        }
        var option = {
            // backgroundColor: '#fff',

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
                width: 300,
                height: 200,
                // top: 20,
                data: wordData
            }]
        }
        mychart.setOption(option);
    }

    function drawBarChart(data) {
        var mychart = echarts.init(document.getElementById('charts2'));
        var option = {
            tooltip: {
                show: true,
                trigger: "item"
            }
            ,
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        title: "数据视图",
                        show: true,
                        readOnly: true
                    },
                    restore: {
                        title: "还原",
                        show: true
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    saveAsImage: {
                        show: true,
                        type: 'png',
                        title: "保存为图片"
                    }
                }
            }
            ,
            yAxis: {

                type: 'value'

            },
            xAxis: {
                data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
            },
            series: [{
                type: 'line',
                data: data.docuCountByYear
            }]
        };
        mychart.setOption(option);
    }

    function showAuthorList(list,page) {
        $(".author").empty();
        $("#curr-page").text(currentPage)
        for ( let i = 0; i < list.length; i++ ) {
          const temp = document.createElement( 'tr' )
          let row = $( temp )
          const name = $( '<td><a href=\''+"/authorDetail?authorId="+list[i].author_id+'\' id=\'' + list[ i ].author_id + '\'>' + list[ i ].author_name + '</a></td>' )
          const publication_count = $( '<td>' + list[ i ].publication_count + '</td>' )
          const heat = $( '<td>' + list[ i ].heat + '</td>' )
          row.append( name ).append( publication_count ).append( heat )
          $( 'tbody.author' ).append( row )
        }
    }

    $("#home").click(function () {
        currentPage = 1;
        showAuthorList(data.authorOfAffiliation.slice((currentPage-1)*10,currentPage*10));
    });

    $("#prev").click(function () {
        let next = currentPage;
        if (next <= 1)
            return;
        currentPage -= 1;
        showAuthorList(data.authorOfAffiliation.slice((currentPage-1)*10,currentPage*10));
    });

    $("#next").click(function () {
        var last = currentPage;
        if (last == totalPage)
            return;
        currentPage += 1;
        showAuthorList(data.authorOfAffiliation.slice((currentPage-1)*10,currentPage*10));
    });

    $("#last").click(function () {
        //console.log(totalPage);
        currentPage = totalPage;

        showAuthorList(data.authorOfAffiliation.slice((currentPage-1)*10,currentPage*10));
    });

    $("#goTo").click(function () {
        let target = $("#goToPage").val();
        if (target == undefined)
            target = currentPage;
        target = Math.max(1, Math.min(totalPage, target));
        currentPage = target;
        showAuthorList(data.authorOfAffiliation.slice((currentPage-1)*10,currentPage*10));
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