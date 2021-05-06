import { Box, IconButton, NoSsr } from '@material-ui/core'
import * as icons from "@material-ui/icons"
import React from 'react'
import { Route, Switch } from 'react-router'
import PageRouteProps from '../Model/PageRouteProps'
import PageRouteState from '../Model/PageRouteState'
import Articles from '../Page/Articles'
import Error_404 from '../Page/Error_404'
import Error_500 from '../Page/Error_500'
import Index from '../Page/Index'
import Post from '../Page/Post'

export default class PageRoute extends React.Component<PageRouteProps, PageRouteState> {
  constructor(props: PageRouteProps) {
    super(props)
    this.state = {}
  }
  render() {
    let element: JSX.Element
    if (this.state.error) {
      // 可以自定义降级后的 UI 并渲染
      element = <Error_500 error={ this.state.error } />
    } else {
      element = (
        <Switch>
          <Route path="/" exact component={ Index } />
          <Route path="/articles" exact component={ Articles } />
          <Route path="/post/:pid" component={ Post } />
          <Route component={ Error_404 } />
        </Switch>
      )
    }

    return (
      <Box { ...this.props.boxProps }>
        <NoSsr>
          <IconButton { ...this.props.asideButtonProps }>
            { this.props.asudeButtonContext }
          </IconButton>
          { element }
        </NoSsr>
      </Box>
    )
  }
  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error: error }
  }
  componentDidCatch(error: any, errorInfo: any) {
    // 可以将错误日志上报给服务器
    console.error(error)
    console.error(errorInfo)
  }
}