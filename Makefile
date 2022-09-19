install: 
	npm ci;

gendiff:
	node bin/gendiff.js

publish-test:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .