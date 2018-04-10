var SunMor = React.createClass({
    getInitialState: function() {
      return {
        src: 'pinkMor.png'
      }
      
    },
    
    handleClick: function() {
      this.setState({
        src: '../../client\public\images\blueMor.png'
      })
    },
    
    render : function() {
      return (
        <div>
          <button 
            onClick={this.handleClick} 
            style={{backgroundColor:this.state.bgColor}}>Button</button>
        </div>
      )
    }
  });
  
  ReactDOM.render(
    <Button />,
      document.getElementById('button')
  );