#require 'capybara-webkit'

Evergreen.configure do |config|
  #config.driver = :webkit
  config.public_dir = ''
  config.template_dir = 'spec/javascripts/templates'
  config.spec_dir = 'spec'
end