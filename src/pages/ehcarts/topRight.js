import React,{ useState, useEffect } from 'react';
import * as echarts from 'echarts';

export default function Index(){

    useEffect(()=>{
        // initTopLeft();
        initdataCreateChar();
    },[])

    const initdataCreateChar = () =>{
        const selectedConditionChart = echarts.init(
            document.getElementById('topRight')
          ); 
          selectedConditionChart.setOption({
            tooltip: {
                trigger: 'item'
            },
            grid: {
                bottom: '5%',
                left:'5%',
                height:'60%',
                // right:'20%',
                width: 'auto',
                containLabel: true,
              },
            legend: {
                icon:'circle',
                top:'30%',
                right:'15%',
                orient: 'vertical',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    fontSize: 14,
                    color:'rgb(0,0,0)'
                  },
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '65%'],
                    center: ["30%", "50%"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            color:'#4c4a4a',
                            formatter: '{tip|数据总量}'+ '\n\n\r' + '{total|'+'1432'+'}'+'{unit|条}',
                            rich: {
                                tip:{
                                    fontSize: 14,
                                    fontFamily : "微软雅黑",
                                    color:'#6c7a89',
                                 
                                },
                                total: {
                                    fontFamily : "微软雅黑",
                                    fontSize: 32,
                                    color:'#454c5c',
                                    lineHeight:32,
                                },
                                unit:{
                                    fontSize: 18,
                                    fontFamily : "微软雅黑",
                                    color:'#6c7a89',
                                }
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 1048, name: '实时雨水情数据'},
                        {value: 735, name: '气象标准化降水数据'},
                        {value: 580, name: '历史整编数据'},
                        {value: 484, name: '水文基础地理信息数据'}
                    ]
                }
            ]
          })
    }
    

    return (
        <div style={{height:'100%',background:'#ffffff'}}>
            <div style={{height:'100%'}} id="topRight"></div>
        </div>
    )
}