import React from 'react';
import ReactDOM from 'react-dom';

class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            className: this.props.className,
            draggable: this.props.draggable,
            text: this.props.text,
            style: this.props.style
        }
    }

    render() {
        return (
            <div id={this.state.id}
                className={this.state.className}
                draggable={this.state.draggable}
                style={this.state.style}>
                {this.state.text}
            </div>
        );
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).removeEventListener('dragover', this.allowDrop.bind(this));
        ReactDOM.findDOMNode(this).removeEventListener('drop', this.drop.bind(this));
        ReactDOM.findDOMNode(this).removeEventListener('dragstart', this.drag.bind(this));

        this.setState({draggable: true});

        ReactDOM.findDOMNode(this).addEventListener('dragover', this.allowDrop.bind(this));
        ReactDOM.findDOMNode(this).addEventListener('drop', this.drop.bind(this));
        ReactDOM.findDOMNode(this).addEventListener('dragstart', this.drag.bind(this));
    }

    setDraggable(shouldBeDraggable) {
        this.setState({draggable: shouldBeDraggable});
    }

    allowDrop(event) {
        event.preventDefault();
    }

    drag(event) {
        this.props.setSourceBox(this);
    }

    drop(event) {
        event.preventDefault();

        this.props.setTargetBox(this);
        this.props.swap();
    }
}

export default Box;