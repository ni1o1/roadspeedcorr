//创建两个图表
var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};

//myChart是百度地图的部分
myChart.setOption(option = {
		title: {
        text: "路网车速关联性",
        left: 10,
        top: 10,
        textStyle: {
            color: 'rgba(18,89,147,1)',
            fontSize: 40
        }
    },
		animation: false,
		//bmap组件是百度地图的参数
		bmap: {
			center: [121.401206, 31.203083],
			zoom: 12,
			roam: true,
			//地图个性化设置
			mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
		},
		series: [
		]
	});
if (!app.inNode) {
	// 添加百度地图插件
	var bmap = myChart.getModel().getComponent('bmap').getBMap();
	bmap.addControl(new BMap.MapTypeControl());
}
//读取数据
$.getJSON('data/osmroad.json', function (osmroad) {
myChart.setOption(option = {
	visualMap: {
            min: 800,
            max: 50000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
			seriesIndex:0,
            inRange: {
                color: ['rgb(0,0,255)', 'rgb(230,230,230)', 'rgb(255,0,0)']
            }
        },
	        series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: osmroad,
            silent: false,
            lineStyle: {
                color: 'rgb(200,200,200)',
                opacity: 1,
                width: 2
            },
            progressiveThreshold: 500,
            progressive: 200
        },{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: [],
            silent: false,
            lineStyle: {
                color: 'rgb(0, 0, 0)',
                opacity: 1,
                width: 3
            },
            progressiveThreshold: 500,
            progressive: 200
        }]
})

var fieldSelect = $(".Line2").children("select");
thistype = fieldSelect.val()

myChart.on('click', function (params)
{
	
	roadname = params['data']['name']
	
$.getJSON('data/corr/'+roadname+'_'+thistype+'.json', function (data_1) {
	
	
var data_in = [];
        for (var i = 0; i < data_1.length; i += 1) {
			v = osmroad[i]
			v.value = data_1[i]*10000
			data_in.push(v)
			}
				vmax = 20
			/*	Math.max(Math.max.apply(Math,data_1),-Math.min.apply(Math,data_1))*10000*/
		myChart.setOption(option = {visualMap:{max:vmax*0.9,min:-vmax*0.9},
			series:[{data:data_in},{data:[params['data']]}]
		})

})

fieldSelect.change(function ()
{
thistype = $(this).val()
console.log(thistype)
$.getJSON('data/corr/'+roadname+'_'+thistype+'.json', function (data_1) {
	
	
var data_in = [];
        for (var i = 0; i < data_1.length; i += 1) {
			v = osmroad[i]
			v.value = data_1[i]*10000
			data_in.push(v)
			}
				vmax = 20
			/*	Math.max(Math.max.apply(Math,data_1),-Math.min.apply(Math,data_1))*/
		myChart.setOption(option = {visualMap:{max:vmax*0.9,min:-vmax*0.9},
			series:[{data:data_in},{data:[params['data']]}]
		})

})
})

})
});