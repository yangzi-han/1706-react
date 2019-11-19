import React from 'react'
import { connect } from 'dva'
import {
  Form,
  Input,
  Checkbox,
  Modal,
  Button
} from 'antd';
const {confirm}=Modal
const mapStateToProps=state=>{
  return {
    type: state.gov.type,
    info: state.gov.info
  }
}
const mapDispatchToProps=dispatch=>{
  return {
    addGov:payload=>{
      dispatch({
        type:"gov/addGov",
        payload
      })
    },
    putGov:payload=>{
      dispatch({
        type:"gov/putGov",
        payload
      })
    }
  }
}
@connect(mapStateToProps,mapDispatchToProps)
@Form.create()
class NewGov extends React.Component{
  ///提交表单
  handleSubmit = e => {
    this.props.form.validateFields((err,vals)=>{
      console.log("errrr....",err,vals)
      console.log(this)
      if(err){

      }else{
        confirm({
        title:`${this.props.type==='new'?'您确定要新建吗?':'您确定要修改机构信息吗?'}`,
        onOk:()=>{
          console.log(vals);
          this.props.addGov(vals);
          this.props.putGov(vals)
        }
        })
      }
    })
  };
  //清空表单
  resetForm=e=>{
    //清空列表             
    this.props.form.resetFields()
  }
  componentDidMount(){
    setTimeout(()=>{
      //设置初始值
      let {id,...info}=this.props.info
      this.props.form.setFieldsValue(info)
    })
  }
  get disabled(){
    return this.props.type==="detail"
  }
  back=()=>{
    this.props.history.goBack()
  }
          render(){
            const { getFieldDecorator } = this.props.form;
            const formItemLayout = {
              labelCol: {
                xs: { span: 18 },
                sm: { span: 8 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
              },
            };
            const tailFormItemLayout = {
              wrapperCol: {
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              },
            };
            console.log("this.props",this.props)
            return <>
            {this.disabled?<Button onClick={()=>this.back()}>返回</Button>:null}
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="机构名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入您的机构名称',
              },
            ],
          })(<Input disabled={this.disabled} />)}
        </Form.Item>
        <Form.Item label="机构地区">
          {getFieldDecorator('area', {
            rules: [
              {
                required: true,
                message: '请输入您的机构地区',
              },
            ],
          })(<Input disabled={this.disabled} />)}
        </Form.Item>
        <Form.Item label="机构地址">
          {getFieldDecorator('addres', {
            rules: [
              {
                required: true,
                message: '请输入您的机构地址',
              },
            ],
          })(<Input disabled={this.disabled} />)}
        </Form.Item>
        <Form.Item label="校长姓名">
          {getFieldDecorator('master', {
            rules: [
              {
                required: true,
                message: '请输入校长姓名',
              },
            ],
          })(<Input disabled={this.disabled} />)}
        </Form.Item>
        <Form.Item label="校长手机号">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: '请输入校长手机号',
              },
            ],
          })(<Input disabled={this.disabled} />)}
           <Form.Item >
         <span>合同信息</span>
        </Form.Item>
        <Form.Item label="合同编号">
          {getFieldDecorator('num')(<Input />)}
        </Form.Item>
        <Form.Item label="是否可用">
          {getFieldDecorator('enable', {
            valuePropName: 'checked'
          })(<Checkbox />)}
        </Form.Item>
        </Form.Item>
        { this.disabled?null:<Form.Item {...tailFormItemLayout}>
          <Button onClick={this.resetForm}>取消</Button>
          <Button type="primary" htmlType="submit"  style={{marginLeft: '30px'}}>提交</Button>
        </Form.Item>}
        </Form>
            </>
          }
}
export default NewGov