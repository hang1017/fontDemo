import React, { Component } from 'react';
// import Button from 'antd/lib/button';
import { DatePicker } from 'antd';
import { Button,Typography,Row, Col, Input,Tooltip,Select,Checkbox,AutoComplete,Slider,Tag,Tabs,Statistic, PageHeader, Steps,Icon ,Cascader,Form} from 'antd';
import './App.css';
import FormItem from 'antd/lib/form/FormItem';
import { registerDecorator } from 'handlebars';
// import Header from 'antd/lib/calendar/Header';
// import Paragraph from 'antd/lib/typography/Paragraph';
// import {Router, Route, Link, hashHistory} from 'react-router';
 
// import {createForm} from'rc-form';

const {Text,Title,Paragraph} = Typography;


const {RangePicker} = DatePicker;

// const FormItem = Form.Item;

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const steps = [{
  title: 'First',
  content: 'First-content',
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
}];

class App extends Component {

  gutters = {};
  columns = {};

  constructor(props){
    super(props);
    this.state={
      str:"hang",
      gutterKey:1,
      colCountKey:2,
      current:0,
      confirmDirty: false,
      autoCompleteResult: [],
      confirmDirty:false
    };
    [8,16,24,32,40,48].forEach((value,i)=>{this.gutters[i]=value;});
    [2,3,4,6,8,12].forEach((value,i)=>{this.columns[i]=value});

  }

  onChange=(e)=>{
    console.log(e);
    this.setState({
      str:e,
    });
  }

  onGutterChange = (gutterKey) =>{
    this.setState({gutterKey:gutterKey});
  }

  onColCountChange = (colCountKey) => {
    this.setState({colCountKey:colCountKey});
  }

