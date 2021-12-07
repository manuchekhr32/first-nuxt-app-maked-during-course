import Cookie from "js-cookie";

// STATE
export const state = () => ({
  loadedPosts: [],
  token: null
})

// MUTATIONS
export const mutations = {
  setPosts(state, payload) {
    state.loadedPosts = payload
  },

  addPost(state, newPost) {
    state.loadedPosts.push(newPost)
  },

  editPost(state, updatedPost) {
    const postIndex = state.loadedPosts.findIndex(post => post.id === updatedPost.id);
    state.loadedPosts[postIndex] = updatedPost
  },

  setToken(state, token) {
    state.token = token
  },

  clearToken(state) {
    state.token = null
  }
} 

// ACTIONS
export const actions = {
  // nuxtServerInit is Nuxtjs action
  nuxtServerInit(vuexContext, context) {
    return context.app.$axios.$get('/posts.json')
    .then(data => {
      const arrayPosts = [];
      for (const key in data) {
        arrayPosts.push({ ...data[key], id: key })
      }
      vuexContext.commit('setPosts', arrayPosts)
    })
    .catch(err => context.error(err))
  },

  setPosts({ commit }, payload) {
    commit('setPosts', payload)
  },

  newPost({ commit, state }, newPost) {
    const createdPost = {
      ...newPost,
      lastUpdated: new Date()
    };

    return this.$axios.$post(`/posts.json?auth=${state.token}`, createdPost)
    .then(data => {
      commit('addPost', {...createdPost, id: data.name})
    })
  },

  editPost({ commit, state }, editedPost) {
    this.$axios.$put(`/posts/${editedPost.postId}.json?auth=${state.token}`, {
      ...editedPost.data,
      lastUpdated: new Date(),
    })
    .then(() => {
      commit('editPost', {
        ...editedPost.data,
        id: editedPost.postId
      })
      this.$router.push('/admin')
    })
    .catch(err => console.log(err))
  },

  // Authenticate ***
  authUser({ commit, dispatch }, userData) {
    let fbURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.FB_API_KEY;

    if (userData.isLogin) {
      fbURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.FB_API_KEY;
    }

    return this.$axios.$post(fbURL,
      {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true
      }
    )
    .then(res => {
      commit('setToken', res.idToken);
      localStorage.setItem('token', res.idToken);
      localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(res.expiresIn) * 1000);
      Cookie.set('jwt-access', res.idToken)
      Cookie.set('tokenExpiration', new Date().getTime() + Number.parseInt(res.expiresIn) * 1000);
      return this.$axios.$post('http://localhost:3000/api/track-data', { data: 'HEREEEEEEEEEE' })
    })
    
    .catch(err => console.log(err))
  },

  initAuth({ commit, dispatch }, req) {
    let token, expirationDate;

    if (req) {
      if (!req.headers.cookie) {
        return;
      }

      const jwtCookie = req.headers.cookie.split(';')
        .find(c => c.trim().startsWith('jwt-access='));
      
      if (!jwtCookie) {
        return;
      }

      token = jwtCookie.split('=')[1];
      expirationDate = req.headers.cookie.split(';')
        .find(c => c.trim().startsWith('tokenExpiration='))
        .split('=')[1];
    } 
    
    else {
      token = localStorage.getItem('token');
      expirationDate = localStorage.getItem('tokenExpiration');
    }
    if (new Date().getTime() > +expirationDate || !token) {
      console.warn('No token or invalid token!');
      dispatch('logout')
      return;
    }
    commit("setToken", token)
  },

  logout({ commit }) {
    commit('clearToken');

    if (process.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }
    
    Cookie.remove('jwt-access');
    Cookie.remove('tokenExpiration');

    this.$router.push('/admin/auth')
  }
}

// GETTERS
export const getters = {
  getLoadedPosts(state) {
    return state.loadedPosts
  },

  isAuthenticated(state) {
    return state.token != null
  }
}