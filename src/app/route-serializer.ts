import {Params, RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';

/**
 * IRouterStateUrl the model of router in the app.
 */
export interface IRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

/**
 * CustomSerializer the customization serializer of the routing app.
 */
export class CustomSerializer implements RouterStateSerializer<IRouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: {queryParams},
    } = routerState;
    const {params} = route;

    return {url, params, queryParams};
  }
}

