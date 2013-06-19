DATE = $(shell date +%I:%M%p)


build:
	@./node_modules/.bin/grunt

bootstrap:
	@./node_modules/.bin/grunt bootstrap

install: 
	@mkdir -p ./script/
	@mkdir -p ./style/
	@mkdir -p ./view/
	@npm install
	@./node_modules/.bin/grunt all



test:
	@./node_modules/.bin/grunt test
	

finish:
	@echo "\nSuccessfully built at ${DATE}."


.PHONY: test bootstrap
