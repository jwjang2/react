import React, { Component, createContext } from 'react';
import './App.css';
import TOC from "./components/TOC"
import Subject from "./components/Subject"
import ReadContent from "./components/ReadContent"
import Control from "./components/Control"
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor (props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcomm',
      selectted_content_id : 1,
      subject:{title:"WEB",sub:"world wide web!"},
      welcomm:{title:"Welcomm",desc:"Hello, React!!"},
      contents : [
        {id:1, title:'HTML', desc:'HTML is ...'},
        {id:2, title:'CSS', desc:'CSS is ...'},
        {id:3, title:'JavaScript', desc:'JavaScript is ...'}
      ]
    }
  }

  getReadContent() {
    var i = 0;
    while(i < this.state.contents.length) {
      var data = this.state.contents[i];
      if(data.id === this.state.selectted_content_id) {
        return data;
      }
      i = i+1;
    }
    return data;
  }

  getContent() {
    var _title,_desc,_article,_content = null;
    if(this.state.mode === 'welcomm') {
      _title = this.state.welcomm.title;
      _desc = this.state.welcomm.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title,_desc) {
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState( {
          contents : _contents,
          mode:'read',
          selectted_content_id : this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content}
        onSubmit={function (_id,_title,_desc) {
          var _contents = Array.from(this.state.contents);
          var inx = this.state.selectted_content_id -1;
          var i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id,title:_title,desc:_desc};
              break;
            }
            i = i +1;
          }
          this.setState( {
            contents : _contents,
            mode:'read'
          });      
        }.bind(this)}></UpdateContent>
    }
    return _article;    
  }

	render() {
    console.log('App render');

	  return (
	    <div className="App">
        <Subject
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({mode:'welcomm'});
          }.bind(this)}
        ></Subject>
	    	<TOC 
          data={this.state.contents} 
          onChangePage={function (id) {
            this.setState( {
              mode:'read',
              selectted_content_id:Number(id)
            });
          }.bind(this)}
        ></TOC>
        <Control
          OnChangeMode={function (_mode) {
            if(_mode === 'delete') {
              if(window.confirm('really?')) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while(i < _contents.length) {
                  if(_contents[i].id == this.state.selectted_content_id) {
                    _contents.splice(i,1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  contents : _contents,
                  mode:'welcomm'
                });
                alert('deleted!');
              }
            } else {
              this.setState({
                mode:_mode
              });            
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
	    </div>
	  );
	}
}

export default App;
