import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {

    const Store = createStore({
        "modules": {
            // example
        },

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        "strict": process.env.DEBUGGING,
        "state": {
            "login": false,
            "isAdmin": false,
            "person": {
                "userID": "",
                "username": "",
                "email": "",
                "headImage": "",
                "is_associated": "",
                "papers": [],
                "paperCounts": [],
                "confirmPapers": [],
                "quoteNums": [],
                "years": []
            }
        },
        "mutations": {
            setLogin (state) {

                state.login = true;

            },
            setAdmin (state) {

                state.isAdmin = true;

            },
            setUserID (state, UserID) {

                state.person.userID = UserID;

            },
            setUserName (state, username) {

                state.person.username = username;

            },
            setUserEmail (state, email) {

                state.person.email = email;

            },
            setUserAssociated (state, is_associated) {

                state.person.is_associated = is_associated;

            },
            setUserHeadImage (state, headImage) {

                state.person.headImage = headImage;

            },
            setLogout (state) {

                state.login = false;

            },
            setUser (state, Person){

                state.person = Person;

            },

            setPapers (state, list) {
              state.person.papers = list;
            },

            setPaperCounts (state, nums){
              state.person.paperCounts = nums;
            },

            setConfirmPapers (state, list){
              state.person.confirmPapers = list;
            },

            setQuoteNums (state, list){
              state.person.quoteNums = list;
            },

            setYears (state, list){
              state.person.years = list;
            },

        },
    });

    return Store;

});
