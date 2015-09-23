

puts RUBY_VERSION
require 'rubygems'
require 'rack'
require 'sinatra'

require "sinatra/reloader"
STDOUT.sync = true

set :bind, 'localhost'
set :port, 7125

#puts RUBY_VERSION
#exit()
require_relative 'flashcards.rb'

get '/' do
	#raise File.dirname(__FILE__)
      filename = File.dirname(__FILE__)+'/'+'flashcards_html_form.html'
      displayfile = File.open(filename, 'r')
      content = displayfile.read()
      content
end

get '/test_require' do
	require_relative 'flashcards.rb'
	#include GoThroughFile
	puts "yo? you down? \n madrk?: fight".split('\n')
	go = GoThroughFile.new(nil, "yo? you down? \n madrk?: fight")
      go.process()
end

get '/evernote_eod_form.html' do
      filename = 'evernote_eod_form.html'
      displayfile = File.open(filename, 'r')
      content = displayfile.read()
      content
end

post '/submit.html' do
	require_relative 'flashcards.rb'
        input = params['user']
	input = input.gsub("\r", '' )        
	 puts 'input', input.inspect
	#puts "yo? you down? \n mark?: fight".split('\n')
	go = GoThroughFile.new(nil, input)
	results = go.process()#.join("\n")
	puts results.inspect
	results = results.collect do | x | 
		'<tr>'+'<td>'+x+'</td>'+'</tr>'
	end
	results = results.join("")
      #  result = result.gsub("\n", '<br />' )
      #  result = result.gsub("\r", '' ) 
	#result = result.gsub('\r', '' )  
	results = results.gsub("\t", '</td><td>' ) 	

	'<html>'+'<table>'+results+'</table>'+'</html>';      
end
