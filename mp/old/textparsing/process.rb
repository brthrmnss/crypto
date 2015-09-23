
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
	 found_mp4  = false
	 files = []
	 
	 last_line_streaming = false
	 
	lines.each do | line | 
		#puts line
		line_count += 1
		next if line[0..1]== '--'
		next if line == nil || line == true 
 
		if found_mp4 
			if   line_includes line, 'mp4' #only 1 
					next
			else
				found_mp4 = false
			end
		end
		next if  line.strip.empty?
		#puts line
		
		# puts line[0..1]
		if line_includes  line, 'mp4' #only 1 
			last_line_streaming = false
			found_mp4 = true
			line.strip!
			files.push line
			puts line
		 elsif line_includes(line, '.flv') 
			
			if last_line_streaming
				asdf.g
				files.push line
				puts line
			end	
			last_line_streaming = false
		 elsif line_includes(line, 'http://real-debrid.com/streaming') 
			last_line_streaming = true
		end
		
 
		#line_output << line_output +"\n"
		#parsed_lines << line_output
	end	
	files
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

#ends_wit
#@current line
 
 
 
if __FILE__ == $0 then
	str = 'G:\My Documents\work\scripts\text_parsing\flashcards_flattened.txt'
	str = Dir.pwd+ '/youtube.txt'
	build_zip = GoThroughFile.new(str)
	#build_zip = GoThroughFile.new(nil, "\n sssd sdf sdf \n yogh? you down? \n mark? fight \n heart ? 666")
	build_zip.process() 
end

 
