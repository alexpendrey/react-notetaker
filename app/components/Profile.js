import React from 'react';
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
import firebaseConfig from '../config/firebase';
import helpers from '../utils/helpers';
import Rebase from 're-base';

var base = Rebase.createClass(firebaseConfig.firebaseUrl);

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    }
  }
  init() {
    this.ref = base.bindToState(this.router.getCurrentParams().username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    helpers.getGithubInfo(this.router.getCurrentParams().username)
      .then( (dataObj) => {
        this.setState({
          bio: dataObj.bio,
          repos: dataObj.repos
        })
      });
  }
  componentWillReceiveProps(){
    base.removeBinding(this.ref);
    this.init();
  }
  componentDidMount() {
    this.init();
  }
  componentWillMount() {
    this.router = this.context.router;
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  handleAddNote(newNote) {
    base.post(this.router.getCurrentParams().username, {
      data: this.state.notes.concat([newNote])
    });
  }
  render(){
    var username = this.router.getCurrentParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote.bind(this)}
            />
        </div>
      </div>
    )
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;
