Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins %w[https://example.com http://example.com https://www.example.com http://www.example.com https://example.herokuapp.com http://example.herokuapp.com]
    resource '*',
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
