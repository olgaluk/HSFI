import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.state = {
            title: '',
            subject: ''
        };
    }
    componentDidMount() {
        document.getElementById('addHyperLink').className = "active";
        document.getElementById('homeHyperlink').className = "";
    }
    addPost() {
        axios.post('/addPost', {
            title: this.state.title,
            subject: this.state.subject
        })
            .then(function (response) {
                console.log('reponse from add post is ', response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }
    handleSubjectChange(e) {
        this.setState({ subject: e.target.value })
    }
    render() {
        return (
            <div className="col-md-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both" />
                        <div className="form-group">
                            <input type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
                        </div>

                        <div className="form-group">
                            <textarea className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                        </div>

                        <button type="button" onClick={this.addPost} id="submit" name="submit" className="btn btn-primary pull-right">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Add;