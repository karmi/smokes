# any pre build scripting or plugins should go here
plugin 'jim'

# Add mimetype for CACHE MANIFEST file
# Cf. "HTML5 Offline Application Cache"
MIME::Types.add MIME::Type.new('text/cache-manifest') { |t| t.extensions << 'manifest' }
system "rake manifest"
