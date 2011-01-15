require 'digest/sha1'

desc "Create manifest for offline application cache"
task :manifest do
  # Google: developer.apple.com intitle:Offline Application Cache

  header =<<-HEADER
  CACHE MANIFEST
  # Cache manifest version __VERSION__
  HEADER

  assets = []
  assets += FileList.new('images/*')
  assets += FileList.new('css/*.css')
  assets += FileList.new('js/default.js').existing()
  assets += FileList.new('js/production.js').existing()

  sha = Digest::SHA1.hexdigest( assets.map { |asset| File.read(asset) rescue '' }.join )

  file = File.open('cache.manifest', 'w') do |f|
    f << header.
           gsub(/^\s+/, '').
           gsub(/__VERSION__/, sha)  << "\n"
    assets.each { |asset| f << asset << "\n" }
  end

  puts "Generated offline cache manifest version #{sha}"

end
