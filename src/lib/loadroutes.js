import * as TVDML from 'tvdml';
import { default as CreateRouteComponent } from './routin';



function processRoute(name) {
  TVDML.handleRoute(name).pipe(CreateRouteComponent({
    name: name,
  }));
}


export default function LoadRoutes() {
  return new Promise((resolve) => {
          console.log("Grabbing routes ");
          setTimeout(function(){
            processRoute("home",{},{});
            processRoute("two",{},{});
            resolve();
          }, 100);
        });
}
