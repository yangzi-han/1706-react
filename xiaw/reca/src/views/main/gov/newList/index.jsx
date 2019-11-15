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


// class RegistrationForm extends React.Component {
//   state = {
//     confirmDirty: false,
//     autoCompleteResult: [],
//   };


//   handleConfirmBlur = e => {
//     const { value } = e.target;
//     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
//   };

//   compareToFirstPassword = (rule, value, callback) => {
//     const { form } = this.props;
//     if (value && value !== form.getFieldValue('password')) {
//       callback('Two passwords that you enter is inconsistent!');
//     } else {
//       callback();
//     }
//   };

//   validateToNextPassword = (rule, value, callback) => {
//     const { form } = this.props;
//     if (value && this.state.confirmDirty) {
//       form.validateFields(['confirm'], { force: true });
//     }
//     callback();
//   };

//   handleWebsiteChange = value => {
//     let autoCompleteResult;
//     if (!value) {
//       autoCompleteResult = [];
//     } else {
//       autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
//     }
//     this.setState({ autoCompleteResult });
//   };

//   render() {

//     const { autoCompleteResult } = this.state;

    
//     const prefixSelector = getFieldDecorator('prefix', {
//       initialValue: '86',
//     })(
//       <Select style={{ width: 70 }}>
//         <Option value="86">+86</Option>
//         <Option value="87">+87</Option>
//       </Select>,
//     );

//     const websiteOptions = autoCompleteResult.map(website => (
//       <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
//     ));

//     return (
//       <Form {...formItemLayout} onSubmit={this.handleSubmit}>
//         <Form.Item label="E-mail">
//           {getFieldDecorator('email', {
//             rules: [
//               {
//                 type: 'email',
//                 message: 'The input is not valid E-mail!',
//               },
//               {
//                 required: true,
//                 message: 'Please input your E-mail!',
//               },
//             ],
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="Password" hasFeedback>
//           {getFieldDecorator('password', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Please input your password!',
//               },
//               {
//                 validator: this.validateToNextPassword,
//               },
//             ],
//           })(<Input.Password />)}
//         </Form.Item>
//         <Form.Item label="Confirm Password" hasFeedback>
//           {getFieldDecorator('confirm', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Please confirm your password!',
//               },
//               {
//                 validator: this.compareToFirstPassword,
//               },
//             ],
//           })(<Input.Password onBlur={this.handleConfirmBlur} />)}
//         </Form.Item>
//         <Form.Item
//           label={
//             <span>
//               Nickname&nbsp;
//               <Tooltip title="What do you want others to call you?">
//                 <Icon type="question-circle-o" />
//               </Tooltip>
//             </span>
//           }
//         >
//           {getFieldDecorator('nickname', {
//             rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
//           })(<Input />)}
//         </Form.Item>
//         <Form.Item label="Habitual Residence">
//           {getFieldDecorator('residence', {
//             initialValue: ['zhejiang', 'hangzhou', 'xihu'],
//             rules: [
//               { type: 'array', required: true, message: 'Please select your habitual residence!' },
//             ],
//           })(<Cascader options={residences} />)}
//         </Form.Item>
//         <Form.Item label="Phone Number">
//           {getFieldDecorator('phone', {
//             rules: [{ required: true, message: 'Please input your phone number!' }],
//           })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
//         </Form.Item>
//         <Form.Item label="Website">
//           {getFieldDecorator('website', {
//             rules: [{ required: true, message: 'Please input website!' }],
//           })(
//             <AutoComplete
//               dataSource={websiteOptions}
//               onChange={this.handleWebsiteChange}
//               placeholder="website"
//             >
//               <Input />
//             </AutoComplete>,
//           )}
//         </Form.Item>
//         <Form.Item label="Captcha" extra="We must make sure that your are a human.">
//           <Row gutter={8}>
//             <Col span={12}>
//               {getFieldDecorator('captcha', {
//                 rules: [{ required: true, message: 'Please input the captcha you got!' }],
//               })(<Input />)}
//             </Col>
//             <Col span={12}>
//               <Button>Get captcha</Button>
//             </Col>
//           </Row>
//         </Form.Item>
//         <Form.Item {...tailFormItemLayout}>
//           {getFieldDecorator('agreement', {
//             valuePropName: 'checked',
//           })(
//             <Checkbox>
//               I have read the <a href="">agreement</a>
//             </Checkbox>,
//           )}
//         </Form.Item>
//         <Form.Item {...tailFormItemLayout}>
//           <Button type="primary" htmlType="submit">
//             Register
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }

// const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

// ReactDOM.render(<WrappedRegistrationForm />, mountNode);