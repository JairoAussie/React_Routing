export default function (state, action) {
    switch(action.type) {
        case "setLoggedInUser": {
            return action.data
        }
        case "setBlogPosts": {
            return action.data
        }
        default: 
            return state
    }
}