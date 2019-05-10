export default {
    namespace:'deletes',
    state:{
        deletes: [],
    },
    effects:{
        *delayDel({ payload: id,state },{ call, put, select }) {
            // console.log(id);
            setTimeout(() => {
                
            }, 2000);
            // yield call('~',id);
            const { users } = yield select();
            yield put({
                type:'deleteItem',
                payload:{id,users},
            })
        }
    },
    reducers:{
        deleteItem(state,{ payload: id,payload:users }) {
            return (state.filter(item => item.id !== id.id));
        }
    },
}