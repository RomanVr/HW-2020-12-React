start:
	node dist/bin/executeRPN.js

debugEval:
	DEBUG=eval node dist/bin/executeRPN.js

debugSym:
	DEBUG=symbols node dist/bin/executeRPN.js

debugOut:
	DEBUG=outputRPN node dist/bin/executeRPN.js

debug:
	DEBUG=symbols,outputRPN,eval node dist/bin/executeRPN.js

install:
	npm install

lint:
	npx eslint .

test:
	DEBUG=symbols,outputRPN,eval npm test

testc:
	DEBUG=symbols npm test -- --coverage

test-coverage:
	npm test -- --coverage

build:
	rm -rf dist
	npx babel src --out-dir dist --extensions .ts,.tsx

webpack:
	npm run webpack
