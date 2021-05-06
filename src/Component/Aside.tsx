import {
  Avatar,
  Box,
  Button,
  createStyles,
  Divider, Drawer,
  Link,
  List, ListItem, ListItemIcon, ListItemText,
  makeStyles, Tab, Tabs, Theme, Typography, useMediaQuery, useTheme
} from "@material-ui/core"
import * as icons from "@material-ui/icons"
import React from 'react'
import AsideProps from '../Model/AsideProps'
import IconLinkButton from './IconLinkButton'

const useStyles = (args: {
  drawerLeftWidth: number
  drawerRightWidth: number
}) => {
  const { drawerLeftWidth, drawerRightWidth } = args
  const drawerWidth = drawerLeftWidth + drawerRightWidth + 1
  return makeStyles((theme: Theme) =>
    createStyles({
      left: {
        width: drawerLeftWidth,
        height: "100%",
        position: "absolute",
        display: "flex",
        flexDirection: "column",

        [theme.breakpoints.down('sm')]: {
          width: "100%",
          height: 250,
        },
      },
      leftHeader: {
        marginTop: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      },
      avatar: {
        width: "100%",
        height: "inherit",
        margin: theme.spacing(1),

        [theme.breakpoints.down('sm')]: {
          width: "30%",
        },
      },
      avatarName: {
        textAlign: 'center',
        wordBreak: 'keep-all',
      },
      leftBottom: {
        marginBottom: 0,
        display: 'flex',

        "& button": {
          width: "50%",
        },
        "& hr": {
          width: 2,
          height: "auto",
        },
      },
      category: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
          display: "none",
        },
      },

      right: {
        left: drawerLeftWidth,
        width: drawerRightWidth,
        height: "100%",
        position: "absolute",

        [theme.breakpoints.down('sm')]: {
          width: "100%",
          top: 250,
          left: 'inherit',
          height: 'auto',
        },
      },
      rightHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',


        [theme.breakpoints.down('sm')]: {
          display: "none",
        },
      },

      drawer: {
        width: drawerWidth,
        flexShrink: 0,

        [theme.breakpoints.down('sm')]: {
          width: "100%",
        },
      },
      drawerPaper: {
        width: drawerWidth,

        [theme.breakpoints.down('sm')]: {
          width: "100%",
          flexDirection: "row",
        },
      },
    }),
  )
}

function a11yProps(index: any) {
  return {
    id: `category-tab-${index}`,
    'aria-controls': `category-tabpanel-${index}`,
  }
}
export default function Aside(props: AsideProps) {
  const { drawerWidth, drawerLeft, isOpen } = props
  const theme = useTheme()
  const classes = useStyles({
    drawerRightWidth: drawerWidth,
    drawerLeftWidth: drawerLeft
  })()

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Drawer
      className={ classes.drawer }
      variant="persistent"
      anchor="left"
      open={ isOpen }
      classes={ {
        paper: `${classes.drawerPaper} aside`,
      } }>
      <div className={ classes.left }>
        <div className={ classes.leftHeader }>
          <Avatar
            className={ classes.avatar }
            alt="舰队的偶像-岛风酱!"
            src="//avatars1.githubusercontent.com/u/42184238"
          />
          <Typography className={ classes.avatarName }>
            舰队的偶像-岛风酱!
          </Typography>
          <div>
            <IconLinkButton href="https://github.com/frg2089" icon="fab fa-github" isFontAwesome />
            <IconLinkButton href="/atom.xml" icon="rss_feed" />
            <IconLinkButton href="mailto:frg2089@outlook.com" icon="email" />
          </div>
        </div>
        <Divider />
        <Tabs
          className={ classes.category }
          orientation="vertical"
          variant="scrollable"
          value={ value }
          onChange={ handleChange }>
          <Tab label="Item One" { ...a11yProps(0) } />
          <Tab label="Item Two" { ...a11yProps(1) } />
          <Tab label="Item Three" { ...a11yProps(2) } />
          <Tab label="Item Four" { ...a11yProps(3) } />
          <Tab label="Item Five" { ...a11yProps(4) } />
          <Tab label="Item Six" { ...a11yProps(5) } />
          <Tab label="Item Seven" { ...a11yProps(6) } />
        </Tabs>
        <Divider />
        <div
          className={ classes.leftBottom }>
          <Button >
            友链
          </Button>
          <Divider />
          <Button>
            关于
          </Button>
        </div>
      </div>

      <div className={ classes.right }>
        <div className={ classes.rightHeader }>
          <Typography>
            Shimakaze Blog
          </Typography>
        </div>
        <Divider />
        <List>
          { ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={ text }>
              <ListItemIcon>{ index % 2 === 0 ? <icons.Inbox /> : <icons.Mail /> }</ListItemIcon>
              <ListItemText primary={ text } />
            </ListItem>
          )) }
        </List>
        <Divider />
        <List>
          { ['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={ text }>
              <ListItemIcon>{ index % 2 === 0 ? <icons.Inbox /> : <icons.Mail /> }</ListItemIcon>
              <ListItemText primary={ text } />
            </ListItem>
          )) }
        </List>
      </div>
    </Drawer>
  )
}