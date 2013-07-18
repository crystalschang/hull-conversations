module HullHelpers

  def content_image opts
    # tooltip = (opts[:title].nil?)? '' : "data-toggle='tooltip' title='#{opts[:title]}'"
    tooltip = ""
    o="""
      <a href='#{opts[:url]||"/video/detail"}' class='image #{opts[:classes]}' #{tooltip}>
        <img src='#{opts[:image]||"/images/posters/5.png"}' width='#{opts[:width]}' height='#{opts[:height]}'/>
        #{opts[:icon]}
      </a>
    """
    if opts[:responsive_details]
      o << """
        <div class='visible-phone'>
          <h5>#{opts[:title]}</h5>
        </div>
      """
    end
    o
  end

  def poster opts
    fixture = opts[:fixture]||data.fixtures.poster.sample
    opts[:title]   = fixture.title if opts[:title].nil?
    opts[:image]   ||= fixture.image
    opts[:height]  ||= (opts[:width]/120*160)
    opts[:classes] ||= 'poster'
    content_image opts
  end

  def avatar opts
    fixture = opts[:fixture]||data.fixtures.avatar.sample
    opts[:title]   = fixture.title if opts[:title].nil?
    opts[:image]   ||= fixture.image
    opts[:height]  ||= opts[:width]
    opts[:classes] ||= 'avatar'
    content_image opts
  end

  def promo opts
    fixture = opts[:fixture]||data.fixtures.promo.sample
    opts[:title]   = fixture.title if opts[:title].nil?
    opts[:image]   ||= fixture.image
    opts[:height]  ||= opts[:width]
    opts[:classes] ||= 'promo'
    content_image opts
  end

  def thumbnail opts
    c = '<div class="player">'
    c += photo opts
    c += '</div>'
    c
  end

  def video opts
    opts[:icon] = "<i class='icon icon-play'></i>"
    opts[:url] = "http://app.oahu.fr.s3.amazonaws.com/videos/51c02280873b0c2795001ed4/md_hq_high.mp4" 
    c = '<div class="player">'
    c += photo opts
    c += '</div>'
    c
  end

  def photo opts
    fixture = opts[:fixture]||data.fixtures.thumbnail.sample
    opts[:title]   = fixture.title if opts[:title].nil?
    opts[:image]   ||= fixture.image
    opts[:height]  ||= (opts[:width]/16*9)
    opts[:classes] ||= 'thumb'
    opts[:url] ||= fixture.image
    content_image opts
  end

  def icon_list
    return @icons unless @icons.nil?
    icon_list = Dir.entries(File.dirname(__FILE__) + '/../source/images/icons')
    @icons ||= icon_list.map {|i| i.gsub('.svg','')}
  end

  def nav_active(page)
    current_page.path.split('/').first == page ? "active" : ""
  end

end
