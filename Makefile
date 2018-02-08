SHELL := /bin/bash

build:: demo
	cat src/ts/make/prepend.js > src/build/production.js
	jison src/ts/JQL/Lexer/JQLGrammar.jison -o src/ts/JQL/Lexer/JQLGrammar.js
	cat src/ts/JQL/Lexer/JQLGrammar.js >> src/build/production.js
	node src/ts/tsconfig.json
	cat src/ts/build.js >> src/build/production.js
	cat src/ts/make/postpend.js >> src/build/production.js

demo::
	cat src/ts/make/prepend.js > src/build/demo.js
	jison src/ts/JQL/Lexer/JQLGrammar.jison -o src/ts/JQL/Lexer/JQLGrammar.js
	cat src/ts/JQL/Lexer/JQLGrammar.js >> src/build/demo.js
	node src/ts/demo/tsconfig.json
	cat src/ts/demo/build.js >> src/build/demo.js
	cat src/ts/make/postpend.js >> src/build/demo.js

