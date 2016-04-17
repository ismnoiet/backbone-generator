var util = require('util'),
	EventEmitter = require('events'),
	_ = require('lodash'),
	beautify = require('js-beautify').js_beautify


var header = 'App = App || {};';
var myModule = {
	start : '(function(){',
	end   : '}());'
};


var model = {
	start : 'Backbone.Model.extend({',
	defaults : '',
	end : '});',
	setDefaults : function(attributes){return 'defaults:function(){ return '+ JSON.stringify(attributes) +' }' }
}

var ModelStart = 'Backbone.Model.extend({';


function Model(){
	EventEmitter.call(this);	
}	

util.inherits(Model,EventEmitter);


generateModel = function(modelName,modelAttributes){
	return 	[
				'App = App || {};',
				'(function(){',
				'App.'+modelName+' = ' + '(function(){', 
				'defaults:function(){ return '+ JSON.stringify(modelAttributes) +' }',
				'});',
				'}());'	
			].join('\n');	
}

var generateCollection = function(){

}

Model.prototype.add = function(modelName,modelAttributes,options){
	var output;
	var that = this;
	if(_.isArray(modelName) && _.isArray(modelAttributes)){
		// generate collection in this case
		if(options && options.collection){
			
		}

		output = [];

		_(modelName).each(function(item,index){
			output.push(generateModel(item,modelAttributes[index]));
			that.emit('model-created',{data:modelAttributes});
		});
		output = output.join('\n');		

	}else if(_.isObject(modelAttributes)){
		
		output = generateModel(modelName,modelAttributes);
		this.emit('model-created',{data:modelAttributes});
	}
		
	return beautify(output,{indent_size:2});
}

module.exports = Model;



