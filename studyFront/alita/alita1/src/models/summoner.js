import { querySummoner } from '@/services/api';


const SummonerModel = {
  namespace: 'summoner',

  state: {
    summoners: ''
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      const data = yield call(querySummoner);
      yield put({
        type: 'save',
        payload: { summoners: data },
      });

    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/summoner') {
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

export default SummonerModel;
