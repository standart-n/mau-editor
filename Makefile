DATE = $(shell date +%I:%M%p)

install: 
	@npm install -g grunt-cli
	@npm install
	@grunt all

build:
	@grunt
	
finish:
	@echo "\nSuccessfully built at ${DATE}."



#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

.PHONY: clean
