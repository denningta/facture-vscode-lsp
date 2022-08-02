import { CstNode, CstParser, EOF, ParserMethod } from 'chevrotain';
import { Colon, Define, Identifier, Integer, lex, OpenBrace, Section, Spec, Specification, String, tokenVocabulary } from './lexer';

type GrammerRule = ParserMethod<[], CstNode>;

export class FactureParser extends CstParser {
	document: GrammerRule;
	element: GrammerRule;
	sectionElement: GrammerRule;

	constructor() {
		super(tokenVocabulary, {
			recoveryEnabled: true
		});
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const $ = this;

		this.document = 
			$.RULE('document', () => {
				$.CONSUME(Define);
				$.CONSUME(Specification);
				$.CONSUME(Spec);
				$.CONSUME(String);
				$.SUBRULE($.element);
			});

		this.element = 
			$.RULE('element', () => {
				$.OR([
					{ALT: () => $.SUBRULE($.sectionElement)}
				]);
			});

		this.sectionElement = 
			$.RULE('sectionElement', () => {
				$.CONSUME(Section);
				$.CONSUME(Integer);
				$.CONSUME(Colon);
				$.CONSUME(Identifier);
				$.CONSUME(OpenBrace);
				
			});

		$.performSelfAnalysis();	
	}
}

export const parserInstance = new FactureParser();

export const parse = (inputText: string) => {
	const lexResult = lex(inputText);

	parserInstance.input = lexResult.tokens;

	parserInstance.document();

	console.log(parserInstance);

	if (parserInstance.errors.length > 0) {
		throw Error(
			"Sad sad panda, parsing errors detected!\n" +
				parserInstance.errors[0].message
		);
	}

};