import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        var self = this;

        axios.post('/getPost', {

        })
            .then(function (response) {
                self.setState({ posts: response.data })

            })
            .catch(function (error) {
                console.log('error is ', error);
            });

        document.getElementById('homeHyperlink').className = "active";
        document.getElementById('addHyperLink').className = "";
    }

    render() {
        return (
            <div className="list-group">

                {
                    this.state.posts.map(function (post, index) {
                        return <a href="#" key={index} className="list-group-item active">
                            <h4 className="list-group-item-heading">{post.title}</h4>
                            <p className="list-group-item-text">{post.subject}</p>
                        </a>
                    })
                }

            </div>
        )
    }
}

export default Show;