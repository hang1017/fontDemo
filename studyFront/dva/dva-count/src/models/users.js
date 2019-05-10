export default {
    namespace:'users',
    state:{
        users:[
            { name: 'hang10',age:15,id:1 },
            { name: 'hang20',age:17,id:2 },
            { name: 'hang30',age:18,id:3 },
        ]
    },
    reducers:{
        delete(state,{ payload: id }) {
            return state.filter(item => item.id !== id);
        }
    },
}