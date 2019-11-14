import React from 'react'
import { connect } from 'dva'
import { Input } from 'antd';
const mapStateToProps=state=>{
  return {
    type: state.gov.type,
    info: state.gov.info
  }
}
@connect(mapStateToProps)
class NewGov extends React.Component{
          render(){
            console.log("this.props",this.props)
            return <>
            机构名称：<Input placeholder="default size" />
            <Input placeholder="Basic usage" />
            <Input placeholder="Basic usage" />
            <Input placeholder="Basic usage" />
            <Input placeholder="Basic usage" />
            <Input placeholder="Basic usage" />
            <Input placeholder="Basic usage" />
            <Input placeholder="Basic usage" />
            <Input placeholder="Basic usage" />
            <Input placeholder="Basic usage" />
            </>
          }
}
export default NewGov