/**
 * External dependencies
 */
import { applyMiddleware, createStore } from 'redux';
import refx from 'refx';
import multi from 'redux-multi';
import { flowRight } from 'lodash';

/**
 * Internal dependencies
 */
import effects from './effects';
import { mobileMiddleware } from './utils/mobile';
import reducer, { grtcMiddleware } from './reducer';
import storePersist from './store-persist';
import { PREFERENCES_DEFAULTS } from './store-defaults';
import enhanceWithBrowserSize from './store-browser-enhancer';

/**
 * Module constants
 */
const GUTENBERG_PREFERENCES_KEY = `GUTENBERG_PREFERENCES_${ window.userSettings.uid }`;

/**
 * Creates a new instance of a Redux store.
 *
 * @param  {?*}          preloadedState Optional initial state
 * @return {Redux.Store}                Redux store
 */
function createReduxStore( preloadedState ) {
	const enhancers = [
		applyMiddleware( multi, refx( effects ), grtcMiddleware ),
		storePersist( {
			reducerKey: 'preferences',
			storageKey: GUTENBERG_PREFERENCES_KEY,
			defaults: PREFERENCES_DEFAULTS,
		} ),
		applyMiddleware( mobileMiddleware ),
	];

	if ( window.__REDUX_DEVTOOLS_EXTENSION__ ) {
		enhancers.push( window.__REDUX_DEVTOOLS_EXTENSION__() );
	}

	const store = createStore( reducer, preloadedState, flowRight( enhancers ) );
	enhanceWithBrowserSize( store );

	return store;
}

export default createReduxStore;
