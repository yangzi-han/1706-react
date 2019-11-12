import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

class IndexPage extends React.Component {
  render(){
    let {changNum,num}=this.props
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        <button onClick={()=>changNum("+")}>+</button>
    <span>{num}</span>
        <button onClick={()=>changNum("-")}>-</button>
      </div>
    );
  }
  
}
//props检测类型
IndexPage.propTypes = {
      num:Number
};
//props默认值
IndexPage.defaultProps={
 
}
const mapStateToProps=state=>{
  return{
      num:state.num.num
}
}
const mapDispatchToProps=dispatch=>{
      return{
          changNum:type=>dispatch({
            type:"num/changNum",
            payload:{type}
          })
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);
