import { createMuiTheme, createStyles, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, ThemeProvider, Typography, useMediaQuery } from "@material-ui/core"
import * as icons from "@material-ui/icons"
import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import ApplicationProps from "./Model/ApplicationProps"
import Aside from "./Component/Aside"
import PageRoute from './Component/PageRoute'
import clsx from "clsx"


const useStyles = (args: {
  drawerLeftWidth: number
  drawerRightWidth: number
}) => makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    asideBtn: {
      float: "left",
      [theme.breakpoints.down('sm')]: {
        position: "fixed",
        float: "right",
        zIndex: 1201,
        right: 30,
      },
    },
    content: {
      flexGrow: 1,
      height: "100%",
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      overflowY: "scroll",

      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        marginLeft: -(args.drawerLeftWidth + args.drawerRightWidth),
      }
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
)

export default function Application(props: ApplicationProps) {
  if (!window.indexedDB) {
    return (
      <div>
        <p>您的浏览器不支持使用indexedDB 请更换浏览器</p>
      </div>
    )
  }
  const drawerLeftWidth = 120
  const drawerRightWidth = 360

  const classes = useStyles({
    drawerLeftWidth,
    drawerRightWidth,
  })()

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  let themeStyle: 'dark' | 'light' | 'auto' = 'auto'

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: "rgb(116, 77, 169)",
          },
          type: themeStyle === 'auto'
            ? prefersDarkMode
              ? 'dark'
              : 'light'
            : themeStyle,
        },
      }),
    [themeStyle, prefersDarkMode],
  )

  const toggleTheme = () => {
    switch (themeStyle) {
      case 'dark':
        themeStyle = 'light'
        break
      case 'light':
        themeStyle = 'auto'
        break
      case 'auto':
        themeStyle = 'dark'
        break
    }
    console.log(themeStyle)
  }

  const [asideState, setAsideState] = React.useState(
    !useMediaQuery(theme.breakpoints.down('sm'))
  )

  const OpenAside = () => {
    setAsideState(true)
  }

  const CloseAside = () => {
    setAsideState(false)
  }

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <Router>
        {/* 左侧导航栏 */ }
        <Aside
          drawerLeft={ drawerLeftWidth }
          drawerWidth={ drawerRightWidth }
          isOpen={ asideState } />

        <PageRoute
          boxProps={ {
            component: "article",
            className: `${clsx(classes.content, {
              [classes.contentShift]: asideState,
            })} article`
          } }
          asideButtonProps={ {
            className: classes.asideBtn,
            onClick: asideState ? CloseAside : OpenAside
          } }
          asudeButtonContext={
            asideState
              ? <icons.ChevronLeft />
              : <icons.ChevronRight />
          }
        />
      </Router>
    </ThemeProvider>
  )
}