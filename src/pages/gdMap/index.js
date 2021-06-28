import React,{ useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Layout,Row, Col  } from 'antd';
import styles from './index.less';

const { Content} = Layout;

export default function Index(){

    
    useEffect(()=>{
        var map = new AMap.Map('container', {
            zoom:11,//级别
            center: [116.397428, 39.90923],//中心点坐标
            viewMode:'3D'//使用3D视图
        });
    },[])

    return (
        <Layout>
            <Content className={styles.flylineContent}>
                <div style={{width:'300px',height: '180px' }} id="container"></div> 
            </Content>
        </Layout>
    )
}
