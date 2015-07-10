# React Router

React component that help you create nice step-by-step intros.

# Usage

  var ReactTourConfig = [{
    node: React.findDOMNode(this.refs.step1),
    text: 'This is the step 1'
  }, {
    node: React.findDOMNode(this.refs.step2),
    text: 'This is the step 2'
  }, {
    node: React.findDOMNode(this.refs.step3),
    text: 'This is the step 3'
  }];

  // [...]

  <ReactTour config={ReactTourConfig}
    currentStep={currentStep}
    onNextStep={this.onNextTourStep}/>

# Props
* `currentStep`: Integer or null.
* `config`: The react tour config object.
* `onNextStep`: Function.
