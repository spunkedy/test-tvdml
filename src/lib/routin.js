import * as TVDML from 'tvdml';

var sampleScript = `
'use strict';

React.createElement(
    'document',
    null,
    React.createElement(
        'alertTemplate',
        null,
        React.createElement(
            'title',
            null,
            'real doc'
        ),
        React.createElement(
            'button',
            { onSelect: function onSelect() {
                    return TVDML.navigate('two');
                } },
            React.createElement(
                'text',
                null,
                'go to next'
            )
        )
    )
);`;

export default function(props) {
  var React = {createElement: TVDML.jsx};
  return TVDML
    .createPipeline()
    .pipe(({navigation: {passedProps}}) => {
      console.log("navigatin");
      return passedProps;
    })
    .pipe(TVDML.render((passedProps) => TVDML.createComponent({
      getInitialState() {
        console.log("state");

        return {
          active: null,
          loading: true,
        };
      },
      componentDidMount() {
        console.log("on did mount");


        var myObj = this;
        var runWithData = function(){
          myObj.loadData().then((response) => {
            myObj.setState({
              loading: false
            })
          });
        }



        runWithData();
      },
      loadData(){
        console.log("load data");

        return new Promise(resolve => setTimeout( resolve, 1000));
      },
      render(){
        console.log("RENDER HIT");
        console.log(props);

        if( this.state.loading){
          return (
        		<document>
        			<loadingTemplate>
        				<activityIndicator>
        					<title>Loading</title>
        				</activityIndicator>
        			</loadingTemplate>
        		</document>
        	);
        }

        var retVal;
          try {
            retVal = eval(sampleScript);
          } catch (e) {
            console.log(e);
          } finally {
            return retVal;
          }

      }

    })));
}
