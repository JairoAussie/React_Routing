import React, {Fragment} from "react"
import {Link} from "react-router-dom"
import { Heading, Section } from "react-bulma-components"
import Comments from "./Comments"


const BlogPost = props => {
	const { blogPost, loggedInUser, singlePost} = props
    const { title, username, content, category, comments, _id } = blogPost
    const showAddComment = username !== loggedInUser
	
	return (
        <Fragment>
            <Section className="content">
                    <Link to={`/posts/${_id}`}><Heading>{title}</Heading></Link>
                    <p>{username}</p>
                    {category && <p>Category: {category}</p>}
                    <p>{content}</p>
            </Section>
            {/* Display comments if we are showing a single blog post */}
            {singlePost && (
                <Section className="content" >
                    <Comments comments={comments} showAddComment={showAddComment} />						
                </Section>
            )}
        </Fragment>
	)
}

export default BlogPost