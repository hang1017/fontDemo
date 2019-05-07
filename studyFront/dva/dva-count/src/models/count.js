export default {
    namespace:'count',
    state:{
        count:3,
    },
    reducers:{
        add(count) {return count + 1},
        minus(count) {return count - 1},
    }
}