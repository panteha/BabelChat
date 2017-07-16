require 'sinatra'
require "google/cloud/translate"

class BabelChat < Sinatra::Base
  # TODO: for a proof of concept, use global variables
  $messages = ['Hello World!']
  $translate = Google::Cloud::Translate.new

  get '/' do
    erb :index
  end

  post '/messages/post' do
    message = params[:message]
    $messages << $translate.translate(message, to: "fa")
    redirect "/"
  end

  run! if app_file == $PROGRAM_NAME
end
