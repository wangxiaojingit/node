import React from "react"

import ReactDom from "react-dom"

//1------
    // let flag=true;
    // let str=(<div className='red' style={{color:'green'}}>
    //           <h1>hello react </h1>
    //           <h2 dangerouslySetInnerHTML={{__html:(()=>'fn react')()}}></h2>
    //           <div>{flag?"三元":void 0}</div>
    //     </div>)

    // ReactDom.render(str,window.root)

//2---

    // function Clock(props){
    //   return <h2 style={{color:'green'}}>{props.date}</h2>
    // }

    // setInterval(()=>{
    //     let str=(<div>
    //     <Clock date={new Date().toLocaleString()}></Clock>
    //       </div>)
    // ReactDom.render(str,window.root)
    // },1000)
//3---

    class Clock extends React.Component{
        constructor(props){
            super();
            this.state={date:new Date().toLocaleString()};
        }
        componentDidMount(){
            //组件挂载之后
            setInterval(()=>{
                this.setState({date:new Date().toLocaleString()})
            },1000)
        }
        render(){ //render 的时候,只return了纯js,return this.state.date,发现就报错,加上标签然后再写就没问题,推测可能render的时候要加标签
           return (<React.Fragment>
              {this.state.date}+"---"+{this.props.time}
            </React.Fragment>);
        }
    }

    let str=(
         <Clock time='123'></Clock>
   )

ReactDom.render(str,window.root)


