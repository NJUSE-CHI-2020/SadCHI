$(document).ready(
    ()=>{
        authorId = window.location.href.split('?')[1].split('=')[1];
        showAuthorRelation(authorId);

        function showAuthorRelation(authorId){
            let URL = "/Portrait/Author/showNewRelationById/" + authorId
            getRequest(
                URL,
                function (res){
                    drawRelatioin(res.content)
                }
            )
        }

        function drawRelatioin(data){//(data,author_id) {
                var nameNodes = new Array();
                var nodes = new Array();
                var links = new Array();
                var index = 0;

                for (var i in data.content) {
                    var obj = data.content[index];
                    if (!exists(nameNodes,obj.a_name)) {
                        nameNodes.push({name:obj.a_name,weight:obj.relation,id:obj.a_id,coworkpapers:obj.coworkpapers})
                    }
                    if (!exists(nameNodes,obj.b_name)) {
                        nameNodes.push({name:obj.b_name,weight:obj.relation,id:obj.b_id,coworkpapers:obj.coworkpapers})
                    }
                    var tmpLink = {source: obj.a_name, target: obj.b_name ,weight:obj.relation};
                    links.push(tmpLink);
                    index++;
                }
                index = 0;
                for (var i in nameNodes) {
                    var sb = 30;
                    var wg = nameNodes[i].weight;
                    if(index === 0){
                        sb = 90;
                    }

                    else if(wg < 25){
                        sb = 15 + wg*3
                    }
                    else{
                        sb = 90;
                    }
                    var tmpObj = {name: nameNodes[index].name,value:wg ,symbolSize:sb,id:nameNodes[index].id,coworkpapers:nameNodes[index].coworkpapers};
                    nodes.push(tmpObj);
                    index++;
                }

                // console.log(nodes);
                // console.log(links);
                var option = {
                    title: {
                        text: "合作关系图谱"
                    },

                    backgroundColor: '#fff',

                    tooltip: {
                        show: true
                    },

                    series: [{
                        type: 'graph',
                        name: "相关学者",
                        layout: 'force',
                        roam:true,
                        //symbol: 'pin',
                        ribbonType: false,


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
                                formatter: '{b}',//设置label读取的值为value
                                textStyle: {
                                    fontSize: '12rem'
                                },
                            }
                        },
                        draggable: true,
                        force: {
                            edgeLength: 30,
                            repulsion: 50,
                            gravity:0.01
                        },

                        nodes: nodes,//同data,关系图的节点数据列表。
                        links: links,
                    }]
                };

                var mychart = echarts.init(document.getElementById('charts'));
                mychart.setOption(option);
            }



    }
)