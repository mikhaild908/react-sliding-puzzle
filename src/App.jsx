import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from './Box';

const solved = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9']
];
const imageUrl = `url(${require("./smiley.png")})`;
const emptyBoxBackground = {background: 'black' } ;

class App extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            sourceBox: null,
            targetBox: null,
            boxContents: [
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9']
            ]
        }

        this.setSourceBox = this.setSourceBox.bind(this);
        this.setTargetBox = this.setTargetBox.bind(this);
        this.swap = this.swap.bind(this);
        this.updateBoxEventListeners = this.updateBoxEventListeners.bind(this);
        this.resetSourceAndTargetBoxes = this.resetSourceAndTargetBoxes.bind(this);
    }

    componentDidMount() {
        this.updateBoxEventListeners();
    }

    setSourceBox(source) {
        this.setState({sourceBox: source});
    }

    setTargetBox(target) {
        this.setState({targetBox: target});
    }

    updateBoxEventListeners() {
        this.setDraggable(this.refs.box1);
        this.setDraggable(this.refs.box2);
        this.setDraggable(this.refs.box3);
        this.setDraggable(this.refs.box4);
        this.setDraggable(this.refs.box5);
        this.setDraggable(this.refs.box6);
        this.setDraggable(this.refs.box7);
        this.setDraggable(this.refs.box8);
        this.setDraggable(this.refs.box9);
    }

    setDraggable(box) {
        box.setDraggable(this.isBox9Below(box)
            || this.isBox9OnTop(box)
            || this.isBox9ToTheLeft(box)
            || this.isBox9ToTheRight(box));
    }

    resetSourceAndTargetBoxes() {
        this.setState({
            sourceBox: null,
            targetBox: null
        });
    }

    render() {
        return (
            <div className="App">
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    Sliding Puzzle - React
                </header> */}
                <div className='canvas'>
                    <div className='board'>
                        <Box id='box1' ref="box1" className='square' text='1' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `${imageUrl} 0 0`}}/>
                        <Box id='box2' ref="box2" className='square' text='2' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `${imageUrl} -120px 0px` }} />
                        <Box id='box3' ref="box3" className='square' text='3' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `${imageUrl} -240px 0px` }} />
                        <Box id='box4' ref="box4" className='square' text='4' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `${imageUrl} 0px 240px` }} />
                        <Box id='box5' ref="box5" className='square' text='5' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `${imageUrl} -120px 240px` }} />
                        <Box id='box6' ref="box6" className='square' text='6' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `${imageUrl} -240px 240px` }} />
                        <Box id='box7' ref="box7" className='square' text='7' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `${imageUrl} 0px 120px` }} />
                        <Box id='box8' ref="box8" className='square' text='8' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `${imageUrl} -120px 120px` }} />
                        <Box id='box9' ref="box9" className='square' text='9' draggable={false} setSourceBox={this.setSourceBox} setTargetBox={this.setTargetBox} swap={this.swap} style={{background: `` }} />
                    </div>
                </div>
            </div>
        );
    }

    swap() {
        if(this.state.sourceBox !== this.state.targetBox) {
            this.swapBackgrounds(this.state.sourceBox, this.state.targetBox);
            this.swapTextContent(this.state.sourceBox, this.state.targetBox);
            this.updateBoxContents(this.state.sourceBox, this.state.targetBox);
            this.updateBoxEventListeners();
            //  TODO: this.resetSourceAndTargetBoxes();
        }
    }

    swapTextContent(source, target) {
        const targetText = target.state.text;
        target.setState({text: source.state.text});
        source.setState({text: targetText});
    }

    swapBackgrounds(source, target) {
        target.setState({style: source.state.style});
        source.setState({style: emptyBoxBackground});
    }

    updateBoxContents(source, target) {
        for(let i = 0; i < this.state.boxContents.length; i++) {
            for(let j = 0; j < this.state.boxContents.length; j++) {
                if((source.state.id) === 'box' + ((i * this.state.boxContents.length + j) + 1)) {
                    this.state.boxContents[i][j] = source.state.text;
                }
                else if((target.state.id) === 'box' + ((i * this.state.boxContents.length + j) + 1)) {
                    this.state.boxContents[i][j] = target.state.text;
                }
            }
        }
    }

    getRowColumn(id) {
        const rowColumn = [-1,-1];

        if(id <= 3) {
            rowColumn[0] = 0;
            rowColumn[1] = id - 1;
        }
        else if(id <= 6) {
            rowColumn[0] = 1;
            rowColumn[1] = id - 4;
        }
        else {
            rowColumn[0] = 2;
            rowColumn[1] = id - 7;
        }

        return rowColumn;
    }

    getBoxNumber(box) {
        return box.state.id.replace("box", "");
    }

    isBox9ToTheRight(box) {
        const boxNumber = this.getBoxNumber(box);
        const modulus = Number(boxNumber) % this.state.boxContents.length;
        
        if(modulus === 0) {
            return false;
        }

        const rowColumn = this.getRowColumn(boxNumber);

        if(this.state.boxContents[rowColumn[0]][rowColumn[1]+ 1] === '9') {
            return true;
        }

        return false;
    }

    isBox9ToTheLeft(box) {
        const boxNumber = this.getBoxNumber(box);
        const modulus = Number(boxNumber) % this.state.boxContents.length;

        if(modulus === 1) {
            return false;
        }

        const rowColumn = this.getRowColumn(boxNumber);

        if(this.state.boxContents[rowColumn[0]][rowColumn[1] - 1] === '9') {
            return true;
        }

        return false;
    }

    isBox9OnTop(box) {
        const boxNumber = this.getBoxNumber(box);
        
        if(Number(boxNumber) <= this.state.boxContents.length) {
            return false;
        }

        const rowColumn = this.getRowColumn(boxNumber);

        if(this.state.boxContents[rowColumn[0] -1][rowColumn[1]] === '9') {
            return true;
        }

        return false;
    }

    isBox9Below(box) {
        const boxNumber = this.getBoxNumber(box);

        if(boxNumber > this.state.boxContents.length * (this.state.boxContents.length - 1)) {
            return false;
        }

        const rowColumn = this.getRowColumn(boxNumber);

        if(this.state.boxContents[rowColumn[0] + 1][rowColumn[1]] === '9') {
            return true;
        }

        return false;
    }
}

export default App;