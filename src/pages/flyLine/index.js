import React,{ useState, useEffect } from 'react';
import { Layout, Menu, Tree, Tabs, Table, Dropdown } from 'antd';
import L from 'leaflet';
import styles from './index.less'

const { Content, Sider} = Layout;

function FlyLine(){

    let map =null;

    useEffect(() => {
        map = L.map('map',{
            center: [116.397428, 39.90923],
            zoom: 13
        })
        // L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',{
        //     subdomains: "1234"  
        // }).addTo(map);
       L.tileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",{
            attribution: '&copy; 高德地图',
            maxZoom: 15,
            minZoom: 10,
            subdomains: "1234"
        }).addTo(map)
      },[]);


    return (
        <Layout>
            <Content className={styles.flylineContent}>
            <div id='map' style={{height:'100%',width:'100%'}}></div>
            </Content>
        </Layout>
    )
}

export default FlyLine
