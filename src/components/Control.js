import React, { Component } from 'react';

class Control extends Component {
	render() {
    console.log('Control render');
		return (
      <ul>
        <li><a href="/create"
              onClick={function (e) {
                e.preventDefault();
                this.props.OnChangeMode('create');                
              }.bind(this)}>create</a></li>
        <li><a href="/update"
              onClick={function (e) {
                e.preventDefault();
                this.props.OnChangeMode('update');                
              }.bind(this)}>update</a></li>
        <li><input type="button" value="delete"
              onClick={function (e) {
                e.preventDefault();
                this.props.OnChangeMode('delete');                
              }.bind(this)}>        
            </input></li>
      </ul>
		);
	}
}

export default Control;