$(document).ready(function () {
    fieldId = window.location.href.split('?')[1].split('=')[1];
    showFieldDetail(fieldId);

    function showFieldDetail(id) {
        getRequest(
            "/Portrait/Direction/id/"+id,
            function (res) {
                drawDirectionAuthorChart(res.content);
            }
        )
    }

    function drawDirectionAuthorChart(data) {
        $("#FieldList").attr('href',"/fieldList?field="+sessionStorage.getItem('fieldItem'));
        const authorData = data.authorOfDirection;
        const nodes = new Array();
        for(let i=0;i < authorData.length;i++){
            const authorName = authorData[i].author_name;
            const affName = authorData[i].affiliation;
            const tmpName = authorName+"("+affName+")";
            const authorValue = parseInt(authorData[i].publication_count);
            const tmpObj = {name:tmpName,value:authorValue,symbolSize:authorValue * 15}
            nodes.push(tmpObj);
        }

        let option = {
            title: {
                text: "Activation of Affiliation",
                textAlign: "auto"
            },
            series: [{
                type: 'graph',
                layout: 'force',
                itemStyle: {
                    normal: {
                        color: function () {
                            return 'rgb(' +
                                Math.round(Math.random() * 255) +
                                ', ' + Math.round(Math.random() * 255) +
                                ', ' + Math.round(Math.random() * 255) + ')'
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',//设置label显示的位置
                        formatter: '{b}:{c}',//设置label读取的值为value
                        textStyle: {
                            fontSize: '12rem'
                        },
                    }
                },
                draggable: true,
                data: nodes,
                force: {
                    edgeLength: 50,
                    repulsion: 200,
                    gravity: 0.1
                }
            }],

        };

        let mychart = echarts.init(document.getElementById('charts'));
        mychart.setOption(option);
    }
});