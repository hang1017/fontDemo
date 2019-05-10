import { query, updateData } from '@/services/api';


const ListModel = {
  namespace: 'list',

  state: {
    name: 'list->name',
    some:[]
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'save',
        payload: { name: data.text },
      });

    },
    /**
     * 分别解释一下所传递过来的参数
     * payload:为传递过来的参数
     * call:调用一个方法，通过我们用来调用服务端接口
     * put:和页面中的 dispatch 一样，也是用来发出事件的
     * select:可以用来查找其他 model 的数据
     */
    *updateData({payload}, {call, put, select}) {
      console.log(payload);

      // 用 select 取到 home->model 里面的数据
      const homeName = yield select(state => state.home);
      console.log(homeName);
      
      /**
       * 这个就是调用服务端的接口
       * 传递两个参数
       * 第一个就是接口的名称
       * 第二个就是传递的参数
       * 一般来说，每个 effect，第一个参数和后台接口名称三者同名
       */
      const data = yield call(updateData,payload);
      console.log(data);
      yield put({
        type:'save',
        payload:{
          name:homeName.name
          // name:data.text
        }
      })
    }

  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname }) => {
  //       if (pathname === '/list') {
  //         dispatch({
  //           type: 'query'
  //         })
  //       }
  //     });
  //   }
  // },
  reducers: {
    /**
     * 解开旧的 state,然后用新的 payload 里面的数据覆盖它
     * 同名的被修改
     * 其他的保留原样
     */
    save(state, action) {
      console.log(action);

      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default ListModel;
