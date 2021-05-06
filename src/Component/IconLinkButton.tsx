import {
  createStyles, Icon,
  IconButton, makeStyles, Theme
} from '@material-ui/core'
import React from 'react'
import IconLinkButtonProps from '../Model/IconLinkButtonProps'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconBtn: {
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(2),
        height: theme.spacing(2),
      },
    },
  }),
)

export default function IconLinkButton(props: IconLinkButtonProps) {
  const classes = useStyles()
  const openLink = () => {
    window.open(props.href)
  }
  return (
    <IconButton
      className={ classes.iconBtn }
      onClick={ openLink }>
      {
        props.isFontAwesome
          ? <Icon className={ props.icon } />
          : <Icon>{ props.icon }</Icon>
      }
    </IconButton>)
}