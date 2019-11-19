import {govList,addGov,deleteGov,putGov} from '@/services'
export default {

  namespace: 'gov',

  state: {
    list:[],
    type:"",
    info:{},
    newGov:{}
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
        let { type,newGov}=yield select(state=>state.gov)
        if(type==="new"){
          let res=yield call(addGov,payload);
          console.log(res)
        }
       newGov=payload
       console.log(newGov)

       
    },
    *deteleGov({payload},{call,put}){
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
      console.log("payload...",payload)
      console.log("newGov",state.newGov)
      if(type==="edit"){
         payload=state.newGov
      }
      return {...state,type,info}
    }
  }


};
