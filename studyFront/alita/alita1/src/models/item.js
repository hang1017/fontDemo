import { queryItem } from '@/services/api';


const ItemModel = {
  namespace: 'item',

  state: {
    item: []
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      const data = yield call(queryItem);
      console.log(data);
      yield put({
        type: 'save',
        payload: {
          item: data,
        }
      })
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/item') {
          dispatch({
            type: 'query'
          })
        }
      });
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ItemModel;
