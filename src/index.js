import * as TVDML from 'tvdml';
import LoadRoutes from './lib/loadroutes';
var React = {createElement: TVDML.jsx};
TVDML
    .subscribe(TVDML.event.LAUNCH)
    .pipe(() => TVDML.navigate('start'));
TVDML
  .subscribe(TVDML.event.ERROR)
  .pipe(err => console.log(err));



TVDML
    .handleRoute('start')
    .pipe(TVDML.render(
    		<document>
    			<loadingTemplate>
    				<activityIndicator>
    					<title>loading</title>
    				</activityIndicator>
    			</loadingTemplate>
    		</document>
    	))
    .pipe(TVDML.passthrough(LoadRoutes))
    .pipe(() => {
      console.log("HOME");
      TVDML.navigate('home',{},true)
    });
    
    TVDML
        .handleRoute('next')
        .pipe(TVDML.render(
          <document>
              <alertTemplate>
                  <title>This is initial view</title>
                  <description>You can now navigate to another view</description>
                  <button onSelect={event => TVDML.navigate('home')}>
                      <text>Go to home page</text>
                  </button>
              </alertTemplate>
          </document>
        ));
