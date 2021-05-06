import { Button } from '@material-ui/core'
import * as icons from "@material-ui/icons"
import * as React from "react"

export default class Error_500 extends React.Component<ErrorProps> {
  render() {
    return (
      <div>
        <h1>500 - Internal Server Error</h1>
        <hr />
        <p>
          若重复出现此问题请联系管理员
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={ () => window.history.back() }
            startIcon={ <icons.ArrowBack /> } style={ {
              borderRadius: '20px',
            } }
          >
            Go Back
          </Button>
        </p>
        {this.props.error.toString() }
      </div>
    )
  }
}
interface ErrorProps {
  error?: any
}