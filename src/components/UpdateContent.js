import React, { Component } from 'react';

class UpdateContent extends Component {
	constructor (props) {
    super(props);
    this.state = {
      id : this.props.data.id,
      title : this.props.data.title,
			desc : this.props.data.desc
    }
  }

	render() {
		console.log('UpdateContent render');
		return (
			<article>
				<h2>Update</h2>
				<form action="update_process" method="post" 
          onSubmit={function (e) {
						e.preventDefault();
						this.props.onSubmit(this.state.id,this.state.title,this.state.desc);
          }.bind(this)}>
					<input type="hidden" name="id" vlaue={this.state.id}></input>
          <p>
						<input 
							type="text" name="title" placeholder="title" value={this.state.title}
							onChange={function (e) {
								this.setState({title : e.target.value});
							}.bind(this)}
						></input></p>
          <p>
						<textarea name="desc" placeholder="description" value={this.state.desc}
							onChange={function (e) {
								this.setState({desc:e.target.value});								
							}.bind(this)}						
						></textarea></p>
          <p><input type="submit"></input></p>
				</form>
			</article>
		);
	}
}

export default UpdateContent;