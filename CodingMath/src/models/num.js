
export default {

  namespace: 'num',

  state: {
    num:1000
  },

//异步
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },
//同步
  reducers: {
      changNum(state,{payload:{type}}){
        return {...state,num:type==="+"?++state.num:--state.num}
      }
  },

};
