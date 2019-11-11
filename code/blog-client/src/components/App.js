import React,{Fragment, useReducer, useEffect} from "react"
import Nav from "./Nav"
import BlogPosts from "./BlogPosts"
import Title from "./Title"
import stateReducer from "../config/stateReducer"
import dummyPosts from "../data/dummyData"

const App = () => {

	// handles login
	// TODO: refactor to function as callback passed to SignIn form component
	// 	- get username and password from form event
	//	- authenticate with express server
	// 	- update loginError in state if there is one and re-render SignIn form component
	//	- update loggedInUser if successful (and save to local storage)
	function handleLogin(username) {
	
		// Set username in state
		dispatchLoggedInUser ({
			type: "setLoggedInUser",
			data: username
		})
	}

	// Fetches blog posts from server and updates state
	// TODO: add call to server to get blog posts
	function fetchBlogPosts() {
		dispatchBlogPosts ({
			type: "setBlogPosts",
			data: dummyPosts
		})
	}

	// Use reducer hook to handle state items
	const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null)
	const [blogPosts, dispatchBlogPosts] = useReducer(stateReducer, [])
	
	// Use effect hook to initialise component on mount and when blog posts are updated
	useEffect(()=> {
        // for any initialisation to be performed when component mounts, or on update of state values in the second argument
        fetchBlogPosts()
        // return a function that specifies any actions on component unmount
		return () => {}
	}, [])

	return (
		
		<Fragment >
			<Nav loggedInUser={loggedInUser}/>
			<div className="container">
				<Title />
				<BlogPosts blogPosts={blogPosts} loggedInUser={loggedInUser}/>
			</div>
		</Fragment>
		
	)
}
export default App