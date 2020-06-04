import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service auth:

  beforeModel() {
    this.auth.checkLogin();
  }
}

/*
 * Whats happening here:
 * Because the we want to use this route as the all encompasing route for the project, this is
 * also where we are putting our auth service.
 * 
 * !!! { inject as service } [@ ember services](https://guides.emberjs.com/v3.18.0/services/)
 * ember.js uses this syntax to inject any 'container-resolved' object using @ember/service inject
 * decorator.
 * 
 * !!! beforeModel [@ ember route methods](https://api.emberjs.com/ember/release/classes/Route/methods/transitionTo?anchor=beforeModel)
 * This is the first hook of the route `entry validation hooks` when attempting to transition into
 * a route or one of its children.
 *
 */
