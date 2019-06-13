import { query } from '@/services/api';
import { getHeroDetails } from '@/services/api';
import heroList from '../../mock/herolist.json';


const HerodetailModel = {
  namespace: 'herodetail',

  state: {
    name: '',
    detail: {}
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      // const data = yield call(getHeroDetails, payload);
      const data = heroList.filter(item => item.ename == payload.ename);
      yield put({
        type: 'save',
        payload: { detail: data },
      });

    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const urls = pathname.split('/');
        if (pathname.indexOf('/herodetail') !== -1) {
          dispatch({
            type: 'query',
            payload:{
              ename: urls[urls.length - 1]
            }
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

export default HerodetailModel;
