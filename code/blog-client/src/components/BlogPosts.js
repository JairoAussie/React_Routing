import React from "react"
import BlogPost from "./BlogPost"

const BlogPosts = props => {
    const { blogPosts, loggedInUser } = props
    const singlePost = Object.keys(blogPosts).length === 1

	return (
		<div>
            {blogPosts.map(post => (
				<BlogPost key={post._id} blogPost={post} singlePost={singlePost} loggedInUser={loggedInUser}/>								
			))}	
        </div>
	)
}

export default BlogPosts