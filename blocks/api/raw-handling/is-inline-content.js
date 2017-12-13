/**
 * Internal dependencies
 */
import { isInline, isDoubleBR } from './utils';

export default function( HTML, additionalInlineWhitelist = [] ) {
	const doc = document.implementation.createHTMLDocument( '' );

	doc.body.innerHTML = HTML;

	const nodes = Array.from( doc.body.children );

	return ! nodes.some( isDoubleBR ) && deepCheck( nodes, additionalInlineWhitelist );
}

function deepCheck( nodes, additionalInlineWhitelist = [] ) {
	return nodes.every( ( node ) => {
		return ( 'SPAN' === node.nodeName || isInline( node, additionalInlineWhitelist ) ) &&
			deepCheck( Array.from( node.children ), additionalInlineWhitelist );
	} );
}
