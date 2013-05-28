TPL = smarty
DATE = $(shell date +%I:%M%p)
CHECK = \033[32m✔\033[39m
HR = \#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


#
# BUILD DOCS
#

def: all

all: client finish

client: css js tpl

lmd:
	@echo "\n lmd... \n"
	@lmd build dev


js:
	@coffee -cbjvp ./client-js/* > ./script/sn.js
	@uglifyjs ./script/sn.js -nc > ./script/sn.min.js --config ./.jshintrc

css:
	@recess --compile ./less/bootstrap.less > ./style/style.css
	@recess --compress ./less/bootstrap.less > ./style/style.min.css


tpl:
	@jade --pretty ./layout/index.jade -O ./


	
finish:
	@echo "\nSuccessfully built at ${DATE}."


bootstrap:
	@cat ./bootstrap-js/bootstrap-*.js  > ./script/bootstrap.js
	@uglifyjs ./script/bootstrap.js -nc > ./script/bootstrap.min.tmp.js

	@echo "/**\n* bootstrap.js v2.2.2 by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > ./copyright
	@cat ./copyright ./script/bootstrap.min.tmp.js > ./script/bootstrap.min.js
	@rm ./copyright ./script/bootstrap.min.tmp.js



#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

.PHONY: clean
