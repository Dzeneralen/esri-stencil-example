/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  MatchResults,
  RouterHistory,
} from '@stencil/router';

export namespace Components {
  interface AppHome {}
  interface AppMap {
    'history': RouterHistory;
    'match': MatchResults;
  }
  interface MyApp {}
}

declare global {


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppMapElement extends Components.AppMap, HTMLStencilElement {}
  var HTMLAppMapElement: {
    prototype: HTMLAppMapElement;
    new (): HTMLAppMapElement;
  };

  interface HTMLMyAppElement extends Components.MyApp, HTMLStencilElement {}
  var HTMLMyAppElement: {
    prototype: HTMLMyAppElement;
    new (): HTMLMyAppElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-map': HTMLAppMapElement;
    'my-app': HTMLMyAppElement;
  }
}

declare namespace LocalJSX {
  interface AppHome extends JSXBase.HTMLAttributes<HTMLAppHomeElement> {}
  interface AppMap extends JSXBase.HTMLAttributes<HTMLAppMapElement> {
    'history'?: RouterHistory;
    'match'?: MatchResults;
  }
  interface MyApp extends JSXBase.HTMLAttributes<HTMLMyAppElement> {}

  interface IntrinsicElements {
    'app-home': AppHome;
    'app-map': AppMap;
    'my-app': MyApp;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


