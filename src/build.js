var ELexerToken;
(function (ELexerToken) {
    ELexerToken["TOK_WHITE_SPACE"] = "TOK_WHITE_SPACE";
    ELexerToken["TOK_OPTIONAL_WHITESPACE"] = "TOK_OPTIONAL_WHITE_SPACE";
    ELexerToken["TOK_COLUMN"] = "TOK_COLUMN";
    ELexerToken["TOK_VAR_NAME"] = "TOK_VAR_NAME";
    ELexerToken["TOK_PIPE"] = "TOK_PIPE";
    ELexerToken["TOK_COMA"] = "TOK_COMA";
    ELexerToken["TOK_EQ_GT"] = "TOK_EQ_GT";
    ELexerToken["TOK_MATCH_NUMBER"] = "TOK_MATCH_NUMBER";
    ELexerToken["TOK_OR"] = "TOK_OR";
    ELexerToken["TOK_SEMICOLON"] = "TOK_SEMICOLON";
})(ELexerToken || (ELexerToken = {}));
class Lexer {
    static readRegExp(s) {
        if (s.charAt(0) != "/") {
            return null;
        }
        let localBuffer = s, result = "/", i = 0, chr, expr;
        do {
            i++;
            if (i === localBuffer.length) {
                return null;
            }
            chr = localBuffer.charAt(i);
            if (chr === "\r" || chr === "\n") {
                return null;
            }
            result += chr;
            try {
                if ((expr = eval(result)) instanceof RegExp) {
                    return {
                        read: expr,
                        remaining: s.substr(result.length),
                    };
                }
            }
            catch (e) {
            }
        } while (1);
    }
    static readToken(token, fromString) {
        let expr;
        switch (token) {
            case ELexerToken.TOK_WHITE_SPACE:
            case ELexerToken.TOK_OPTIONAL_WHITESPACE:
            case ELexerToken.TOK_COLUMN:
            case ELexerToken.TOK_VAR_NAME:
            case ELexerToken.TOK_PIPE:
            case ELexerToken.TOK_COMA:
            case ELexerToken.TOK_EQ_GT:
            case ELexerToken.TOK_MATCH_NUMBER:
            case ELexerToken.TOK_OR:
            case ELexerToken.TOK_SEMICOLON:
                expr = this[token];
                break;
            default:
                throw new Error("Invalid read token: " + token);
        }
        let matches = expr.exec(fromString);
        if (!matches) {
            return null;
        }
        let matchLength = matches[0].length;
        return {
            read: matches[0],
            remaining: fromString.substr(matchLength),
        };
    }
    static read_TOK_LEXER_RULE(buffer) {
        let read, readRegex, currentBuffer = buffer, ruleName, readEnd, members = [], regexpMember, namedMember;
        if (null === (read = this.readToken(ELexerToken.TOK_OPTIONAL_WHITESPACE, currentBuffer))) {
            return null;
        }
        else {
            currentBuffer = read.remaining;
        }
        if (null === (read = this.readToken(ELexerToken.TOK_VAR_NAME, currentBuffer))) {
            return null;
        }
        else {
            currentBuffer = read.remaining;
            ruleName = read.read;
        }
        if (null === (read = this.readToken(ELexerToken.TOK_COLUMN, currentBuffer))) {
            return null;
        }
        else {
            currentBuffer = read.remaining;
        }
        readEnd = false;
        while (!readEnd) {
            if (null === (read = this.readToken(ELexerToken.TOK_OPTIONAL_WHITESPACE, currentBuffer))) {
                return null;
            }
            else {
                currentBuffer = read.remaining;
            }
            if (readRegex = this.readRegExp(currentBuffer)) {
                regexpMember = new RegexToken();
                regexpMember.expr = readRegex.read;
                regexpMember.name = ruleName;
                currentBuffer = readRegex.remaining;
                if (null === (read = this.readToken(ELexerToken.TOK_OPTIONAL_WHITESPACE, currentBuffer))) {
                    return null;
                }
                else {
                    currentBuffer = read.remaining;
                }
                if (null === (read = this.readToken(ELexerToken.TOK_EQ_GT, currentBuffer))) {
                    throw new Error("Token '=>' expected!");
                }
                else {
                    currentBuffer = read.remaining;
                }
                if (null === (read = this.readToken(ELexerToken.TOK_OPTIONAL_WHITESPACE, currentBuffer))) {
                    return null;
                }
                else {
                    currentBuffer = read.remaining;
                }
                if (null === (read = this.readToken(ELexerToken.TOK_MATCH_NUMBER, currentBuffer))) {
                    throw new Error("Token TOK_MATCH_NUMBER expected!");
                }
                else {
                    currentBuffer = read.remaining;
                    regexpMember.withMatchesAsString(read.read);
                }
                members.push(regexpMember);
            }
            else {
                if (read = this.readToken(ELexerToken.TOK_VAR_NAME, currentBuffer)) {
                    if (null === (read = this.readToken(ELexerToken.TOK_VAR_NAME, currentBuffer))) {
                        return null;
                    }
                    else {
                        currentBuffer = read.remaining;
                        namedMember = new NamedToken();
                        namedMember.name = read.read;
                        members.push(namedMember);
                    }
                }
                else {
                    throw new Error("Expected REGULAR_EXPRESSION | TOKEN_NAME");
                }
            }
            if (null === (read = this.readToken(ELexerToken.TOK_OPTIONAL_WHITESPACE, currentBuffer))) {
                return null;
            }
            else {
                currentBuffer = read.remaining;
            }
            if (null !== (read = this.readToken(ELexerToken.TOK_COMA, currentBuffer))) {
                members.push(new ComaToken());
                currentBuffer = read.remaining;
            }
            else {
                if (null !== (read = this.readToken(ELexerToken.TOK_OR, currentBuffer))) {
                    members.push(new OrToken());
                    currentBuffer = read.remaining;
                }
                else {
                    if (null !== (read = this.readToken(ELexerToken.TOK_SEMICOLON, currentBuffer))) {
                        currentBuffer = read.remaining;
                        return {
                            name: ruleName,
                            members: members,
                            remaining: currentBuffer,
                        };
                    }
                    else {
                        throw new Error("Unexpected input. Expected TOK_OR|TOK_SEMICOLON|TOK_COMA");
                    }
                }
            }
        }
    }
    static parse(lexerBuffer) {
        let localBuffer = lexerBuffer, rule, result = new Tokenizer(), token;
        do {
            if ('' === localBuffer) {
                break;
            }
            rule = this.read_TOK_LEXER_RULE(localBuffer);
            if (null !== rule) {
                localBuffer = rule.remaining;
                result.withBlock(Tokenizer.createBlockFromLexerRule(rule));
            }
            else {
                if (null !== (token = this.readToken(ELexerToken.TOK_WHITE_SPACE, localBuffer))) {
                    localBuffer = rule.remaining;
                }
                else {
                    throw new Error('Invalid content: "' + localBuffer.substr(0, 10) + '"');
                }
            }
        } while (1);
        result.build();
        return result;
    }
}
Lexer.TOK_WHITE_SPACE = /^[\s]+/;
Lexer.TOK_OPTIONAL_WHITE_SPACE = /^([\s]+)?/;
Lexer.TOK_COLUMN = /^:/;
Lexer.TOK_VAR_NAME = /^[a-zA-Z$_]+[a-zA-Z0-9_$]+/;
Lexer.TOK_PIPE = /^\|/;
Lexer.TOK_COMA = /^,/;
Lexer.TOK_EQ_GT = /^=>/;
Lexer.TOK_MATCH_NUMBER = /(\$(0|[1-9][\d]{0,}))+/;
Lexer.TOK_OR = /^\|/;
Lexer.TOK_SEMICOLON = /^;/;
class Tokenizer {
    constructor() {
        this.blocks = {};
    }
    withBlock(block) {
        this.blocks[block.getName()] = block;
        return this;
    }
    static createBlockFromLexerRule(lexerRule) {
        let orChunks = [[]], blockIndex = 0, chunkIndex = 0;
        while (blockIndex < lexerRule.members.length) {
            switch (lexerRule.members[blockIndex].getType()) {
                case ELexerTokenType.REGEX:
                case ELexerTokenType.NAMED:
                    orChunks[chunkIndex].push(lexerRule.members[blockIndex]);
                    break;
                case ELexerTokenType.COMA:
                    break;
                case ELexerTokenType.OR:
                    orChunks.push([]);
                    chunkIndex++;
                    break;
                default:
                    throw new Error("Unknown lexer token type: " + JSON.stringify(lexerRule.members[blockIndex].getType()));
            }
            blockIndex++;
        }
        if (orChunks.length <= 1) {
            let subBlock = new TokenizerANDBlock();
            subBlock.setName(lexerRule.name);
            for (let j = 0, n = orChunks[0].length; j < n; j++) {
                switch (orChunks[0][j].getType()) {
                    case ELexerTokenType.NAMED:
                        subBlock.addBlock(new TokenizerNAMEDBlock(orChunks[0][j]));
                        break;
                    case ELexerTokenType.REGEX:
                        subBlock.addBlock(new TokenizerREGEXBlock(orChunks[0][j]));
                        break;
                    default:
                        throw new Error("Invalid lexer block type " + JSON.stringify(orChunks[0][j].getType()));
                }
            }
            return subBlock;
        }
        else {
            let result = new TokenizerORBlock();
            result.setName(lexerRule.name);
            for (let i = 0, len = orChunks.length; i < len; i++) {
                if (orChunks[i].length === 1) {
                    switch (orChunks[i][0].getType()) {
                        case ELexerTokenType.NAMED:
                            result.addBlock(new TokenizerNAMEDBlock(orChunks[i][0]));
                            break;
                        case ELexerTokenType.REGEX:
                            result.addBlock(new TokenizerREGEXBlock(orChunks[i][0]));
                            break;
                        default:
                            throw new Error("Invalid lexer block type " + JSON.stringify(orChunks[i][0].getType()));
                    }
                }
                else {
                    let subBlock = new TokenizerANDBlock();
                    for (let j = 0, n = orChunks[i].length; j < n; j++) {
                        switch (orChunks[i][j].getType()) {
                            case ELexerTokenType.NAMED:
                                subBlock.addBlock(new TokenizerNAMEDBlock(orChunks[i][j]));
                                break;
                            case ELexerTokenType.REGEX:
                                subBlock.addBlock(new TokenizerREGEXBlock(orChunks[i][j]));
                                break;
                            default:
                                throw new Error("Invalid lexer block type " + JSON.stringify(orChunks[i][j].getType()));
                        }
                    }
                    result.addBlock(subBlock);
                }
            }
            return result;
        }
    }
    hasBlock(blockName) {
        return blockName && undefined !== this.blocks[blockName];
    }
    build() {
        for (let blockName in this.blocks) {
            if (this.blocks.propertyIsEnumerable(blockName)) {
                this.blocks[blockName].setTokenizer(this);
            }
        }
        for (let blockName in this.blocks) {
            if (this.blocks.propertyIsEnumerable(blockName)) {
                this.blocks[blockName].build();
            }
        }
        if (!this.hasBlock('main')) {
            throw new Error('Failed to build tokenizer: A "main" block was not found!');
        }
    }
    toString() {
        return 'Tokenizer';
    }
}
class TokenizerORBlock {
    constructor() {
        this.blocks = [];
    }
    addBlock(block) {
        this.blocks.push(block);
        return this;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setTokenizer(tokenizer) {
        this.tokenizer = tokenizer;
        for (let i = 0, len = this.blocks.length; i < len; i++) {
            this.blocks[i].setTokenizer(tokenizer);
        }
    }
    getTokenizer() {
        return this.tokenizer;
    }
    build() {
        if (this.name && !this.tokenizer.hasBlock(this.name)) {
            throw new Error('Block "' + this.name + '" not declared!');
        }
        for (let i = 0, len = this.blocks.length; i < len; i++) {
            this.blocks[i].build();
        }
    }
}
class TokenizerANDBlock {
    constructor() {
        this.blocks = [];
    }
    addBlock(block) {
        this.blocks.push(block);
        return this;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setTokenizer(tokenizer) {
        this.tokenizer = tokenizer;
        for (let i = 0, len = this.blocks.length; i < len; i++) {
            this.blocks[i].setTokenizer(tokenizer);
        }
    }
    getTokenizer() {
        return this.tokenizer;
    }
    build() {
        if (this.name && !this.tokenizer.hasBlock(this.name)) {
            throw new Error('Block "' + this.name + '" not defined!');
        }
        for (let i = 0, len = this.blocks.length; i < len; i++) {
            this.blocks[i].build();
        }
    }
}
class TokenizerREGEXBlock {
    constructor(token) {
        this.token = token;
        this.name = this.token.name;
    }
    setName(blockName) {
        throw new Error('Cannot set regex block name!');
    }
    getName() {
        return this.name;
    }
    setTokenizer(tokenizer) {
        this.tokenizer = tokenizer;
    }
    getTokenizer() {
        return this.tokenizer;
    }
    build() {
        if (!this.tokenizer.hasBlock(this.token.name)) {
            throw new Error('Undefined REGEX block "' + this.token.name + '" in lexer!');
        }
    }
}
class TokenizerNAMEDBlock {
    constructor(token) {
        this.token = token;
        this.name = this.token.name;
    }
    setName(blockName) {
        throw new Error('Named blocks cannot have names!');
    }
    getName() {
        return this.name;
    }
    setTokenizer(tokenizer) {
        this.tokenizer = tokenizer;
    }
    getTokenizer() {
        return this.tokenizer;
    }
    build() {
        if (!this.tokenizer.hasBlock(this.name)) {
            throw new Error('Undefined NAMED block "' + this.name + '" in lexer!');
        }
    }
}
var ELexerTokenType;
(function (ELexerTokenType) {
    ELexerTokenType[ELexerTokenType["COMA"] = 0] = "COMA";
    ELexerTokenType[ELexerTokenType["OR"] = 1] = "OR";
    ELexerTokenType[ELexerTokenType["REGEX"] = 2] = "REGEX";
    ELexerTokenType[ELexerTokenType["NAMED"] = 3] = "NAMED";
})(ELexerTokenType || (ELexerTokenType = {}));
class RegexToken {
    getType() {
        return ELexerTokenType.REGEX;
    }
    withMatchesAsString(matches) {
        if ("" === matches) {
            throw new Error("Invalid argument: matches: TOK_MATCH_NUMBER format expected!");
        }
        else {
            this.resultMatches = [];
            let matchesSplit = matches.split("$");
            for (let i = 1, len = matchesSplit.length; i < len; i++) {
                if ("" !== matchesSplit[i]) {
                    this.resultMatches.push(parseInt(matchesSplit[i]));
                }
            }
            if (0 === this.resultMatches.length) {
                throw new Error("Invalid argument: matches: TOK_MATCH_NUMBER format expected!");
            }
        }
        return this;
    }
}
class NamedToken {
    getType() {
        return ELexerTokenType.NAMED;
    }
}
class ComaToken {
    getType() {
        return ELexerTokenType.COMA;
    }
}
class OrToken {
    getType() {
        return ELexerTokenType.OR;
    }
}
class Demo {
    static loadDefaultLexerConfig() {
        $('#lexer').each(function () {
            (function (self) {
                $.ajax('sql.lang').then(function (d) {
                    $('#lexer').val(d);
                }).fail(function (e) {
                    alert('Failed loading default lexer!');
                });
            })(this);
        });
    }
    static parseLexer() {
        (function (self) {
            let lexerData = $('#lexer').val();
            $('#tokenizer').val(String(Lexer.parse(lexerData)));
        })(this);
    }
}
