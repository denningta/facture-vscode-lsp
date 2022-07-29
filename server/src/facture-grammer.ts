import { createToken, CstParser, Lexer, TokenType } from 'chevrotain';
import { create } from 'domain';

export function tokenBuilder() {
	const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ });
	// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.

	const section = createToken({
		name: "section",
		pattern: /section/,
		longer_alt: Identifier
	});

	const procedure = createToken({
		name: "procedure",
		pattern: /procedure/,
		longer_alt: Identifier
	});

	const define = createToken({
		name: 'define',
		pattern: /define/,
		longer_alt: Identifier
	});

	const specification = createToken({
		name: 'specification',
		pattern: /specification/,
		longer_alt: Identifier
	});

	const Colon = createToken({ name: 'Colon', pattern: /:/ });
	const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ });
	const OpenBrace = createToken({ name: 'OpenBrace', pattern: /{/ });
	const CloseBrace = createToken({ name: 'CloseBrace', pattern: /}/ });
	const Spec = createToken({ name: 'Spec', pattern: /[A-Z0-9]+-[A-Z0-9-]+/ });
	const ID = createToken({ name: 'ID', pattern: /[_a-zA-Z][\w_]*/ });
	const String = createToken({ name: 'String', pattern: /"[^"]*"|'[^']*'/ });

	const WhiteSpace = createToken({
		name: "WhiteSpace",
		pattern: /\s+/,
		group: Lexer.SKIPPED
	});

	const tokens = [
		WhiteSpace,
		// keywords
		section,
		procedure,
		define,
		specification,
		Colon,
		OpenBrace,
		CloseBrace,
		// identifier
		Identifier,
		String,
		Spec,
		ID,
		Integer,
	];

	class FactureParser extends CstParser {

		constructor(tokens: TokenType[]) {
			super(tokens);
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const $ = this;

			$.RULE('defineClause', () => {
				$.CONSUME(define);
			});
	
	
	
	
		}
	}
}