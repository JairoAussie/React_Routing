import React from "react"
import BlogPost from "./BlogPost"

const BlogPosts = ({match, blogPosts,loggedInUser}) => {

	let singlePost = Object.keys(blogPosts).length === 1
	let id = match.params.id

	function allPosts (){
		return (
			<div>
			{blogPosts.map(post => (
				<BlogPost  key={post._id} blogPost={post} singlePost={singlePost} loggedInUser={loggedInUser}/>								
			))}
			</div>
		)
	}
	function onePost (){
		singlePost = 1
		return (
			<div>
			{blogPosts.filter(post => post._id== id)
			.map(post => (
				<BlogPost key={post._id} blogPost={post} singlePost={singlePost} loggedInUser={loggedInUser}/>								
			))}
			</div>
		)
	}
	if (id){
		return onePost()
	}else{
		return allPosts()
	}
	
}

export default BlogPosts