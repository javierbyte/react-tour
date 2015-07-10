var React = require('react');
var ReactTour = require('../src/index.jsx');

var Demo = React.createClass({

  getInitialState() {
    return {
      reactTourConfig: null,
      currentStep: -1,
      isTourVisible: false
    };
  },

  componentDidMount() {
    this.updateConfig();
  },

  updateConfig() {
    this.setState({
      reactTourConfig: [{
        node: React.findDOMNode(this.refs.step1),
        text: 'These are the instructions for the step one.'
      }, {
        node: React.findDOMNode(this.refs.step2),
        text: 'You can write anything here.'
      }, {
        node: React.findDOMNode(this.refs.step3),
        text: 'Last one!'
      }]
    });
  },

  onNextStep() {
    var {currentStep, reactTourConfig, isTourVisible} = this.state;

    if (currentStep + 1 < reactTourConfig.length) {
      currentStep = (currentStep + 1) % reactTourConfig.length;
      isTourVisible = true;
    } else if (isTourVisible) {
      isTourVisible = false;
    } else {
      currentStep = 0;
      isTourVisible = true;
    }

    this.setState({
      currentStep: currentStep,
      isTourVisible: isTourVisible
    });
  },

  render() {
    var {reactTourConfig, currentStep, isTourVisible} = this.state;

    return (
      <div onClick={this.onNextStep}>
        <div className='step step1' ref='step1'>
          <h2>Step 1</h2>
          Click anywhere to continue!
        </div>
        <br />
        <div className='step step2' ref='step2'>
          <h2>Step 2</h2>
          React component that help you create nice step-by-step intros! It even autoupdates the position when you resize the window ;)
        </div>
        <br />
        <div className='step step3' ref='step3'>
          <h2>Step 3</h2>
          Im the demo step 3
        </div>

        <ReactTour config={reactTourConfig} currentStep={currentStep} visible={isTourVisible} />
      </div>
    );
  }

});

React.render(<Demo />, document.getElementById('react'));
