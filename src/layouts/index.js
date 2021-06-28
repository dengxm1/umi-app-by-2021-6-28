import React,{useState, useEffect} from 'react';
import { Layout, Menu } from 'antd';
import {Link, history} from 'umi';

import styles from './index.less';

const { Sider } = Layout;

function BasicLayout(props) {

  const [selectedKeys,setSelectedKeys] = useState('/');
  const [collapsed, setCollapsed] = useState(0);

  useEffect(()=>{
    setSelectedKeys(props.match.url)
    history.replace(props.match.url)
  },[])


  const collapse = collapsed =>{
    setCollapsed(collapsed)
  }

  const menuSelect = ({item, key, keyPath, selectedKeys}) =>{
      setSelectedKeys(key)
  }

const trigger = (<div className={`${styles.triggerContent} ${collapsed?styles.openTigger:styles.closeTigger}`}></div>)

  return (
    <Layout className={styles.mainLayout}>
    <Sider
      breakpoint="lg"
      // collapsedWidth="0"
      collapsible
      trigger={trigger}
      onCollapse={collapse}
      theme="light"
    >
      <div className="logo" />
      <Menu mode="inline" selectedKeys={[selectedKeys]} onSelect={menuSelect}>
      <Menu.Item key="/">
        <Link to="/">飞线图</Link>             
        </Menu.Item>
        <Menu.Item key="/x6">
           <Link to="/x6">antv/x6</Link>        
        </Menu.Item>
        <Menu.Item key="/ehcarts">
        <Link to="/ehcarts">ehcarts</Link>       
        </Menu.Item>
        <Menu.Item key="/gdMap">
        <Link to="/gdMap">高德地图</Link>    
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className={styles.mainWrapLayout}>
       {props.children}
    </Layout>
  </Layout>
  );
}

export default BasicLayout;
