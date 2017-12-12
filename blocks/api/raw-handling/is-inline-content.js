/**
 * Internal dependencies
 */
import { isInline, isDoubleBR } from './utils';

export default function( HTML, additionalInlineNodes = [] ) {
	const doc = document.implementation.createHTMLDocument( '' );

	doc.body.innerHTML = HTML;

	const nodes = Array.from( doc.body.children );

	return ! nodes.some( isDoubleBR ) && deepCheck( nodes );
}

function deepCheck( nodes ) {
	return nodes.every( ( node, additionalInlineNodes ) => {
		return ( 'SPAN' === node.nodeName || isInline( node, additionalInlineNodes ) ) &&
			deepCheck( Array.from( node.children ), additionalInlineNodes );
	} );
}
