import { Layout, Menu, Tree, Tabs, Table, Dropdown } from 'antd';
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { DatabaseOutlined, FolderOutlined, TableOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Graph,Shape, Node, ToolsView, EdgeView  } from '@antv/x6';

const { Content, Sider} = Layout;
const { TabPane } = Tabs;

const treeData = [
  {
    title: 'dm',
    key: '0-0',
    type:1,
    children: [
      {
        title: 'CESHI',
        key: '0-0-0',
        type:3,
      },
      {
        title: 'DWD_BZ_ST_RIVER_R',
        key: '0-0-1',
        type:3,
      },
      {
        title: 'RIVER',
        key: '0-0-2',
        type:3,
      },
      {
        title: 'UED',
        key: '0-0-3',
        type:2,
        children:[
          {
              title: 'ABCD',
              key: '0-0-3-0',
              type:3,
          },
          {
              title: 'ACC',
              key: '0-0-3-1',
              type:3,
          },
          {
              title: 'TEST1',
              key: '0-0-3-2',
              type:3,
          },
        ]
      },
    ],
  },
  {
    title: 'test0527',
    key: '0-1',
    type:1,
    children: [
      {
        title: 'TEST1',
        key: '0-1-0',
        type:3,
      },
      {
        title: 'TEST2',
        key: '0-1-1',
        type:3,
      },
      {
        title: 'TEST3',
        key: '0-1-2',
        type:3,
      },
    ],
  },
];

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (row.type) {
    obj.props.colSpan = 0;
  }
  return obj;
};
const columns=[
  {
    title: '字段名',
    dataIndex: 'name',
    render: (text, row, index) => {
      if (!row.type) {
        return <span>{text}</span>;
      }
      return {
        children: <span>{text}</span>,
        props: {
          colSpan: 6,
        },
      };
    },
  },
  {
    title: '别名',
    dataIndex: 'alias',
    render: renderContent
  },
  {
    title: '数据类型',
    dataIndex: 'dataType',
    render: renderContent
  },
  {
    title: '主键',
    dataIndex: 'primayKey',
    render: renderContent
  },
  {
    title: '是否允许为空',
    dataIndex: 'isNull',
    render: renderContent
  },
  {
    title: '可见性',
    dataIndex: 'visible',
    render: renderContent
  },
]

const data = [
  {
    key: 1,
    name: '学生表',
    type:1,
    children:[
      {
        key: '0',
        name: 'id',
        alias: '-',
        dataType: 'int',
        primayKey: '是',
        isNull: '否',
        visible: 1,
        },
      {
        key: '1',
        name: 'name',
        alias: 'n',
        dataType: 'char',
        primayKey: '是',
        isNull: '否',
        visible: 1,
      },
      {
        key: '2',
        name: 'age',
        alias: 'a',
        dataType: 'int',
        primayKey: '否',
        isNull: '否',
        visible: 1,
      },
      {
        key: '3',
        name: 'sex',
        alias: 's',
        dataType: 'char',
        primayKey: '否',
        isNull: '否',
        visible: 1,
      },
    ]
  },
]

class ContextMenuTool extends ToolsView.ToolItem{

  render() {
    super.render()
    this.knob = ToolsView.createElement('div', false)
    this.knob.style.position = 'absolute'
    this.container.appendChild(this.knob)
    this.updatePosition(this.options)
    setTimeout(() => {
      this.toggleTooltip(true)
    })
    return this
  }

  toggleTooltip(visible) {
    ReactDOM.unmountComponentAtNode(this.knob)
    document.removeEventListener('mousedown', this.onMouseDown)

    if (visible) {
      ReactDOM.render(
        <Dropdown
          visible={true}
          trigger={['contextMenu']}
          overlay={this.options.menu}
        >
          <a />
        </Dropdown>,
        this.knob,
      )
      document.addEventListener('mousedown', this.onMouseDown)
    }
  }

     updatePosition(pos) {
    const style = this.knob.style
    if (pos) {
      style.left = `${pos.x}px`
      style.top = `${pos.y}px`
    } else {
      style.left = '-1000px'
      style.top = '-1000px'
    }
  }

   onMouseDown = (e) => {
    setTimeout(() => {
      this.updatePosition()
      this.toggleTooltip(false)
      if (this.options.onHide) {
        this.options.onHide.call(this)
      }
    }, 200)
  }
}

ContextMenuTool.config({
  tagName: 'div',
  isSVGElement: false,
})


Graph.registerEdgeTool('contextmenu', ContextMenuTool, true)
Graph.registerNodeTool('contextmenu', ContextMenuTool, true)

