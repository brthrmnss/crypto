
=begin
#open file 
#look for certain line
look for public function FXNAME
 "     oprot_.getTransport().flush(function(error:Error):void {"
go until see
      });
    }
    
#replace inside

copy first line with public function onFXName, capital first letter
    
#input 

#break on new line / <br />
#if line contains  ':' break 
#title, page
#add page to aarray 
#add content
#continue until see break sequence
#if line and no ':' add to unknown

#if in_mode, add to aa

<< will split a line 
prompt ?  answer
\? to escape question makers
empty prompts or answer are dropped

=end



require 'rubygems'
 
class GoThroughFile
  attr_accessor :input_zip, :output_zip, :temp_folder, 
	:temp_folder2, 
	:delete_temp_folders

  def initialize( input_file, txt_input = nil   )
	if input_file != nil 
		input_file = input_file.gsub("\\", '/' )
		@input_file = input_file
		#puts input_file
	end
	if txt_input != nil 
		if txt_input.class == String 
			 txt_input = txt_input.split("\n");
		 end
		@txt_input = txt_input
	end
	 
	#puts 'top', @txt_input.class, txt_input.class, 'top'
  end

  def process  
	lines = open_file() #@input_file
	line_count =0
	in_fx = false
	found_get_trans = false
	parsed_lines = []
	fx_name = nil
	transport_flush = []
	in_transport = false
	line_output = [] 
	 tab = "\t"
	 in_thread_mode = false
	 answer = '' 
	 prompt = ''
	lines.each do | line | 
		#puts line
		line_count += 1
		next if line[0..1]== '--'
		next if line == nil || line == true 
		 if  in_thread_mode 
			if  line.strip.empty?
				line_output =prompt+'?' + tab + answer
				puts line_output
				in_thread_mode = false
				parsed_lines << line_output
				#asdf.gd
			else
				#puts answer
				answer +=  line.strip + ', '
			end

			next
		end
		next if  line.strip.empty?
		#puts line
		
		# puts line[0..1]
		if line_includes  line, '?' #only 1 
			line.strip!
			#next if line_includes line, 'on'
			split = line.split('?')
			prompt = split[0]
			#what is 2nd one's size? 
			#puts split.inspect
			next if prompt.length < 3 && split.size == 2
			answer = split[1..-1].join('?')
			next if answer.empty? || answer.strip.empty?
			answer ||= ''

			if answer.strip == '<<'#answer.include?('<<') #answer.strip == '<<'
				#puts "asdf"
				#asdf.g
				in_thread_mode = true
				#puts 'answer:'+answer
				answer = ''
				next
			end
			line_output =prompt+'?' + tab + answer
			puts line_output
		else
			next
		end
		
		#line_output << line_output +"\n"
		parsed_lines << line_output
	end	
	parsed_lines
  end
   def open_file  
	 lines = File.open(@input_file) if @input_file != nil 
	 lines = @txt_input if @txt_input != nil 
	 lines 
 end
 
   def line_includes line, include
	line.include? include
end 
   def content_between line, start, ending
	line = line.split(start)[1]
	#puts line.inspect
	line = line.split(ending)[0]
	line
  end 
end

 
 
 
if __FILE__ == $0 then
	str = 'G:\My Documents\work\scripts\text_parsing\flashcards_flattened.txt'
	str = Dir.pwd+ '/oracle2.txt'
	build_zip = GoThroughFile.new(str)
	#build_zip = GoThroughFile.new(nil, "\n sssd sdf sdf \n yogh? you down? \n mark? fight \n heart ? 666")
	build_zip.process() 
end

 
