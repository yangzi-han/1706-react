import React from 'react'
import {Link} from 'dva/router'
import { Table, Divider, Button} from 'antd'
import {connect} from 'dva'
  const mapStateToProps=state=>{
    return {
        list:state.gov.list 
    }
    
  }
  const mapDispatchToProps=dispatch=>{
    return {
      getGovList:()=>{
        dispatch({
          type:'gov/getGovList'
        })
      },
      goDetail:payload=>{
        dispatch({
          type:'gov/goDetail',
          payload
        })
      },
      deteleGov:payload=>{
        
        dispatch({
          type:"gov/deteleGov",
          payload
        })
      }
    }
  }

@connect(mapStateToProps,mapDispatchToProps)

class GovList extends React.Component{
  componentDidMount(){
    this.props.getGovList()
  }
  newGov(){
    this.props.goDetail({
      type:"new",
      info:{}
    })
  }
  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '机构名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所在地区',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '校长姓名',
      key: 'master',
      dataIndex: 'master',
    },
    {
        title: '校长手机号',
        key: 'phone',
        dataIndex: 'phone',
    },
    {
        title: '是否可用',
        dataIndex: 'enable',
        key:"enable",
        render:text=><span>{text?"是":"否"}</span>
    },
    {
      title: '操作',
      key: 'index',
      render: (text, record) => (
        <span>
          <Link to="/main/addGov" onClick={()=>this.props.goDetail({type:"detail",info:record})}>
          <span>详情</span>
          </Link>
          <Divider type="vertical" />
          <Link to="/main/addGov" onClick={()=>this.props.goDetail({type:"edit",info:record})}>
          <span>编辑</span>
          </Link>
          <Divider type="vertical" />
          <span onClick={()=>this.props.deteleGov({id:record.id})}>删除</span>
        </span>
      ),
    },
  ];
        render(){
          console.log("props....",this.props)
        
          let {list}=this.props;
          console.log(list)
            return <>
            <Link to="/main/addGov" onClick={this.newGov.bind(this)}>
                <Button type="primary" style={{marginBottom:"20px"}}>新增</Button>
            </Link>
            <Table columns={this.columns} dataSource={list} />
            </>
        }
}
export default GovList