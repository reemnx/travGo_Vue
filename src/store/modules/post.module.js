import postService from '../../services/post.service'

export default {
    state: {
        posts: [],
        currPost: null,
        filterBy: ''
    },
    getters: {
        posts(state) {
            const filterBy = state.filterBy
            if (!filterBy) return state.posts
            let postsToReturn = [...state.posts]
            postsToReturn = postsToReturn.filter(post => post.location.toUpperCase().includes(filterBy.toUpperCase()))
            return postsToReturn;
        },
        filterBy(state) {
            return state.filterBy
        }
    },
    mutations: {
        setPosts(state, { posts }) {
            state.posts = posts
        },
        removePost(state, { id }) {
            const idx = state.posts.findIndex(post => post._id === id);
            if (idx === -1) throw new Error('Somthing went wrong while deleting post');
            state.posts.splice(idx, 1);
        },
        savePost(state, { post }) {
            const idx = state.posts.findIndex(currPost => post._id === currPost._id)
            if (idx === -1) state.posts.unshift(post)
            else state.posts.splice(idx, 1, post)
        },
        setPost(state, { post }) {
            state.currPost = post
        },
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        }
    },
    actions: {
        async loadPosts({ commit }) {
            const posts = await postService.query()
            console.log('Actions posts', posts);

            commit({ type: 'setPosts', posts })
            return posts
        },
        async removePost({ commit }, { id }) {
            await postService.remove(id)
            commit({ type: 'removePost', id })
        },
        async savePost({ commit }, { updatedPost }) {
            console.log('module',updatedPost);
            
            const savedPost = await postService.save(updatedPost)
            commit({ type: 'savePost', post: savedPost })
        },
        async getPostById({ commit }, { id }) {
            const post = await postService.get(id)
            commit({ type: 'setPost', post })
            return post
        }
    }
}
