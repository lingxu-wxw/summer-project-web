/**
 * Created by 励颖 on 2018/4/3.
 */
import { Input } from 'antd';
import React, { Component } from 'react';
import { Button, Layout, Menu, Breadcrumb, Icon, } from 'antd';
import {Link } from "react-router-dom";


const { Header, Content, Footer } = Layout;

class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleLogon = props.handleLogon;
        this.state={
            username:'',
            password:'',
            error:false,
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    };

    handleKeyDown = (e) => {
        if (e.keyCode === 16){
            this.handleSubmit(e)
        }
    };


    handleSubmit = (e) => {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        if (username === null) {
            alert("用户名不能为空");
        }
        if (password === null) {
            alert("密码不能为空");
        }
        console.log("username:",username)
        console.log("password:",password)

        /*fetch('http://localhost:8080/User/logon?name=' + username + '&pwd=' + password,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include'
            })
            .then(response => {
                console.log('Request successful', response);
                return response.text()
                    .then(result => {
                        console.log("result:", result);
                        if (result === "Password wrong") {
                            alert("密码错误");
                            window.location.reload();
                        }
                        else if (result === "Fail") {
                            alert("用户不存在");
                            window.location.reload();
                        }
                        else {
                            //localStorage.setItem("user", username);
                            alert("登录成功");
                            window.location.href = "/cart";
                        }
                    })
            });*/
    }

    render()
    {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['5']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="./"><span><Icon type="home"/></span>主页</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="management"><span><Icon type="setting"/></span>管理信息</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="search"><span><Icon type="search"/></span>查询信息</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="statistics"><span><Icon type="form"/></span>统计信息</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="login"><span><Icon type="user"/></span>登录</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>主页</Breadcrumb.Item>
                        <Breadcrumb.Item>登录</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{padding: '24px 0', background: '#fff'}}>

                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <br></br>
                            <h2 style={{marginLeft:'600px'}}>管理员登录</h2>
                            <br></br>
                            <h1></h1>
                            <Input name="username" size="large" style={{width: '20%', marginLeft: '532px'}}
                                   placeholder="用户名" onChange={this.handleChange}/>
                            <h1></h1>
                            <Input name="password" size="large" style={{width: '20%', marginLeft: '532px'}} placeholder="密码"
                                   onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
                            <h1></h1>
                            <br></br>
                            <div>
                            <h2><Button size="large" type="primary" onClick={this.handleSubmit} >登录</Button>
                                &nbsp;
                                <Button size="large" type="primary"><Link to="./register">注册</Link></Button>
                                &nbsp;
                                <Button size="large" type="dashed">忘记密码</Button></h2>
                            </div>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    SJTU BUS BACK STAGE MANAGEMENT SYSTEM
                </Footer>
            </Layout>
        );
    }

}


export default Login;/**
 * Created by 励颖 on 2018/7/2.
 */