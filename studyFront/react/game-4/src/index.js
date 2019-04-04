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
    constructor(props){
        super(props);
        this.state={
            selText:'hang2',
            boil:''
        }
        this.onSelChange = this.onSelChange.bind(this);
        this.onSelSubmit = this.onSelSubmit.bind(this);
        // this.boilInput = this.props.boilInput;
    }

    onSelChange(e){
        const target = e.target;
        if(target.type === 'radio'){
            console.log(e.target.value);
        }else if(target.type === 'select'){
            this.setState({
                selText:e.target.value
            })
        }else if(target.name==='input1'){
            console.log(target.value);
        }
        
    }

    onSelSubmit(e){
        e.preventDefault();
        alert(this.state.selText);
    }

    // boilInput(){
    //     // alert();
    //     let cb = "";
    //     if(this.props.boilInput >100){
    //         cb="水开啦";
    //     }else{
    //         cb="水没开";
    //     }
    //     console.log(cb);
    //     this.setState({
    //         boil:this.cb
    //     })
    // }

    

    render(){
        return (
            <div>
                <form  onSubmit={this.onSelSubmit}>
                    <select value = {this.state.selText} onChange={this.onSelChange} >
                        {this.props.selItem.map((item)=>
                            <option value={item} key={item}>{item}</option>
                        )}
                    </select>
                    <br/>
                    <input type="radio" name="radio1" value="hang11" onChange={this.onSelChange}/>left
                    <input type="radio" name="radio1" value="hang22" onChange={this.onSelChange}/>right
                    <input type="radio" name="radio1" value="hang33" onChange={this.onSelChange}/>top
                    <input type="radio" name="radio1" value="hang44" onChange={this.onSelChange}/>bottom
                    <br/>
                    <input name='input1' onChange={this.onSelChange}/>
                    <input name='input2' onChange={this.onSelChange}/>
                    <input name='input3' onChange={this.onSelChange}/>
                    <input name='input4' onChange={this.onSelChange}/>
                    <br/>
                    <button>submit</button>
                </form>
                <label>{this.props.boilInput}</label>
            </div>
        )
    }
}

function Boil(props){
    return(
        <div>
            <fieldset>
                <legend>请输入水温({props.aOrb})：</legend>
                <input value={props.boilText} onChange={props.onchange} />
            </fieldset>
        </div>
    )
}

function toA(b){
    return (b - 32) * 5 / 9;
}

function toB(a){
    return (a * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}


class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputText = this.handleInputText.bind(this)
        this.bindleInput = this.bindleInput.bind(this)
        this.state={
            itemList:[],
            text:'',
            inputText:'',
            selItem:['hang1','hang2','hang3','hang4'],
            boilText:0
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

    bindleInput(e){
        const v = e.target.value;
        let va = "";
        if(parseFloat(v)>100){
            va="水开啦"
        }else if(parseFloat(v)<100){
            va="水没开"
        }
        else{
            va = "请输入水温";
        }
        this.setState({
            boilText:va
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
                    <SelTest selItem={this.state.selItem} boilInput={this.state.boilText} />
                </div>
                <div>
                    <Boil aOrb="a" onchange={this.bindleInput}/>
                </div>
                <div>
                    <Boil aOrb="b" onchange={this.bindleInput}/>
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




