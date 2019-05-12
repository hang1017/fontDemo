
export default {

  namespace: 'example',

  state: {
    name:'hanghangshuaishuai'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      console.log(state);
      return { ...state, ...action.payload,name:'hanghang' };
    },
  },

};
