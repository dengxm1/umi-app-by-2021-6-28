import React,{ useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Layout,Row, Col  } from 'antd';
import styles from './index.less';
import TopLeft from './topLeft'
import TopRight from './topRight'
import BottomLeft from './bottomLeft'
import BottomRight from './bottomRight'

const { Content} = Layout;

export default function Index(){


    return (
        <Layout>
            <Content className={styles.ehcartsContent}>
            {/* <div style={{height:'600px',width:'600px',background:'#ffffff'}}>
              <div style={{height:'100%',width:'100%'}} className={styles.topLeft}  id="topLeft"></div>
            </div> */}
             
                <div className={styles.rowContent} style={{height:'100%'}}>
                    <Row>   
                        <Col span={12}>
                          <TopLeft/>
                        </Col>
                    <Col span={12}>
                        {/* <div style={{height:'100%',background:'#ffffff'}}>
                             <div style={{height:'100%'}} id="topRight"></div>
                        </div> */}
                        <TopRight/>
                    </Col>
                    <Col span={12}>
                         <BottomLeft/>
                        </Col>
                        <Col span={12}>
                           <BottomRight/>
                        </Col>
                    </Row>
                </div>
           
            </Content> 
        </Layout>
    )
}