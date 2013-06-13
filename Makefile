DATE = $(shell date +%I:%M%p)


build:
	@grunt


install: 
	@npm install -g grunt-cli
	@npm install
	@grunt all
	

finish:
	@echo "\nSuccessfully built at ${DATE}."



#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

.PHONY: clean
