import { CstChildrenDictionary, ILexingError, IRecognitionException } from 'chevrotain';
import { lex } from './lexer';
import { FactureParser } from './parser';

const parserInstance = new FactureParser();
const BaseFactureVisitorWithDefaults = parserInstance.getBaseCstVisitorConstructorWithDefaults();

export interface AstResult {
	ast: any;
	errors: {
		lexingErrors: ILexingError[] | undefined;
		parsingErrors: IRecognitionException[] | undefined;
	};
}

export class FactureToAstVisitor extends BaseFactureVisitorWithDefaults {
	constructor() {
		super();
		this.validateVisitor();
	}

	document(ctx: CstChildrenDictionary) {
		return {
			name: 'document',
			children: ctx
		};
	}
}

const toAstVisitorInstance = new FactureToAstVisitor();

const toAst = (inputText: string): AstResult => {
	const lexResult = lex(inputText);
	parserInstance.input = lexResult.tokens;
	const cst = parserInstance.document();

	if (parserInstance.errors.length > 0) {
		console.log(parserInstance.errors);
	}

	const ast = toAstVisitorInstance.visit(cst);

	return {
		ast: ast,
		errors: {
			lexingErrors: lexResult.errors.length ? lexResult.errors : undefined,
			parsingErrors: parserInstance.errors.length ? parserInstance.errors : undefined
		}
	};
};

export default toAst;
