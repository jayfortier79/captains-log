const React = require('react')

class Show extends React.Component {
  render () {
    const { title, entry ,shipIsBroken} = this.props.Log

    return (
      <div>
        <h1> Show Page </h1>
        <div>
        The {title} is {entry}.
        And {
          shipIsBroken ? 
            "The Ship Is Broken!"
          :
            "The Ship Is Not Broken!"
        }
        </div>
       
      
      </div>
    );
  }
}




module.exports = Show;