import { Button } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import * as React from "react"

export default class Error_404 extends React.Component {
  render() {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <hr />
        <p>
          Cannot found Resource from { window.location.href }
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={ () => window.history.back() }
            startIcon={ <ArrowBack /> } style={ {
              borderRadius: '20px',
            } }
          >
            Go Back
          </Button>
        </p>
      </div>
    )
  }
}