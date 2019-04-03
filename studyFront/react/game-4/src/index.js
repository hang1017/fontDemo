import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function ItemList(props){
        return(
            <ul>
                {props.items.map(item=>(
                <li key={item}>{item}</li>
                ))}
            </ul>
        )
}

function ShowText(props){
    return(
        <div>
            <h3>output</h3><br/>
            <label>{props.outputText}</label>
            {/* <label>{new Date().toLocaleTimeString()}</label> */}
        </div>
    )
}

// 定时器
class JsxText extends React.Component{

    constructor(){
        super();
        this.state={
            timeText:"",

        }
    }

    tick(){
        this.setState({
            timeText:new Date().toLocaleTimeString()
        })
    }

    componentDidMount(){
        this.timeID = setInterval(()=>(this.tick(),1000));
    }

    componentWillUnmount(){
        clearInterval(this.timeID);
    }



    render(){
        return(
            <div>
                <h2>{this.state.timeText}</h2>
            </div>
        )
    }
}

class SelTest extends React.Component{
    constructor(){
        super();
        this.state={
            selText:'hang2'
        }
        this.onSelChange = this.onSelChange.bind(this);
        this.onSelSubmit = this.onSelSubmit.bind(this)
    }

    onSelChange(e){
        this.setState({
            selText:e.target.value
        })
    }

    onSelSubmit(e){
        e.preventDefault();
        alert(this.state.selText);
    }

    render(){
        return (
            <div>
                <form  onSubmit={this.onSelSubmit}>
                    <select value = {this.state.selText} onChange={this.onSelChange} >
                        {this.props.selItem.map((item)=>
                            <option value={item} key={item}>{item}</option>
                        )}
                    </select>
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

// setInterval(JsxText,1000);

class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputText = this.handleInputText.bind(this)
        this.state={
            itemList:[],
            text:'',
            inputText:'',
            selItem:['hang1','hang2','hang3','hang4']
        }
    }

    handleChange(e){
        this.setState({
            text:e.target.value,
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({
            itemList:this.state.itemList.concat(this.state.text),
            text:''
        })
    }

    handleInputText(e){
        this.setState({
            inputText:e.target.value
        })
    }

    render(){
        return(
            <div>
                {/* 输入文字，新增到 li 标签下 */}
                <ItemList items={this.state.itemList}/>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleChange} value={this.state.text} />
                        <button>
                            Add # {this.state.itemList.length+1}
                        </button>
                    </form>
                </div>

                {/* 当 textarea 标签变动时，下面的输出文字也跟着变动 */}
                <div>
                    <textarea onChange={this.handleInputText} value={this.state.inputText}>

                    </textarea>
                </div>
                <div>
                    <ShowText outputText={this.state.inputText}/>
                </div>

                {/* 时间定时器 */}
                <div>
                    <JsxText />
                </div>
                <div>
                    <SelTest selItem={this.state.selItem}/>
                </div>
            </div>
        )
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            seconds:0
        }
    }

    tick(){
        this.setState(preState=>({
            seconds:this.state.seconds+1
        }));
    }

    // componentDidMount(){
    //     this.interval = setInterval(() => this.tick(), 100);
    // }

    render(){
        return(
            <div>
                <div>
                    seconds:{this.state.seconds}
                </div>
                <div>
                    <TodoApp item={"hang"}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    
    document.getElementById('root')
  );




