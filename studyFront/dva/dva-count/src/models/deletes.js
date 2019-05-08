export default {
    namespace:'deletes',
    state:{
        deletes: [],
    },
    effects:{
        *delayDel({ payload: id,state },{ call, put }) {
            console.log(id);
            setTimeout(() => {
                
            }, 2000);
            // yield call('~',id);
            yield put({
                type:'deleteItem',
                payload:id
            })
        }
    },
    reducers:{
        deleteItem(state,{ payload: id }) {
            return state.filter(item => item.id !== id);
        }
    },
}