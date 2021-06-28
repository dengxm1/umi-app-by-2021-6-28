import React,{ useState, useEffect } from 'react';
import * as echarts from 'echarts';

export default function Index(){

    useEffect(()=>{
        initTopLeft();
    },[])

    const initTopLeft = () =>{
        // 基于准备好的dom，初始化echarts实例
         var myChart = echarts.init(document.getElementById('topLeft'));
         // 绘制图表
         myChart.setOption({
             title: {
                 text: ''
             },
             tooltip: {
                 trigger: 'axis'
             },
             legend: {
             },
             grid: {
                 bottom: '10%',
                 height: '60%',
                 left: '5%',
                 right:'10%',
                 width: 'auto',
                 containLabel: true,
               },
             toolbox: {
                 // feature: {
                 //     saveAsImage: {}
                 // }
             },
             xAxis: {
                 type: 'category',
                 boundaryGap: false,
                 data: ['周一','周二','周三','周四','周五']
             },
             yAxis: {
                 name: '单位：次',
                 type: 'value',
                 // show: false,
                 // axisLine:{
                 //     show:true
                 // },
                 axisTick: { show: false }, //刻度线
                 splitLine:{
                     lineStyle: {
                         type:'dashed'
                     }
                 }
             },
             series: [
                 {
                     name: '',
                     type: 'line',
                     stack: '总量',
                     data: [100,130,50,200,150],
                     symbol:'circle',
                     lineStyle:{
                         color:'#0063C7'
                     },
                     areaStyle:{
                         color: {
                             type: 'linear',
                             x: 0,
                             y: 0,
                             x2: 0,
                             y2: 1,
                             colorStops: [{
                               offset: 0, color: '#0063C7' // 0% 处的颜色
                             }, {
                               offset: 1, color: '#ffffff' // 100% 处的颜色
                             }],
                             // global: false // 缺省为 false
                           }, 
                     }
                 },
             ]
           }) 
    }

    return (
        <div style={{height:'100%',background:'#ffffff'}}>
            <div style={{height:'100%'}}  id="topLeft"></div>
        </div>
    )
}