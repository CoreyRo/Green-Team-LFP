import React, {Component} from "react"
import axios from "axios"
import Card from "../Card"
import "./Related.css"

class Related extends Component {

    state = 
    {
        users: []
    }

    componentDidMount() {
        axios.get("/api/user/browse/get-all")
        .then((res) => {
            let data = res.data;
            console.log(data)
            this.setState({
                users: data
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div id="Related">
                <div id="title-div">
                    <h3 id="title">Related Developers</h3>
                    {
                        this.state.users ?
                        this.state.users.map((e, index)=> 
                        (
                            <Card key={e._id} title={e.username}
                            subtitle={e.firstName + ' ' + e.lastName}
                            text={e.skills[0] + ", " + e.skills[1] + ", " + e.skills[2]}
                            firstText={"View Profile"} secondText={"Follow"} />
                        ))
                        :
                        (
                            <h1>No Results Found</h1>
                        )
                    }
                </div>
            </div>
        )
    }

}
    
export default Related