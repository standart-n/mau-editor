DATE = $(shell date +%I:%M%p)


build:
	@echo "\nIf grunt-cli or locally npm-modules hasn't been installed, do make install."
	@grunt


install: 
	@npm install -g grunt-cli
	@npm install
	@grunt all

test:
	@grunt test
	

finish:
	@echo "\nSuccessfully built at ${DATE}."



#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

.PHONY: clean
