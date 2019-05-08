export default {
    namespace:'deletes',
    state:{},
    effects:{},
    reducers:{
        delete(state,{ payload: id }) {
            return state.filter(item => item.id !== id);
        }
    },
}