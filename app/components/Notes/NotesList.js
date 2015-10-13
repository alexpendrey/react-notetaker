var React = require('react');

var NotesList = React.createClass({
  render: function() {
    //console.log('notes: ' + this.props.notes);
    var notes = this.props.notes.map(function(note, index) {
      return <li className="list-group-item" key={index}> {note} </li>
    });
    return (
      <ul className="list-group">
        {notes}
      </ul>
    )
  }
});

module.exports = NotesList;