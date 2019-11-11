# React Routing

In this lesson we are going to continue with our blog client application, but today we are going to learn how to render our components to make it feel like to a user that they are navigating around our application the way we are use to when use a traditional website. We will be building what is known as a single page application or SPA for short.

A single page application is a website that re-renders its content in response to navigation actions (e.g. clicking a link) without making a request to the server to fetch new HTML. Instead a single page application simply unmounts one component and then mounts another. So how can we do this? Lets try doing this ourselves with state. We will be creating a journal application that initially has 3 pages (Home page, category selection, form). So lets create that app!

- [React Routing](#react-routing)
  - [References](#references)
  - [Setting up](#setting-up)
  - [Browser Router and Route](#browser-router-and-route)
  - [Handling 404 errors with Switch](#handling-404-errors-with-switch)
  - [Parameters and match](#parameters-and-match)
  - [Redirecting](#redirecting)
  - [Navigating between routes](#navigating-between-routes)
  - [Challenge](#challenge)

## References

- [React router](https://reacttraining.com/react-router/web/guides/quick-start)


## Setting up

The start point of this lesson is the `code/blog-client` project of this repo, same as the `code-complete/blog-client` project in the `React Hooks` previous lesson. When you're in blog-client type in the terminal `yarn install` to install all the dependencies

The library we need to install for routing is `react-router-dom`, we can install it with yarn or npm it this is the package manager you're using.

```javascript
yarn add react-router-dom
```

```javascript
npm i --save react-router-dom
```

## Browser Router and Route

React lets you create components with JSX, an extension to the JavaScript language that uses an expressive XML style syntax. Most react developers write components in JSX, because it resembles writing HTML. React router extends what you already know about react, and the library itself is just the small set of react components, so you write your routes using JSX. React router DOM provides two components to get you started.

`BrowserRouter`, the root routing component, that keeps your UI in sync with URL and `Route`, which is responsible for rendering a component in your app, when the URL matches its path. In react, you build components
that fit into other components. For example, index.js is rendering the app components into the dom.

So, app is the root component of our app.It's going to be responsible for displaying the content rendered by the blogposts, login, etc components, as well as shared elements like the app's main layout container, title, and navigation.

React-router lets you declare routes from anywhere in your component tree.So, we're going to write most of our routes here inside the route app component. 

First of all, let's import the components browser router and route from react-router:
App.js
```javascript
import { BrowserRouter, Route } from 'react-router-dom'
```

In the return statement, if we want to route components, que must write them inside of `BrowserRouter`. It's better if we comment what we already have, we'll add those components one by one soon.
App.js
```javascript
<BrowserRouter>
	<div className="container">
				
	</div>
</BrowserRouter>
```
To route components we need to parameters, the path and the component. Let's try it first with a stateless component we are creating right now. In the components folder, create an About.js file with this content:
About.js
```javascript
import React from 'react';
import { Heading, Section } from "react-bulma-components"
const About = () => (
  <Section className="content">
    <Heading>About</Heading>
    <p>This is our blog client. Here, we will read, write, update and delete posts while we are connected to an Express Server and a Mongo database. User authentication is provided as well.</p>
  </Section>
);
export default About;
```
In App.js import the component
```javascript
import About from "./About"
```
And add the route to the BrowserRouter
In App.js import the component
```javascript
<BrowserRouter>
	<div className="container">
		<Route path="/about" component={About} />
	</div>
</BrowserRouter>
```
If we write in the browser `localhost:3000/about`, we'll see that our component is displayed in this route.

Now, let's add the BlogPosts component. When we need to route a component with props or state we can't just the component property, we need to use render property.

```javascript
<Route path="/" render ={ () => <BlogPosts blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
```
Let's check this new route in `localhost:3000/`, we see all the posts, right? what if we go again to `localhost:3000/about`, what do you see?
Correct, the posts are displayed there too. That happens because the `/` is included in the path. To avoid this, use `exact` and the posts will only be displayed with the exact route.

```javascript
<Route exact path="/" render ={ () => <BlogPosts blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />

```
Our SPA has already some routes, but how can we route the navigation menu and the title? We probably want these two elements to show every time in the website. The solution to this is simple, we just can declare them above the routes.

```xml
<BrowserRouter>
	<div className="container">
		<Nav loggedInUser={loggedInUser}/>
		<Title />
		<Route exact path="/" render ={ () => <BlogPosts blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
		<Route path="/about" component={About} />
	</div>
</BrowserRouter>
```
## Handling 404 errors with Switch

Currently, when you type a URL that doesn't match any of the route maps, nothing renders, because the URL does not match any routes. A good solution for this issue could be a friendly message to give some feedback when something goes wrong (mistypes a URL or visit a broken link).

React Router lets you create a 404 like error route that displays when a URL's path does not match any of the paths defined in your routes. So, we are going to create a NotFound.js file and then we'll include it in our Browser router to handle this kind of errors.
NotFound.js
```javascript
import React from 'react';
import { Heading, Section } from "react-bulma-components"
const NotFound = () => (
  <Section className="content">
    <Heading>OOOOOPSSS... Page Not Found</Heading>
    <p>Try with another link ;)</p>
  </Section>
);
export default NotFound;
```

So first, let's import this file in App.js,
```javascript
import NotFound from './NotFound'
```
And add a route without a path at the end of the routes.
App.js
```xml
<Nav loggedInUser={loggedInUser}/>
<Title />
<Route exact path="/" render ={ () => <BlogPosts blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
<Route path="/about" component={About} />
<Route component={NotFound} />
```
And notice how a route without a path will always render. So this renders the not found component no matter which URL path is active.
So to render the not found component only when the URL does not match a path, we'll need to use React Router's switch component. So let's import switch from react-router-dom at the top of App.js.
```javascript
import { BrowserRouter, Route, Switch } from 'react-router-dom'
```

And next let's wrap all our routes inside the switch component.
So Switch will only render the first Route that matches the URL.
```xml
<Switch>
	<Route exact path="/" render ={ () => <BlogPosts blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
	<Route path="/about" component={About} />
	<Route component={NotFound} />
</Switch>
```
## Parameters and match

The next functionality we want to add to our blog client is to display a simple post. Usually, a blog only shows the first lines of each post and if we want to read the whole post we need to clic on it (in the title for example) and we will be redirected to a different page so we can read it. We don't have link navigation yet but now, we are going to be able to display single posts if we type `localhost:3000/post/:id` where `:id` is the id of the post. 

To achieve that we need to use a the `match`object. Match is a prop that contains certain information, let's check it with the About component. If we add match as a parameter and then we add a paragraph with `match.path`we'll see that stores the current path.
About.js
```javascript
const About = ({match}) => (
  <Section className="content">
    <Heading>About</Heading>
    <p>{match.path}</p>
    <p>This is our blog client. Here, we will read, write, update and delete posts while we are connected to an Express Server and a Mongo database. User authentication is provided as well.</p>
  </Section>
);
```

A good thing about match it that can handle route parameters, I mean, if we add a name, an id or whatever to the route and we have defined it as a parameter that value will be store in `match.params` and it could be useful for our purposes. To define a route parameter we need to add `/:parameter`. So if we want to add our name to the route we can do that. First, define the route parameter in App.js
```xml
<Route path="/about/:name" component={About} />
```
And call to the parameter in About.js correctly
```xml
<p>{match.params.name}</p>
```
Now in the browser if you write `localhost:3000/about/yourname` you'll see that it's displayed in a paragraph, right? This is pretty cool but not very handy for our blog... so you can remove these changes if you want.

It's not that easy when we already send our own props to a component because they override the match prop so we'll need to do some changes in our code to accomplish it. 

First of all, we need to add a new route that is going render the `BlogPosts` component but in a different route. Then, in the component parameter we nned to "spread" the props with `(...props)`. Those changes sould be done in the `/` route as well.
App.js
```xml
<Route exact path="/" render ={ (props) => <BlogPosts {...props} blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
<Route exact path="/posts/:id" render ={ (props) => <BlogPosts {...props} blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
```
And finally, in BlogPosts.js we need to define match and the two props as function parameters.
```javascript
const BlogPosts = ({match, blogPosts,loggedInUser})
```
We can remove the props assignment and use those parameters directly. It's ok if we declare an id constant to store `match.params.id`.
```javascript
let singlePost = Object.keys(blogPosts).length === 1
let id = match.params.id
```
The BlogPosts component is going to have a different behaviour if we receive an id parameter or if not, so we are going to create different functions and we are returning one or the other depending on the id parameter value.
```javascript
function allPosts (){
		return (
			<div>
			{blogPosts.map(post => (
				<BlogPost  key={post._id} blogPost={post} singlePost={singlePost} loggedInUser={loggedInUser}/>								
			))}
			</div>
		)
  }
```
```javascript
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
```
```javascript
if (id){
  return onePost()
}else{
  return allPosts()
}
```
## Redirecting
Sometimes, it could be useful redirect some routes. For example, we are displaying all our posts in the root (/) route but it could be a good idea to store them in a route like `/posts` once we defined our single posts in `/posts/:id`, and redirect from `/` to `/posts` when we arrive first time to the app.

To achieve that, in App.js, we need to add `Redirect` to the `react-router-dom`
```javascript
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
```

And then, add a new line in the routing to redirect the root, and modify the path of BlogPosts rendering.
```xml
<Route exact path="/" render ={ () => <Redirect to="/posts" />} />
<Route exact path="/posts" render ={ (props) => <BlogPosts {...props} blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />		
```

## Navigating between routes

For now, the only navigation we have in our app is provided by the url, any click works in the website. To solve this problem we are going to add some links. `Link` and `NavLink` (if we want to link in a nav menu) are great ways to add navigation in a React SPA. 

We built our nav with Bulma so it's OK if we don't add meny changes to this. Just add the 'about' option and update some references.
Nav.js

```javascript
function navLoggedIn() {
    return (
        <Fragment>
            <Navbar.Container position="start">
                <Navbar.Item href="#">Logout</Navbar.Item>
            </Navbar.Container>
            <Navbar.Container position="end">
                        <Navbar.Item href="#">Add Post</Navbar.Item>
                        <Navbar.Item href="#">Categories</Navbar.Item>
                        <Navbar.Item href="/about">About</Navbar.Item>
                        <Navbar.Item href="/">Home</Navbar.Item>
                        <Navbar.Item href="#">My Blog</Navbar.Item>
            </Navbar.Container>
        </Fragment>
    )
}
```
Now do the same with `navLoggedOut()`

We created a way to disply single posts with the id parameter but it's not really handy to do it writing the whole url because we won't know the id of every post, it's better if, once we see the post, we click in the title and move us to the post, and there we can read it or make a comment if we want. 

We need to modify the BlogPost component and the first we need to do is to import the `Link` from the `react-router-dom`
```javascript
import {Link} from "react-router-dom"
```
And then, wrap the post title in link:
```xml
<Link to={`/posts/${_id}`}><Heading>{title}</Heading></Link>
```
Don't forget to declare `_id` to store the value from the BlogPost prop.

## Challenge

Add a new route `/users/:username` where the posts of a certain user are displayed. It should work typing the url but clicking in the post creator name as well.