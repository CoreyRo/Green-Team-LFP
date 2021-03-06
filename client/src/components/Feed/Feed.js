import React, {Component} from 'react'
import {Row, Col} from "../Grid"
import {Link} from 'react-router-dom'
import axios from "axios"
import "./Feed.css"


class Feed extends Component {
    
    state = 
    { 
        posts: [],
        page: 1,
        pageCount: null,
        count: null
        
    }

    componentDidMount() {
        this.getProjects()
        
        
    }
    getProjects = (e) => {
        axios.get("/api/user/browse/page/" + this.state.page)
            .then((res) => {
                this.setState({
                    posts: res.data.results,
                    pageCount: res.data.pageCount,
                    count: res.data.count
                });
            })
            .catch((err) => {
                console.log(err);
            })

    }

    nextPage = (e) =>{
        
        this.setState({ page: this.state.page + 1 }, () => this.getProjects())
    }
    prevPage = (e) => {

        this.setState({ page: this.state.page - 1 }, () => this.getProjects())
    }


    render() {
       
        return (

            <div id="main-feed">
                <h1 id="title-feed">Projects Nearby</h1>
                {this.state.posts ? this.state.posts.map(e =>
                (
                <div className="col-myProjects" key={e._id}>
                    <h4 className="myProject-titles">{e.title}</h4>
                    <h6>Posted By: <span className="username-post">{e.author}</span></h6>
                    <h6>Members Needed: <span className="username-post">{e.members}</span></h6>
                    <p className="proj-details">Project Details: <span>{e.description}</span></p>
                    <Link className="btn view-btn" to={"/project/" + e._id}>View Project</Link>
                    <Link className="btn view-btn" to={"/profile/" + e.userId}>View Profile</Link>
                </div>
                ))
                :
                (<h1 id="nan">No Projects Available</h1>)
                }
            <div className="mx-auto text-center">
                <div className="col-md-12 text-center mx-auto">
                    <Row>
                        <div className="col-md-3 text-center mx-auto">
                        {this.state.pageCount >= this.state.page && this.state.page !== 1 ? <button className="pageButton" onClick={this.prevPage}>PREV</button> :""}
                        </div>
                        <div className="col-md-3 text-center mx-auto">
                        {this.state.pageCount > 1 ? <span className="pageText">{`Page ${this.state.page} of ${this.state.pageCount}`}</span> :""}
                        </div>
                        <div className="col-md-3 text-center mx-auto">
                        {this.state.pageCount > this.state.page && this.state.page !== this.state.pageCount? <button className="pageButton" onClick={this.nextPage}>NEXT</button> :""}
                        </div>
                    </Row>
                    
                </div>
            </div>
            </div> 
        )
    }
}
    
export default Feed