export default function() {

  const onExpand = (expandedKeys)=>{
    console.log('expandedKeys',expandedKeys)
  }

  let graph = null;
  useEffect(() => {
    let container = document.getElementById('container')
    graph = new Graph({
      container,
      grid: true,
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#47C769',
            },
          },
        },
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
            },
          },
        },
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: {
          name: 'er',
          args: {
            direction: 'V',
          },
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#a0a0a0',
                strokeWidth: 1,
                targetMarker: {
                  tagName: 'path',
                  stroke: 'none',
                },
              },
            },
          })
        },
        validateConnection({ sourceView, targetView, targetMagnet }) {
          if (!targetMagnet) {
            return false
          }
    
          if (targetMagnet.getAttribute('port-group') !== 'left') {
            return false
          }
          return true
        },
      }
    });
    const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item>移除表格</Menu.Item>
      </Menu>
    )

    //连接桩的显示和隐藏
    const changePortsVisible = (visible) => {
      const ports = container.querySelectorAll(
        '.x6-port-body',
      )
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = visible ? 'visible' : 'hidden'
      }
    }

    graph.on('node:mouseenter', ( e) => {
      // this.setState({removeNodeId:e.cell.id})
      changePortsVisible(true)
    })
    graph.on('blank:mousemove', ({ e,x,y }) => { 
      console.log('mousemovemousemove',x,y)
    })
    
    graph.on('node:mouseleave', () => {
      changePortsVisible(false)
    })  

    graph.on('blank:mouseup', ({ e, x, y }) => { 
       console.log('blank:mouseup',e,x,y) 
    })
    //边添加删除按钮
    graph.on('edge:mouseenter', ({ edge }) => {
      edge.addTools([
        {
          name: 'button-remove',
          args: {
          },
        },
      ])
    })
    
    //边移除删除按钮
    graph.on('edge:mouseleave', ({ edge }) => {
      edge.removeTools()
    })

    //右键添加时间菜单
    graph.on('node:contextmenu', ({ cell, e }) => {
      const p = graph.clientToGraph(e.clientX, e.clientY)
      cell.addTools([
        {
          name: 'contextmenu',
          args: {
            menu,
            x: p.x,
            y: p.y,
            onHide() {
              this.cell.removeTools()
            },
          },
        },
      ])
    })
         //添加节点
        drawNode(1,120,60,'World')
       drawNode(2,180,240,'hello');
  },[]);

  //绘制表格
  const drawNode = (id,x,y,label) =>{
    if(graph.hasCell(id)) return
    const wrap = document.createElement('div')
    wrap.style.width = '100%'
    wrap.style.height = '100%'
    wrap.style.display = 'flex'
    wrap.style.alignItems = 'center'
    wrap.style.justifyContent = 'center'
    wrap.style.background = '#EEEEEE'
    wrap.style.borderLeft = '6px solid #0063C7'
    wrap.style.overflow = 'hidden'
    wrap.style.whiteSpace = 'nowrap'
    wrap.style.textOverflow = 'ellipsis'
    wrap.innerText = label
    graph.addNode({
      id,
      shape: 'html',
      x,
      y,
      width: 135,
      height: 40,
      zIndex: 2,
      html: wrap,
      ports:{
        groups:{
               right:{
                position: 'right',
                attrs: {
                    circle: {
                    r: 5,
                    magnet: true,
                    stroke: '#333333',
                    strokeWidth: 2,
                    fill: '#EEEEEE',
                    style: {
                      visibility: 'hidden',
                    }
                    }  
                  }
               },
               left:{
                position: 'left',
                attrs: {
                    circle: {
                    r: 5,
                    magnet: 'passive',
                    stroke: '#333333',
                    strokeWidth: 2,
                    fill: '#EEEEEE',
                    style: {
                      visibility: 'hidden',
                    }
                    }  
                  }
               },
            },
         items: [
            {
                id: 'port1',
                group: 'right' // 指定分组名称
              },
            {
                id: 'port2',
                group: 'left' // 指定分组名称
              },
          ]
        }
    })
  }

  const onMenuClick = () =>{
    console.log('移除表格')
  }

  const titleRender = (nodeData) =>{
    if (nodeData.type == 1) {
      return (
        <div><DatabaseOutlined /><span style={{marginLeft:'9px'}}>{nodeData.title}</span></div>
      )
    }
    if (nodeData.type == 2) {
      return (
        <div><FolderOutlined /><span style={{marginLeft:'9px'}}>{nodeData.title}</span></div>
      ) 
    }
    if (nodeData.type == 3) {
      return (
        <div><TableOutlined style={{ color: "#1890ff" }} /><span style={{marginLeft:'9px',color: "#1890ff"}}>{nodeData.title}</span></div>
      ) 
    }
  }

  const tabChange = (key) =>{
    console.log(key);
  }

  return (
    <Layout>
      <Sider  theme="light" className="site-layout-background" width={250}>
          <Tree
              onExpand={onExpand}
              defaultExpandAll
              autoExpandParent={true}
              treeData={treeData}     
              titleRender={(nodeData)=>titleRender(nodeData)}
            />
            </Sider>
        <Content className={styles.siteLayoutBackground}>
          <div className={styles.canvasContent} id="container"></div>
          <div className={styles.listContent}>
          <Tabs defaultActiveKey="1" onChange={tabChange}>
              <TabPane tab="表信息" key="1">
              <Table
                pagination={false}
                columns={columns}
                dataSource={data}
              />
              </TabPane>
          </Tabs>
          </div>
      </Content>
   </Layout>
  );
}