  handleConfirmBlur=(e)=>{
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value})
  }

  validateToNextPassword=(rule,value,callback)=>{
    console.log(rule);
    console.log(value);
    console.log(callback);
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  handleWebsiteChange =(value) =>{
    let autoCompleteResult;
    if(!value){
      autoCompleteResult=[];
    }else{
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const { autoCompleteResult } = this.state;

    const { gutterKey ,colCountKey} = this.state;
    const cols = [];
    const colText = [];
    const colCount = this.columns[colCountKey];

    const TabPane = Tabs.TabPane;
    const Step = Steps.Step;

    const options = [{
      value:'福建',
      label:'福建',
      children:[{
        value:'福州',
        label:'福州'
      },{
        value:'漳州',
        label:'漳州'
      }]
    },{
      value:'广东',
      label:'广东',
      children:[{
        value:'广州',
        label:'广州'
      },{
        value:'东莞',
        label:'东莞'
      }]
    }]

    const Description = ({term,children,span=12})=>(
      <Col span={span}>
        <div>
          <div>{term} : {children}</div>
          <div></div>
        </div>
      </Col>
    )

    const content=(
      <Row>
          <Description term="Created" >Lili Qu</Description>
          <Description term="Association">
            <a>421421</a>
          </Description>
          <Description term="Creation Time">2017-01-10</Description>
          <Description term="Effective Time">2017-10-10</Description>
          <Description term="Remarks" span={24}>
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Description>
      </Row>
    )

    for(let i = 0;i<colCount;i++){
      cols.push(
        <Col span={24/colCount} key={i.toString()}>
          <div className="bgColor">column</div>
        </Col>
      );
      colText.push(
        <Text>{`<Col span={`}{24/colCount}{`} />`}</Text>
        // <br/>
      )
    }

    const extraContent=(
      <Row>
        <Col span={12}>
          <Statistic title="Status" value="Pending" />
        </Col>
        <Col span={12}>
          <Statistic title="Price" prefix="$" value={568.08} />
        </Col>
      </Row>
    )

    const prefixSelector = getFieldDecorator('prefix',{
      initialValue: '86',
    })(
      <Select>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website=>(
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <Text code>航</Text><br/>
        <Title level={3}>标签都要为大写啊！</Title>
        <Text editable={{onChange:this.onChange}}>{this.state.str}</Text><br/>
        <Text copyable>copy this text:hang</Text><br/>
        <Text copyable={{text:'hangshuaishuai'}}>复制出来的不是现在的这段文字</Text><br/>
        
        {/* 隐藏文字学习 */}
        <div className="textTextDiv">
          <Paragraph ellipsis>
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
          </Paragraph>
          <Paragraph ellipsis={{rows:3,expandable:true}}>
            ellipsis 为不换行。 如果标签选择用 Text 的话 超出文本不会隐藏。
            如果用 Paragraph 会隐藏，亲测过，具体对不对小伙伴可以自行测试。
            expandable:true // 标签为扩展标签，选中可以查看全部文字
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
            Ant Design, a design language for background applications, is refined by Ant UED Team.
          </Paragraph>
        </div>

        <div className="gridDiv">
          <Row type="flex" justify="space-around" align="top"> 
            <Col span={6} order={2} className="gridColDiv">col-6-1</Col>
            <Col span={6} order={3} className="gridColDiv">col-6-2</Col>
            <Col span={6} order={1} className="gridColDiv">col-6-3</Col>
          </Row>
        </div>

        {/* 栅格编辑器学习 */}
        <div style={{width:'50%'}}>
          <span>Gutter(px):</span>
          <div ><br/>
          <Text></Text>
            <Slider 
              min={0}
              max={Object.keys(this.gutters).length - 1}
              value={gutterKey}
              onChange={this.onGutterChange}
              step={null}
              marks={this.gutters}
            />
          </div>
          <span>Column Count:</span>
          <div > 
            <Slider 
              min={0}
              max={Object.keys(this.columns).length - 1}
              value={colCountKey}
              onChange={this.onColCountChange}
              step={null}
              marks={this.columns}
            />
          </div>
          <Row gutter={this.gutters[gutterKey]} >{cols}</Row>
          <div>
            <Text>{`<Row gutter={`}{this.gutters[gutterKey]}{`}>`}</Text><br/>
            {colText}
            <Text>{`</Row>`}</Text>
          </div>
        </div>

        {/* paperHeader 页头 */}
        <div style={{width:'800px'}}>
          <PageHeader
            onBack={()=>window.history.back()}
            title="PageHeader Title"
            subTitle="hang shuaishaui subTitle"
            tags={<Tag color="red">warning</Tag>}
            extra={[
              <Button key='3'>Operation</Button>,
              <Button key='1'>Operation</Button>,
              <Button key='2' type="primary">primary</Button>
            ]}

            footer={
              <Tabs defaultActiveKey="1">
                <TabPane tab="Details" key="1"></TabPane>
                <TabPane tab="Operation" key="2"></TabPane>
              </Tabs>
            }
          >
            <div className="wrap">
              <Col span={16}><div span={16}>{content}</div></Col>
              <Col span={8}><div span={8}>{extraContent}</div></Col>
            </div>
          </PageHeader>
        </div>
        {/* 步骤条 */}
        <div>
            <Steps current={2}>
              <Step title="Finished" icon={<Icon type="user" />} description="This is a description." />
              <Step title="In Progress" icon={<Icon type="loading" />} description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
        </div>
        <div>
            <Steps current={this.state.current}>
              {steps.map(item=><Step key={item.title} title={item.title}/>)}
            </Steps>
            <div className="steps-content">{steps[this.state.current].content}</div>
            <div className="steps-action">
              {
                this.state.current<steps.length-1 &&
                <Button type="primary" >Next</Button>
              }{
                this.state.current===steps.length-1 &&
                <Button type="primary" >Done</Button>
              }{
                this.state.current>0 &&
                <Button type="primary" >Previous</Button>
              }
            </div>
        </div>

        {/* 级联下拉框 */}
        <div>
          <Cascader options={options} placeholder="Please select" />
        </div>

        {/* 日期选择器 */}
        <div>
          <RangePicker></RangePicker>
        </div>

        {/* 表单 */}
        <div style={{width:'600px'}}>
          <Form {...formItemLayout}>
              <Form.Item
                label="E-mail"
              >
                {getFieldDecorator('111',{
                  rules:[{
                    type:'email',message:'The input is not valid E-mail!'
                  },{
                    required:true,message:'Please input your E-mail!'
                  }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label="Password"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="password" />
                )}
              </Form.Item>
              <Form.Item
                label="Comfirm Password"
              >
                {getFieldDecorator('confirm',{
                  rules:[{
                    required:true,message:'Please confirm your password!',
                  },{
                    validator: this.compareToFirstPassword,
                  }]
                })(
                  <Input type="password"  />
                )
                }
              </Form.Item>
              <Form.Item
                label={(
                  <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('confirm',{
                  rules:[{
                    required:true,message:'Please confirm your password!',
                  }]
                })(
                  <Input />
                )
                }
              </Form.Item>
              <Form.Item
                label="address"
              >
                {getFieldDecorator('add',{
                  rules:[{
                    type:'array',required:true,message:"please choose your address!!"
                  }]
                })(
                  <Cascader options={options} placeholder="Please select" />
                )}
              </Form.Item>
              <Form.Item
                label="phone number"
              >
                {getFieldDecorator('phone',{
                  rules:[{
                    required:true,message:"Please input your phone number!"
                  }]
                })(
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
              </Form.Item>
              <Form.Item
                label="Website"
              >
                {getFieldDecorator('website', {
                  rules: [{ required: true, message: 'Please input website!' }],
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                    placeholder="website"
                  >
                    <Input />
                  </AutoComplete>
                )}
              </Form.Item>
              <Form.Item
                label="Captcha"
                extra="We must make sure that your are a human."
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: 'Please input the captcha you got!' }],
                    })(
                      <Input />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button>Get captcha</Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement',{
                  valuePropName: 'checked',
                })(
                  <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
              </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

// const WrappedRegistrationForm = Form.create({ name: 'register' })(App);


// export default App;
export default Form.create({name: 'register'})(App);
