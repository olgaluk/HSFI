const Router = window.ReactRouter.Router;
const Route = window.ReactRouter.Route;
const hashHistory = window.ReactRouter.hashHistory;
const Link = window.ReactRouter.Link;

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.addPost = this.addPost.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.state = {
      title: '',
      subject: '',
    };
  }

  componentDidMount() {
    document.getElementById('addHyperLink').className = 'active';
    document.getElementById('homeHyperlink').className = '';
  }

  addPost() {
    axios.post('/addPost', {
      title: this.state.title,
      subject: this.state.subject,
    })
      .then((response) => {
        console.log('reponse from add post is ', response);
        hashHistory.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSubjectChange(e) {
    this.setState({ subject: e.target.value });
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
                  <textarea className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxLength="140" rows="7"></textarea>
                </div>

                <button type="button" onClick={this.addPost} id="submit" name="submit" className="btn btn-primary pull-right">Add</button>
              </form>
          </div>
        </div>
    );
  }
}

class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }


  componentDidMount() {
    const self = this;

    axios.post('/getPost', {

    })
      .then((response) => {
        self.setState({ posts: response.data });
      })
      .catch((error) => {
        console.log('error is ', error);
      });

    document.getElementById('homeHyperlink').className = 'active';
    document.getElementById('addHyperLink').className = '';
  }

  render() {
    return (
          <div className="list-group">

            {
              this.state.posts.map((post, index) => <a href="#" key={index} className="list-group-item active">
                          <h4 className="list-group-item-heading">{post.title}</h4>
                          <p className="list-group-item-text">{post.subject}</p>
                        </a>)
            }

          </div>
    );
  }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost"></Route>
    </Router>,
    document.getElementById('app'),
);
