// export const ROOT           =      'http://192.168.0.154:8000'
export const ROOT           =      'http://54.37.227.57'
export const API_URL        =      ROOT    +    '/api'
export const REGISTER       =      API_URL +    '/auth/signup'
export const LOGIN          =      API_URL +    '/auth/login'
export const POSTS          =      API_URL +    '/posts'
export const POSTS_TEST     =      API_URL +    '/posts/test?amount=10&page=1'
export const IMG            =      ROOT    +    '/storage/'
export const USER_AUTH      =      API_URL +    '/users/auth'
export const USERS          =      API_URL +    '/users/find'
export const USER           =      API_URL +    '/users'
export const COMMENTS       =      API_URL +    '/comments'
export const FOLLOWERS      =      API_URL +    '/followers'
export const FOLLOWINGS     =      API_URL +    '/followings'
export const LIKES          =      API_URL +    '/likes'

const api = {

  get( url, config ) {
    return axios
      .get( url, config )
      .catch((error) => {
        console.log(error);
      })
  },

  post (url, data, headers ) {
    return axios
      .post( url, data, headers )
      .catch((error) => {
        console.log(error);
      })
  },

  patch (url, data, headers ) {
    return axios
      .patch( url, data, headers )
      .catch((error) => {
        console.log(error);
      })
  },

  delete( url, config ){
      return axios
      .delete( url, config )
      .catch( (error) => {
        console.log(error);
      })
  },

  authHeader(){
      let token     = window.localStorage.token;
      let headers   = {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      };
      return headers;
  }

};

export default api;

export const register = {
  newUser( data ){
    return api.post( REGISTER, data )
  },

  validate( fields ){
    for(var prop in fields ){
      if(fields[prop].length == 0){
        return false;
      }
    }
    return true;
  }
}

export const login = {
  login( data ){
    return api.post( LOGIN, data )
  }
}

export const posts = {
  getList( page, amount ){
    let config = {};
    config.headers = api.authHeader();
    config.params  = { page, amount };
    return api.get( POSTS, config)
  },
  getById(id){
      let config = {};
      config.headers = api.authHeader();
      return api.get( `${POSTS}/${id}` , config)
  },
  getByUserId( user_id, page, amount ){
      let config = {};
      config.headers = api.authHeader();
      config.params  = { user_id, page, amount };
      return api.get( `${POSTS}` , config)
  },
  deleteById(id){
    let config = {};
    config.headers = api.authHeader();
    return api.delete( `${POSTS}/${id}` , config)
  },
  like(likeId){
    let headers = api.authHeader();
    let params  = {}
    params.likable_type = 1;
    params.likable_id   = likeId;
    return api.post( `${LIKES}` ,  params, { headers })
  },
  unlike( likeId ){
    let config = {};
    config.headers = api.authHeader();
    return api.delete( `${LIKES}/${likeId}` , config)
  },
  postNewPost( params ){
      let headers = api.authHeader();
      return api.post(`${POSTS}`, params, { headers } )
  }
}

export const comments = {
    getByPostId( post_id, page, amount ){
        let config = {};
        config.headers = api.authHeader();
        config.params = { post_id, page, amount }
        return api.get( COMMENTS, config )
    },

    postNewById( params ){
      let headers = api.authHeader();
      return api.post (`${COMMENTS}`, params, { headers } )
    },

    updateById( id, params ){
      let headers = api.authHeader();
      return api.patch (`${COMMENTS}/${id}`, params, { headers } )
    },

    deleteById(id){
      let config = {};
      config.headers = api.authHeader();
      return api.delete (`${COMMENTS}/${id}`, config )
    }
}

export const user = {
  getAuthUser(){
    let config = {};
    config.headers = api.authHeader();
    return api.get(`${USER}/auth`, config)
  },

  getById( id ){
    let config = {};
    config.headers = api.authHeader();
    config.params = { id }
    return api.get(`${USERS}`, config)
  },

  getFollowers(page, amount){
    let config = {};
    config.headers = api.authHeader();
    config.params = { page, amount };
    return api.get(FOLLOWERS, config)
  },
  getFollowings(page, amount){
    let config = {};
    config.headers = api.authHeader();
    config.params = { page, amount };
    return api.get(FOLLOWINGS, config)
  },
  updateInfo( params ){
    let headers = api.authHeader();
    return api.patch(`${USER_AUTH}/update`,  params, { headers } )
},
  updateProfilePicture( params ){
      let headers = api.authHeader();
      return api.post(`${USER}/auth/image`, params, { headers } )
  }
}
