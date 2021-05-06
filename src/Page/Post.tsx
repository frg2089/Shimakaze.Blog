import { Container, createStyles, makeStyles, Paper, Theme } from '@material-ui/core'
import * as React from "react"
import { RouteComponentProps } from 'react-router'
import PostProps from "../Model/PostProps"
import axios from "axios"
import Markdown from '../Component/Markdown'
import Error_404 from './Error_404'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: `${theme.palette.background.paper}9f`,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(3),
    }
  }),
)

export default function Post(props: RouteComponentProps<PostProps>) {
  const classes = useStyles()
  const [md, setMd] = React.useState("")
  const [notFound, setNotFound] = React.useState(false)

  axios.get(`/post/${props.match.params.pid}.md`)
    .then(data => setMd(data.data))
    .catch(data => setNotFound(true))

  return notFound
    ? <Error_404 />
    : (
      <Container fixed>
        <Paper className={ classes.paper }>
          <Markdown data={ md } />
        </Paper>
      </Container>
    )
}
