// import postService from '../../services/post.service'

export default {
    state: {
        users: [],
        currUser: {userName: "Reem" , imgUrl: "https://scontent.ftlv1-1.fna.fbcdn.net/v/t1.0-9/45870484_10218095303439323_6215587485775298560_o.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=HFnnreb-GJQAX9yoi24&_nc_ht=scontent.ftlv1-1.fna&oh=4f79d85d040082e73c73ce5f5248c4be&oe=5F1AB43C"},
    },
    getters: {
       getCurrUser(state){
        let userToReturn = {...state.currUser}
        return userToReturn
       }
    },
    mutations: {
        
    },
    actions: {
        
    }
}
