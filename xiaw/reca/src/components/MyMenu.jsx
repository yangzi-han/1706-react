import React from 'react'
import { Menu, Icon } from 'antd';
import { NavLink, withRouter } from 'dva/router'
import routes from '@/router/router.config.js'

const { SubMenu } = Menu;

function CreateMenu(arry){
    return arry.map((item,index ) => {
        if(item.path){
            return item.show&&<Menu.Item key={item.path}>
        <NavLink to={item.path}>{item.title}</NavLink>
            </Menu.Item>
        }else{
            return <SubMenu
            key={item.title}
            title={
                <span>
                    <Icon  type="mail"/>
                    <span>{item.title}</span>
                </span>
            }
            >
                {CreateMenu(item.children)}
            </SubMenu>
        }
    })
}

class MyMenu extends React.Component{
        render(){
            let {pathname}=this.props.location
            console.log(this.props)
            return <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={[routes.routes[0].title]}
            mode="inline"
            >{
              CreateMenu(routes.pages)
            }
                
            </Menu>
        }
}
export default withRouter(MyMenu)