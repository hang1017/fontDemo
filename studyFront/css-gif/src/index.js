import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class CssGif extends React.Component{
    render(){
        return(
            <div>
                <div className = "o1">
                    <div className="o1-1"></div>
                    <div className="o1-2"></div>
                </div>
                <div className = "o2">
                    <div className="o2-1"></div>
                    <div className="o2-2">aaaaaaaaaaaaaaaaaa</div>
                </div>
                <div className="o3">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </div>
                {/* 定位特效 */}
                <div className="o4">
                    <input size="30"/><br/>
                    <span className="o4-1">1</span>
                </div>
                <div className="o5">
                    <div className="o5-1">
                        <div className="o5-4"></div>
                    </div>
                    <div className="o5-2"></div>
                    <div className="o5-3"></div>
                </div>
                {/* 粘性特性 */}
                {/* <div className="o6">
                    <div className="o6-1"></div>
                    <div className="o6-2">111</div>
                    <div className="o6-3"></div>
                </div> */}
                {/* 相邻兄弟元素 */}
                <div className="o7">
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                    </ul>
                </div>
                {/* css绘制三角形 */}
                <div className="o8">
                    <div className="o8-1"></div>
                </div>
                {/* flex table布局 */}
                <div className="o9">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {/* 动画方向 */}
                <div className="o10">
                    <div className="o10-1"></div>
                    <div className="o10-2"></div>
                    <div className="o10-3"></div>
                    <div className="o10-4"></div>
                </div>
                
                {/* 角向渐变 */}
                <div className="o11"></div>
                {/* 图片 repeat */}
                {/* <div className="o12">
                    <img src="../../studyImg/biaoqing.png" alt="img" />
                </div> */}
                
                {/* 设置outline */}
                <div className="o13"></div>

                {/* 暂停动画 */}
                <div className = "o14">
                    <br/>
                    <div className="o14-1"></div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <CssGif/>,
    document.getElementById('root')
)