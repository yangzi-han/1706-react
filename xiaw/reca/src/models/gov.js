import {govList,addGov,deleteGov} from '@/services'
export default {

  namespace: 'gov',

  state: {
    list:[],
    type:"",
    info:{}
  },

  effects: {
    *getGovList({payload},{call,put}){
      let res=yield call(govList,1,2)
      console.log("govlist",res)
      yield put({
        type:"changList",
        payload:res.data.list
      })
    },
    *addGov({payload},{call,put,select}){
        let { type}=yield select(state=>state.gov)
        if(type==="new"){
          let res=yield call(addGov,payload);
          console.log(res)
        }
    },
    *deleteGov({payload},{call,put}){
      yield call(deleteGov,payload);
      yield put({
        type:"getGovList"
      })
    }
  },

  reducers: {
    changList(state,{payload}){ 
        return {...state,list:payload}
    },
    goDetail(state,{payload}){
      let {type, info}=payload;
      return {...state,type,info}
    }
  }


};
