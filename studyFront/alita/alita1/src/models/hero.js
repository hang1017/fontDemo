import { query } from '@/services/api';
import { request } from 'alita';
import { queryHeroList, getHeroDetails, getFreeHeros } from '../services/api';


const HeroModel = {
  namespace: 'hero',

  state: {
    heros: [],
    heroDetail:{},
    filterKey:0,
    freeheros:[],
    itemHover:0
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      const data = yield call(queryHeroList);
      const detail = yield call(getHeroDetails, { ename: 110 });
      const freeheros = yield call(getFreeHeros,{number:13});
      const localData = [
        {
          ename: 105,
          cname: '廉颇',
          title: '正义爆轰',
          new_type: 0,
          hero_type: 3,
          skin_name: '正义爆轰|地狱岩魂',
        },
        {
          ename: 106,
          cname: '小乔',
          title: '恋之微风',
          new_type: 0,
          hero_type: 2,
          skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
        },
      ];
      yield put({
        type: 'save',
        payload: {
          heros: data || localData,
          heroDetail: detail,
          freeheros: freeheros,
        },
      });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            type: 'fetch'
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

export default HeroModel;
