start:
	npm start

debugEecute:
	DEBUG=execute,outputRPN node out/index.js

debugEval:
	DEBUG=eval node out/index.js

debugSym:
	DEBUG=symbols node out/index.js

debugOut:
	DEBUG=outputRPN node out/index.js

debug:
	DEBUG=symbols,outputRPN,eval node out/index.js

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
	rm -rf out
	npm run build
