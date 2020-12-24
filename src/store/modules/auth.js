import axios from "axios";
import {auth_url} from "../../urls/urls";
const state = {
    user: {}
};

const getters = {
    isLoggedIn(state){
        if(state.user.access_token == null){
            return false;
        }else{
            return true;
        }
    },
    getAuthToken(state){
        if(state.user.access_token !== null){
            return state.user.access_token;
        }
    }
};

const actions = {
    async login({ commit }, payload) {
        // console.log(payload.username);
        return new Promise((resolve, reject) => {
            axios
                .post(
                    auth_url + "/login",
                    payload
                )
                .then(({ data, status }) => {
                    if (status === 200) {
                        // console.log(data);
                        const user = {
                            'user_id': data.user_details.id,
                            'user_name': data.user_details.name,
                            'user_email': data.user_details.email,
                            'access_token': data.access_token,
                            'token_type': data.token_type,
                            'expires_in': data.expires_in,
                        }
                        commit("setUser", user);
                        resolve({'message':'Successfully login'});
                    }
                })
                .catch(error => {
                    // console.log(error.response.data.error);
                    reject({'message': error});
                });
        });
    },
    async logout({ commit, rootGetters }) {
        let auth_token = rootGetters.getAuthToken
        // console.log(auth_token);
        const header = {
            headers:{
              'Authorization':'Bearer ' + auth_token,
            }
          }
        return new Promise((resolve, reject) => {
            axios
                .post(
                    auth_url + "/logout",null,
                    header
                )
                .then(({ data, status }) => {
                    if (status === 200) {
                        console.log(data);
                        commit("removeUser");
                        resolve({'message':'Successfully Logout'});
                    }else{
                        // console.log("called");
                        resolve({'message': status});
                    }
                })
                .catch(error => {
                    // console.log(error.response.data.error);
                    reject({'message': error});
                });
        });
    },
    async clearUserState({ commit }) {
        commit("removeUser");
    },

};

const mutations = {
    setUser:(state,user) => (state.user = user),
    removeUser:(state) => state.user = {}
};

export default {
    state,
    getters,
    actions,
    mutations
};
