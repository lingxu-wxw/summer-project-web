/**
 * Created by 励颖 on 2018/7/3.
 */
import { Layout, Menu, Breadcrumb, Icon, Input, Select, Button, Popconfirm, Table, } from 'antd';
import React, { Component } from 'react';
import './../App.css';
import {Link} from "react-router-dom";
import context from "../context";


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select.Option;

class DeleteUser extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            data: [],
            count: 0,
            content: ''
        };
        this.columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            align: 'center',
        }, {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            width: '20%',
            align: 'center',
        }, {
            title: '电话号码',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            align: 'center',
        }, {
            title: '积分',
            dataIndex: 'credit' ,
            key: 'credit',
            width: '15%',
            align: 'center',
        }, {
            title: '身份',
            dataIndex: 'identity' ,
            key: 'identity',
            width: '18%',
            align: 'center',
        },{
            title: '删除',
            dataIndex: 'operation',
            align: 'center',
            render: (text, record) => {
                return (
                    <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(record.key)}>
                        <a href="javascript:"><Icon type="delete"/></a>
                    </Popconfirm>)
            }
        }];
    }

    onDelete = (key) => {
        const data = [...this.state.data];
        fetch(context.api+'/user/delete?userId='+ data[key-1].ID,
            {
                method: 'POST',
                mode: 'cors',
            })
            .then(response => {
                console.log('Request successful', response);
                return response.json()
                    .then(result => {
                        if (result.msg === "success") {
                            this.setState({data: data.filter(item => item.key !== key)});
                            alert("删除成功");
                        }
                        else {
                            alert("删除失败");
                        }
                    })
            });
    };

    onChangeContent = (e) => {
        this.setState({
            content:e.target.value,
        })
    };

    handleSearch = () => {
        this.state.data=[];
        fetch(context.api+'/user/search?content='+this.state.content,
            {
                method: 'POST',
                mode: 'cors',
            })
            .then(response => {
                //console.log('Request successful', response);
                return response.json()
                    .then(result => {
                        if (result.msg === 'success'){
                            let len = result.userList.length;
                            this.setState({
                                data:[],
                                count:0,
                            });
                            for (let i=0; i < len; i++) {
                                const {data,count}=this.state;
                                let user = result.userList[i];
                                let identity = '';
                                if (user.teacher.toString() === 'false') {
                                    identity = "学生";
                                }
                                else{
                                    identity = "教师"
                                }
                                const add = {
                                    "key": this.state.count+1,
                                    "ID": user.userId,
                                    "name": user.username,
                                    "credit": user.credit,
                                    "identity": identity,
                                    "phone": user.phone,
                                };
                                this.setState({
                                    data: [...data, add],
                                    count: count+1,
                                });
                            }
                        }
                        else{
                            alert("查询失败，请重新搜索");
                            window.location.reload();
                        }
                    })
            });
    };

    render(){
        return(
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="./"><span><Icon type="home"/></span>主页</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="management"><span><Icon type="setting"/></span>管理信息</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="search"><span><Icon type="search"/></span>查询信息</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="statistics"><span><Icon type="form"/></span>统计信息</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="login"><span><Icon type="user"/></span>登录</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>主页</Breadcrumb.Item>
                        <Breadcrumb.Item>删除用户</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultOpenKeys={['sub1']}
                                defaultSelectedKeys={['2']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" />普通用户管理</span>}>
                                    <Menu.Item key="1"><Link to="adduser">添加用户</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="deleteuser">删除用户</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to="modifyuser">修改用户</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="car" />班次信息管理</span>}>
                                    <Menu.Item key="5"><Link to="addshift">添加班次</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="deleteshift">删除班次</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="modifyshift">修改班次</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="idcard" />司机用户管理</span>}>
                                    <Menu.Item key="9"><Link to="adddriver">添加司机</Link></Menu.Item>
                                    <Menu.Item key="10"><Link to="deletedriver">删除司机</Link></Menu.Item>
                                    <Menu.Item key="11"><Link to="modifydriver">修改司机</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" title={<span><Icon type="form" />公告管理</span>}>
                                    <Menu.Item key="12"><Link to="addmessage">发布新公告</Link></Menu.Item>

                                </SubMenu>


                            </Menu>
                        </Sider>
                        <Content>
                            <Input name="content" label="搜索内容" size="large" style={{width: '30%', marginLeft:'100px' }}
                                   prefix={<Icon type="search"/>} placeholder="请输入用户相关信息" onChange={this.onChangeContent}/>
                            <Button type="primary"  size="large" style={{width: '10%', marginLeft: '10px'}} onClick = {this.handleSearch}>搜索</Button>
                            <h1/>
                            <Table style={{width:'88%', marginLeft:'70px'}}columns={this.columns} dataSource={this.state.data} />

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

export default DeleteUser;
