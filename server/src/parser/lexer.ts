import { createToken, Lexer, TokenVocabulary } from 'chevrotain';

export const Identifier = createToken({ 
	name: "Identifier", 
	pattern: /[a-zA-Z]\w*/ 
});
// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.

export const Section = createToken({
	name: "section",
	pattern: /section/,
});

export const Procedure = createToken({
	name: "procedure",
	pattern: /procedure/,
});

export const Define = createToken({
	name: 'define',
	pattern: /define/,
});

export const Specification = createToken({
	name: 'specification',
	pattern: /specification/,
});

export const EnterMarkdown = createToken({
	name: 'EnterMarkdown',
	pattern: /md>/
});

export const ExitMarkdown = createToken({
	name: 'ExitMarkdown',
	pattern: /<md/
});

export const Colon = createToken({ name: 'Colon', pattern: /:/ });
export const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ });
export const OpenBrace = createToken({ name: 'OpenBrace', pattern: /{/ });
export const CloseBrace = createToken({ name: 'CloseBrace', pattern: /}/ });
export const Spec = createToken({ name: 'Spec', pattern: /[A-Z0-9-]+[A-Z0-9]/ });
export const ID = createToken({ name: 'ID', pattern: /[_a-zA-Z][\w_]*/ });
export const String = createToken({ name: 'String', pattern: /"[^"]*"|'[^']*'/ });
export const WhiteSpace = createToken({
	name: "WhiteSpace",
	pattern: /\s+/,
	group: Lexer.SKIPPED
});

const tokens = [
	WhiteSpace,
	// keywords
	Section,
	Procedure,
	Define,
	Specification,
	Colon,
	OpenBrace,
	CloseBrace,
	Spec,
	// identifier
	Identifier,
	String,
	ID,
	Integer,
];

const vocab: TokenVocabulary = {};
tokens.forEach((tokenType) => {
  vocab[tokenType.name] = tokenType;
});

export const tokenVocabulary = vocab;

const FactureLexer = new Lexer(tokens);

export const lex = (inputText: string) => {
	const lexingResult = FactureLexer.tokenize(inputText);

	if (lexingResult.errors.length > 0) {
		throw Error("Sad Sad Panda, lexing errors detected");
	}

	return lexingResult;
};

