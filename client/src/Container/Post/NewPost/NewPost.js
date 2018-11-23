import React, { Component } from 'react';
import classes from './NewPost.css';

class NewPost extends Component {

    headClass = ["col-md-6 offset-md-3", classes.heading, classes.paddClass];
    textareaClass1 = ["form-group", classes.paddClass];
    textareaClass2 = ["form-group", classes.paddClass];
    textareahead = ["form-control z-depth-1", classes.boldhead];
    containerClass = ["container-fluid", classes.containerClass];

    render () {
        return (
            <div className={this.containerClass.join(' ')}>
                <div className={classes.mainClass}>
                    <div className="row">
                        <div className={this.headClass.join(' ')}>
                            <p>Create A Post</p>
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow-textarea">
                            <form>
                                <div className={this.textareaClass1.join(' ')}>
                                    <textarea 
                                        className= {this.textareahead.join(' ')}
                                        id="exampleFormControlTextarea6" 
                                        rows="1" 
                                        placeholder="Add your Title">
                                    </textarea>
                                </div>
                                <div className={this.textareaClass2.join(' ')}>
                                    <textarea 
                                        className="form-control z-depth-1" 
                                        id="exampleFormControlTextarea6" 
                                        rows="6" 
                                        placeholder="Write Something...">
                                    </textarea>
                                </div>
                                <div>
                                    <button className="btn btn-info">Post Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewPost;